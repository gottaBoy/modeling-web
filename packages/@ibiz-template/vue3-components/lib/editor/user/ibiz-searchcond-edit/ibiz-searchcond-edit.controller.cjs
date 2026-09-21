'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchCondEditEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * 过滤项集合
     *
     */
    __publicField(this, "searchBarFilters", []);
    /**
     * 过滤项控制器集合
     *
     */
    __publicField(this, "filterControllers", []);
    /**
     * 实体模型
     * @author lxm
     * @date 2023-10-13 02:49:59
     * @type {IAppDataEntity}
     */
    __publicField(this, "appDataEntity", null);
  }
  async onInit() {
    await super.onInit();
    await this.initByEntitySchema();
    await this.initSearchBarFilters();
  }
  /**
   * 根据实体jsonschema初始化
   * @author lxm
   * @date 2023-12-29 04:21:31
   * @return {*}  {Promise<void>}
   */
  async initByEntitySchema() {
    if (!this.model.appDataEntityId) {
      return;
    }
    const appDataEntity = await ibiz.hub.getAppDataEntity(
      this.model.appDataEntityId,
      this.context.srfappid
    );
    if (appDataEntity) {
      this.appDataEntity = appDataEntity;
    }
    const json = await runtime.getEntitySchema(
      this.model.appDataEntityId,
      this.context
    );
    if (!json) {
      return;
    }
    const addSearchBarFilters = await runtime.calcFilterModelBySchema(
      json,
      this.model.appDataEntityId,
      this.model.appId
    );
    this.searchBarFilters = addSearchBarFilters;
  }
  /**
   * 初始化过滤项控制器
   * @author lxm
   * @date 2023-10-13 03:33:17
   * @protected
   * @return {*}  {Promise<void>}
   */
  async initSearchBarFilters() {
    var _a;
    if (((_a = this.searchBarFilters) == null ? void 0 : _a.length) && this.appDataEntity) {
      this.searchBarFilters.forEach((item) => {
        const filterController = new runtime.SearchBarFilterController(
          item,
          this.appDataEntity,
          this.context,
          this.params
        );
        this.filterControllers.push(filterController);
      });
      await Promise.all(
        this.filterControllers.map((controller) => controller.init())
      );
    }
  }
}

exports.SearchCondEditEditorController = SearchCondEditEditorController;
