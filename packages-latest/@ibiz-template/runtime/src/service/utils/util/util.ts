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
export function fieldValueToBoolean(value: unknown): boolean {
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
  } else {
    return !!value;
  }
}

/**
 * 将输入的字符串转化为对象
 * @param input 输入字符串，如：DELETE:0,UPDATE:1
 * @returns {"DELETE":0,"UPDATE":1}
 */
export function convertToObject(input: string | undefined): {
  [key: string]: number;
} {
  const result: { [key: string]: number } = {};
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
export function convertArrayToListMap(arr: IData[]): IData {
  const result: IData = {};
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
export function convertListMapToArray(obj: IData): IData[] {
  const result: IData[] = [];
  Object.keys(obj).forEach(key => {
    const temp = obj[key];
    temp.srflistmapfield = key;
    result.push(temp);
  });
  return result;
}

/**
 * @description 获取没有预置字段的上下文
 * @export
 * @param {IContext} context
 * @returns {*}  {IData}
 */
export function getTempContext(context: IContext): IData {
  const result: IData = {};
  // 预置上下文字段
  const presetContext: string[] = [
    'srfappid',
    'srfsimple',
    'srfviewid',
    'srfrunmode',
    'srfreadonly',
    'srfnavctrlid',
    'srfsessionid',
    'srfnavlogicid',
  ];
  Object.keys(context).forEach(key => {
    if (!presetContext.includes(key)) {
      result[key] = context[key];
    }
  });
  return result;
}
