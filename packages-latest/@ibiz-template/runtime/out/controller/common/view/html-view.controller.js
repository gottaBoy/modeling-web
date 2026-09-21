import { StringUtil } from '@ibiz-template/core';
import { ViewController } from './view.controller';
/**
 * @description 实体html视图
 * @export
 * @class HtmlViewController
 * @extends {ViewController<T, S, E>}
 * @implements {IViewController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export class HtmlViewController extends ViewController {
    initState() {
        const { htmlUrl } = this.model;
        super.initState();
        this.state.htmlUrl = htmlUrl
            ? StringUtil.fill(htmlUrl, this.context, this.params)
            : '';
    }
}
