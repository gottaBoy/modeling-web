import { ControlService } from '../../../service';
export class ReportPanelService extends ControlService {
    /**
     * @description 查询报表数据
     * @param {string} reportTag 报表标识
     * @param {string} appDataEntityId 报表实体标识
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof ReportPanelService
     */
    async fetch(reportTag, appDataEntityId, context, params = {}) {
        const dataEntity = await ibiz.hub.getAppDataEntity(appDataEntityId, this.model.appId);
        const url = `${dataEntity.deapicodeName2}/report?srfreporttag=${reportTag}`;
        let res = await ibiz.net.request(url, {
            method: 'post',
            data: params,
        });
        res = this.handleResponse(res);
        return res;
    }
}
