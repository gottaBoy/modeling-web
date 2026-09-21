import { ControlService } from '../../../service';
/**
 * 向导面板服务
 *
 * @author lxm
 * @date 2023-02-16 04:11:13
 * @export
 * @class WizardPanelService
 * @extends {ControlService<T>}
 * @template T
 */
export class WizardPanelService extends ControlService {
    /**
     * 执行向导初始化
     * 服务调用之前确认是否有初始化实体行为
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async initialize(context, data, params) {
        var _a;
        const initAction = (_a = this.model.initControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId;
        let res = await this.exec(initAction, context, data, params);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 执行向导完成
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async finish(context, data = {}, params = {}) {
        var _a;
        const finishAction = (_a = this.model.finishControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId;
        let res = await this.exec(finishAction, context, data, params);
        res = this.handleResponse(res);
        return res;
    }
}
