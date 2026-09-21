'use strict';

var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');

"use strict";
class TreeViewEngine extends runtime.MDViewEngine {
  async onCreated() {
    await super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
    this.view.slotProps.tree.mdctrlActiveMode = model.mdctrlActiveMode;
  }
  get tree() {
    return this.view.getController("tree");
  }
  async call(key, args) {
    var _a;
    if (key === runtime.SysUIActionTag.REFRESH_ALL) {
      await this.xdataControl.refresh();
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH) {
      if ((_a = args == null ? void 0 : args.data) == null ? void 0 : _a[0]) {
        await this.xdataControl.refreshNodeChildren(
          args.data[0],
          false
        );
      } else {
        await this.xdataControl.refresh();
      }
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH_PARENT) {
      await this.xdataControl.refreshNodeChildren(
        args.data[0],
        true
      );
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
      this.xdataControl.changeCollapse({
        tag,
        expand: true
      });
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
      this.xdataControl.changeCollapse({
        tag,
        expand: false
      });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.xdataControl.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.xdataControl.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
  async openData(args) {
    const { data, event } = args;
    const result = await this.xdataControl.openData(
      data[0],
      event
    );
    return result;
  }
  async newData(args) {
    const { data, event } = args;
    const result = await this.xdataControl.newData(
      data[0],
      event
    );
    return result;
  }
}

exports.TreeViewEngine = TreeViewEngine;
