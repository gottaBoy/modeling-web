'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
class DataViewEngine extends runtime.MDViewEngine {
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
    if (key === runtime.SysUIActionTag.EXPAND) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.dataview.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag, srfgroup } = args.params || {};
      const tag = srfcollapsetag || srfgroup;
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.dataview.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.dataview.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.dataview.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

exports.DataViewEngine = DataViewEngine;
