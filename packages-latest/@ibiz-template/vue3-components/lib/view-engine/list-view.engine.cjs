'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
class ListViewEngine extends runtime.MDViewEngine {
  get list() {
    return this.view.getController("list");
  }
  async onMounted() {
    await super.onMounted();
    const { model } = this.view;
    this.list.state.mdctrlActiveMode = model.mdctrlActiveMode;
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.EXPAND) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.list.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.list.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.list.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.list.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

exports.ListViewEngine = ListViewEngine;
