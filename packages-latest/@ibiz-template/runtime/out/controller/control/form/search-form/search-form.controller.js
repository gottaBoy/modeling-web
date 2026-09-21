import { RuntimeError } from '@ibiz-template/core';
import { FormNotifyState } from '../../../constant';
import { FormController } from '../form/form.controller';
import { SearchFormService } from './search-form.service';
import { ConfigService, ControlVO } from '../../../../service';
import { paramsToSearchconds } from '../../../../utils';
/**
 * 搜索表单控制器
 *
 * @author lxm
 * @date 2023-05-15 09:33:27
 * @export
 * @class SearchFormController
 * @extends {FormController<IDESearchForm>}
 * @implements {ISearchFormController}
 */
export class SearchFormController extends FormController {
    constructor() {
        super(...arguments);
        /**
         * 表单旧数据（simple模式使用）
         *
         * @author tony001
         * @date 2025-02-14 17:02:04
         * @protected
         * @type {IData}
         */
        this.oldData = new ControlVO();
    }
    /**
     * @description 搜索过滤参数转换模式
     * @readonly
     * @type {('default' | 'searchconds')}
     * @memberof SearchFormController
     */
    get convertparammode() {
        if (this.controlParams.convertparammode) {
            return this.controlParams.convertparammode;
        }
        return ibiz.config.searchform.convertParamMode;
    }
    /**
     * @description 重置搜索模式，default：默认模式，清空搜索参数并搜索；clearonly：仅清空搜索参数
     * @readonly
     * @type {('default' | 'clearonly')}
     * @memberof SearchFormController
     */
    get resetSearchMode() {
        if (this.controlParams.resetsearchmode) {
            return this.controlParams.resetsearchmode;
        }
        return ibiz.config.searchform.resetSearchMode;
    }
    initState() {
        super.initState();
        this.state.storedFilters = [];
        this.state.enableStoredFilters = true;
    }
    async onCreated() {
        var _a, _b;
        await super.onCreated();
        const enableStoredFilters = this.controlParams.enablestoredfilters ||
            ibiz.config.searchform.enableStoredFilters;
        if (enableStoredFilters === false || enableStoredFilters === 'false') {
            this.state.enableStoredFilters = false;
        }
        this.config = new ConfigService(this.model.appId, 'dynafilter', `searchform_${((_a = this.model.appDataEntityId) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'app'}_${(_b = this.model.codeName) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`);
        this.preprocessLayoutPanel();
        // 实例部件服务
        this.service = new SearchFormService(this.model);
        await this.service.init(this.context);
        // 先加载数据，加载完后才会mounted, simple模式不加载
        if (!this.state.isSimple) {
            await this.load();
            await this.loadConfig();
        }
    }
    /**
     * 设置simple模式的数据
     *
     * @author tony001
     * @date 2025-02-14 17:02:59
     * @param {IData} data
     */
    setSimpleData(data) {
        // data由外部直接修改，先克隆一份隔离跟外部的对象。补全对应表单项字段不存在的时候设置为null，避免响应式问题。
        const UIData = this.service.toUIData(data);
        const cloneData = UIData.clone();
        this.formItems.forEach(item => {
            if (!Object.prototype.hasOwnProperty.call(cloneData, item.name)) {
                cloneData[item.name] = null;
            }
        });
        this.state.modified = false;
        this.state.data = cloneData;
        if (!this.state.isLoaded) {
            this.state.isLoaded = true;
        }
    }
    /**
     * 加载草稿
     *
     * @author lxm
     * @date 2022-09-22 17:09:04
     * @returns {*}  {Promise<IData>}
     */
    async load() {
        const queryParams = Object.assign({}, this.params);
        await this.evt.emit('onBeforeLoadDraft', { params: queryParams });
        let res;
        try {
            res = await this.service.getDraft(this.context, queryParams);
        }
        catch (error) {
            this.actionNotification('GETDRAFTERROR', {
                error: error,
            });
            throw error;
        }
        this.state.data = res.data;
        this.state.isLoaded = true;
        await this.evt.emit('onLoadDraftSuccess', undefined);
        this.formStateNotify(FormNotifyState.DRAFT);
        this.actionNotification('GETDRAFTSUCCESS');
        return this.data;
    }
    /**
     * 获取搜索表单的过滤参数
     *
     * @author lxm
     * @date 2022-09-22 17:09:21
     * @returns {*}  {IParams}
     */
    getFilterParams() {
        const filterParams = {};
        if (this.convertparammode === 'searchconds') {
            const searchconds = paramsToSearchconds(this.state.data);
            if (searchconds.length > 0)
                Object.assign(filterParams, {
                    searchconds: [
                        {
                            condop: 'AND',
                            condtype: 'GROUP',
                            searchconds,
                        },
                    ],
                });
        }
        else {
            Object.keys(this.state.data).forEach(key => {
                const value = this.state.data[key];
                // 排除空值
                if (value !== null &&
                    value !== undefined &&
                    value !== '' &&
                    key !== '$srfuf') {
                    filterParams[key] = value;
                }
            });
        }
        return filterParams;
    }
    /**
     * 执行搜索行为
     * @author lxm
     * @date 2023-03-26 02:27:23
     * @return {*}  {Promise<void>}
     */
    async search(args) {
        // 校验表单值规则
        const isValid = (args === null || args === void 0 ? void 0 : args.silentVerify) === true
            ? await this.silentValidate()
            : await this.validate();
        if (!isValid) {
            if ((args === null || args === void 0 ? void 0 : args.silentVerify) === true) {
                return;
            }
            this.handleValidateFail();
        }
        // 触发onBeforeSearch事件，基于eventCtx.allowSearch进行拦截
        const eventCtx = {};
        await this.evt.emit('onBeforeSearch', {
            data: [this.data],
            args: { eventCtx },
        });
        if (eventCtx.allowSearch === false) {
            return;
        }
        // 触发onSearch事件
        await this.evt.emit('onSearch', undefined);
    }
    /**
     * 搜索表单按钮回调
     *
     * @author lxm
     * @date 2022-09-22 19:09:07
     */
    async onSearchButtonClick() {
        await this.search();
    }
    /**
     * 重置搜索表单
     *
     * @author lxm
     * @date 2022-09-22 19:09:07
     */
    async reset() {
        await this.load();
        if (this.resetSearchMode === 'clearonly')
            return;
        await this.search();
    }
    /**
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    async dataChangeNotify(names) {
        await super.dataChangeNotify(names);
        if (this.model.enableAutoSearch) {
            this.search();
        }
    }
    /**
     * 监听回车事件
     * @param {IData} event
     * @return {*}
     * @author: zhujiamin
     * @date 2022-09-27 16:48:47
     */
    async onKeyUp(event) {
        const e = event || window.event;
        //  回车触发搜索
        if (e && e.code === 'Enter') {
            await this.onSearchButtonClick();
        }
    }
    /**
     * 根据搜索表单的按钮位置和按钮样式
     * 预处理部件布局面板模型
     * @author lxm
     * @date 2023-11-21 04:17:43
     * @protected
     * @return {*}
     */
    preprocessLayoutPanel() {
        if (!this.controlPanel) {
            return;
        }
        const { searchButtonStyle } = this.model;
        let deleteRight = false;
        let deleteBottom = false;
        const searchButtonPos = this.model.searchButtonPos || 'RIGHT';
        deleteRight = searchButtonPos === 'BOTTOM';
        deleteBottom = searchButtonPos !== 'BOTTOM';
        if (searchButtonStyle === 'NONE') {
            deleteRight = true;
            deleteBottom = true;
        }
        /**
         * 递归面板项
         * @author lxm
         * @date 2023-11-21 04:16:36
         * @param {IData} parent
         */
        const recursivePanelItems = (parent) => {
            let children;
            let childrenKey = '';
            ['rootPanelItems', 'panelItems'].find(key => {
                if (parent[key]) {
                    children = parent[key];
                    childrenKey = key;
                    return true;
                }
                return false;
            });
            if (children && children.length > 0) {
                const newArr = [];
                children.forEach((item) => {
                    const isDelete = (deleteRight && item.id === 'control_buttons_right') ||
                        (deleteBottom && item.id === 'control_buttons_bottom');
                    if (!isDelete) {
                        newArr.push(item);
                        recursivePanelItems(item);
                    }
                });
                if (newArr.length < children.length) {
                    parent[childrenKey] = newArr;
                }
            }
        };
        if (deleteBottom || deleteRight) {
            recursivePanelItems(this.controlPanel);
        }
    }
    /**
     * 加载存储的过滤条件
     * @author lxm
     * @date 2023-11-27 04:02:49
     * @return {*}  {Promise<void>}
     */
    async loadConfig() {
        if (!this.state.enableStoredFilters) {
            return;
        }
        const res = await this.config.load();
        if (res.model) {
            this.state.storedFilters = res.model;
        }
    }
    /**
     * 保存存储的过滤条件
     * @author lxm
     * @date 2023-11-27 04:03:07
     * @return {*}  {Promise<void>}
     */
    async saveConfig() {
        if (!this.state.enableStoredFilters) {
            return;
        }
        await this.config.save({
            model: this.state.storedFilters,
        });
    }
    /**
     * 存储搜索条件
     * @author lxm
     * @date 2023-11-27 04:08:02
     * @param {string} name 存储的名称
     * @return {*}  {Promise<void>}
     */
    async storeFilter(name) {
        this.state.storedFilters.push({
            name,
            data: Object.assign({}, this.data),
        });
        await this.saveConfig();
    }
    /**
     * 应用保存的过滤条件
     * @author lxm
     * @date 2023-11-27 04:11:53
     * @param {number} index
     */
    applyStoredFilter(index) {
        const filter = this.state.storedFilters[index];
        if (!filter) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.searchTerms'));
        }
        if (filter.data) {
            Object.assign(this.data, filter.data);
        }
        // 修改后搜索
        this.search();
    }
    /**
     * 删除保存的过滤条件
     * @author lxm
     * @date 2023-11-27 04:15:22
     * @param {number} index
     */
    async removeStoredFilter(index) {
        const filter = this.state.storedFilters[index];
        if (!filter) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.saveSearch'));
        }
        this.state.storedFilters.splice(index, 1);
        await this.saveConfig();
    }
}
