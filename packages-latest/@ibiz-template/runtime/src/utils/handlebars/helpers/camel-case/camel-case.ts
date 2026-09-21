import { camelCase } from 'lodash-es';
import { HelperBase } from '../helper-base';

/**
 * 转驼峰
 *
 * @description 用法 {{camelCase xxx}}，效果: this-is-my-name => thisIsMyName
 * @author chitanda
 * @date 2021-12-24 15:12:59
 * @export
 * @class HelperCamelCase
 * @extends {HelperBase}
 */
export class HelperCamelCase extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'camelCase');
  }

  onExecute(param: string): string {
    if (!param) {
      return '';
    }
    return camelCase(param);
  }
}
