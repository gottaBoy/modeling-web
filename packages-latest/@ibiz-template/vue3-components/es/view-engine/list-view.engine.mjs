import { RuntimeError } from '@ibiz-template/core';
import { MDViewEngine, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class ListViewEngine extends MDViewEngine {
  get list() {
    return this.view.getController("list");
  }
  async onMounted() {
    await super.onMounted();
    const { model } = this.view;
    this.list.state.mdctrlActiveMode = model.mdctrlActiveMode;
  }
  async call(key, args) {
    if (key === SysUIActionTag.EXPAND) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.list.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.list.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.list.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.list.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

export { ListViewEngine };
