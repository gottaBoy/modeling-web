import { upperFirst } from 'lodash-es';
import { HelperBase } from '../helper-base';

/**
 * 首字母转大写
 *
 * @description 用法 {{pascalCase word}}，效果: myName => MyName
 * @author chitanda
 * @date 2021-12-24 15:12:13
 * @export
 * @class HelperPascalCase
 * @extends {HelperBase}
 */
export class HelperPascalCase extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'pascalCase');
  }

  onExecute(param: string): string {
    if (!param) {
      return '';
    }
    return upperFirst(param);
  }
}
