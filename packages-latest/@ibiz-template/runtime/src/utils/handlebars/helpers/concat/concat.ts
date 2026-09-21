import { HelperBase } from '../helper-base';

/**
 * 字符串拼接
 *
 * @description 用法：{{concat string1 string2 string3}} 返回值为 string 类型
 * @author mosher
 * @date 2022-10-12 10:59:10
 * @export
 * @class HelperConcat
 * @extends {HelperBase}
 */
export class HelperConcat extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'concat');
  }

  onExecute(...args: string[]): string {
    args.pop();
    return args.join('');
  }
}
