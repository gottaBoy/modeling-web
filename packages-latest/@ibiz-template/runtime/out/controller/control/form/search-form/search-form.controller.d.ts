import { IDESearchForm } from '@ibiz/model-core';
import { ISearchFormController, ISearchFormEvent, ISearchFormState } from '../../../../interface';
import { FormController } from '../form/form.controller';
import { SearchFormService } from './search-form.service';
import { ConfigService } from '../../../../service';
/**
 * 搜索表单控制器
 *
 * @author lxm
 * @date 2023-05-15 09:33:27
 * @export
 * @class SearchFormController
 * @extends {FormController<IDESearchForm>}
 * @implements {ISearchFormController}
 */
export declare class SearchFormController extends FormController<IDESearchForm, ISearchFormState, ISearchFormEvent> implements ISearchFormController {
    /**
     * 搜索表单部件服务
     *
     * @author lxm
     * @date 2022-08-19 13:08:51
     * @type {EntityService}
     */
    service: SearchFormService;
    /**
     * 表单旧数据（simple模式使用）
     *
     * @author tony001
     * @date 2025-02-14 17:02:04
     * @protected
     * @type {IData}
     */
    protected oldData: IData;
    /**
     * 应用配置存储服务
     * @author lxm
     * @date 2023-11-27 02:52:45
     * @type {ConfigService}
     */
    config: ConfigService;
    /**
     * @description 搜索过滤参数转换模式
     * @readonly
     * @type {('default' | 'searchconds')}
     * @memberof SearchFormController
     */
    get convertparammode(): 'default' | 'searchconds';
    /**
     * @description 重置搜索模式，default：默认模式，清空搜索参数并搜索；clearonly：仅清空搜索参数
     * @readonly
     * @type {('default' | 'clearonly')}
     * @memberof SearchFormController
     */
    get resetSearchMode(): 'default' | 'clearonly';
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 设置simple模式的数据
     *
     * @author tony001
     * @date 2025-02-14 17:02:59
     * @param {IData} data
     */
    setSimpleData(data: IData): void;
    /**
     * 加载草稿
     *
     * @author lxm
     * @date 2022-09-22 17:09:04
     * @returns {*}  {Promise<IData>}
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
    search(args?: {
        silentVerify: boolean;
    }): Promise<void>;
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
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 监听回车事件
     * @param {IData} event
     * @return {*}
     * @author: zhujiamin
     * @date 2022-09-27 16:48:47
     */
    onKeyUp(event: KeyboardEvent): Promise<void>;
    /**
     * 根据搜索表单的按钮位置和按钮样式
     * 预处理部件布局面板模型
     * @author lxm
     * @date 2023-11-21 04:17:43
     * @protected
     * @return {*}
     */
    protected preprocessLayoutPanel(): void;
    /**
     * 加载存储的过滤条件
     * @author lxm
     * @date 2023-11-27 04:02:49
     * @return {*}  {Promise<void>}
     */
    loadConfig(): Promise<void>;
    /**
     * 保存存储的过滤条件
     * @author lxm
     * @date 2023-11-27 04:03:07
     * @return {*}  {Promise<void>}
     */
    saveConfig(): Promise<void>;
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
//# sourceMappingURL=search-form.controller.d.ts.map