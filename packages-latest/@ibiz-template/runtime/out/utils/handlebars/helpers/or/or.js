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
    constructor(hbs) {
        super(hbs, 'or');
    }
    onExecute(...args) {
        var _a;
        const options = args[args.length - 1];
        args.pop();
        const item = args.find(itemArg => !!itemArg);
        if (options.fn) {
            const data = ((_a = options.data) === null || _a === void 0 ? void 0 : _a.root) || {};
            return item ? options.fn(data) : options.inverse(data);
        }
        return item || '';
    }
}
