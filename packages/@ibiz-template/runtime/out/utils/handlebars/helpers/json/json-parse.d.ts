import { HelperBase } from '../helper-base';
/**
 * json字符创 转 对象
 *
 * @description 用法 {{json xxx 2}}，支持第二个参数传递格式化。效果: 将 json 对象转为 json 字符串
 * @author chitanda
 * @date 2021-12-24 15:12:59
 * @export
 * @class HelperJson
 * @extends {HelperBase}
 */
export declare class HelperJsonParse extends HelperBase {
    constructor(hbs: IData);
    onExecute(obj: string): string;
}
//# sourceMappingURL=json-parse.d.ts.map