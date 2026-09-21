'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var qxUtil = require('qx-util');
var lodashEs = require('lodash-es');
var vue = require('vue');

"use strict";
function findNodeData(key, c) {
  const find = c.state.items.find((item) => item._id === key);
  if (find) {
    return find;
  }
  return c.state.items.find((item) => item._uuid === key);
}
function useElTreeUtil(treeRef, c) {
  const getTreeInstance = () => {
    const elTree = treeRef.value;
    if (!elTree) {
      throw new core.RuntimeError(ibiz.i18n.t("control.tree.noFoundInstance"));
    }
    return elTree;
  };
  const _updateUI = () => {
    var _a;
    const elTree = treeRef.value;
    if (!elTree) {
      setTimeout(() => {
        _updateUI();
      }, 200);
      return;
    }
    Object.values(elTree.store.nodesMap).forEach((node) => {
      const shouldExpanded = c.state.expandedKeys.includes(node.data._id);
      if (shouldExpanded !== node.expanded) {
        if (shouldExpanded) {
          node.expand();
        } else {
          node.collapse();
        }
      }
    });
    if (c.state.singleSelect) {
      treeRef.value.setCurrentKey(((_a = c.state.selectedData[0]) == null ? void 0 : _a._id) || void 0);
    } else {
      elTree.setCheckedKeys(c.state.selectedData.map((item) => item._id));
    }
  };
  const updateUI = lodashEs.debounce(_updateUI, 500);
  const triggerNodeExpand = (id) => {
    const elTree = getTreeInstance();
    const target = elTree.store.nodesMap[id];
    if (target) {
      if (target.expanded) {
        target.collapse();
        return false;
      }
      target.expand();
      return true;
    }
  };
  return { getTreeInstance, updateUI, triggerNodeExpand };
}
function formatNodeDropType(dropType) {
  switch (dropType) {
    case "inner":
      return "inner";
    case "before":
      return "prev";
    case "after":
      return "next";
    default:
      throw new core.RuntimeError(
        ibiz.i18n.t("control.tree.noSupported", { dropType })
      );
  }
}
function useAppTreeBase(c, props) {
  if (props.defaultExpandedKeys) {
    c.state.defaultExpandedKeys = props.defaultExpandedKeys;
  }
  const initSimpleData = () => {
    if (!props.data) {
      return;
    }
    const root = props.data.find((item) => {
      return item.isRoot === true;
    });
    if (root) {
      c.state.rootNodes = props.data;
      c.state.items = props.data;
    }
  };
  c.evt.on("onCreated", async () => {
    if (props.isSimple) {
      initSimpleData();
      c.state.isLoaded = true;
    }
  });
  vue.watch(
    () => props.data,
    () => {
      if (props.isSimple) {
        initSimpleData();
      }
    },
    {
      deep: true
    }
  );
}
function findChildItems(c, modelData, curItem) {
  const { detreeNodeRSs } = modelData;
  const children = [];
  if (!detreeNodeRSs || detreeNodeRSs.length === 0) {
    return children;
  }
  const rss = detreeNodeRSs.filter((_rss) => {
    var _a;
    const temp = c.state.items.find((_item) => {
      return _item._uuid === curItem.data._uuid;
    });
    if (temp) {
      return _rss.parentDETreeNodeId === ((_a = temp._nodeId) == null ? void 0 : _a.toLowerCase());
    }
    return false;
  });
  rss.sort((a, b) => {
    return a.ordervalue - b.ordervalue;
  });
  rss.forEach((_rss) => {
    const _children = c.state.items.filter((_item) => {
      var _a;
      return ((_a = _item._nodeId) == null ? void 0 : _a.toLowerCase()) === _rss.childDETreeNodeId;
    });
    if (_children.length) {
      _children.forEach((child) => {
        const temp = lodashEs.cloneDeep(child);
        temp._id = qxUtil.createUUID();
        children.push(temp);
      });
    }
  });
  return children;
}
function getNodeControlPanel(control) {
  if (control.controlRenders) {
    const controlRenders = control.controlRenders.filter(
      (item) => (item.id || "").split("_")[0] !== "newnoderender"
    );
    return runtime.getControlPanel({ controlRenders });
  }
}
function getNewNodeControlPanel(control) {
  if (control.controlRenders) {
    const controlRender = control.controlRenders.find(
      (item) => (item.id || "").split("_")[0] === "newnoderender"
    );
    if (!controlRender)
      return;
    if (controlRender.renderType === "LAYOUTPANEL_MODEL" && controlRender.layoutPanelModel) {
      const layoutPanelModel = runtime.ScriptFactory.execScriptFn(
        {},
        controlRender.layoutPanelModel,
        { isAsync: false }
      );
      return layoutPanelModel;
    }
    if (controlRender.renderType === "LAYOUTPANEL" && controlRender.layoutPanel) {
      return controlRender.layoutPanel;
    }
  }
}
function useLoadMoreUtil(treeRef, c) {
  const toLoadMoreNode = (parentId) => {
    const _loadMoreNodeData = {
      _id: "".concat(parentId, "_load_more"),
      _text: ibiz.i18n.t("control.common.loadMore"),
      _leaf: true,
      _disableSelect: true,
      _load_more: true
    };
    return _loadMoreNodeData;
  };
  const addLoadMoreNode = (parentId, parentNode) => {
    if (!treeRef.value || !parentId || !parentNode) {
      return;
    }
    const _loadMoreNodeData = toLoadMoreNode(parentId);
    if (treeRef.value.getNode(_loadMoreNodeData)) {
      treeRef.value.remove(_loadMoreNodeData);
    }
    const infoItems = c.getLoadMoreInfoItems(parentId);
    if (infoItems) {
      const result = infoItems.some((infoItem) => {
        return infoItem.curPage < infoItem.totalPage - 1;
      });
      if (result) {
        treeRef.value.append(_loadMoreNodeData, parentNode);
      }
    }
  };
  return {
    toLoadMoreNode,
    addLoadMoreNode
  };
}

exports.findChildItems = findChildItems;
exports.findNodeData = findNodeData;
exports.formatNodeDropType = formatNodeDropType;
exports.getNewNodeControlPanel = getNewNodeControlPanel;
exports.getNodeControlPanel = getNodeControlPanel;
exports.useAppTreeBase = useAppTreeBase;
exports.useElTreeUtil = useElTreeUtil;
exports.useLoadMoreUtil = useLoadMoreUtil;
