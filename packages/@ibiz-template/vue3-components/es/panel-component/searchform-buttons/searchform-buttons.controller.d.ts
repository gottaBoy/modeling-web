import { ISearchFormController, PanelItemController, StoredFilter } from '@ibiz-template/runtime';
/**
 * 搜索表单按钮控制器
 * @author lxm
 * @date 2023-11-21 02:18:14
 * @export
 * @class SearchFormButtonsController
 * @extends {PanelItemController}
 */
export declare class SearchFormButtonsController extends PanelItemController {
    /**
     * 搜索按钮样式
     * @author lxm
     * @date 2023-11-21 03:25:31
     * @type {(string | 'DEFAULT' | 'NONE' | 'SEARCHONLY' | 'USER' | 'USER2')}
     */
    get searchButtonStyle(): string;
    /**
     * 保存的过滤条件
     * @author lxm
     * @date 2023-11-27 04:33:42
     * @readonly
     * @type {StoredFilter[]}
     */
    get storedFilters(): StoredFilter[];
    /**
     * 搜索表单控制器
     * @author lxm
     * @date 2023-11-21 04:32:58
     * @type {ISearchFormController}
     */
    searchFrom: ISearchFormController;
    protected onInit(): Promise<void>;
    /**
     * 点击搜索按钮
     * @author lxm
     * @date 2023-11-21 04:31:55
     */
    onSearchButtonClick(): void;
    /**
     * 点击重置按钮
     * @author lxm
     * @date 2023-11-21 04:32:09
     */
    onResetButtonClick(): void;
}
