/**
 * 全屏全局工具类
 *
 * @export
 * @class FullscreenUtil
 */
export declare class FullscreenUtil {
    /**
     * Creates an instance of FullscreenUtil.
     * @memberof FullscreenUtil
     */
    constructor();
    /**
     *是否全屏状态
     *
     * @readonly
     * @memberof FullscreenUtil
     */
    get isFullScreen(): boolean;
    /**
     * 全屏样式
     * @author fzh
     * @date 2024-07-15 19:39:40
     */
    FullscreenClass: string;
    /**
     * 指定元素全屏
     * @author fzh
     * @date 2024-07-09 19:39:40
     */
    openElementFullscreen(div: HTMLDivElement, data?: IData): void;
    /**
     * 页面退出全屏
     * @author fzh
     * @date 2024-07-09 19:39:40
     */
    closeElementFullscreen(): void;
}
