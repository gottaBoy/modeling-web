import { SysUIActionTag } from '@ibiz-template/runtime';
import { TreeViewEngine } from './tree-view.engine.mjs';

"use strict";
class TreeGridExViewEngine extends TreeViewEngine {
  get treeGridEx() {
    return this.view.getController("treegridex");
  }
  async call(key, args) {
    if (key === SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.treeGridEx.toggleRowEdit();
      return null;
    }
    if (key === SysUIActionTag.SAVE_ROW) {
      this.treeGridEx.save(args.data[0]);
      return null;
    }
    if (key === SysUIActionTag.SAVE) {
      this.treeGridEx.saveAll();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
      this.treeGridEx.load();
      return null;
    }
    return super.call(key, args);
  }
}

export { TreeGridExViewEngine };
