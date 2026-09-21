import { lte } from 'lodash-es';
import { HelperUtil } from '../../utils';
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
export class HelperLte extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'lte');
  }

  onExecute(
    param: unknown,
    param2: unknown,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    const bol = lte(param, param2);
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
