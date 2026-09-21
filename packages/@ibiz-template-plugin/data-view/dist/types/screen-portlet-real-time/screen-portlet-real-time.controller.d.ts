import { IDBToolbarPortlet } from '@ibiz/model-core';
import { PortletPartController } from '@ibiz-template/runtime';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopController
 * @extends {EditorController<ISpan>}
 */
export declare class ScreenPortletRealTimeController extends PortletPartController<IDBToolbarPortlet> {
    /**
     * 左侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    leftTime: string;
    /**
     *  星期
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:17
     * @type {string}
     */
    showWeek: boolean;
    /**
     * 右侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    rightTime: string;
    /**
     * 初始化
     */
    protected onInit(): Promise<void>;
}
