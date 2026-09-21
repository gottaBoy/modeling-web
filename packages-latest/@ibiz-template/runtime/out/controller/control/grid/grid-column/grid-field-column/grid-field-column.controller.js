/* eslint-disable @typescript-eslint/no-unused-vars */
import { plus, isEmoji, DataTypes, ModelError, base64ToStr, } from '@ibiz-template/core';
import dayjs from 'dayjs';
import { debounce } from 'lodash-es';
import { clone, isNil } from 'ramda';
import { isNilOrEmpty } from 'qx-util';
import { OpenAppViewCommand } from '../../../../../command';
import { getAllUIActionItems, parseUserParams } from '../../../../../model';
import { UIActionUtil } from '../../../../../ui-action';
import { convertNavData, getWFContext } from '../../../../../utils';
import { ValueExUtil, UIActionButtonState, ButtonContainerState, } from '../../../../utils';
import { GridColumnController } from '../../grid/grid-column.controller';
import { getEditorProvider } from '../../../../../register';
/**
 * @description 表格属性列控制器
 * @export
 * @class GridFieldColumnController
 * @extends {GridColumnController<IDEGridFieldColumn>}
 * @implements {IApiGridFieldColumnController}
 */
export class GridFieldColumnController extends GridColumnController {
    constructor() {
        super(...arguments);
        /**
         * 代码表模型
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-05-24 10:55:50
         */
        this.codeList = undefined;
    }
    /**
     * 是否是链接列
     *
     * @author lxm
     * @date 2022-09-28 17:09:15
     * @returns {*}
     */
    get isLinkColumn() {
        return !!this.model.enableLinkView && !!this.model.linkAppViewId;
    }
    /**
     * 是否可触发界面行为
     *
     * @author lxm
     * @date 2022-12-08 14:12:37
     * @readonly
     * @type {boolean}
     */
    get hasAction() {
        return !!this.model.deuiactionId;
    }
    /**
     * 属性列对应值在数据里的属性字段名称
     * @author lxm
     * @date 2023-06-25 09:26:04
     * @readonly
     */
    get fieldName() {
        return this.model.id.toLowerCase();
    }
    /**
     * 单位
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof GridFieldColumnController
     */
    get unitName() {
        return undefined;
    }
    async onInit() {
        await super.onInit();
        // 加载代码表防抖
        this.loadCodeList = debounce(this.loadCodeList, 300, {
            leading: true,
            trailing: false,
        });
        // 默认加载一次代码表
        await this.loadCodeList();
        await this.initColumnFilter();
    }
    /**
     * 处理列过滤
     *
     * @param {unknown} value
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    async handleColumnScreen(value) {
        var _a, _b;
        const filterName = (_b = (_a = this.model.filterEditor) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (filterName) {
            this.grid.state.columnFilter[filterName] = value;
            await this.grid.refresh();
        }
    }
    /**
     * 初始化列过滤
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    async initColumnFilter() {
        const { columnEnableFilter } = this.grid.model;
        const { filterEditor } = this.model;
        if (filterEditor &&
            columnEnableFilter &&
            filterEditor.editorType !== 'HIDDEN') {
            this.filterEditorProvider = await getEditorProvider(filterEditor, this.grid.model);
            if (this.filterEditorProvider) {
                this.filterEditor = await this.filterEditorProvider.createController(filterEditor, this);
            }
        }
    }
    /**
     * 初始化属性列界面行为组按钮状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row) {
        var _a;
        // 属性列界面行为按钮状态
        const { deuiactionGroup } = this.model;
        if (!((_a = deuiactionGroup === null || deuiactionGroup === void 0 ? void 0 : deuiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length))
            return;
        const containerState = new ButtonContainerState();
        const actions = getAllUIActionItems(deuiactionGroup.uiactionGroupDetails);
        actions.forEach(detail => {
            const actionid = detail.uiactionId;
            if (actionid) {
                const buttonState = new UIActionButtonState(detail.id, this.grid.context.srfappid, actionid, detail);
                containerState.addState(detail.id, buttonState);
            }
        });
        row.uiActionGroupStates[this.model.codeName] = containerState;
    }
    /**
     * 行是否可点击（影响列的界面样式）
     *
     * @author lxm
     * @date 2022-12-08 15:12:58
     * @readonly
     */
    clickable(row) {
        const value = row.data[this.fieldName];
        return (this.isLinkColumn || this.hasAction) && value;
    }
    /**
     * 公共参数处理，计算上下文和视图参数
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:44:14
     */
    handlePublicParams(data, context, params) {
        // todo 从userParams里转出导航参数
        const { userParam } = this.model;
        if (!userParam) {
            return { context, params };
        }
        const { navigateContexts, navigateParams } = parseUserParams(userParam);
        let selfContext = {};
        if (navigateContexts && data) {
            selfContext = convertNavData(navigateContexts, data, params, context);
        }
        const _context = Object.assign(context.clone(), selfContext);
        let selfParams = {};
        if (navigateParams && data) {
            selfParams = convertNavData(navigateParams, data, params, context);
        }
        const _params = Object.assign(Object.assign({}, params), selfParams);
        return { context: _context, params: _params };
    }
    /**
     * 打开链接视图
     *
     * @author lxm
     * @date 2022-09-28 18:09:14
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 原生事件
     * @returns {*}  {Promise<void>}
     */
    async openLinkView(row, event) {
        var _a;
        const curValue = row.data[this.fieldName];
        if (!curValue) {
            // 当前值不存在，不继续走打开链接视图逻辑
            return;
        }
        const valueItem = this.model.linkValueItem || 'srfkey';
        const value = row.data[valueItem];
        if (value == null) {
            throw new ModelError(this.model, ibiz.i18n.t('runtime.controller.control.grid.pickedUpData', {
                valueItem,
            }));
        }
        const { linkAppViewId } = this.model;
        if (!linkAppViewId) {
            return;
        }
        const wfContext = getWFContext(row.data);
        const tempContext = Object.assign(this.context.clone(), Object.assign({ srfkey: value }, wfContext));
        const tempParams = clone(this.params);
        const { context: newContext, params: newParams } = this.handlePublicParams(row.data, tempContext, tempParams);
        const result = await ibiz.openView.verify((_a = this.grid.view) === null || _a === void 0 ? void 0 : _a.getTopView(), linkAppViewId, newContext, newParams, { event });
        if (!result) {
            return;
        }
        // 打开视图
        const res = await ibiz.commands.execute(OpenAppViewCommand.TAG, linkAppViewId, newContext, newParams, { event });
        if (res === null || res === void 0 ? void 0 : res.ok) {
            this.grid.load();
        }
    }
    /**
     * 触发表格列附加界面行为
     *
     * @author lxm
     * @date 2022-12-08 15:12:35
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 鼠标事件
     * @returns {*}  {Promise<void>}
     */
    async triggerAction(row, event) {
        const actionId = this.model.deuiactionId;
        const tempContext = this.context.clone();
        const tempParams = clone(this.params);
        // *自定义参数转换额外的上下文和视图参数
        const { userParam } = this.model;
        if (userParam) {
            const { navigateContexts, navigateParams } = parseUserParams(userParam);
            let selfContext = {};
            if (navigateContexts && row.data) {
                selfContext = convertNavData(navigateContexts, row.data, tempParams, tempContext);
            }
            Object.assign(tempContext, selfContext);
            let selfParams = {};
            if (navigateParams && row.data) {
                selfParams = convertNavData(navigateParams, row.data, tempParams, tempContext);
            }
            Object.assign(tempParams, selfParams);
        }
        await UIActionUtil.execAndResolved(actionId, {
            context: tempContext,
            params: tempParams,
            data: [row.data],
            view: this.grid.view,
            ctrl: this.grid,
            event,
        }, this.model.appId);
    }
    /**
     * 加载代码表数据
     *
     * @author lxm
     * @date 2022-09-28 15:09:38
     * @returns {*}
     */
    async loadCodeList() {
        const appCodeListId = this.model.appCodeListId;
        if (!appCodeListId) {
            return;
        }
        const app = ibiz.hub.getApp(this.context.srfappid);
        // 顺便加载代码表模型
        if (!this.codeList) {
            this.codeList = app.codeList.getCodeList(appCodeListId);
        }
        const dataItems = await app.codeList.get(appCodeListId, this.context, this.params);
        this.codeListItems = dataItems;
        return dataItems;
    }
    /**
     * 计算聚合属性列的值
     * 无配置返回undefined
     * @author lxm
     * @date 2023-08-07 04:50:47
     * @param {IData[]} items
     * @return {*}  {(string | undefined)}
     */
    calcFieldAgg(items) {
        const { aggField, aggMode, aggValueFormat, unitName, appCodeListId } = this.model;
        const fieldName = aggField || this.model.id;
        let aggValue;
        // 存在代码表时不计算聚合
        if (appCodeListId) {
            return;
        }
        if (this.grid.model.aggMode === 'ALL') {
            if (!this.grid.state.remoteAggResult) {
                return;
            }
            aggValue = this.grid.state.remoteAggResult[fieldName];
            if (isNil(aggValue))
                aggValue = '';
        }
        else {
            // 无聚合配置的列，返回undefined
            if (isNil(aggMode) || aggMode === 'NONE') {
                return;
            }
            // 排除属性无值的数据,不纳入统计
            items = items.filter(item => !isNil(item[fieldName]));
            if (this.grid.model.aggMode === 'PAGE') {
                switch (aggMode) {
                    case 'SUM':
                        aggValue = items
                            .map(item => item[fieldName])
                            .reduce((a, b) => {
                            const aValue = Number(a) || 0;
                            const bValue = Number(b) || 0;
                            return plus(aValue, bValue);
                        }, 0);
                        break;
                    case 'AVG':
                        aggValue =
                            items
                                .map(item => item[fieldName])
                                .reduce((a, b) => {
                                const aValue = Number(a) || 0;
                                const bValue = Number(b) || 0;
                                return plus(aValue, bValue);
                            }, 0) / items.length;
                        break;
                    case 'MAX':
                        aggValue = Math.max(...items.map(item => item[fieldName]));
                        break;
                    case 'MIN':
                        aggValue = Math.min(...items.map(item => item[fieldName]));
                        break;
                    default:
                        throw new ModelError(this.model, ibiz.i18n.t('runtime.controller.control.grid.noSupportedMode', {
                            aggMode,
                        }));
                }
            }
            else {
                throw new ModelError(this.grid.model, ibiz.i18n.t('runtime.controller.control.grid.aggregateMode', {
                    aggMode: this.grid.model.aggMode,
                }));
            }
        }
        let value = `${aggValue}`;
        // 聚合值格式化
        if (aggValueFormat) {
            try {
                value = ibiz.util.text.format(`${aggValue}`, aggValueFormat);
            }
            catch (error) {
                ibiz.log.error(ibiz.i18n.t('runtime.controller.control.grid.formattingError', {
                    aggValue,
                }));
            }
        }
        // 添加单位
        if (value && unitName) {
            value += unitName;
        }
        return value;
    }
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:18:11
     * @param {unknown} value
     * @return {*}  {string}
     */
    formatValue(value = '') {
        // 根据数据类型增强转换显示文本
        if (this.model.valueType !== 'SIMPLE') {
            return ValueExUtil.toText(this.model, value);
        }
        const strVal = `${isNilOrEmpty(value) ? '' : value}`;
        // 判断是否为表情
        if (isEmoji(strVal)) {
            return base64ToStr(strVal);
        }
        // 根据格式化配置格式化显示
        if (!this.valueFormat) {
            return strVal;
        }
        const isDate = DataTypes.isDate(this.dataType);
        if (isDate) {
            const formatVal = dayjs(strVal).format(this.valueFormat);
            if (formatVal !== 'Invalid Date') {
                return formatVal;
            }
            return strVal;
        }
        return ibiz.util.text.format(strVal, this.valueFormat);
    }
    /**
     * 触发界面行为组点击事件
     *
     * @author zk
     * @date 2023-12-15 11:12:01
     * @param {IUIActionGroupDetail} detail 界面行为组成员
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 鼠标事件
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    async onActionClick(detail, row, event) {
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params: this.params,
            data: [row.data],
            view: this.grid.view,
            ctrl: this.grid,
            event,
        }, detail.appId);
    }
}
