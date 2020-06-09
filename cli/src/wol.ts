import { createSocket } from 'dgram';
import { isIPv6 } from 'net';


const wolPort = 9;


function parseMACAddress(macAddress: string): Buffer {
  macAddress = macAddress.replace(/[^\dA-Fa-f]/g, '');
  if (macAddress.length !== 12) {
    throw new Error('invalid MAC address');
  }
  return Buffer.from(macAddress, 'hex');
}


function createMagicPacket(macAddress: string): Buffer {
  const targetMACAddressBuffer = /*@__PURE__*/parseMACAddress(macAddress);
  const buffers = [Buffer.from('FFFFFFFFFFFF', 'hex')];
  for (let i = 0; i < 16; i++) {
    buffers.push(targetMACAddressBuffer);
  }
  return Buffer.concat(buffers);
}


export function wol(address: string, macAddress: string, callback: (error: Error | null, bytes: number) => void) {
  const magicPacket = /*@__PURE__*/createMagicPacket(macAddress);
  const socket = /*@__PURE__*/createSocket(isIPv6(address) ? 'udp6' : 'udp4');
  socket.send(magicPacket, wolPort, address, (error, bytes) => {
    socket.close();
    callback(error, bytes);
  });
}
