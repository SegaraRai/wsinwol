import WebSocket from 'ws-client';

import { createSignature, isValidSignature } from './signature';
import { getTime, isValidTime } from './time';
import { wol } from './wol';
import { isIP } from 'net';
import { randomBytes } from 'crypto';


// node index.ts <api_key> <channel_id> <secret> [mac_address]

if (process.argv.length !== 6) {
  console.error(`usage: node ${process.argv[1]} <api_key> <channel_id> <secret> <wol_destination | mac_address>`);
  process.exit(1);
}


function printLog(message: string) {
  const jstDate = new Date();
  jstDate.setUTCHours(jstDate.getUTCHours() + 9);
  const jstDateString = jstDate.toISOString().replace(/Z$/, '+0900');

  console.log(`[${jstDateString}] ${message}`)
}


function generateRandomString(): string {
  return /*@__PURE__*/randomBytes(16).toString('hex');
}


const [, , apiKey, channelId, secret, address] = process.argv;


const endpoint = `wss://connect.websocket.in/v3/${encodeURIComponent(channelId)}?apiKey=${encodeURIComponent(apiKey)}`;


const ws = new WebSocket(endpoint);


ws.once('open', () => {
  printLog('open');
});


ws.once('close', () => {
  printLog('close');
  ws.close();
});


ws.once('error', error => {
  printLog(`error: ${error}`);
  ws.close();
});


function sendMessage(message: any, callback: (error?: Error) => void) {
  const strMessage = JSON.stringify({
    time: getTime(),
    ...message,
  });

  const signature = /*@__PURE__*/createSignature(strMessage, secret);

  ws.send(Buffer.from(JSON.stringify({
    message: strMessage,
    signature,
  }), 'utf-8'), callback);
}


function parseMessage(rawData: WebSocket.Data): any {
  const data = JSON.parse(rawData.toString('utf-8'));
  if (typeof data.message !== 'string' || typeof data.signature !== 'string' || !/*@__PURE__*/isValidSignature(data.message, data.signature, secret)) {
    throw new Error('invalid signature');
  }
  const message = JSON.parse(data.message);
  if (typeof message.time !== 'number' || !/*@__PURE__*/isValidTime(message.time)) {
    throw new Error('invalid time');
  }
  return message;
}


function runServer() {
  ws.on('message', rawData => {
    try {
      const { type, id, command, params } = /*@__PURE__*/parseMessage(rawData);
      if (type !== 'client') {
        return;
      }
      switch (command) {
        case 'wol':
          printLog(`wol ${params.macAddress}`);
          wol(address, params.macAddress, (error, bytes) => {
            if (error) {
              printLog(`wol error: ${error}; bytes = ${bytes}`);
            } else {
              printLog(`wol sent; bytes = ${bytes}`);
            }
            sendMessage({
              id,
              type: 'server',
              error: error && error.toString(),
            }, error => {
              if (error) {
                printLog(`reply error: ${error}`);
                return;
              }
              printLog('reply sent');
            });
          });
          break;
      }
    } catch (error) {
      printLog(`error (invalid request): ${error}; message = ${rawData}`);
    }
  });
}


function runClient() {
  ws.once('open', () => {
    const id = /*@__PURE__*/generateRandomString();

    ws.on('message', rawData => {
      const { type, id: replyId, error } = /*@__PURE__*/parseMessage(rawData);
      if (type !== 'server') {
        return;
      }
      if (replyId !== id) {
        return;
      }
      if (error) {
        printLog(`server returned error: ${error}`);
      } else {
        printLog('server returned ok');
      }
      ws.close();
    });

    sendMessage({
      id,
      type: 'client',
      command: 'wol',
      params: {
        macAddress: address,
      },
    }, error => {
      if (error) {
        printLog(`error: ${error}`);
      }
      printLog('sent');
    });
  });
}



if (isIP(address)) {
  runServer();
} else {
  runClient();
}
