import { RuntimeError } from '@ibiz-template/core';
import {
  ISearchFormController,
  PanelItemController,
  StoredFilter,
  UIActionUtil,
} from '@ibiz-template/runtime';

/**
 * 搜索表单按钮控制器
 * @author lxm
 * @date 2023-11-21 02:18:14
 * @export
 * @class SearchFormButtonsController
 * @extends {PanelItemController}
 */
export class SearchFormButtonsController extends PanelItemController {
  /**
   * @description 搜索按钮样式
   * @exposedoc
   * @readonly
   * @type {(string | 'DEFAULT' | 'NONE' | 'SEARCHONLY' | 'USER' | 'USER2')}
   * @memberof SearchFormButtonsController
   */
  get searchButtonStyle(): string {
    return this.searchFrom.model.searchButtonStyle || 'DEFAULT';
  }

  /**
   * 高级搜索
   *
   * @readonly
   * @type {boolean}
   * @memberof SearchFormButtonsController
   */
  get advanceSearch(): boolean {
    return !!this.searchFrom.model.enableAdvanceSearch;
  }

  /**
   * @description 保存的过滤条件
   * @exposedoc
   * @readonly
   * @type {StoredFilter[]}
   * @memberof SearchFormButtonsController
   */
  get storedFilters(): StoredFilter[] {
    return this.searchFrom?.state.storedFilters || [];
  }

  /**
   * @description 搜索表单控制器
   * @exposedoc
   * @type {ISearchFormController}
   * @memberof SearchFormButtonsController
   */
  searchFrom!: ISearchFormController;

  protected async onInit(): Promise<void> {
    await super.onInit();

    const searchFrom = this.panel.container as ISearchFormController;
    if (!searchFrom) {
      throw new RuntimeError(
        ibiz.i18n.t('panelComponent.searchformButtons.errMessage'),
      );
    }
    this.searchFrom = searchFrom;
  }

  /**
   * @description 点击搜索按钮
   * @author lxm
   * @date 2023-11-21 04:31:55
   */
  onSearchButtonClick(): void {
    UIActionUtil.execAndResolved(
      'search',
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        ctrl: this.searchFrom,
        view: this.panel.view,
      },
      this.panel.context.srfappid,
    );
  }

  /**
   * 点击重置按钮
   * @author lxm
   * @date 2023-11-21 04:32:09
   */
  onResetButtonClick(): void {
    UIActionUtil.execAndResolved(
      'reset',
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        ctrl: this.searchFrom,
        view: this.panel.view,
      },
      this.panel.context.srfappid,
    );
  }
}
