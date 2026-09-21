import { IHttpResponse } from '@ibiz-template/core';
import { ISysMap } from '@ibiz/model-core';
import { IMapData } from '../../../interface';
import { MDControlService } from '../../../service';
/**
 * 地图部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<ISysMap>}
 */
export declare class MapService extends MDControlService<ISysMap> {
    init(context?: IContext | undefined): Promise<void>;
    /**
     * 加载所有地图项的数据
     * @author lxm
     * @date 2023-10-30 06:27:32
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IMapData[]>>}
     */
    fetchAll(context: IContext, params?: IParams): Promise<IHttpResponse<IMapData[]>>;
}
//# sourceMappingURL=map.service.d.ts.map