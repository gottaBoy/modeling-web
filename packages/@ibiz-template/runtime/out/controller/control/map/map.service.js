import { HttpResponse } from '@ibiz-template/core';
import { parseUserParams } from '../../../model';
import { MapData, MDControlService } from '../../../service';
import { convertNavData, ScriptFactory } from '../../../utils';
/**
 * 地图部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<ISysMap>}
 */
export class MapService extends MDControlService {
    async init(context) {
        await super.init(context);
    }
    /**
     * 加载所有地图项的数据
     * @author lxm
     * @date 2023-10-30 06:27:32
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IMapData[]>>}
     */
    async fetchAll(context, params = {}) {
        var _a;
        const allData = [];
        // 没有面板项返回空数组
        if ((_a = this.model.sysMapItems) === null || _a === void 0 ? void 0 : _a.length) {
            const app = ibiz.hub.getApp(context.srfappid);
            await Promise.all(this.model.sysMapItems.map(async (mapItem) => {
                const { appDataEntityId, appDEDataSetId, customCond } = mapItem;
                const _context = context.clone();
                const _params = Object.assign({}, params);
                if (customCond) {
                    const customParams = ScriptFactory.execSingleLine(customCond);
                    if (customParams) {
                        const { navigateContexts, navigateParams } = parseUserParams(customParams);
                        if (navigateContexts) {
                            Object.assign(_context, convertNavData(navigateContexts, params, context));
                        }
                        if (navigateParams) {
                            Object.assign(_params, convertNavData(navigateContexts, params, context));
                        }
                    }
                }
                const res = (await app.deService.exec(appDataEntityId, appDEDataSetId, _context, _params));
                if (res.data) {
                    allData.push(...res.data.map(item => new MapData(item, mapItem)));
                }
            }));
        }
        return new HttpResponse(allData, 200);
    }
}
