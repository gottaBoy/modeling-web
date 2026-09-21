/**
 * @description 根据行政等级获取行政等级对应的数字，province为1
 * @export
 * @param {string} areaLevel
 * @returns {*}  {number}
 */
export declare function getAreaLevelNum(areaLevel: string): number;
/**
 * @description 根据行政编码计算行政等级，仅支持6位行政编码，国家级返回空串
 * @export
 * @param {string} code
 * @returns {*}  {number}
 */
export declare const getAreaLevelByCode: (code: string) => string;
//# sourceMappingURL=map-util.d.ts.map