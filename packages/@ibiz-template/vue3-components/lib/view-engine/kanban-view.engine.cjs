'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class KanbanViewEngine extends runtime.MDViewEngine {
  /**
   * 数据视图（卡片）部件
   *
   * @readonly
   * @memberof KanbanViewEngine
   */
  get kanbanview() {
    return this.view.getController("kanban");
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @memberof KanbanViewEngine
   */
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.kanban) {
      this.view.slotProps.kanban = {};
    }
    this.view.slotProps.kanban.mdctrlActiveMode = model.mdctrlActiveMode;
  }
}

exports.KanbanViewEngine = KanbanViewEngine;
