import { RuntimeModelError } from '@ibiz-template/core';
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
export class CodeListEditorController extends EditorController {
    constructor() {
        super(...arguments);
        /**
         * 是否展示全部项
         *
         * @author zhanghengfeng
         * @date 2024-08-16 18:08:24
         * @type {boolean}
         */
        this.allItems = false;
        /**
         * 全部项文本
         *
         * @author zhanghengfeng
         * @date 2024-08-16 18:08:06
         * @type {string}
         */
        this.itemsText = '';
        /**
         * 全部项的值
         *
         * @author zhanghengfeng
         * @date 2024-08-16 18:08:02
         * @type {string}
         */
        this.allItemsValue = '$all';
    }
    /**
     * 是否转化为代码项文本
     *
     * @readonly
     * @type {boolean}
     * @memberof CodeListEditorController
     */
    get convertToCodeItemText() {
        return !!this.parent.model.convertToCodeItemText;
    }
    async onInit() {
        var _a, _b, _c;
        await super.onInit();
        this.itemsText = ibiz.i18n.t('runtime.controller.common.editor.itemsText');
        if (this.model.appCodeListId) {
            const app = ibiz.hub.getApp(this.context.srfappid);
            this.appCodeList = app.codeList.getCodeList(this.model.appCodeListId);
            if ((_a = this.appCodeList) === null || _a === void 0 ? void 0 : _a.allText) {
                this.itemsText = this.appCodeList.allText;
            }
            if ((_c = (_b = this.appCodeList) === null || _b === void 0 ? void 0 : _b.allTextLanguageRes) === null || _c === void 0 ? void 0 : _c.lanResTag) {
                this.itemsText = ibiz.i18n.t(this.appCodeList.allTextLanguageRes.lanResTag, this.itemsText);
            }
        }
        if (this.editorParams) {
            if (this.editorParams.allItems) {
                this.allItems = this.toBoolean(this.editorParams.allItems);
            }
            if (this.editorParams.itemsText) {
                this.itemsText = this.editorParams.itemsText;
            }
        }
    }
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
    handleCodeListAllItems(items) {
        if (!this.allItems) {
            return items;
        }
        const item = {
            id: this.allItemsValue,
            text: this.itemsText,
            value: this.allItemsValue,
        };
        return [item, ...items];
    }
    /**
     * 加载代码表数据
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:46:27
     */
    async loadCodeList(data) {
        const { context, params } = this.handlePublicParams(data, this.context, this.params);
        if (this.model.appCodeListId) {
            const app = await ibiz.hub.getApp(this.context.srfappid);
            let dataItems = [];
            dataItems = await app.codeList.get(this.model.appCodeListId, context, params);
            return dataItems;
        }
        if (this.editorParams.enumOptions)
            return this.editorParams.enumOptions;
        throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.editor.editorNoConfigured', {
            editorType: this.model.editorType,
        }));
    }
}
