'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchFormButtonsController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 搜索表单控制器
     * @exposedoc
     * @type {ISearchFormController}
     * @memberof SearchFormButtonsController
     */
    __publicField(this, "searchFrom");
  }
  /**
   * @description 搜索按钮样式
   * @exposedoc
   * @readonly
   * @type {(string | 'DEFAULT' | 'NONE' | 'SEARCHONLY' | 'USER' | 'USER2')}
   * @memberof SearchFormButtonsController
   */
  get searchButtonStyle() {
    return this.searchFrom.model.searchButtonStyle || "DEFAULT";
  }
  /**
   * 高级搜索
   *
   * @readonly
   * @type {boolean}
   * @memberof SearchFormButtonsController
   */
  get advanceSearch() {
    return !!this.searchFrom.model.enableAdvanceSearch;
  }
  /**
   * @description 保存的过滤条件
   * @exposedoc
   * @readonly
   * @type {StoredFilter[]}
   * @memberof SearchFormButtonsController
   */
  get storedFilters() {
    var _a;
    return ((_a = this.searchFrom) == null ? void 0 : _a.state.storedFilters) || [];
  }
  async onInit() {
    await super.onInit();
    const searchFrom = this.panel.container;
    if (!searchFrom) {
      throw new core.RuntimeError(
        ibiz.i18n.t("panelComponent.searchformButtons.errMessage")
      );
    }
    this.searchFrom = searchFrom;
  }
  /**
   * @description 点击搜索按钮
   * @author lxm
   * @date 2023-11-21 04:31:55
   */
  onSearchButtonClick() {
    runtime.UIActionUtil.execAndResolved(
      "search",
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        ctrl: this.searchFrom,
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
    runtime.UIActionUtil.execAndResolved(
      "reset",
      {
        context: this.panel.context,
        params: this.panel.params,
        data: [],
        ctrl: this.searchFrom,
        view: this.panel.view
      },
      this.panel.context.srfappid
    );
  }
}

exports.SearchFormButtonsController = SearchFormButtonsController;
