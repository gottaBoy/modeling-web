'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var lodashEs = require('lodash-es');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var elTreeUtil = require('./el-tree-util.cjs');
require('../../util/index.cjs');
require('./tree.css');
var contextMenu = require('../../util/context-menu/context-menu.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TreeControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeControl",
  props: {
    /**
     * @description 树模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 树节点默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description 是否单选
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    /**
     * @description 是否是导航的
     */
    navigational: {
      type: Boolean,
      default: void 0
    },
    /**
     * @description 默认展开节点集合
     */
    defaultExpandedKeys: {
      type: Array
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    },
    /**
     * @description 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
     * @default true
     */
    checkStrictly: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否是简单模式
     * @default false
     */
    isSimple: {
      type: Boolean,
      default: false
    },
    /**
     * @description 简单模式下传入的数据
     */
    data: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const c = vue3Util.useControlController((...args) => new runtime.TreeController(...args));
    elTreeUtil.useAppTreeBase(c, props);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const cascadeSelect = vue.ref(false);
    const menuShowMode = vue.ref("default");
    c.evt.on("onCreated", () => {
      if (c.controlParams.cascadeselect) {
        cascadeSelect.value = true;
      }
      if (c.controlParams.menushowmode) {
        menuShowMode.value = c.controlParams.menushowmode;
      }
    });
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const treeRef = vue.ref(null);
    const treeviewRef = vue.ref(null);
    const treeRefreshKey = vue.ref("");
    const treeNodeTextInputRef = vue.ref(null);
    const editingNodeKey = vue.ref(null);
    const editingNodeText = vue.ref(null);
    const newNodePanelRef = vue.ref();
    const newTreeNodeText = vue.ref(null);
    const newNodeModel = vue.ref(null);
    const newDefaultValue = vue.ref(null);
    const newNodeKey = vue.ref("".concat(qxUtil.createUUID(), "-").concat(qxUtil.createUUID()));
    const newNodeData = vue.ref(null);
    const newNodeDeData = vue.ref(null);
    const newNodeControlPanel = vue.ref(null);
    c.evt.on("onNewTreeNode", async (args) => {
      var _a;
      const {
        nodeModel,
        defaultValue,
        parentNodeData
      } = args;
      const {
        appId,
        appDataEntityId
      } = nodeModel;
      const entityModel = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);
      const layoutPanel = elTreeUtil.getNewNodeControlPanel(nodeModel);
      if (layoutPanel) {
        newNodeDeData.value = new runtime.AppDataEntity(entityModel, {});
        newNodeControlPanel.value = layoutPanel || null;
      }
      newDefaultValue.value = defaultValue;
      editingNodeKey.value = null;
      editingNodeText.value = null;
      if (newNodeData.value) {
        (_a = treeRef.value) == null ? void 0 : _a.remove(newNodeData.value);
        newNodeData.value = null;
      }
      if (parentNodeData && treeRef.value) {
        const _newNodeData = {};
        Object.assign(_newNodeData, {
          _id: newNodeKey.value,
          _text: "",
          _leaf: true
        });
        treeRef.value.append(_newNodeData, parentNodeData);
        newNodeData.value = _newNodeData;
      }
      newNodeModel.value = nodeModel;
    });
    vue.watch(() => treeNodeTextInputRef.value, (newVal) => {
      if (newVal) {
        newVal.$el.getElementsByTagName("input")[0].focus();
      }
    });
    c.evt.on("onSelectionChange", async () => {
      var _a;
      if (!treeRef.value)
        return;
      if (c.state.singleSelect) {
        treeRef.value.setCurrentKey((_a = c.state.selectedData[0]) == null ? void 0 : _a._id);
      } else {
        treeRef.value.setCheckedKeys(c.state.selectedData.map((item) => item._id));
      }
    });
    const editCurrentNodeText = () => {
      var _a;
      const currentkey = (_a = treeRef.value) == null ? void 0 : _a.getCurrentKey();
      if (!currentkey || currentkey === editingNodeKey.value) {
        return;
      }
      const nodeData = elTreeUtil.findNodeData(currentkey, c);
      const model = c.getNodeModel(nodeData._nodeId);
      if (model == null ? void 0 : model.allowEditText) {
        editingNodeKey.value = currentkey;
      }
    };
    const onNodeTextEditBlur = async () => {
      var _a;
      if (editingNodeKey.value) {
        if (editingNodeText.value) {
          const nodeData = elTreeUtil.findNodeData(editingNodeKey.value, c);
          await c.modifyNodeText(nodeData, editingNodeText.value);
          editingNodeKey.value = null;
          editingNodeText.value = null;
        } else {
          editingNodeKey.value = null;
        }
      }
      if (newNodeModel.value) {
        const hasNonNullValue = newNodeDeData.value && Object.values(newNodeDeData.value).some((_val) => !!_val);
        if (newNodeControlPanel.value && hasNonNullValue) {
          const {
            textAppDEFieldId,
            id
          } = newNodeModel.value;
          const nodeData = {
            _nodeId: id,
            _text: [newNodeDeData.value[textAppDEFieldId]],
            _deData: {}
          };
          Object.assign(nodeData._deData, newNodeDeData.value);
          if (newDefaultValue.value) {
            Object.keys(newDefaultValue.value).forEach((_key) => {
              if (!nodeData._deData[_key])
                Object.assign(nodeData._deData, {
                  [_key]: newDefaultValue.value[_key]
                });
            });
          }
          await c.createDeNodeData([nodeData]);
        } else if (newTreeNodeText.value) {
          const {
            textAppDEFieldId,
            id
          } = newNodeModel.value;
          const _text = newTreeNodeText.value;
          const nodeData = {
            _deData: {}
          };
          Object.assign(nodeData, {
            _nodeId: id,
            _text
          });
          if (newDefaultValue.value) {
            Object.assign(nodeData._deData, newDefaultValue.value);
          }
          Object.assign(nodeData._deData, {
            [textAppDEFieldId]: _text
          });
          await c.createDeNodeData([nodeData]);
        }
        newNodeModel.value = null;
        newTreeNodeText.value = null;
        newDefaultValue.value = null;
        newNodeDeData.value = null;
        newNodeControlPanel.value = null;
        newNodePanelRef.value = null;
        if (newNodeData.value)
          (_a = treeRef.value) == null ? void 0 : _a.remove(newNodeData.value);
        newNodeData.value = null;
      }
    };
    const onNodeTextEditEsc = async () => {
      var _a;
      if (editingNodeKey.value) {
        editingNodeKey.value = null;
        editingNodeText.value = null;
      }
      if (newNodeModel.value) {
        newNodeModel.value = null;
        newTreeNodeText.value = null;
        newDefaultValue.value = null;
        newNodeDeData.value = null;
        newNodeControlPanel.value = null;
        newNodePanelRef.value = null;
        if (newNodeData.value)
          (_a = treeRef.value) == null ? void 0 : _a.remove(newNodeData.value);
        newNodeData.value = null;
      }
    };
    const handleEditKeyDown = (e) => {
      e.stopPropagation();
      if (e.code === "Enter" || e.keyCode === 13) {
        onNodeTextEditBlur();
      }
      if (e.code === "Escape" || e.keyCode === 27) {
        onNodeTextEditEsc();
      }
    };
    const onPanelItemEvent = (_args) => {
      if (!_args)
        return;
      const {
        panelItemEventName
      } = _args;
      if (panelItemEventName === runtime.PanelItemEventName.ENTER) {
        onNodeTextEditBlur();
      }
    };
    const onPanelItemKeydown = (e) => {
      if (e.code === "Escape" || e.keyCode === 27)
        onNodeTextEditEsc();
    };
    const {
      updateUI,
      triggerNodeExpand
    } = elTreeUtil.useElTreeUtil(treeRef, c);
    const {
      addLoadMoreNode
    } = elTreeUtil.useLoadMoreUtil(treeRef, c);
    const toElNodes = (nodes) => {
      return nodes.map((node) => ({
        _id: node._id,
        _uuid: node._uuid,
        _leaf: node._leaf,
        _text: node._text,
        _disableSelect: node._disableSelect
      }));
    };
    c.evt.on("onAfterRefreshParent", (event) => {
      if (treeRef.value) {
        const {
          parentNode,
          children
        } = event;
        const elNodes = toElNodes(children);
        treeRef.value.updateKeyChildren(parentNode._id, elNodes);
        updateUI();
        vue.nextTick(() => {
          addLoadMoreNode(parentNode._id, parentNode);
        });
      }
    });
    c.evt.on("onAfterNodeDrop", (event) => {
      if (event.isChangedParent) {
        treeRefreshKey.value = qxUtil.createUUID();
      }
    });
    c.evt.on("onUpdateUI", () => {
      updateUI();
    });
    const treeData = vue.computed(() => {
      if (!c.state.isLoaded) {
        return [];
      }
      return c.model.rootVisible ? c.state.rootNodes : c.state.rootNodes.reduce((result, nodeData) => {
        if (nodeData._children) {
          return result.concat(nodeData._children);
        }
        return result;
      }, []);
    });
    vue.watch(treeData, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        treeRefreshKey.value = qxUtil.createUUID();
      }
    });
    vue.watch(() => c.state.expandedKeys, () => {
      updateUI();
    }, {
      deep: true
    });
    const loadData = async (item, callback) => {
      if (props.isSimple) {
        let children = [];
        if (item.level === 0) {
          const tempNodes = c.state.items.find((_item) => {
            return _item.isRoot;
          });
          if (tempNodes) {
            children = [tempNodes];
          }
        } else {
          children = elTreeUtil.findChildItems(c, props.modelData, item);
        }
        item._children = children;
        callback(toElNodes(children));
        updateUI();
        return;
      }
      let nodes;
      if (item.level === 0) {
        nodes = treeData.value;
        ibiz.log.debug("\u521D\u59CB\u52A0\u8F7D");
      } else {
        const nodeData = elTreeUtil.findNodeData(item.data._uuid, c);
        if (nodeData._children) {
          ibiz.log.debug("\u8282\u70B9\u5C55\u5F00\u52A0\u8F7D-\u672C\u5730", nodeData);
          nodes = nodeData._children;
        } else {
          ibiz.log.debug("\u8282\u70B9\u5C55\u5F00\u52A0\u8F7D-\u8FDC\u7A0B", nodeData);
          nodes = await c.loadNodes(nodeData);
        }
      }
      ibiz.log.debug("\u7ED9\u6811\u8FD4\u56DE\u503C", nodes);
      callback(toElNodes(nodes));
      updateUI();
      vue.nextTick(() => {
        var _a, _b, _c;
        addLoadMoreNode(item.level === 0 ? (_b = (_a = c.state.rootNodes) == null ? void 0 : _a[0]) == null ? void 0 : _b._id : (_c = item.data) == null ? void 0 : _c._id, item);
      });
    };
    const onCheck = (nodeData, opts) => {
      const {
        checkedNodes
      } = opts;
      c.setSelection(checkedNodes);
    };
    let forbidClick = false;
    const readonly = vue.computed(() => {
      return !!(c.context.srfreadonly === true || c.context.srfreadonly === "true");
    });
    const onNodeClick = (nodeData, data, evt) => {
      var _a, _b;
      evt.stopPropagation();
      if (nodeData._disableSelect || forbidClick)
        return;
      if (((_a = treeRef.value) == null ? void 0 : _a.getCurrentKey()) === nodeData._id && !readonly.value) {
        editCurrentNodeText();
      }
      (_b = treeRef.value) == null ? void 0 : _b.setCurrentKey(nodeData._id);
      if (c.state.navigational) {
        const nodeModel = c.getNodeModel(nodeData._nodeId);
        if (!(nodeModel == null ? void 0 : nodeModel.navAppViewId)) {
          const expanded = triggerNodeExpand(nodeData._id);
          c.onExpandChange(nodeData, expanded);
        }
      }
      if (props.isSimple) {
        treeRef.value.setCurrentKey(data == null ? void 0 : data._id);
      } else {
        c.onTreeNodeClick(nodeData, evt);
      }
      forbidClick = true;
      setTimeout(() => {
        forbidClick = false;
      }, 200);
    };
    const onNodeDbClick = (nodeData, evt) => {
      evt.stopPropagation();
      if (nodeData._disableSelect)
        return;
      c.onDbTreeNodeClick(nodeData);
    };
    let ContextMenu;
    c.evt.on("onMounted", () => {
      if (Object.values(c.contextMenus).length > 0) {
        const importMenu = () => import('@imengyu/vue3-context-menu');
        importMenu().then((value) => {
          ContextMenu = value.default;
          if (ContextMenu.default && !ContextMenu.showContextMenu) {
            ContextMenu = ContextMenu.default;
          }
        });
      }
    });
    const iBizRawItem = vue.resolveComponent("IBizRawItem");
    const iBizIcon = vue.resolveComponent("IBizIcon");
    const {
      calcUiactionGroup
    } = contextMenu.useContextMenu();
    const calcContextMenuItems = (toolbarItems, nodeData, evt, menuState) => {
      const result = [];
      toolbarItems.forEach((item) => {
        var _a;
        if (item.itemType === "SEPERATOR") {
          result.push({
            divided: "self"
          });
          return;
        }
        const buttonState = menuState[item.id];
        if (buttonState && !buttonState.visible) {
          return;
        }
        let menuItem = {};
        if (item.showCaption && item.caption) {
          menuItem.label = item.caption;
        }
        if (item.sysImage && item.showIcon) {
          menuItem.icon = vue.createVNode(iBizIcon, {
            "icon": item.sysImage
          }, null);
        }
        if (item.itemType === "DEUIACTION") {
          menuItem.disabled = buttonState.disabled;
          menuItem.clickClose = true;
          const {
            uiactionId
          } = item;
          if (uiactionId) {
            menuItem.onClick = () => {
              c.doUIAction(uiactionId, nodeData, evt, item.appId);
            };
          }
        } else if (item.itemType === "RAWITEM") {
          const {
            rawItem
          } = item;
          if (rawItem) {
            menuItem.label = vue.createVNode(iBizRawItem, {
              "rawItem": item
            }, null);
          }
        } else if (item.itemType === "ITEMS") {
          const group = item;
          if ((_a = group.detoolbarItems) == null ? void 0 : _a.length) {
            menuItem.children = calcContextMenuItems(group.detoolbarItems, nodeData, evt, menuState);
          }
          if (group.uiactionGroup && group.groupExtractMode) {
            const menuItems = calcUiactionGroup(group.uiactionGroup, menuState, (detail) => {
              ContextMenu.closeContextMenu();
              c.doUIAction(detail.uiactionId, nodeData, evt, detail.appId);
            });
            switch (group.groupExtractMode) {
              case "ITEMS":
                menuItem.children = menuItems;
                break;
              case "ITEMX":
                if (menuItems) {
                  menuItem = menuItems[0];
                  menuItem.children = menuItems.slice(1);
                }
                break;
              case "ITEM":
              default:
                menuItem = void 0;
                if (menuItems) {
                  result.push(...menuItems);
                }
                break;
            }
          }
        }
        if (menuItem) {
          result.push(menuItem);
        }
      });
      return result;
    };
    const onNodeContextmenu = async (nodeData, evt) => {
      var _a;
      evt.preventDefault();
      evt.stopPropagation();
      let stopClickTag = ibiz.config.tree.contextMenuRightClickInvoke;
      if ((_a = c.controlParams) == null ? void 0 : _a.contextmenurightclickinvoke) {
        stopClickTag = Object.is(c.controlParams.contextmenurightclickinvoke, "true");
      }
      if (!stopClickTag) {
        return;
      }
      const nodeModel = c.getNodeModel(nodeData._nodeId);
      if (!(nodeModel == null ? void 0 : nodeModel.decontextMenu)) {
        return;
      }
      const contextMenuC = c.contextMenus[nodeModel.decontextMenu.id];
      if (!contextMenuC.model.detoolbarItems) {
        return;
      }
      await contextMenuC.calcButtonState(nodeData._deData || (nodeData.srfkey ? nodeData : void 0), nodeModel.appDataEntityId, {
        view: c.view,
        ctrl: c
      });
      const menuState = contextMenuC.state.buttonsState;
      const menus = calcContextMenuItems(contextMenuC.model.detoolbarItems, nodeData, evt, menuState);
      if (!menus.length) {
        return;
      }
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        customClass: ns.b("context-menu"),
        items: menus
      });
    };
    const renderContextMenu = (nodeModel, nodeData) => {
      var _a, _b;
      if (!((_b = (_a = nodeModel == null ? void 0 : nodeModel.decontextMenu) == null ? void 0 : _a.detoolbarItems) == null ? void 0 : _b.length)) {
        return;
      }
      const menuInfo = c.contextMenuInfos[nodeModel.id];
      if (menuInfo.clickTBUIActionItem && menuInfo.onlyOneActionItem) {
        return null;
      }
      return vue.createVNode(vue.resolveComponent("iBizContextMenuControl"), {
        "class": [ns.bem("node", "buttons", menuShowMode.value), semanticClass("item.menu", {
          data: nodeData,
          model: nodeModel
        })],
        "style": semanticStyle("item.menu", {
          data: nodeData,
          model: nodeModel
        }),
        "modelData": nodeModel.decontextMenu,
        "groupLevelKeys": [50, 100],
        "nodeModel": nodeModel,
        "nodeData": nodeData,
        "context": c.context,
        "actionCallBack": (detail, e) => c.doUIAction(detail.uiactionId, nodeData, e, detail.appId)
      }, null);
    };
    const updateNodeExpand = (data, expanded) => {
      const nodeData = elTreeUtil.findNodeData(data._uuid, c);
      if (!nodeData) {
        throw new core.RuntimeError(ibiz.i18n.t("control.common.noFoundNode", {
          id: data._uuid
        }));
      }
      if (props.isSimple) {
        const tempData = lodashEs.cloneDeep(nodeData);
        tempData._id = data._id;
        c.onExpandChange(tempData, expanded);
      } else {
        c.onExpandChange(nodeData, expanded);
      }
    };
    const debounceSearch = lodashEs.debounce(() => {
      c.load();
    }, 500);
    const onInput = (value) => {
      c.state.query = value;
      debounceSearch();
    };
    const allowDrop = (draggingNode, dropNode, type) => {
      var _a;
      if ((_a = dropNode.data) == null ? void 0 : _a._load_more) {
        return false;
      }
      const draggingNodeData = elTreeUtil.findNodeData(draggingNode.data._uuid, c);
      const dropNodeData = elTreeUtil.findNodeData(dropNode.data._uuid, c);
      const result = c.calcAllowDrop(draggingNodeData, dropNodeData, type);
      return result;
    };
    const allowDrag = (draggingNode) => {
      var _a;
      if ((_a = draggingNode.data) == null ? void 0 : _a._load_more) {
        return false;
      }
      const nodeData = elTreeUtil.findNodeData(draggingNode.data._uuid, c);
      return c.calcAllowDrag(nodeData);
    };
    const handleDrop = (draggingNode, dropNode, dropType) => {
      const type = elTreeUtil.formatNodeDropType(dropType);
      const draggingNodeData = elTreeUtil.findNodeData(draggingNode.data._uuid, c);
      const dropNodeData = elTreeUtil.findNodeData(dropNode.data._uuid, c);
      c.onNodeDrop(draggingNodeData, dropNodeData, type);
    };
    const keydownHandle = (e) => {
      if (e.code === "F2" || e.code === "Enter") {
        editCurrentNodeText();
      }
    };
    const handleMouseup = () => {
      var _a;
      const isFoucs = (_a = newNodePanelRef.value) == null ? void 0 : _a.$el.querySelector(".is-focus");
      if (newNodeControlPanel.value && !isFoucs)
        onNodeTextEditBlur();
    };
    vue.onMounted(() => {
      var _a;
      document.addEventListener("mouseup", handleMouseup.bind(this));
      (_a = treeviewRef.value) == null ? void 0 : _a.$el.addEventListener("keydown", keydownHandle);
    });
    vue.onUnmounted(() => {
      var _a;
      document.removeEventListener("mouseup", handleMouseup.bind(this));
      (_a = treeviewRef.value) == null ? void 0 : _a.$el.removeEventListener("keydown", keydownHandle);
    });
    const renderCounter = (nodeModel, nodeData) => {
      if (nodeModel.counterId) {
        let counterId = nodeModel.counterId;
        if (nodeModel.treeNodeType === "CODELIST") {
          counterId = "".concat(counterId, "__").concat(nodeData._value);
        }
        const value = c.state.counterData[counterId];
        return vue.createVNode(vue.resolveComponent("iBizBadge"), {
          "value": value,
          "class": [ns.e("counter"), semanticClass("item.counter"), {
            data: nodeData,
            model: nodeModel
          }],
          "style": semanticStyle("item.counter", {
            data: nodeData,
            model: nodeModel
          }),
          "counterMode": nodeModel.counterMode
        }, null);
      }
    };
    const renderNewNode = () => {
      var _a, _b, _c, _d;
      if (!newNodeModel.value) {
        return null;
      }
      if (newNodeControlPanel.value) {
        return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
          "class": [ns.b("new-node"), (_a = newNodeModel.value.sysCss) == null ? void 0 : _a.cssName],
          "ref": newNodePanelRef,
          "data": newNodeDeData.value,
          "modelData": newNodeControlPanel.value,
          "context": c.context,
          "params": c.params,
          "onMouseup": (_e) => _e.stopPropagation(),
          "onPanelItemEvent": onPanelItemEvent,
          "onKeydown": onPanelItemKeydown
        }, null);
      }
      return vue.createVNode("div", {
        "class": [ns.b("new-node"), (_b = newNodeModel.value.sysCss) == null ? void 0 : _b.cssName],
        "onClick": (_e) => {
          _e.preventDefault();
          _e.stopPropagation();
        }
      }, [((_c = newNodeModel.value) == null ? void 0 : _c.sysImage) ? vue.createVNode(iBizIcon, {
        "class": ns.be("node", "icon"),
        "icon": (_d = newNodeModel.value) == null ? void 0 : _d.sysImage
      }, null) : null, vue.createVNode(vue.resolveComponent("el-input"), {
        "modelValue": newTreeNodeText.value,
        "onUpdate:modelValue": ($event) => newTreeNodeText.value = $event,
        "ref": "treeNodeTextInputRef",
        "class": ns.b("editing-node"),
        "onBlur": () => {
          onNodeTextEditBlur();
        },
        "onKeydown": (e) => {
          handleEditKeyDown(e);
        }
      }, null)]);
    };
    const handleLoadMore = async (e, item) => {
      var _a, _b;
      e.stopPropagation();
      if (!item) {
        return;
      }
      if (item.level === 0) {
        await c.loadNodes(void 0, true);
        return;
      }
      const nodeData = elTreeUtil.findNodeData((_a = item.data) == null ? void 0 : _a._uuid, c);
      if (!nodeData) {
        return;
      }
      await c.loadNodes(nodeData, true);
      const elNodes = toElNodes(nodeData._children || []);
      (_b = treeRef.value) == null ? void 0 : _b.updateKeyChildren(nodeData._id, elNodes);
      updateUI();
      vue.nextTick(() => {
        addLoadMoreNode(nodeData._id, nodeData);
      });
    };
    return {
      c,
      ns,
      treeRef,
      treeviewRef,
      treeNodeTextInputRef,
      treeData,
      treeRefreshKey,
      editingNodeKey,
      editingNodeText,
      cascadeSelect,
      newNodeKey,
      newNodeData,
      findNodeData: elTreeUtil.findNodeData,
      onCheck,
      onNodeClick,
      onNodeDbClick,
      onNodeContextmenu,
      loadData,
      renderContextMenu,
      renderCounter,
      updateNodeExpand,
      onInput,
      allowDrop,
      allowDrag,
      handleDrop,
      onNodeTextEditBlur,
      renderNewNode,
      handleEditKeyDown,
      handleLoadMore,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const slots = {
      searchbar: () => {
        if (!this.c.enableQuickSearch) {
          return null;
        }
        return vue.createVNode(vue.resolveComponent("el-input"), {
          "model-value": this.c.state.query,
          "class": [this.ns.b("quick-search"), this.semanticClass("search")],
          "style": this.semanticStyle("search"),
          "placeholder": this.c.state.placeHolder,
          "onInput": this.onInput
        }, {
          prefix: () => {
            return vue.createVNode("ion-icon", {
              "class": this.ns.e("search-icon"),
              "name": "search"
            }, null);
          }
        });
      }
    };
    const key = this.c.controlPanel ? "tree" : "default";
    slots[key] = () => {
      if (this.c.state.isLoaded && this.treeRefreshKey) {
        return [vue.createVNode(vue.resolveComponent("el-tree"), vue.mergeProps({
          "ref": "treeRef",
          "class": [this.ns.b("tree"), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "key": this.treeRefreshKey,
          "node-key": "_id",
          "highlight-current": true,
          "expand-on-click-node": false,
          "auto-expand-parent": false,
          "show-checkbox": !this.c.state.singleSelect,
          "check-strictly": !this.cascadeSelect && this.checkStrictly,
          "default-expanded-keys": this.c.state.expandedKeys,
          "props": {
            label: "_text",
            children: "_children",
            isLeaf: "_leaf",
            disabled: "_disableSelect",
            class: (data) => {
              if (data == null ? void 0 : data._load_more) {
                return [this.ns.is("load-more", true), this.semanticClass("more", {
                  data
                })];
              }
              return "";
            }
          },
          "lazy": true,
          "load": this.loadData,
          "onCheck": this.onCheck,
          "onNodeExpand": (data) => {
            this.updateNodeExpand(data, true);
          },
          "onNodeCollapse": (data) => {
            this.updateNodeExpand(data, false);
          },
          "draggable": true,
          "allow-drop": this.allowDrop,
          "allow-drag": this.allowDrag,
          "onNodeDrop": this.handleDrop
        }, this.$attrs), {
          default: ({
            data,
            node
          }) => {
            var _a, _b, _c;
            if (data._load_more) {
              return vue.createVNode("div", {
                "class": this.ns.b("node"),
                "onClick": (e) => {
                  this.handleLoadMore(e, node == null ? void 0 : node.parent);
                }
              }, [data._text]);
            }
            if (this.newNodeKey === data._id)
              return this.renderNewNode();
            const nodeData = this.findNodeData(data._uuid, this.c);
            if (!nodeData) {
              return null;
            }
            const nodeModel = this.c.getNodeModel(nodeData._nodeId);
            if (this.editingNodeKey === nodeData._id) {
              return vue.createVNode("div", {
                "class": [this.ns.b("node"), (_a = nodeModel.sysCss) == null ? void 0 : _a.cssName, nodeData._dynaClass]
              }, [vue.createVNode(vue.resolveComponent("el-input"), {
                "modelValue": this.editingNodeText,
                "onUpdate:modelValue": ($event) => this.editingNodeText = $event,
                "ref": "treeNodeTextInputRef",
                "class": this.ns.b("editing-node"),
                "onBlur": () => {
                  this.onNodeTextEditBlur();
                },
                "onKeydown": (e) => {
                  this.handleEditKeyDown(e);
                }
              }, null)]);
            }
            const layoutPanel = elTreeUtil.getNodeControlPanel(nodeModel);
            let content;
            if (layoutPanel) {
              content = vue.createVNode(vue.resolveComponent("iBizControlShell"), {
                "data": nodeData,
                "modelData": layoutPanel,
                "context": this.c.context,
                "params": this.c.params
              }, null);
            } else {
              content = [nodeData._icon ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
                "class": [this.ns.be("node", "icon"), (_b = nodeModel.shapeSysCss) == null ? void 0 : _b.cssName, this.semanticClass("item.icon", {
                  data,
                  node
                }), nodeData._shapeDynaClass],
                "style": this.semanticStyle("item.icon", {
                  data,
                  node
                }),
                "icon": nodeData._icon
              }, null) : null, nodeData._textHtml ? vue.createVNode("span", {
                "class": [this.ns.be("node", "label"), this.semanticClass("item.caption", {
                  data,
                  node
                })],
                "style": this.semanticStyle("item.caption", {
                  data,
                  node
                }),
                "innerHTML": nodeData._textHtml
              }, null) : vue.createVNode("span", {
                "class": [this.ns.be("node", "label"), this.semanticClass("item.caption", {
                  data,
                  node
                })],
                "style": this.semanticStyle("item.caption", {
                  data,
                  node
                })
              }, [nodeData._text])];
            }
            return vue.createVNode("div", {
              "class": [this.ns.b("node"), this.semanticClass("item", {
                data,
                node
              }), nodeData._disableSelect ? this.ns.bm("node", "disabled") : "", (_c = nodeModel.sysCss) == null ? void 0 : _c.cssName, nodeData._dynaClass],
              "style": this.semanticStyle("item", {
                data,
                node
              }),
              "title": nodeData._text,
              "onDblclick": (evt) => this.onNodeDbClick(nodeData, evt),
              "onClick": (evt) => this.onNodeClick(nodeData, data, evt),
              "onContextmenu": (evt) => this.onNodeContextmenu(nodeData, evt)
            }, [content, this.renderCounter(nodeModel, nodeData), this.renderContextMenu(nodeModel, nodeData)]);
          }
        }), !this.newNodeData && this.renderNewNode(), this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null];
      }
    };
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "ref": "treeviewRef",
        "controller": this.c,
        "class": this.semanticClass("root"),
        "style": this.semanticStyle("root"),
        "element-loading-text": this.c.state.loadingText
      }, _isSlot(slots) ? slots : {
        default: () => [slots]
      }), [[vue.resolveDirective("loading"), this.c.state.isLoading]])]
    });
  }
});

exports.TreeControl = TreeControl;
