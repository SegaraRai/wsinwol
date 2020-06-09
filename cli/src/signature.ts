import { createHmac } from 'crypto';


const hashAlgorithm = 'sha256';


export function createSignature(message: string, secret: string) {
  return /*@__PURE__*/createHmac(hashAlgorithm, secret).update(message).digest('hex').toLowerCase();
}


export function isValidSignature(message: string, signature: string, secret: string) {
  return /*@__PURE__*/createSignature(message, secret) === signature;
}
