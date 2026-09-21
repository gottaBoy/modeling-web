import { EditorController } from '@ibiz-template/runtime';
import { IDatePicker } from '@ibiz/model-core';
/**
 * 选项框列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class DatePickerEditorController extends EditorController<IDatePicker> {
    /**
     * 根据编辑器类型获取格式化
     *
     * @author lxm
     * @date 2022-11-03 16:11:21
     * @protected
     * @returns {*}  {string}
     */
    getFormatByType(editorType: string | undefined): string;
    /**
     * 值格式化
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    get valueFormat(): string | undefined;
}
