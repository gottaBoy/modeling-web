import { eq } from 'lodash-es';
import { HelperUtil } from '../../utils';
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
export class HelperEq extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'eq');
  }

  onExecute(
    param: unknown,
    param2: unknown,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    const bol = eq(param, param2);
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
