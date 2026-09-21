'use strict';

var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');

"use strict";
class TreeViewEngine extends runtime.MDViewEngine {
  get tree() {
    return this.view.getController("tree");
  }
  async onCreated() {
    await super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  async call(key, args) {
    var _a;
    if (key === runtime.SysUIActionTag.REFRESH_ALL) {
      await this.tree.refresh();
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH) {
      if ((_a = args == null ? void 0 : args.data) == null ? void 0 : _a[0]) {
        await this.tree.refreshNodeChildren(args.data[0], false);
      } else {
        await this.tree.refresh();
      }
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH_PARENT) {
      await this.tree.refreshNodeChildren(args.data[0], true);
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPAND) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.tree.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSE) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.tree.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.tree.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.tree.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

exports.TreeViewEngine = TreeViewEngine;
