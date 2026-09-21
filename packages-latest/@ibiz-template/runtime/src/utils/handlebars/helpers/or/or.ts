import { HelperBase } from '../helper-base';

/**
 * 或者条件
 *
 * @description 判断: word word2 word3 其中任意一个值在判断中为 true, 用法 {{#or word word2 word3}}xxx{{else}}yyy{{/or}}、{{or word word2 word3}} 返回值为 boolean 类型
 * @author chitanda
 * @date 2021-12-29 10:12:00
 * @export
 * @class HelperOr
 * @extends {HelperBase}
 */
export class HelperOr extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'or');
  }

  onExecute(...args: unknown[] | Handlebars.HelperOptions[]): string {
    const options = args[args.length - 1] as Handlebars.HelperOptions;
    args.pop();
    const item = (args as unknown[]).find(itemArg => !!itemArg);
    if (options.fn) {
      const data = options.data?.root || {};
      return item ? options.fn(data) : options.inverse(data);
    }
    return (item as string) || '';
  }
}
