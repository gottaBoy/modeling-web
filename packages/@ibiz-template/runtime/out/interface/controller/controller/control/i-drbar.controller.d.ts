import { IDRBar } from '@ibiz/model-core';
import { IDRBarEvent } from '../../event';
import { IDRBarState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 数据关系栏控制器
 *
 * @export
 * @interface IDRBarController
 * @extends {IControlController<IDRBar, IDRBarState, IDRBarEvent>}
 */
export interface IDRBarController extends IControlController<IDRBar, IDRBarState, IDRBarEvent> {
    /**
     * 获取数据
     *
     * @return {*}  {IData[]}
     * @memberof IDRBarController
     */
    getData(): IData[];
    /**
     * 处理选中改变
     *
     * @param {string} key
     * @memberof DRBarController
     */
    handleSelectChange(key: string): void;
}
//# sourceMappingURL=i-drbar.controller.d.ts.map