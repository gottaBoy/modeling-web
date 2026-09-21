/**
 * @description 全屏工具类
 * @export
 * @interface IApiFullscreenUtil
 */
export interface IApiFullscreenUtil {
    /**
     * @description 将指定元素切换为全屏显示
     * @param {HTMLDivElement} div 元素
     * @param {{ class?: string }} [data] 全屏配置，class: 全屏CSS类名
     * @memberof IApiFullscreenUtil
     */
    openElementFullscreen(div: HTMLDivElement, data?: {
        class?: string;
    }): void;
    /**
     * @description 退出当前全屏状态
     * @memberof IApiFullscreenUtil
     */
    closeElementFullscreen(): void;
}
//# sourceMappingURL=i-api-fullscreen-util.d.ts.map