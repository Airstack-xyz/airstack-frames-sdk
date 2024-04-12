export function bytesFromBase64(b64: string) {
  // Assuming 'b64' is a proper base64 string, no '0x' prefix should be considered.
  return Uint8Array.from(Buffer.from(b64?.slice(2), "base64"));
}
