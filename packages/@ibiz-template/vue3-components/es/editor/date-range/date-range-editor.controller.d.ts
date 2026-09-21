import { EditorController } from '@ibiz-template/runtime';
import { IDateRange } from '@ibiz/model-core';
/**
 * 时间范围编辑器控制器
 *
 * @export
 * @class DateRangeEditorController
 * @extends {EditorController}
 */
export declare class DateRangeEditorController extends EditorController<IDateRange> {
    /**
     * 日期选择弹框内选中的时间值
     *
     * @author ljx
     * @date 2024-03-28 16:11:21
     * @public
     * @returns {*}  {string}
     */
    dateRange: IData;
    /**
     * 根据编辑器类型获取格式化
     *
     * @author lxm
     * @date 2022-11-03 16:11:21
     * @public
     * @returns {*}  {string}
     */
    getFormatByType(): string;
    /**
     * 值格式化
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    get valueFormat(): string | undefined;
}
