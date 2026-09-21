import { kebabCase } from 'lodash-es';
import { HelperBase } from '../helper-base';

/**
 * 驼峰命名法转为横线命名法
 *
 * @description 用法 {{spinalCase word}}，效果: myName => my-name
 * @author chitanda
 * @date 2021-12-24 15:12:37
 * @export
 * @class HelperSpinalCase
 * @extends {HelperBase}
 */
export class HelperSpinalCase extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'spinalCase');
  }

  onExecute(param: string): string {
    if (!param) {
      return '';
    }
    return kebabCase(param);
  }
}
