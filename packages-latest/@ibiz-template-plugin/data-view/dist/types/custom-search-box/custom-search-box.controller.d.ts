import { PortletPartController } from '@ibiz-template/runtime';
import { IDBToolbarPortlet } from '@ibiz/model-core';

/**
 * 直接内容(活动)编辑器控制器
 *
 * @export
 * @class RawActivityEditorController
 * @extends {EditorController}
 */
export declare class CustomSearchBoxEditorController extends PortletPartController<IDBToolbarPortlet> {
    /**
     * 占位提示
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    placeholder: string;
    /**
     * 初始化
     */
    protected onInit(): Promise<void>;
}
