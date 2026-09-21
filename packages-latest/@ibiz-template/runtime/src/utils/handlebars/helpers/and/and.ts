import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';

/**
 * 并且条件模式
 *
 * @description 判断: word wor2 word3 必须在判断中必须全部为 true, 用法: {{#and word word2 word3}}xxx{{else}}yyy{{/and}}、{{and word word2 word3}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-29 14:12:10
 * @export
 * @class HelperAnd
 * @extends {HelperBase}
 */
export class HelperAnd extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'and');
  }

  onExecute(...args: unknown[] | Handlebars.HelperOptions[]): string | boolean {
    const options = args[args.length - 1] as Handlebars.HelperOptions;
    args.pop();
    const arr = (args as unknown[]).filter(item => !!item);
    const bol = arr.length === args.length;
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
