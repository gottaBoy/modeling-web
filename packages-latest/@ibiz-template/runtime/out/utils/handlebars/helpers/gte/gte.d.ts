import { HelperBase } from '../helper-base';
/**
 * 大于等于
 *
 * @description 判断: word >= word2, 用法 {{#gte word word2}}xxx{{else}}yyy{{/gte}}、{{gte word word2}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 15:12:35
 * @export
 * @class HelperGte
 * @extends {HelperBase}
 */
export declare class HelperGte extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: unknown, param2: unknown, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=gte.d.ts.map