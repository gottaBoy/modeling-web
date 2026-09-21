import { ControlService } from '../../../service';
export class ReportPanelService extends ControlService {
    /**
     * 执行查询报表数据的方法
     *
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async fetch(context, params = {}) {
        this.dataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.model.appId);
        const url = `${this.dataEntity.deapicodeName2}/report?srfreporttag=${this.model.codeName}`;
        let res = await ibiz.net.request(url, {
            method: 'post',
            data: params,
        });
        res = this.handleResponse(res);
        return res;
    }
}
