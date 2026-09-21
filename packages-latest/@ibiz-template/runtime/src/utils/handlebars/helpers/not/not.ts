import { isEmpty, isNil } from 'ramda';
import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';

/**
 * 参数不存在或者为空时返回 true
 *
 * @description 判断: 参数为 null、undefined、空字符串、空数组、空对象时返回 true, 用法: {{#not value}}xxx{{else}}yyy{{/not}}、{{not value}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-29 15:12:38
 * @export
 * @class HelperNot
 * @extends {HelperBase}
 */
export class HelperNot extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'not');
  }

  onExecute(
    param: unknown,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    const bol = isEmpty(param) || isNil(param);
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
