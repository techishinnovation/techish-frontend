import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET ?? "";

/**
 * AES-256-CBC encrypts an arbitrary JSON-serializable payload with a random
 * IV, so the raw credentials never appear in the Network tab. Wire format:
 * "<base64 iv>:<base64 ciphertext>" — must match backend/accounts/crypto_utils.py.
 */
export function encryptPayload(data: unknown): string {
  const key = CryptoJS.SHA256(SECRET);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const ivB64 = CryptoJS.enc.Base64.stringify(iv);
  const ctB64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return `${ivB64}:${ctB64}`;
}
