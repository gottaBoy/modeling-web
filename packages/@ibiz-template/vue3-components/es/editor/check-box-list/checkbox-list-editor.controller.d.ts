import { CodeListEditorController } from '@ibiz-template/runtime';
import { IAppCodeList, ICheckBoxList } from '@ibiz/model-core';
/**
 * 选项框列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class CheckBoxListEditorController extends CodeListEditorController<ICheckBoxList> {
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    codeList: IAppCodeList | undefined;
    /**
     * 多选一行展示几个
     * @author fangZhiHao
     * @date 2024-07-17 10:07:40
     * @type {(number | undefined)}
     */
    rowNumber: number | undefined;
    protected onInit(): Promise<void>;
}
