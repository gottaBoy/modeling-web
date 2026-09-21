import { eq } from 'lodash-es';
import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';

/**
 * 不等于
 *
 * @description 判断: word !== word2, 用法 {{#neq word 'xxx'}}xxx{{else}}yyy{{/neq}}、{{neq word 'xxx'}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-24 15:12:21
 * @export
 * @class HelperNeq
 * @extends {HelperBase}
 */
export class HelperNeq extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'neq');
  }

  onExecute(
    param: unknown,
    param2: unknown,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    const bol = !eq(param, param2);
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
