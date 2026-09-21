import { ListController } from '@ibiz-template/runtime';

export declare class TaggedWallController extends ListController {
    /**
     *   字体大小是否为随机
     *
     * @author fangZhiHao
     * @date 2024-08-22 15:08:22
     * @type {boolean}
     */
    enableFontSizeRandom: boolean;
    /**
     *  字体最大字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:47
     * @type {number}
     */
    maxFontSize: number;
    /**
     *  字体最小字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:06
     * @type {number}
     */
    minFontSize: number;
    /**
     *  默认字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:51
     * @type {number}
     */
    defaultFontSize: number;
    /**
     *  自定义字体颜色组
     *
     * @author fangZhiHao
     * @date 2024-08-26 10:08:45
     * @type {string[]}
     */
    customColorGroup: string[];
    protected onCreated(): Promise<void>;
}
