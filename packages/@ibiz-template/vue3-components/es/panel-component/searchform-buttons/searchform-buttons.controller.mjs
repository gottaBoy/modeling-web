import { RuntimeError } from '@ibiz-template/core';
import { PanelItemController, UIActionUtil } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchFormButtonsController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 搜索表单控制器
     * @author lxm
     * @date 2023-11-21 04:32:58
     * @type {ISearchFormController}
     */
    __publicField(this, "searchFrom");
  }
  /**
   * 搜索按钮样式
   * @author lxm
   * @date 2023-11-21 03:25:31
   * @type {(string | 'DEFAULT' | 'NONE' | 'SEARCHONLY' | 'USER' | 'USER2')}
   */
  get searchButtonStyle() {
    return this.searchFrom.model.searchButtonStyle || "DEFAULT";
  }
  /**
   * 保存的过滤条件
   * @author lxm
   * @date 2023-11-27 04:33:42
   * @readonly
   * @type {StoredFilter[]}
   */
  get storedFilters() {
    var _a;
    return ((_a = this.searchFrom) == null ? void 0 : _a.state.storedFilters) || [];
  }
  async onInit() {
    await super.onInit();
    const searchFrom = this.panel.container;
    if (!searchFrom) {
      throw new RuntimeError(
        ibiz.i18n.t("panelComponent.searchformButtons.errMessage")
      );
    }
    this.searchFrom = searchFrom;
  }
  /**
   * 点击搜索按钮
   * @author lxm
   * @date 2023-11-21 04:31:55
   */
  onSearchButtonClick() {
    UIActionUtil.execAndResolved(
      "search",
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        view: this.panel.view
      },
      this.panel.context.srfappid
    );
  }
  /**
   * 点击重置按钮
   * @author lxm
   * @date 2023-11-21 04:32:09
   */
  onResetButtonClick() {
    UIActionUtil.execAndResolved(
      "reset",
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        view: this.panel.view
      },
      this.panel.context.srfappid
    );
  }
}

export { SearchFormButtonsController };
