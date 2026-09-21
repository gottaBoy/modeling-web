import { IPanelItemState, ILayoutState, IPanelItemClass } from '../../../../interface';
/**
 * 面板成员状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:35
 * @export
 * @class PanelItemState
 */
export declare class PanelItemState implements IPanelItemState {
    protected parent?: PanelItemState | undefined;
    visible: boolean;
    disabled: boolean;
    keepAlive: boolean;
    layout: ILayoutState;
    class: IPanelItemClass;
    /**
     * 是否必填
     *
     * @author chitanda
     * @date 2023-01-04 10:01:27
     * @type {boolean}
     */
    required: boolean;
    /**
     * 是否只读
     *
     * @author tony001
     * @date 2024-04-16 16:04:49
     * @type {boolean}
     */
    readonly: boolean;
    /**
     * 上下文
     *
     * @author zhanghengfeng
     * @date 2024-03-29 19:03:07
     * @type {IContext}
     */
    context?: IContext;
    constructor(parent?: PanelItemState | undefined);
}
//# sourceMappingURL=panel-item.state.d.ts.map