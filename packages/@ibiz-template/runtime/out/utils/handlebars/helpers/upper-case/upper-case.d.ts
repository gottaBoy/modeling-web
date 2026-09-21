import { HelperBase } from '../helper-base';
/**
 * 字符串转大写
 *
 * @description 用法 {{upperCase word}}，效果: myName => MYNAME
 * @author chitanda
 * @date 2021-12-24 15:12:21
 * @export
 * @class HelperUpCase
 * @extends {HelperBase}
 */
export declare class HelperUpperCase extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: string): string;
}
//# sourceMappingURL=upper-case.d.ts.map