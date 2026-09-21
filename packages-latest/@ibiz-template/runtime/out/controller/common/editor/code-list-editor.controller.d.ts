import { IAppCodeList, ICodeListEditor } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
import { EditorController } from './editor.controller';
/**
 * 代码表类编辑器控制器基类
 *
 * @author lxm
 * @date 2022-09-02 13:09:16
 * @export
 * @class CodeListEditorController
 * @extends {EditorController}
 */
export declare class CodeListEditorController<T extends ICodeListEditor = ICodeListEditor> extends EditorController<T> {
    /**
     * 是否转化为代码项文本
     *
     * @readonly
     * @type {boolean}
     * @memberof CodeListEditorController
     */
    get convertToCodeItemText(): boolean;
    /**
     * 代码表
     *
     * @author zhanghengfeng
     * @date 2024-08-16 18:08:46
     * @type {IAppCodeList}
     */
    appCodeList?: IAppCodeList;
    /**
     * 是否展示全部项
     *
     * @author zhanghengfeng
     * @date 2024-08-16 18:08:24
     * @type {boolean}
     */
    allItems: boolean;
    /**
     * 全部项文本
     *
     * @author zhanghengfeng
     * @date 2024-08-16 18:08:06
     * @type {string}
     */
    itemsText: string;
    /**
     * 全部项的值
     *
     * @author zhanghengfeng
     * @date 2024-08-16 18:08:02
     * @type {string}
     */
    allItemsValue: string;
    protected onInit(): Promise<void>;
    /**
     * 处理代码表全部项
     *
     * @author zhanghengfeng
     * @date 2024-08-16 19:08:11
     * @param {readonly} items
     * @param {*} CodeListItem
     * @param {*} []
     * @return {*}  {readonly}
     */
    handleCodeListAllItems(items: readonly CodeListItem[]): readonly CodeListItem[];
    /**
     * 加载代码表数据
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:46:27
     */
    loadCodeList(data: IData): Promise<readonly CodeListItem[]>;
}
//# sourceMappingURL=code-list-editor.controller.d.ts.map