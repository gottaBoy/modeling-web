function rotate(value: number, bits: number): number {
  return (value << bits) | (value >>> (32 - bits));
}

function add(...values: number[]): number {
  return values.reduce((sum, value) => (sum + value) | 0, 0);
}

function word(value: number): string {
  return (value >>> 0).toString(16).padStart(8, '0');
}

export function md5(value: unknown): string {
  const input = unescape(encodeURIComponent(String(value)));
  const bytes = Array.from(input, character => character.charCodeAt(0));
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let index = 0; index < 8; index += 1) {
    bytes.push((bitLength / 2 ** (8 * index)) & 0xff);
  }

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;
  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const constants = Array.from(
    { length: 64 },
    (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32),
  );

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const block = Array.from({ length: 16 }, (_, index) => {
      const position = offset + index * 4;
      return bytes[position] |
        (bytes[position + 1] << 8) |
        (bytes[position + 2] << 16) |
        (bytes[position + 3] << 24);
    });
    let aa = a;
    let bb = b;
    let cc = c;
    let dd = d;
    for (let index = 0; index < 64; index += 1) {
      let functionValue: number;
      let blockIndex: number;
      if (index < 16) {
        functionValue = (bb & cc) | (~bb & dd);
        blockIndex = index;
      } else if (index < 32) {
        functionValue = (bb & dd) | (cc & ~dd);
        blockIndex = (5 * index + 1) % 16;
      } else if (index < 48) {
        functionValue = bb ^ cc ^ dd;
        blockIndex = (3 * index + 5) % 16;
      } else {
        functionValue = cc ^ (bb | ~dd);
        blockIndex = (7 * index) % 16;
      }
      const next = add(
        aa,
        functionValue,
        constants[index],
        block[blockIndex],
      );
      aa = dd;
      dd = cc;
      cc = bb;
      bb = add(bb, rotate(next, shifts[index]));
    }
    a = add(a, aa);
    b = add(b, bb);
    c = add(c, cc);
    d = add(d, dd);
  }

  const littleEndian = (value: number): string =>
    word(value).match(/../g)!.reverse().join('');
  return `${littleEndian(a)}${littleEndian(b)}${littleEndian(c)}${littleEndian(d)}`;
}

export default md5;
