import { SysUIActionTag, calcDeCodeNameById } from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';
import { ExpViewEngine } from './exp-view.engine.mjs';

"use strict";
class TreeExpViewEngine extends ExpViewEngine {
  /**
   * 树导航栏部件名称
   *
   * @author lxm
   * @date 2023-08-31 03:43:02
   * @readonly
   * @type {string}
   */
  get expBarName() {
    return "treeexpbar";
  }
  /**
   * 树部件控制器
   *
   * @readonly
   * @memberof TreeExpViewEngine
   */
  get tree() {
    return this.expBar.xDataController;
  }
  async call(key, args) {
    var _a;
    if (key === SysUIActionTag.REFRESH_ALL) {
      await this.tree.refresh();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
      if ((_a = args == null ? void 0 : args.data) == null ? void 0 : _a[0]) {
        await this.tree.refreshNodeChildren(args.data[0], false);
      } else {
        await this.tree.refresh();
      }
      return null;
    }
    if (key === SysUIActionTag.REFRESH_PARENT) {
      await this.tree.refreshNodeChildren(args.data[0], true);
      return null;
    }
    if (key === SysUIActionTag.EXPAND) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.tree.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.tree.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.tree.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.tree.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof TreeExpViewEngine
   */
  async onMounted() {
    await super.onMounted();
    await this.loadEntityData();
  }
  /**
   * 加载实体主数据
   *
   * @return {*}  {Promise<void>}
   * @memberof TreeExpViewEngine
   */
  async loadEntityData() {
    const deName = calcDeCodeNameById(this.view.model.appDataEntityId);
    if (!this.view.context[deName] || !this.view.model.showDataInfoBar) {
      return;
    }
    return super.loadEntityData();
  }
}

export { TreeExpViewEngine };
