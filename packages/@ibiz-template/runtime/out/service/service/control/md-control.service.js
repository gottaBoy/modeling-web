import { RuntimeError } from '@ibiz-template/core';
import { isArray } from 'qx-util';
import { ControlService } from './control.service';
export class MDControlService extends ControlService {
    /**
     * 执行查询多条数据的方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async fetch(context, params = {}) {
        var _a;
        const fetchAction = ((_a = this.model.fetchControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'fetchdefault';
        let res = await this.exec(fetchAction, context, params);
        res = this.handleResponse(res);
        return res;
    }
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
        const getAction = ((_a = this.model.getControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'get';
        let res = await this.exec(getAction, context, undefined, params);
        res = this.handleResponse(res);
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
        const getDraftAction = ((_a = this.model.getDraftControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'getdraft';
        let res = await this.exec(getDraftAction, context, undefined, params);
        res = this.handleResponse(res);
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
        const removeAction = ((_a = this.model.removeControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'remove';
        const res = await this.exec(removeAction, context, undefined, params);
        return res;
    }
    /**
     * 新建数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {ControlVO} data 数据
     * @returns {*}
     */
    async create(context, data) {
        var _a;
        const createAction = ((_a = this.model.createControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'create';
        let res = await this.exec(createAction, context, data.getOrigin());
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 更新数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {ControlVO} data 数据
     * @returns {*}
     */
    async update(context, data) {
        var _a;
        const updateAction = ((_a = this.model.updateControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'update';
        let res = await this.exec(updateAction, context, data.getOrigin());
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 批量更新数据
     *
     * @author chitanda
     * @date 2023-12-21 10:12:09
     * @param {IContext} context
     * @param {ControlVO[]} data
     * @return {*}  {Promise<void>}
     */
    async updateBatch(context, data) {
        var _a;
        const updateAction = ((_a = this.model.updateControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) || 'update';
        let res = await this.exec(updateAction, context, data.map(item => item.getOrigin()));
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 导出数据
     *
     * @author lxm
     * @date 2022-11-25 14:11:09
     * @param {IPSDEDataExport} dataExport 导出模型
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 请求参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async exportData(_dataExport, _context, _params = {}) {
        // return this.entityService.file.exportData(
        //   dataExport,
        //   this.model.fetchControlAction!.appDEMethodId!,
        //   context,
        //   params,
        // );
        throw new RuntimeError('未实现');
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
        if (res.headers) {
            if (res.headers['x-page']) {
                res.page = Number(res.headers['x-page']);
            }
            if (res.headers['x-per-page']) {
                res.size = Number(res.headers['x-per-page']);
            }
            if (res.headers['x-total']) {
                res.total = Number(res.headers['x-total']);
            }
            if (res.headers['x-totalx']) {
                res.totalx = Number(res.headers['x-totalx']);
            }
            if (res.headers['x-total-pages']) {
                res.totalPages = Number(res.headers['x-total-pages']);
            }
        }
        if (res.ok) {
            if (isArray(res.data)) {
                res.data = res.data.map(item => this.toUIData(item));
            }
            else {
                res.data = this.toUIData(res.data);
            }
        }
        return res;
    }
}
