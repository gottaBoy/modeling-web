import { IDEList } from '@ibiz/model-core';
import { IHttpResponse } from '@ibiz-template/core';
import { ControlVO, MDControlService } from '../../../service';
/**
 * 列表部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDEList>}
 */
export declare class ListService extends MDControlService<IDEList> {
    /**
     * @description 移动并排序数据
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @returns {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof ListService
     */
    moveOrderItem(context: IContext, data: ControlVO, args: IData): Promise<IHttpResponse<ControlVO[]>>;
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap(): void;
}
//# sourceMappingURL=list.service.d.ts.map