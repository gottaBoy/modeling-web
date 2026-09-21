/**
 * 把实体属性的值转换成布尔值
 * 以下值会转成true,其他都为false
 * - 字符串：'1'，'true',
 * - 数字：1
 * - 布尔值：true
 * @author lxm
 * @date 2023-12-07 05:07:28
 * @export
 * @param {unknown} value
 * @return {*}  {boolean}
 */
export function fieldValueToBoolean(value) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value > 0;
    }
    if (typeof value === 'string') {
        switch (value) {
            case 'true':
                return true;
            case 'false':
                return false;
            default: {
                const num = Number(value);
                return Number.isNaN(num) ? !!value : num > 0;
            }
        }
    }
    else {
        return !!value;
    }
}
/**
 * 将输入的字符串转化为对象
 * @param input 输入字符串，如：DELETE:0,UPDATE:1
 * @returns {"DELETE":0,"UPDATE":1}
 */
export function convertToObject(input) {
    const result = {};
    if (!input) {
        return result;
    }
    const pairs = input.split(',');
    if (pairs && pairs.length > 0) {
        pairs.forEach(pair => {
            const [key, value] = pair.split(':');
            result[key] = parseInt(value, 10);
        });
    }
    return result;
}
/**
 * 转换数组成ListMap
 *
 * @param {IData[]} arr
 * @return {*} listMap
 */
export function convertArrayToListMap(arr) {
    const result = {};
    arr.forEach(obj => {
        result[obj.srflistmapfield] = obj;
        delete obj.srflistmapfield;
    });
    return result;
}
/**
 * 转换ListMap成数组
 *
 * @param {listMap} obj
 * @return {*} IData[]
 */
export function convertListMapToArray(obj) {
    const result = [];
    Object.keys(obj).forEach(key => {
        const temp = obj[key];
        temp.srflistmapfield = key;
        result.push(temp);
    });
    return result;
}
