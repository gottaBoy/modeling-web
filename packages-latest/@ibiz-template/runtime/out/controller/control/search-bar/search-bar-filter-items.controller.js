/* eslint-disable no-template-curly-in-string */
import { RuntimeError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { SearchBarFilterController } from './search-bar-filter.controller';
const SubFieldRegex = /^N_(.\w+)_(.\w+)$/; // N_USER_ID_EQ格式字符串中的USER_ID和EQ
/**
 * 搜索栏过滤项ITEMS控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export class SearchBarFilterItemsController extends SearchBarFilterController {
    constructor(filterModels, appDataEntity, context, params) {
        super(filterModels[0], appDataEntity, context, params);
        this.filterModels = filterModels;
        /**
         * 所有可以配置的子属性集合
         * @author lxm
         * @date 2024-03-14 04:20:10
         * @type {Array<FieldInfo>}
         */
        this.allFields = [];
        /**
         * 子编辑项控制器
         * @author lxm
         * @date 2024-03-14 04:53:26
         * @protected
         * @type {Map<string, SearchBarFilterController>}
         */
        this.subFilterCMap = new Map();
        this.type = 'ITEMS';
    }
    /**
     * 计算标识
     * @author lxm
     * @date 2024-03-14 05:06:14
     * @protected
     * @param {string} field
     * @param {string} op
     * @return {*}  {string}
     */
    calcKey(field, op) {
        return `${field.toUpperCase()}_${op.toUpperCase()}`;
    }
    /**
     * 初始化子实体
     * @author lxm
     * @date 2024-03-14 04:43:04
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initMinorAppDE() {
        var _a;
        const targetField = this.filterModels[0].appDEFieldId;
        let minorDEId = '';
        (_a = this.appDataEntity.appDEMethodDTOs) === null || _a === void 0 ? void 0 : _a.find(item => {
            var _a;
            const field = (_a = item.appDEMethodDTOFields) === null || _a === void 0 ? void 0 : _a.find(x => {
                return x.appDEFieldId === targetField;
            });
            if (field) {
                minorDEId = field.refAppDataEntityId;
                return true;
            }
            return false;
        });
        if (!minorDEId) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.searchBar.noFoundEntity', {
                targetField,
            }));
        }
        this.minorAppDE = await ibiz.hub.getAppDataEntity(minorDEId, this.context.srfappid);
    }
    /**
     * 初始化子实体目标属性相关信息
     * @author lxm
     * @date 2024-03-14 04:42:32
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initAllFields() {
        var _a;
        const fieldMap = new Map();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.filterModels.forEach(item => {
            var _a;
            const subStr = (_a = item.defsearchMode.codeName) === null || _a === void 0 ? void 0 : _a.split('__')[1];
            const matches = subStr.match(SubFieldRegex);
            const subField = matches[1];
            const subOP = matches[2];
            // 修改子项的模型,创建控制器
            const cloneItem = clone(item);
            cloneItem.defsearchMode.valueOP = subOP;
            cloneItem.id = subField;
            const filterC = new SearchBarFilterController(cloneItem, this.appDataEntity, this.context, this.params);
            this.subFilterCMap.set(this.calcKey(subField, subOP), filterC);
            // 隐藏的直接不设置
            if (filterC.hidden) {
                return;
            }
            if (!fieldMap.has(subField)) {
                fieldMap.set(subField, {
                    name: subField,
                    label: '',
                    valueOPs: [],
                    fieldName: subField,
                });
            }
            fieldMap.get(subField).valueOPs.push(subOP);
        });
        (_a = this.minorAppDE.appDEFields) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            const codeName = item.codeName.toUpperCase();
            if (fieldMap.has(codeName)) {
                fieldMap.get(codeName).label = item.logicName;
            }
        });
        this.allFields = Array.from(fieldMap.values());
        // 初始化子过滤项控制器
        await Promise.all(Array.from(this.subFilterCMap.values()).map(item => item.init()));
    }
    async init() {
        await this.initMinorAppDE();
        await this.initAllFields();
        this.hidden = Array.from(this.subFilterCMap.values()).every(item => item.hidden);
    }
    /**
     * 获取子搜索栏控制器
     * @author lxm
     * @date 2024-03-15 02:51:02
     * @param {string} field
     * @param {string} op
     * @return {*}  {SearchBarFilterController}
     */
    getSubFilterController(field, op) {
        return this.subFilterCMap.get(this.calcKey(field, op));
    }
}
