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
export class HelperUpperCase extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'upperCase');
  }

  onExecute(param: string): string {
    if (!param) {
      return '';
    }
    return param.toUpperCase();
  }
}
