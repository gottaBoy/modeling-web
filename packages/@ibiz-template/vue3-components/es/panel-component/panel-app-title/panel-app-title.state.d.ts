import { PanelItemState } from '@ibiz-template/runtime';
/**
 * 面板应用标题状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class PanelAppTitleState
 * @extends {PanelItemState}
 */
export declare class PanelAppTitleState extends PanelItemState {
    /**
     * 应用标题
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    caption: string;
    /**
     * 应用标题(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    caption2: string;
    /**
     * 应用子标题
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    subCaption?: string;
    /**
     * 应用子标题(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    subCaption2?: string;
    /**
     * 应用 logo 图片地址
     *
     * @author chitanda
     * @date 2023-07-20 17:07:11
     * @type {string}
     */
    icon: string;
    /**
     * 应用 logo 图片2地址(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:11
     * @type {string}
     */
    icon2: string;
    /**
     * 是否为 svg 图标
     *
     * @author chitanda
     * @date 2023-07-20 17:07:26
     * @type {boolean}
     */
    isSvg: boolean;
}
