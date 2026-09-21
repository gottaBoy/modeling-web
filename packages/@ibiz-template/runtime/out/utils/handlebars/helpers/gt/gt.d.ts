import { HelperBase } from '../helper-base';
/**
 * 大于
 *
 * @description 判断: word > word2, 用法: {{#gt word word2}}xxx{{else}}yyy{{/gt}}、{{gt word word2}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 15:12:56
 * @export
 * @class HelperGt
 * @extends {HelperBase}
 */
export declare class HelperGt extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: unknown, param2: unknown, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=gt.d.ts.map