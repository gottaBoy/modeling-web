import { IDEDataView } from '@ibiz/model-core';
import { IHttpResponse } from '@ibiz-template/core';
import { ControlVO, MDControlService } from '../../../service';
/**
 * 数据视图（卡片）部件服务
 *
 * @export
 * @class DataViewControlService
 * @extends {MDControlService<IDEDataView>}
 */
export declare class DataViewControlService<T extends IDEDataView = IDEDataView> extends MDControlService<T> {
    /**
     * @description 移动并排序数据
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @returns {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof DataViewControlService
     */
    moveOrderItem(context: IContext, data: ControlVO, args: IData): Promise<IHttpResponse<ControlVO[]>>;
    /**
     * 初始化属性映射
     *
     * @memberof DataViewControlService
     */
    initUIDataMap(): void;
}
//# sourceMappingURL=data-view.service.d.ts.map