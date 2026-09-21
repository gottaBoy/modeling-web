import { IHttpResponse } from '@ibiz-template/core';
import { IDEGrid } from '@ibiz/model-core';
import { MDControlService, ControlVO } from '../../../../service';
/**
 * 表格部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDEGrid>}
 */
export declare class GridService extends MDControlService<IDEGrid> {
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap(): void;
    /**
     * 编辑列更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:34
     * @param {string} methodName
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @returns {*}  {Promise<IHttpResponse<ControlVO>>}
     */
    updateGridEditItem(methodName: string, context: IContext, data?: IData, params?: IParams): Promise<IHttpResponse<ControlVO>>;
    /**
     * 移动并排序数据
     *
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @return {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof GridService
     */
    moveOrderItem(context: IContext, data: ControlVO, params: IParams): Promise<IHttpResponse<ControlVO[]>>;
}
//# sourceMappingURL=grid.service.d.ts.map