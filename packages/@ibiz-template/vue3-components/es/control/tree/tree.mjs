import { isVNode, defineComponent, ref, reactive, onUnmounted, watch, computed, nextTick, resolveComponent, createVNode, onMounted, mergeProps, withDirectives, resolveDirective } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { cloneDeep, debounce } from 'lodash-es';
import { TreeController, getControlPanel } from '@ibiz-template/runtime';
import './tree.css';
import { RuntimeError } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { useAppTreeBase, findNodeData, useElTreeUtil, findChildItems, formatNodeDropType } from './el-tree-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TreeControl = /* @__PURE__ */ defineComponent({
  name: "IBizTreeControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    navigational: {
      type: Boolean,
      default: void 0
    },
    defaultExpandedKeys: {
      type: Array
    },
    loadDefault: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: true
    },
    isSimple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const c = useControlController((...args) => new TreeController(...args));
    useAppTreeBase(c, props);
    const cascadeSelect = ref(false);
    const counterData = reactive({});
    const fn = (counter) => {
      Object.assign(counterData, counter);
    };
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
      if (c.controlParams.cascadeselect) {
        cascadeSelect.value = true;
      }
    });
    onUnmounted(() => {
      var _a;
      (_a = c.counter) == null ? void 0 : _a.offChange(fn);
    });
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const treeRef = ref(null);
    const treeviewRef = ref(null);
    const treeRefreshKey = ref("");
    const treeNodeTextInputRef = ref(null);
    const editingNodeKey = ref(null);
    const editingNodeText = ref(null);
    const newTreeNodeText = ref(null);
    const newNodeModel = ref(null);
    const newDefaultValue = ref(null);
    c.evt.on("onNewTreeNode", (args) => {
      const {
        nodeModel,
        defaultValue
      } = args;
      newNodeModel.value = nodeModel;
      newDefaultValue.value = defaultValue;
      editingNodeKey.value = null;
      editingNodeText.value = null;
    });
    watch(() => treeNodeTextInputRef.value, (newVal) => {
      if (newVal) {
        newVal.$el.getElementsByTagName("input")[0].focus();
      }
    });
    const editCurrentNodeText = () => {
      var _a;
      const currentkey = (_a = treeRef.value) == null ? void 0 : _a.getCurrentKey();
      if (!currentkey || currentkey === editingNodeKey.value) {
        return;
      }
      const nodeData = findNodeData(currentkey, c);
      const model = c.getNodeModel(nodeData._nodeId);
      if (model == null ? void 0 : model.allowEditText) {
        editingNodeKey.value = currentkey;
      }
    };
    const onNodeTextEditBlur = async () => {
      if (editingNodeKey.value) {
        if (editingNodeText.value) {
          const nodeData = findNodeData(editingNodeKey.value, c);
          await c.modifyNodeText(nodeData, editingNodeText.value);
          editingNodeKey.value = null;
          editingNodeText.value = null;
        } else {
          editingNodeKey.value = null;
        }
      }
      if (newNodeModel.value) {
        if (newTreeNodeText.value) {
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
      }
    };
    const onNodeTextEditEsc = async () => {
      if (editingNodeKey.value) {
        editingNodeKey.value = null;
        editingNodeText.value = null;
      }
      if (newNodeModel.value) {
        newNodeModel.value = null;
        newTreeNodeText.value = null;
        newDefaultValue.value = null;
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
    const {
      updateUI,
      triggerNodeExpand
    } = useElTreeUtil(treeRef, c);
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
      }
    });
    c.evt.on("onAfterNodeDrop", (event) => {
      if (event.isChangedParent) {
        treeRefreshKey.value = createUUID();
      }
    });
    const treeData = computed(() => {
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
    watch(treeData, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        treeRefreshKey.value = createUUID();
      }
    });
    watch(() => c.state.expandedKeys, () => {
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
          children = findChildItems(c, props.modelData, item);
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
        const nodeData = findNodeData(item.data._uuid, c);
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
    };
    let selectionWait = false;
    c.evt.on("onLoadSuccess", () => {
      selectionWait = true;
      setTimeout(() => {
        selectionWait = false;
      }, 200);
    });
    c.evt.on("onSelectionChange", async () => {
      var _a;
      if (selectionWait) {
        await nextTick();
      }
      if (c.state.singleSelect) {
        treeRef.value.setCurrentKey(((_a = c.state.selectedData[0]) == null ? void 0 : _a._id) || void 0);
      } else {
        treeRef.value.setCheckedKeys(c.state.selectedData.map((item) => item._id));
      }
    });
    const onCheck = (nodeData, opts) => {
      const {
        checkedNodes
      } = opts;
      c.setSelection(checkedNodes);
    };
    let forbidClick = false;
    const readonly = computed(() => {
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
      if (!c.state.singleSelect) {
        (_b = treeRef.value) == null ? void 0 : _b.setCurrentKey(nodeData._id);
      }
      if (c.state.navigational) {
        const nodeModel = c.getNodeModel(nodeData._nodeId);
        if (!(nodeModel == null ? void 0 : nodeModel.navAppViewId)) {
          const expanded = triggerNodeExpand(nodeData._id);
          c.onExpandChange(nodeData, expanded);
        }
      }
      if (props.isSimple) {
        treeRef.value.setCurrentKey((data == null ? void 0 : data._id) || void 0);
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
    const iBizRawItem = resolveComponent("IBizRawItem");
    const iBizIcon = resolveComponent("IBizIcon");
    const calcContextMenuItems = (toolbarItems, nodeData, evt, menuState) => {
      const result = [];
      toolbarItems.forEach((item) => {
        var _a, _b;
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
          menuItem.icon = createVNode(iBizIcon, {
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
            menuItem.label = createVNode(iBizRawItem, {
              "rawItem": item
            }, null);
          }
        } else if (item.itemType === "ITEMS") {
          const group = item;
          if ((_a = group.detoolbarItems) == null ? void 0 : _a.length) {
            menuItem.children = calcContextMenuItems(group.detoolbarItems, nodeData, evt, menuState);
          }
          if (group.uiactionGroup && group.groupExtractMode) {
            const menuItems = (_b = group.uiactionGroup.uiactionGroupDetails) == null ? void 0 : _b.filter((detail) => {
              const detailState = menuState[detail.id];
              return detailState.visible;
            }).map((detail) => {
              const detailState = menuState[detail.id];
              const {
                sysImage
              } = detail;
              return {
                label: detail.showCaption ? detail.caption : void 0,
                icon: detail.showIcon ? createVNode(iBizIcon, {
                  "icon": sysImage
                }, null) : void 0,
                disabled: detailState.disabled,
                clickableWhenHasChildren: true,
                onClick: () => {
                  ContextMenu.closeContextMenu();
                  c.doUIAction(detail.uiactionId, nodeData, evt, detail.appId);
                }
              };
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
      await contextMenuC.calcButtonState(nodeData._deData || (nodeData.srfkey ? nodeData : void 0), nodeModel.appDataEntityId);
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
      return createVNode(resolveComponent("iBizContextMenuControl"), {
        "modelData": nodeModel.decontextMenu,
        "groupLevelKeys": [50, 100],
        "nodeModel": nodeModel,
        "nodeData": nodeData,
        "context": c.context,
        "actionCallBack": (detail, e) => c.doUIAction(detail.uiactionId, nodeData, e, detail.appId)
      }, null);
    };
    const updateNodeExpand = (data, expanded) => {
      const nodeData = findNodeData(data._uuid, c);
      if (!nodeData) {
        throw new RuntimeError(ibiz.i18n.t("control.common.noFoundNode", {
          id: data._uuid
        }));
      }
      if (props.isSimple) {
        const tempData = cloneDeep(nodeData);
        tempData._id = data._id;
        c.onExpandChange(tempData, expanded);
      } else {
        c.onExpandChange(nodeData, expanded);
      }
    };
    const debounceSearch = debounce(() => {
      c.load();
    }, 500);
    const onInput = (value) => {
      c.state.query = value;
      debounceSearch();
    };
    const allowDrop = (draggingNode, dropNode, type) => {
      const draggingNodeData = findNodeData(draggingNode.data._uuid, c);
      const dropNodeData = findNodeData(dropNode.data._uuid, c);
      const result = c.calcAllowDrop(draggingNodeData, dropNodeData, type);
      return result;
    };
    const allowDrag = (draggingNode) => {
      const nodeData = findNodeData(draggingNode.data._uuid, c);
      return c.calcAllowDrag(nodeData);
    };
    const handleDrop = (draggingNode, dropNode, dropType) => {
      const type = formatNodeDropType(dropType);
      const draggingNodeData = findNodeData(draggingNode.data._uuid, c);
      const dropNodeData = findNodeData(dropNode.data._uuid, c);
      c.onNodeDrop(draggingNodeData, dropNodeData, type);
    };
    const keydownHandle = (e) => {
      if (e.code === "F2" || e.code === "Enter") {
        editCurrentNodeText();
      }
    };
    onMounted(() => {
      var _a;
      (_a = treeviewRef.value) == null ? void 0 : _a.$el.addEventListener("keydown", keydownHandle);
    });
    onUnmounted(() => {
      var _a;
      (_a = treeviewRef.value) == null ? void 0 : _a.$el.removeEventListener("keydown", keydownHandle);
    });
    const renderCounter = (nodeModel) => {
      if (nodeModel.counterId) {
        const value = counterData[nodeModel.counterId];
        if (isNil(value)) {
          return null;
        }
        if (nodeModel.counterMode === 1 && value === 0) {
          return null;
        }
        return createVNode(resolveComponent("iBizBadge"), {
          "class": ns.e("counter"),
          "value": value
        }, null);
      }
    };
    const renderNewNode = () => {
      var _a, _b, _c;
      if (!newNodeModel.value) {
        return null;
      }
      return createVNode("div", {
        "class": [ns.b("new-node"), (_a = newNodeModel.value.sysCss) == null ? void 0 : _a.cssName]
      }, [((_b = newNodeModel.value) == null ? void 0 : _b.sysImage) ? createVNode(iBizIcon, {
        "class": ns.be("node", "icon"),
        "icon": (_c = newNodeModel.value) == null ? void 0 : _c.sysImage
      }, null) : null, createVNode(resolveComponent("el-input"), {
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
      findNodeData,
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
      handleEditKeyDown
    };
  },
  render() {
    const slots = {
      searchbar: () => {
        if (!this.c.enableQuickSearch) {
          return null;
        }
        return createVNode(resolveComponent("el-input"), {
          "model-value": this.c.state.query,
          "class": this.ns.b("quick-search"),
          "placeholder": this.c.state.placeHolder,
          "onInput": this.onInput
        }, {
          prefix: () => {
            return createVNode("ion-icon", {
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
        return [createVNode(resolveComponent("el-tree"), mergeProps({
          "ref": "treeRef",
          "class": this.ns.b("tree"),
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
            disabled: "_disableSelect"
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
            data
          }) => {
            var _a, _b;
            const nodeData = this.findNodeData(data._uuid, this.c);
            if (!nodeData) {
              return null;
            }
            const nodeModel = this.c.getNodeModel(nodeData._nodeId);
            if (this.editingNodeKey === nodeData._id) {
              return createVNode("div", {
                "class": [this.ns.b("node"), (_a = nodeModel.sysCss) == null ? void 0 : _a.cssName]
              }, [createVNode(resolveComponent("el-input"), {
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
            const layoutPanel = getControlPanel(nodeModel);
            let content;
            if (layoutPanel) {
              content = createVNode(resolveComponent("iBizControlShell"), {
                "data": nodeData,
                "modelData": layoutPanel,
                "context": this.c.context,
                "params": this.c.params
              }, null);
            } else {
              content = [nodeData._icon ? createVNode(resolveComponent("iBizIcon"), {
                "class": this.ns.be("node", "icon"),
                "icon": nodeData._icon
              }, null) : null, nodeData._textHtml ? createVNode("span", {
                "class": this.ns.be("node", "label"),
                "innerHTML": nodeData._textHtml
              }, null) : createVNode("span", {
                "class": this.ns.be("node", "label")
              }, [nodeData._text])];
            }
            return createVNode("div", {
              "onDblclick": (evt) => this.onNodeDbClick(nodeData, evt),
              "onClick": (evt) => this.onNodeClick(nodeData, data, evt),
              "onContextmenu": (evt) => this.onNodeContextmenu(nodeData, evt),
              "class": [this.ns.b("node"), nodeData._disableSelect ? this.ns.bm("node", "disabled") : "", (_b = nodeModel.sysCss) == null ? void 0 : _b.cssName]
            }, [content, this.renderCounter(nodeModel), this.renderContextMenu(nodeModel, nodeData)]);
          }
        }), this.renderNewNode(), this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null];
      }
    };
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [withDirectives(createVNode(resolveComponent("iBizControlBase"), {
        "ref": "treeviewRef",
        "controller": this.c
      }, _isSlot(slots) ? slots : {
        default: () => [slots]
      }), [[resolveDirective("loading"), this.c.state.isLoading]])]
    });
  }
});

export { TreeControl };
