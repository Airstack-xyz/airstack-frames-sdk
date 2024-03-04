export function hexStringToUint8Array(hexstring: string): Uint8Array {
  return new Uint8Array(
    hexstring.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16))
  );
}
