import { CodeListEditorController } from '@ibiz-template/runtime';
import { IDropDownList } from '@ibiz/model-core';
/**
 * 下拉列表框编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class DropDownListEditorController extends CodeListEditorController<IDropDownList> {
    /**
     * 是否多选
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    multiple: boolean;
    /**
     * 是否可选可填
     * @return {*}
     * @author: fangzhihao
     * @Date: 2024-03-12 14:33:14
     */
    forceSelection: boolean;
    /**
     * 默认选中第一个
     *
     * @memberof CustomTagSelectController
     */
    defaultFirstOption: boolean;
    /**
     * 预置项空白项名称
     *
     * @memberof DropDownListEditorController
     */
    blankItemName: string;
    protected onInit(): Promise<void>;
}
