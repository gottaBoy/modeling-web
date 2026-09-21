import { recursiveIterate, RuntimeModelError, } from '@ibiz-template/core';
import { ControlVO, UIMapField } from '../../../../service';
import { FormService } from '../form/form.service';
export class EditFormService extends FormService {
    /**
     * 执行获取单条数据方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async get(context, params = {}) {
        var _a;
        const { args } = this.getLoadParams(params);
        let res = await this.exec(((_a = this.model.getControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'get', context, undefined, args);
        res = this.handleResponse(res);
        // 设置默认值
        if (res.ok && res.data) {
            this.setDefault(res.data, context, params, 'update');
        }
        return res;
    }
    /**
     * 执行获取草稿方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async getDraft(context, params = {}) {
        var _a;
        const { args } = this.getLoadParams(params);
        let res = await this.exec(((_a = this.model.getDraftControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'getdraft', context, undefined, args);
        res = this.handleResponse(res);
        // 设置默认值
        if (res.ok && res.data) {
            this.setDefault(res.data, context, params, 'create');
        }
        return res;
    }
    /**
     * 删除单条数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:48
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    async remove(context, params = {}) {
        var _a;
        const res = await this.exec(((_a = this.model.removeControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'remove', context, undefined, params);
        return res;
    }
    /**
     * 新建数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}
     */
    async create(context, data) {
        var _a;
        const tempData = this.getFilteredData(data);
        let res = await this.exec(((_a = this.model.createControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'create', context, tempData);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 更新数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}
     */
    async update(context, data) {
        var _a;
        const tempData = this.getFilteredData(data);
        let res = await this.exec(((_a = this.model.updateControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'update', context, tempData);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 返回操作
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}
     */
    async goBack(context, data) {
        var _a;
        const wizardForm = this.model;
        const methodName = (_a = wizardForm.goBackControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId;
        if (!methodName) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.form.lackBehavior'));
        }
        let res = await this.exec(methodName, context, data instanceof ControlVO ? data.getOrigin() : data);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 表单项更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:34
     * @param {string} methodName
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @returns {*}  {Promise<IHttpResponse<ControlVO>>}
     */
    async updateFormItem(methodName, context, data = {}, params = {}) {
        Object.assign(params, { srfupdateitem: true });
        let res = await this.exec(methodName, context, data, params);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 工作流启动
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    async wfStart(context, params, data) {
        var _a;
        const wfForm = this.model;
        const methodName = ((_a = wfForm.wfstartControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'wfstart';
        const entityService = await this.app.deService.getService(context, this.model.appDataEntityId);
        return entityService.wf.exec(methodName, context, params, data instanceof ControlVO ? data.getOrigin() : data);
    }
    /**
     * 工作流提交
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    async wfSubmit(context, params, data) {
        var _a;
        const wfForm = this.model;
        // 有type的操作方法传type。
        let methodName = '';
        if (params.type) {
            methodName = params.type;
        }
        else {
            methodName = ((_a = wfForm.wfsubmitControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'wfsubmit';
        }
        const entityService = await this.app.deService.getService(context, this.model.appDataEntityId);
        return entityService.wf.exec(methodName, context, params, data instanceof ControlVO ? data.getOrigin() : data);
    }
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap() {
        super.initUIDataMap();
        // 预置属性映射
        const presetFields = [
            // 工作流预置
            'srfwfmemo',
            'srfwftransferor',
            // 逻辑预置操作数据
            'srfactionparam',
            // 前端新增修改标识，新增为"0",修改为"1"或未设值
            'srffrontuf',
            // 向导预置
            'srfnextform',
        ];
        // *初始化表单的属性映射
        recursiveIterate(this.model, (item, parent) => {
            // 重复器中的子表单属性项不应挂在主表单中
            if (parent.detailType !== 'MDCTRL' &&
                (item.detailType === 'FORMITEM' || item.detailType === 'MDCTRL')) {
                const formItem = item;
                // 复合表单项
                if (formItem.compositeItem) {
                    const { editorItems = [] } = formItem.editor || {};
                    editorItems.forEach((editorItem) => {
                        const mapField = new UIMapField(editorItem.id, editorItem.id, {
                            isOriginField: presetFields.includes(editorItem.id),
                        });
                        this.dataUIMap.set(editorItem.id, mapField);
                    });
                }
                else {
                    const uiKey = formItem.id.toLowerCase();
                    const deField = formItem.fieldName || item.appDEFieldId;
                    let mapField;
                    if (deField) {
                        const uiKeys = this.fieldToUIMap.get(deField);
                        mapField = new UIMapField(uiKey, deField, {
                            isOriginField: true,
                            dataType: formItem.dataType,
                            isOneToMultiField: uiKeys && uiKeys.length > 1,
                        });
                    }
                    else {
                        // 前台属性和没属性的表单项，或预置属性
                        mapField = new UIMapField(uiKey, uiKey, {
                            isOriginField: presetFields.includes(uiKey), // 工作流相关需要存到origin上
                        });
                    }
                    this.dataUIMap.set(uiKey, mapField);
                }
            }
        }, {
            childrenFields: ['deformPages', 'deformTabPages', 'deformDetails'],
        });
    }
    /**
     * 处理响应
     *
     * @author lxm
     * @date 2022-08-31 17:08:13
     * @param {IHttpResponse} res
     * @returns {*}  {IHttpResponse}
     */
    handleResponse(response) {
        const res = super.handleResponse(response);
        if (res.ok && res.data) {
            res.data = this.toUIData(res.data);
        }
        return res;
    }
}
