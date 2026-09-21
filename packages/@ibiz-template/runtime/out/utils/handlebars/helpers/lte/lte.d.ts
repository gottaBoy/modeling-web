import { HelperBase } from '../helper-base';
/**
 * 小于等于
 *
 * @description 判断: word <= word2, 用法 {{#lte word word2}}xxx{{else}}yyy{{/lte}}、{{lte word word2}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 15:12:18
 * @export
 * @class HelperLte
 * @extends {HelperBase}
 */
export declare class HelperLte extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: unknown, param2: unknown, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=lte.d.ts.map