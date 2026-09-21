import { RuntimeError } from '@ibiz-template/core';
import { MDViewEngine, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class DataViewEngine extends MDViewEngine {
  /**
   * 数据视图（卡片）部件
   *
   * @readonly
   * @memberof DataViewEngine
   */
  get dataview() {
    return this.view.getController("dataview");
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @memberof DataViewEngine
   */
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.dataview) {
      this.view.slotProps.dataview = {};
    }
    this.view.slotProps.dataview.mdctrlActiveMode = model.mdctrlActiveMode;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === SysUIActionTag.EXPAND) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.dataview.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.dataview.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.dataview.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.dataview.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

export { DataViewEngine };
