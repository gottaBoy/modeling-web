/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
const r = Math.round;
/**
 * @description 把颜色字符串转成RGBA数组
 * @param {string} color 颜色字符串
 * @returns {*}  {number[]}
 */
function toRGBA(color: string): number[] {
  const l = color.length;
  const rgba = [];
  if (color.slice(0, 3).toLowerCase() === 'rgb') {
    const d = color.match(/([\d|.%]{1,3})/g)!;
    rgba[0] = parseInt(d[0], 10);
    rgba[1] = parseInt(d[1], 10);
    rgba[2] = parseInt(d[2], 10);
    rgba[3] = d[3]
      ? d[3].indexOf('%') !== -1
        ? parseInt(d[3], 10) / 100
        : parseFloat(d[3])
      : 1;
  } else {
    let d: number;
    if (l < 6)
      d = parseInt(
        String(color[1]) +
          color[1] +
          color[2] +
          color[2] +
          color[3] +
          color[3] +
          (l > 4 ? String(color[4]) + color[4] : ''),
        16,
      );
    else d = parseInt(color.slice(1), 16);
    rgba[0] = (d >> 16) & 255;
    rgba[1] = (d >> 8) & 255;
    rgba[2] = d & 255;
    rgba[3] =
      l === 9 || l === 5 ? r((((d >> 24) & 255) / 255) * 10000) / 10000 : 1;
  }
  return rgba;
}

/**
 * @description 混合两种颜色，颜色格式支持hex和rgb，如：#46b5d555，#fff，转化结果为rgb(245 245 245 / 80%)
 * @export
 * @param {string} color1 颜色1
 * @param {string} color2 颜色2
 * @param {number} [p=0.5] 颜色1占多少百分比，小数格式
 * @param {('hex' | 'rgb')} [format='hex'] 输出的格式，hex或rgb
 * @returns {*}  {string}
 */
export function colorBlend(
  color1: string,
  color2: string,
  p = 0.5,
  format: 'hex' | 'rgb' = 'hex',
): string {
  color1 = color1.trim();
  color2 = color2.trim();
  const c1 = toRGBA(color1);
  const c2 = toRGBA(color2);
  const result = [
    r((1 - p) * c1[0] + p * c2[0]),
    r((1 - p) * c1[1] + p * c2[1]),
    r((1 - p) * c1[2] + p * c2[2]),
    (1 - p) * c1[3] + p * c2[3],
  ];
  if (format === 'hex') {
    const hex = [
      result[0].toString(16).padStart(2, '0'),
      result[1].toString(16).padStart(2, '0'),
      result[2].toString(16).padStart(2, '0'),
      result[3] === 0
        ? '00'
        : r(result[3] * 255)
            .toString(16)
            .padStart(2, '0'),
    ];
    return `#${hex[0]}${hex[1]}${hex[2]}${hex[3]}`;
  }
  return `rgb(${result[0]} ${result[1]} ${result[2]} / ${result[3]})`;
}
