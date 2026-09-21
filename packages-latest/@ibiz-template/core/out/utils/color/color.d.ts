/**
 * @description 混合两种颜色，颜色格式支持hex和rgb，如：#46b5d555，#fff，转化结果为rgb(245 245 245 / 80%)
 * @export
 * @param {string} color1 颜色1
 * @param {string} color2 颜色2
 * @param {number} [p=0.5] 颜色1占多少百分比，小数格式
 * @param {('hex' | 'rgb')} [format='hex'] 输出的格式，hex或rgb
 * @returns {*}  {string}
 */
export declare function colorBlend(color1: string, color2: string, p?: number, format?: 'hex' | 'rgb'): string;
//# sourceMappingURL=color.d.ts.map