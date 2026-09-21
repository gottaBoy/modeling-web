import { PanelItemState } from '@ibiz-template/runtime';
/**
 * 分割面板容器状态
 *
 * @author zhanghengfeng
 * @date 2023-10-08 17:10:22
 * @export
 * @class SplitContainerState
 * @extends {PanelItemState}
 */
export declare class SplitContainerState extends PanelItemState {
    /**
     * 分割值
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:28
     * @type {(number | string)}
     */
    splitValue: number | string;
    /**
     * 是否隐藏拖拽触发器
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:44
     * @type {boolean}
     */
    isHiddenTrigger: boolean;
}
