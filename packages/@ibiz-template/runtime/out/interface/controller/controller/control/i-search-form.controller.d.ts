import { IDESearchForm } from '@ibiz/model-core';
import { ISearchFormEvent } from '../../event';
import { ISearchFormState } from '../../state';
import { IFormController } from './i-form.controller';
/**
 * 搜索表单控制器
 * @author lxm
 * @date 2023-05-04 03:01:41
 * @export
 * @interface ISearchFormController
 * @extends {IFormController}
 */
export interface ISearchFormController extends IFormController<IDESearchForm, ISearchFormState, ISearchFormEvent> {
    /**
     * 加载数据
     * @author lxm
     * @date 2023-05-16 11:08:45
     * @return {*}  {Promise<IData>}
     */
    load(): Promise<IData>;
    /**
     * 获取搜索表单的过滤参数
     *
     * @author lxm
     * @date 2022-09-22 17:09:21
     * @returns {*}  {IParams}
     */
    getFilterParams(): IParams;
    /**
     * 执行搜索行为
     * @author lxm
     * @date 2023-03-26 02:27:23
     * @return {*}  {Promise<void>}
     */
    search(): Promise<void>;
    /**
     * 搜索表单按钮回调
     *
     * @author lxm
     * @date 2022-09-22 19:09:07
     */
    onSearchButtonClick(): Promise<void>;
    /**
     * 重置搜索表单
     *
     * @author lxm
     * @date 2022-09-22 19:09:07
     */
    reset(): Promise<void>;
    /**
     * 存储搜索条件
     * @author lxm
     * @date 2023-11-27 04:08:02
     * @param {string} name 存储的名称
     * @return {*}  {Promise<void>}
     */
    storeFilter(name: string): Promise<void>;
    /**
     * 应用保存的过滤条件
     * @author lxm
     * @date 2023-11-27 04:11:53
     * @param {number} index
     */
    applyStoredFilter(index: number): void;
    /**
     * 删除保存的过滤条件
     * @author lxm
     * @date 2023-11-27 04:15:22
     * @param {number} index
     */
    removeStoredFilter(index: number): Promise<void>;
}
//# sourceMappingURL=i-search-form.controller.d.ts.map