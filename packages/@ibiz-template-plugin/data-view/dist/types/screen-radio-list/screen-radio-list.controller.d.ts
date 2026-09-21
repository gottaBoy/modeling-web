import { CodeListEditorController } from '@ibiz-template/runtime';
import { IRadioButtonList } from '@ibiz/model-core';

/**
 * 单选项列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class ScreenRadioListEditorController extends CodeListEditorController<IRadioButtonList> {
    /**
     * 单选一行展示几个
     * @author fangZhiHao
     * @date 2024-07-17 10:07:40
     * @type {(number | undefined)}
     */
    rowNumber: number | undefined;
    /**
     * 是否开启循环
     *
     * @author fangZhiHao
     * @date 2024-08-08 14:08:13
     * @type {boolean}
     */
    enablecirculate: boolean;
    /**
     * 循环间隔
     *
     * @author fangZhiHao
     * @date 2024-08-08 14:08:13
     * @type {boolean}
     */
    intervaltime: number;
    protected onInit(): Promise<void>;
}
