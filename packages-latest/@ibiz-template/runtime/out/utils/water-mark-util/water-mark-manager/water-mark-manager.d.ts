import { IApiGlobalWaterMarkConfig } from '../../../interface';
/**
 * @description 具备防篡改功能的 Canvas 水印工具
 * 功能:
 *  - 可配置文本、字体、颜色、旋转角度、间距、偏移量、zIndex
 *  - 使用 canvas 渲染 -> dataURL 图块，并作为背景平铺
 *  - 支持指定容器元素（默认为 document.body）
 *  - 支持 HiDPI (devicePixelRatio) 适配
 *  - 自动处理窗口大小变化 & DPR 变化
 *  - 防篡改保护：MutationObserver 监听并恢复关键样式
 *  - 可选 Shadow DOM 隔离，增强样式保护
 *  - 提供命令式 API: destroy
 * @export
 * @class WaterMarkManager
 */
export declare class WaterMarkManager {
    /**
     * @description 水印的完整配置选项，包含所有默认值和用户自定义配置
     * @private
     * @type {Required<IApiGlobalWaterMarkConfig>}
     * @memberof WaterMarkManager
     */
    private options;
    /**
     * @description 水印要挂载到的容器元素
     * @private
     * @type {HTMLElement}
     * @memberof WaterMarkManager
     */
    private container;
    /**
     * @description 水印容器的宿主元素
     * @private
     * @type {HTMLElement}
     * @memberof WaterMarkManager
     */
    private hostContainer?;
    /**
     * @description 用于显示水印的覆盖层元素
     * @private
     * @type {HTMLDivElement}
     * @memberof WaterMarkManager
     */
    private overlay;
    /**
     * @description 标记当前实例是否已被销毁
     * @private
     * @memberof WaterMarkManager
     */
    private disposed;
    /**
     * @description 用于隔离水印样式和结构的影子DOM根节点（可选）
     * @private
     * @type {ShadowRoot}
     * @memberof WaterMarkManager
     */
    private shadowRoot?;
    /**
     * @description 监控容器子节点变化的观察者，用于防止水印被移除
     * @private
     * @type {MutationObserver}
     * @memberof WaterMarkManager
     */
    private mutationObserver?;
    /**
     * @description 监控水印宿主元素自身变化的观察者，用于防止水印样式被篡改
     * @private
     * @type {MutationObserver}
     * @memberof WaterMarkManager
     */
    private hostObserver?;
    /**
     * @description 监控隔离水印元素自身变化的观察者，用于防止水印样式被篡改
     * @private
     * @type {MutationObserver}
     * @memberof WaterMarkManager
     */
    private shadowRootObserver?;
    /**
     * @description 监控容器大小变化的观察者，用于在容器尺寸改变时重绘水印
     * @private
     * @type {ResizeObserver}
     * @memberof WaterMarkManager
     */
    private resizeObserver?;
    /**
     * @description 严格模式下用于定时检测水印状态的计时器ID
     * @private
     * @type {number}
     * @memberof WaterMarkManager
     */
    private strictTimer?;
    /**
     * @description 用于清理窗口大小变化事件监听的函数
     * @private
     * @type {() => void}
     * @memberof WaterMarkManager
     */
    private _cleanupResize?;
    constructor(opts: IApiGlobalWaterMarkConfig, container?: HTMLElement);
    /**
     * @description 销毁水印实例，移除DOM元素并清理所有资源和事件监听
     * @returns {void}
     * @memberof WaterMarkManager
     */
    destroy(): void;
    /**
     * @description 水印层初始化，创建DOM结构并应用初始配置
     * @returns {WaterMarkManager} 当前实例，支持链式调用
     * @memberof WaterMarkManager
     */
    private init;
    private getHostStyles;
    private getOverlayStyles;
    /**
     * @description 切换水印的挂载容器并重新初始化水印位置
     * @param {HTMLElement} container 新的容器元素
     * @returns {WaterMarkManager} 当前实例，支持链式调用
     * @memberof WaterMarkManager
     */
    private setContainer;
    /**
     * @description 判断容器是否为根容器（body或html元素）
     * @private
     * @param {HTMLElement} el 要判断的容器元素
     * @returns {boolean} 如果是根容器则返回true，否则返回false
     * @memberof WaterMarkManager
     */
    private isRootContainer;
    /**
     * @description 应用水印瓦片到覆盖层，设置背景图片和大小
     * @private
     * @memberof WaterMarkManager
     */
    private applyTile;
    /**
     * @description 渲染水印瓦片，生成包含水印文本的图片URL和样式尺寸
     * @private
     * @returns {{ url: string; cssSize: [number, number] }} 包含图片URL和CSS尺寸的对象
     * @memberof WaterMarkManager
     */
    private renderTile;
    /**
     * @description 设置水印防篡改的各种观察者，监控DOM变化和尺寸变化
     * @private
     * @param {Element} [host] 水印宿主元素
     * @returns {void}
     * @memberof WaterMarkManager
     */
    private setupObservers;
    /**
     * @description 销毁所有观察者和定时器，清理事件监听
     * @private
     * @memberof WaterMarkManager
     */
    private teardownObservers;
}
//# sourceMappingURL=water-mark-manager.d.ts.map