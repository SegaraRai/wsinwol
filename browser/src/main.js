//import 'bootstrap';
import jsSHA from 'jssha/dist/sha256';
import './jssha-license';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';


function parseUrlParams(str) {
  return str
    .replace(/^#/, '')
    .split('&')
    .map(entry => entry.split('=').map(decodeURIComponent))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {});
}


function createUrlParams(object) {
  return Object.entries(object)
    .map(e => e.map(encodeURIComponent))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}


function assignObjectToElements(object) {
  for (const [key, value] of Object.entries(object)) {
    const element = document.getElementById(`v-${key}`);
    if (!element) {
      continue;
    }
    element.value = value;
  }
}


function createObjectFromElements() {
  return Array.from(document.querySelectorAll('input[id^="v-"]'))
    .reduce((acc, curr) => ({
      ...acc,
      [curr.id.substr(2)]: curr.value,
    }), {});
}


function getTime() {
  return Math.floor(Date.now() / 1000 + parseFloat(document.getElementById('vp-time-offset').value));
}


function createSignature(message, secret) {
  const hash = new jsSHA('SHA-256', 'TEXT', {
    hmacKey: {
      format: 'TEXT',
      value: secret,
    },
  });
  hash.update(message);
  return hash.getHash('HEX').toLowerCase();
}


function showError(error) {
  const errorElement = document.getElementById('error');
  errorElement.innerText = error;
  errorElement.classList.remove('d-none');
}


function sendWolRequest(apiKey, channelId, secret, macAddress) {
  const ws = new WebSocket(`wss://connect.websocket.in/v3/${encodeURIComponent(channelId)}?apiKey=${encodeURIComponent(apiKey)}`);

  ws.onerror = () => {
    showError(new Error('an error occured while establishing a WebSocket connection'));
    ws.onclose = null;
    ws.close();
  };

  ws.onclose = () => {
    showError(new Error('connection closed before sending request'));
  };

  ws.onopen = () => {
    const id = (Math.random() * 16 ** 4).toString(16);

    const message = JSON.stringify({
      id,
      type: 'client',
      time: /*@__PURE__*/getTime(),
      command: 'wol',
      params: {
        macAddress,
      },
    });

    const signature = /*@__PURE__*/createSignature(message, secret);

    ws.onmessage = event => {
      const data = JSON.parse(String(event.data));

      if (
        !data ||
        typeof data.message !== 'string' ||
        typeof data.signature !== 'string' ||
        /*@__PURE__*/createSignature(data.message, secret) !== data.signature
      ) {
        throw new Error('invalid signature');
      }

      const message = JSON.parse(data.message);
      // skip checking time

      if (message.type !== 'server') {
        return;
      }

      if (message.id !== id) {
        return;
      }

      // TODO: use toast
      if (message.error) {
        alert(`Server responded error: ${message.error}`);
      } else {
        alert('Server responded ok');
      }

      setTimeout(() => {
        ws.onclose = undefined;
        ws.close();
      }, 2000);
    };

    ws.send(JSON.stringify({
      message,
      signature,
    }));
  };
}


function sendEventHandler(event) {
  event.preventDefault();

  const object = /*@__PURE__*/createObjectFromElements();

  location.hash = /*@__PURE__*/createUrlParams(object);

  sendWolRequest(object.api, object.channel, object.secret, object.mac);
}


document.getElementById('wol-form').addEventListener('submit', sendEventHandler);


assignObjectToElements(/*@__PURE__*/parseUrlParams(location.hash));

fetch(`https://ntp-a1.nict.go.jp/cgi-bin/json?${Date.now() / 1000}`)
  .then(res => res.json())
  .then(res => {
    const offset = res.st - (res.it + Date.now() / 1000) / 2;
    document.getElementById('vp-time-offset').value = offset.toFixed(3);
  })
  .catch(error => {
    const warningElement = document.getElementById('warning');
    warningElement.innerText = 'Failed to fetch time offset\n' + error;
    warningElement.classList.remove('d-none');
  });
