/* eslint-disable no-template-curly-in-string */
import { RuntimeModelError } from '@ibiz-template/core';
import { findFieldById } from '../../../model';
import { getEditorProvider } from '../../../register';
import { ValueOP } from '../../../constant';
import { isHiddenFilter } from './util';
/** 不需要编辑器的OP */
export const ExcludeOPs = [
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.EXISTS,
    ValueOP.NOT_EXISTS,
];
const ScriptValueRegex = /\$\{[^}]*\}/; // 匹配${xxx}格式字符串
/**
 * 搜索栏过滤项控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export class SearchBarFilterController {
    /**
     * 值项
     * @author lxm
     * @date 2024-02-04 06:25:42
     * @readonly
     * @type {(string | undefined)}
     */
    get valueItem() {
        return this.editor ? this.editor.valueItem : undefined;
    }
    constructor(model, appDataEntity, context, params) {
        var _a;
        this.model = model;
        this.appDataEntity = appDataEntity;
        this.context = context;
        this.params = params;
        /**
         * 不需要编辑器
         * @author lxm
         * @date 2024-01-02 11:08:45
         * @type {boolean}
         */
        this.noEditor = false;
        /**
         * 控制器类型
         * @author lxm
         * @date 2024-04-10 01:41:40
         * @type {('ITEMS' | 'SIMPLE_ITEMS' | 'FIELD')}
         */
        this.type = 'FIELD';
        // 设置是否是隐藏
        this.hidden = isHiddenFilter(model);
        // 实体属性
        let field;
        if (model.appDEFieldId) {
            field = findFieldById(this.appDataEntity, model.appDEFieldId);
        }
        this.fieldName = field ? field.codeName.toLowerCase() : model.id;
        this.key = this.fieldName;
        // 属性标题
        this.label = model.caption || (field === null || field === void 0 ? void 0 : field.logicName) || model.id;
        this.valueOP = (_a = model.defsearchMode) === null || _a === void 0 ? void 0 : _a.valueOP;
        // 有操作符的，如果是isnull，isnotnull这种，就是无编辑器
        // 没有操作符的如果没有配置编辑器，就是无编辑器
        this.noEditor = this.valueOP
            ? ExcludeOPs.includes(this.valueOP)
            : !this.model.editor;
    }
    /**
     * 初始化
     * @author lxm
     * @date 2023-10-12 05:47:19
     * @return {*}  {Promise<void>}
     */
    async init() {
        if (!this.noEditor) {
            if (!this.model.editor) {
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.searchBar.missingModel'));
            }
            this.editorProvider = await getEditorProvider(this.model.editor);
            if (this.editorProvider) {
                this.editor = await this.editorProvider.createController(this.model.editor, this);
            }
        }
    }
    /**
     * 计算要递给编辑器的参数
     * @author lxm
     * @date 2024-02-04 06:35:28
     * @param {IFilterNodeField} node
     * @return {*}  {{ value: unknown; data: IData }}
     */
    calcEditorProps(node) {
        const tempData = {};
        let editorValue = node.value;
        if (node.disabled && ScriptValueRegex.test(editorValue)) {
            editorValue = editorValue.replace('${context.srfpersonid}', '当前用户');
            editorValue = editorValue.replace('${context.srforgid}', '当前组织');
        }
        if (this.valueItem) {
            tempData[this.valueItem] = node.valueItem;
        }
        return { value: editorValue, data: tempData };
    }
    /**
     * 编辑器值变更处理
     * @author lxm
     * @date 2024-02-04 06:42:04
     * @param {IFilterNodeField} node
     * @param {unknown} value
     * @param {string} [name]
     */
    onEditorChange(node, value, name) {
        if (this.valueItem && name === this.valueItem) {
            node.valueItem = value;
        }
        else {
            node.value = value;
        }
    }
}
