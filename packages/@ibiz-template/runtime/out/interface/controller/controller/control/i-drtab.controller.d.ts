import { IDRTab } from '@ibiz/model-core';
import { IDRTabEvent } from '../../event';
import { IDRTabState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 数据关系分页控制器
 *
 * @export
 * @interface IDRTabController
 * @extends {IControlController<IDRTab, IDRTabState, IDRTabEvent>}
 */
export interface IDRTabController extends IControlController<IDRTab, IDRTabState, IDRTabEvent> {
    /**
     * 获取数据
     *
     * @return {*}  {IData[]}
     * @memberof IDRTabController
     */
    getData(): IData[];
}
//# sourceMappingURL=i-drtab.controller.d.ts.map