import { lt } from 'lodash-es';
import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';
/**
 * 小于
 *
 * @description 判断: word < word2, 用法 {{#lt word word2}}xxx{{else}}yyy{{/lt}}、{{lt word word2}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 15:12:53
 * @export
 * @class HelperLt
 * @extends {HelperBase}
 */
export class HelperLt extends HelperBase {
    constructor(hbs) {
        super(hbs, 'lt');
    }
    onExecute(param, param2, options) {
        const bol = lt(param, param2);
        return HelperUtil.handleJudgmentExecute(this, bol, options);
    }
}
