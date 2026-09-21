import { IPanelContainer } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
import { SplitContainerState } from './split-container.state';
/**
 * 分割面板容器控制器
 *
 * @author zhanghengfeng
 * @date 2023-08-22 17:08:37
 * @export
 * @class SplitContainerController
 * @extends {PanelItemController<IPanelContainer>}
 */
export declare class SplitContainerController extends PanelItemController<IPanelContainer> {
    /**
     * 分割面板容器状态
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:25
     * @type {SplitContainerState}
     */
    state: SplitContainerState;
    /**
     * 分割面板模式
     *
     * @author zhanghengfeng
     * @date 2023-08-22 17:08:24
     * @type {('horizontal' | 'vertical')}
     */
    splitMode: 'horizontal' | 'vertical';
    /**
     * 默认分割值
     *
     * @author zhanghengfeng
     * @date 2023-08-22 17:08:38
     * @type {(number | string)}
     */
    splitValue: number | string;
    /**
     * 面板隐藏前分割值
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:58
     * @type {(number | string | null)}
     */
    lastSplitValue: number | string | null;
    /**
     * 初始化默认分割值
     *
     * @author zhanghengfeng
     * @date 2023-08-22 17:08:13
     * @param {number} value
     * @param {string} mode
     */
    initSplitValue(value: number, mode: string): void;
    protected onInit(): Promise<void>;
    /**
     * 隐藏面板
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:35
     * @param {('left' | 'right' | 'top' | 'bottom')} position
     */
    hiddenPanel(position: 'left' | 'right' | 'top' | 'bottom'): void;
    /**
     * 显示面板
     *
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:31
     */
    showPanel(): void;
}
