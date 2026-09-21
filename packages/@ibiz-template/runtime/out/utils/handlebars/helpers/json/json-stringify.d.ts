import { HelperBase } from '../helper-base';
/**
 * json 转 string
 *
 * @description 用法 {{json xxx 2}}，支持第二个参数传递格式化。效果: 将 json 对象转为 json 字符串
 * @author chitanda
 * @date 2021-12-24 15:12:59
 * @export
 * @class HelperJsonStringify
 * @extends {HelperBase}
 */
export declare class HelperJsonStringify extends HelperBase {
    constructor(hbs: IData);
    onExecute(obj: Record<string, unknown> | unknown[], space: number): string;
}
//# sourceMappingURL=json-stringify.d.ts.map