import { HelperBase } from '../helper-base';

/**
 * 数字绝对值
 *
 * @description 用法 {{abs string }}。效果: 获取数值字符串的绝对值
 * @export
 * @class HelperAbs
 * @extends {HelperBase}
 */
export class HelperAbs extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'abs');
  }

  onExecute(str: string): string {
    if (!str) return '';
    return Math.abs(Number(str)).toString();
  }
}
