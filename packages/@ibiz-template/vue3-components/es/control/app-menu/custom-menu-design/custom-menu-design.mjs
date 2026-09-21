import { isVNode, defineComponent, ref, onMounted, createVNode, resolveComponent } from 'vue';
import { formatSeparator } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RuntimeError, showTitle } from '@ibiz-template/core';
import { cloneDeep } from 'lodash-es';
import './custom-menu-design.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderByProvider(itemId, c) {
  const itemModel = c.allAppMenuItems.find((item) => item.id === itemId);
  if (!itemModel) {
    throw new RuntimeError("".concat(ibiz.i18n.t("control.menuDesign.noMenuItemModel", {
      menu: itemId
    })));
  }
  const provider = c.itemProviders[itemId];
  if (!provider.renderText) {
    throw new RuntimeError("".concat(ibiz.i18n.t("control.menuDesign.noProviderRenderText", {
      menu: itemId
    })));
  }
  return provider.renderText(itemModel, c);
}
const MenuDesign = /* @__PURE__ */ defineComponent({
  name: "IBizMenuDesign",
  props: {
    controller: {
      type: Object,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  emits: ["saved", "reset"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("menu-design");
    const c = props.controller;
    const loading = ref(false);
    const visible = ref(false);
    const configs = ref([]);
    const hideSeparator = ref([]);
    onMounted(() => {
      hideSeparator.value = formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState);
    });
    const stopExpand = (event) => {
      event.stopPropagation();
    };
    const handleMenusSaveData = (items) => {
      const tempItems = [];
      items.forEach((item) => {
        var _a;
        const config = {
          key: item.key,
          name: item.label,
          type: item.itemType,
          visible: item.config.visible
        };
        if ((_a = item.children) == null ? void 0 : _a.length) {
          config.children = handleMenusSaveData(item.children);
        }
        tempItems.push(config);
      });
      return tempItems;
    };
    const collapseGroup = (menu) => {
      menu.isCollapse = !menu.isCollapse;
    };
    const flattenConfigs = (items) => {
      const result = [];
      items.forEach((item) => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          const tempResult = flattenConfigs(item.children);
          result.push(...tempResult);
        }
      });
      return result;
    };
    const mergeMenusConfig = (items) => {
      let customConfig = [];
      if (c.saveConfigs && c.saveConfigs.length > 0) {
        customConfig = flattenConfigs(c.saveConfigs);
      }
      return items.map((item) => {
        var _a;
        const target = customConfig.find((_item) => {
          return _item.key === item.key;
        });
        const data = {
          ...item,
          isCollapse: true,
          config: {
            visible: true
          }
        };
        if ((_a = item.children) == null ? void 0 : _a.length) {
          data.children = mergeMenusConfig(item.children);
        }
        if (target) {
          Object.assign(data, {
            config: {
              visible: target.visible
            }
          });
        }
        return data;
      });
    };
    const onReset = async () => {
      c.saveConfigs = [];
      await c.customController.resetCustomModelData();
      configs.value = mergeMenusConfig(cloneDeep(props.menus));
      emit("reset");
    };
    const onSave = async () => {
      loading.value = true;
      const saveConfig = handleMenusSaveData(configs.value);
      await c.customController.saveCustomModelData(saveConfig);
      c.saveConfigs = saveConfig;
      loading.value = false;
      emit("saved", saveConfig);
    };
    const renderMenuItem = (menu) => {
      var _a;
      if (!((_a = c.state.menuItemsState[menu.key]) == null ? void 0 : _a.visible)) {
        return;
      }
      if (hideSeparator.value.includes(menu.key)) {
        return;
      }
      if (menu.itemType === "MENUITEM") {
        let content;
        const provider = c.itemProviders[menu.key];
        if (provider && provider.renderText) {
          content = renderByProvider(menu.key, c);
        } else {
          content = [menu.image ? createVNode(resolveComponent("iBizIcon"), {
            "class": ns.e("icon"),
            "icon": menu.image
          }, null) : null, createVNode("span", null, [menu.label])];
        }
        return content;
      }
      if (menu.itemType === "SEPERATOR") {
        const direction = c.view.model.mainMenuAlign === "TOP" ? "vertical" : "horizontal";
        return createVNode("div", {
          "class": ns.be("content", "menu-seperator")
        }, [createVNode(resolveComponent("el-divider"), {
          "direction": direction,
          "class": ns.e("separator"),
          "id": menu.key
        }, null)]);
      }
    };
    const renderGroupIcon = (item) => {
      if (item.children && item.children.length > 0) {
        if (item.isCollapse) {
          return createVNode("i", {
            "class": [ns.be("menu-set-drawer", "group-icon"), "fa fa-caret-right"],
            "aria-hidden": "true"
          }, null);
        }
        return createVNode("i", {
          "class": [ns.be("menu-set-drawer", "group-icon"), "fa fa-sort-down"],
          "aria-hidden": "true"
        }, null);
      }
      return null;
    };
    const renderMenuList = (items) => {
      return items.map((item) => {
        const content = renderMenuItem(item);
        if (!content)
          return null;
        return createVNode("div", {
          "class": ns.be("content", "menu-item")
        }, [createVNode("div", {
          "class": [ns.be("content", "menu-item-content"), ns.is("is-menuitem", item.itemType === "MENUITEM")]
        }, [createVNode("div", {
          "class": ns.bem("content", "menu-item-content", "label"),
          "onClick": () => collapseGroup(item)
        }, [renderGroupIcon(item), createVNode("div", {
          "class": ns.bem("content", "menu-item-content", "label-content")
        }, [content])]), item.itemType !== "SEPERATOR" ? createVNode("div", {
          "class": ns.bem("content", "menu-item-content", "checks")
        }, [createVNode(resolveComponent("el-checkbox"), {
          "modelValue": item.config.visible,
          "onUpdate:modelValue": ($event) => item.config.visible = $event,
          "onClick": stopExpand,
          "label": ibiz.i18n.t("control.menuDesign.visible"),
          "size": "large"
        }, null)]) : null]), item.children && item.children.length > 0 ? createVNode("div", {
          "class": [ns.bem("content", "menu-item", "children"), ns.is("collapse", item.isCollapse)]
        }, [renderMenuList(item.children)]) : null]);
      });
    };
    const renderHeader = () => {
      let _slot, _slot2;
      return createVNode("div", {
        "class": ns.b("header")
      }, [createVNode("div", {
        "class": ns.be("header", "caption")
      }, [ibiz.i18n.t("control.menuDesign.customMenu")]), createVNode("div", {
        "class": ns.be("header", "actions")
      }, [createVNode(resolveComponent("el-button"), {
        "onClick": onReset,
        "loading": loading.value
      }, _isSlot(_slot = ibiz.i18n.t("control.menuDesign.reset")) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("el-button"), {
        "onClick": onSave,
        "loading": loading.value
      }, _isSlot(_slot2 = ibiz.i18n.t("control.menuDesign.save")) ? _slot2 : {
        default: () => [_slot2]
      })])]);
    };
    const renderContent = () => {
      return createVNode("div", {
        "class": ns.b("content")
      }, [renderMenuList(configs.value)]);
    };
    const openDesign = () => {
      if (c.runMode === "DESIGN") {
        return;
      }
      hideSeparator.value = formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState);
      configs.value = mergeMenusConfig(cloneDeep(props.menus));
      visible.value = true;
    };
    return {
      ns,
      c,
      configs,
      visible,
      loading,
      onReset,
      renderContent,
      renderHeader,
      onSave,
      openDesign
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "title": showTitle(ibiz.i18n.t("control.menu.menuSetting")),
      "onClick": this.openDesign
    }, [createVNode("svg", {
      "viewBox": "0 0 16 16",
      "xmlns": "http://www.w3.org/2000/svg",
      "height": "1em",
      "width": "1em",
      "preserveAspectRatio": "xMidYMid meet",
      "focusable": "false",
      "fill": "currentColor"
    }, [createVNode("g", {
      "id": "augaction/settings",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [createVNode("path", {
      "d": "M11.405 13.975l3.398-5.889L11.405 2.2H4.607L1.208 8.087l3.399 5.889h6.798zm1.023-12.4l3.43 5.938c.205.356.205.793 0 1.149l-3.43 5.938a1.147 1.147 0 0 1-.993.574H4.577c-.41 0-.789-.218-.994-.573L.153 8.66a1.153 1.153 0 0 1 0-1.147l3.43-5.94c.205-.356.584-.575.994-.575h6.858c.409 0 .788.22.993.576zM8.006 9.879c.988 0 1.792-.804 1.792-1.792s-.804-1.792-1.792-1.792-1.792.804-1.792 1.792.804 1.792 1.792 1.792zm0-4.784a2.993 2.993 0 1 1-.002 5.985 2.993 2.993 0 0 1 .002-5.985z",
      "id": "aug\u5F62\u72B6\u7ED3\u5408"
    }, null)])])]), createVNode(resolveComponent("el-drawer"), {
      "modelValue": this.visible,
      "onUpdate:modelValue": ($event) => this.visible = $event,
      "append-to-body": true,
      "custom-class": this.ns.b("menu-set-drawer")
    }, {
      default: () => {
        return this.renderContent();
      },
      header: () => {
        return this.renderHeader();
      }
    })]);
  }
});

export { MenuDesign };
