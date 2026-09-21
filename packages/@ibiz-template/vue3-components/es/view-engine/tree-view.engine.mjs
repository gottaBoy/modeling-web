import { MDViewEngine, SysUIActionTag } from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';

"use strict";
class TreeViewEngine extends MDViewEngine {
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
}

export { TreeViewEngine };
