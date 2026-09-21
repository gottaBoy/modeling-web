import { HelperBase } from '../helper-base';
/**
 * 字符串转换小写
 *
 * @description 用法 {{lowerCase word}}, 效果: MyName => myname
 * @author chitanda
 * @date 2021-12-24 15:12:35
 * @export
 * @class HelperLowerCase
 * @extends {HelperBase}
 */
export class HelperLowerCase extends HelperBase {
    constructor(hbs) {
        super(hbs, 'lowerCase');
    }
    onExecute(param) {
        if (!param) {
            return '';
        }
        return param.toLowerCase();
    }
}
