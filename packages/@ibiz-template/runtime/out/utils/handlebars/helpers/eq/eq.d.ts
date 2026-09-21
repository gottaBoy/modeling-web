import { HelperBase } from '../helper-base';
/**
 * 等于
 *
 * @description 判断: word === word2, 用法: {{#eq word word2}}xxx{{else}}yyy{{/eq}}、{{eq word 'xxx'}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 14:12:25
 * @export
 * @class HelperEq
 * @extends {HelperBase}
 */
export declare class HelperEq extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: unknown, param2: unknown, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=eq.d.ts.map