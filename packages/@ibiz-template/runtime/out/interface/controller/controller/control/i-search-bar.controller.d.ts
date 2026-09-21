import { ISearchBar } from '@ibiz/model-core';
import { ISearchBarEvent } from '../../event';
import { ISearchBarState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 搜索栏控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface ISearchBarController
 * @extends {IControlController}
 */
export interface ISearchBarController extends IControlController<ISearchBar, ISearchBarState, ISearchBarEvent> {
    /**
     * 获取搜索栏的过滤参数
     *
     * @author lxm
     * @date 2022-09-22 17:09:21
     * @returns {*}  {IParams}
     */
    getFilterParams(): IParams;
    /**
     * 有默认选中分组
     *
     * @author lxm
     * @date 2022-09-22 17:09:21
     * @returns {*}  {IParams}
     */
    hasDefaultSelect: boolean;
    /**
     * 设置默认选中
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-24 11:12:43
     */
    setDefaultSelect(): void;
}
//# sourceMappingURL=i-search-bar.controller.d.ts.map