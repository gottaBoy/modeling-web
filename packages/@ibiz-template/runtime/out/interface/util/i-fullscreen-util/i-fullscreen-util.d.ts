export interface IFullscreenUtil {
    /**
     * 全屏样式名称
     * @author fzh
     * @date 2024-07-15 19:39:40
     */
    FullscreenClass: string;
    /**
     * 是否是全屏状态
     *
     * @type {boolean}
     * @memberof IFullscreenUtil
     */
    isFullScreen: boolean;
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
//# sourceMappingURL=i-fullscreen-util.d.ts.map