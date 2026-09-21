import { IAppDEHtmlView } from '@ibiz/model-core';
import { IHtmlViewState, IViewController, IViewEvent } from '../../../interface';
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
export declare class HtmlViewController<T extends IAppDEHtmlView = IAppDEHtmlView, S extends IHtmlViewState = IHtmlViewState, E extends IViewEvent = IViewEvent> extends ViewController<T, S, E> implements IViewController<T, S, E> {
    protected initState(): void;
}
//# sourceMappingURL=html-view.controller.d.ts.map