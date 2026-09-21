import { isVNode, defineComponent, createVNode, resolveComponent, ref } from 'vue';
import { AppMenuIconViewController } from '@ibiz-template/runtime';
import { useControlController, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './app-menu-portlet.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AppMenuPortletControl = /* @__PURE__ */ defineComponent({
  name: "IBizAppMenuPortletControl",
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
    collapse: Boolean,
    currentPath: String
  },
  setup() {
    var _a;
    const c = useControlController((...args) => new AppMenuIconViewController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase(), "-portlet"));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const defaultActive = ref("");
    const defaultOpens = ref([]);
    (_a = c.model.appMenuItems) == null ? void 0 : _a.forEach((item) => {
      if (item.itemType === "MENUITEM") {
        defaultOpens.value.push(item.id);
      }
    });
    const onClick = async (key, event) => {
      await c.onClickMenuItem(key, event);
    };
    const renderItem = (item) => {
      const state = c.state.menuItemsState[item.id];
      if (!state.visible) {
        return null;
      }
      const {
        counterId
      } = item;
      return createVNode("div", {
        "class": [ns.b("item"), ns.is("disabled", !item.appFuncId), semanticClass("item", {
          item
        })],
        "style": semanticStyle("item", {
          item
        }),
        "title": showTitle(item.tooltip || item.caption),
        "onClick": (event) => {
          if (item.appFuncId) {
            onClick(item.id, event);
          }
        }
      }, [createVNode(resolveComponent("iBizIcon"), {
        "class": [ns.be("item", "icon"), semanticClass("item.icon", {
          item
        })],
        "style": semanticStyle("item.icon", {
          item
        }),
        "icon": item.sysImage
      }, null), counterId ? createVNode(resolveComponent("iBizBadge"), {
        "class": [ns.e("counter"), semanticClass("item.counter", {
          item
        })],
        "style": semanticStyle("item.counter", {
          item
        }),
        "value": c.state.counterData[counterId]
      }, null) : null, createVNode("span", {
        "class": [ns.be("item", "label"), semanticClass("item.caption", {
          item
        })],
        "style": semanticStyle("item.caption", {
          item
        })
      }, [item.caption])]);
    };
    const renderGroup = (item) => {
      const state = c.state.menuItemsState[item.id];
      if (!state.visible) {
        return null;
      }
      if (!item.appMenuItems) {
        return renderItem(item);
      }
      const {
        counterId
      } = item;
      return createVNode(resolveComponent("el-collapse-item"), {
        "class": [ns.b("group"), semanticClass("group", {
          item
        })],
        "style": semanticStyle("group", {
          item
        }),
        "name": item.id,
        "title": showTitle(item.caption)
      }, {
        title: () => {
          return [createVNode(resolveComponent("iBizIcon"), {
            "class": [ns.be("group", "icon"), semanticClass("group.icon", {
              item
            })],
            "style": semanticStyle("group.icon", {
              item
            }),
            "icon": item.sysImage
          }, null), createVNode("span", {
            "class": [ns.be("group", "label"), semanticClass("group.caption", {
              item
            })],
            "style": semanticStyle("group.caption", {
              item
            })
          }, [item.caption]), counterId ? createVNode(resolveComponent("iBizBadge"), {
            "class": [ns.e("counter"), semanticClass("group.counter", {
              item
            })],
            "style": semanticStyle("group.counter", {
              item
            }),
            "value": c.state.counterData[counterId]
          }, null) : null];
        },
        default: () => {
          var _a2;
          return (_a2 = item.appMenuItems) == null ? void 0 : _a2.map((child) => {
            return renderItem(child);
          });
        }
      });
    };
    return {
      c,
      ns,
      defaultActive,
      defaultOpens,
      onClick,
      renderGroup,
      renderItem,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a;
    const {
      state,
      model
    } = this.c;
    let content = null;
    if (state.isCreated && ((_a = model.appMenuItems) == null ? void 0 : _a.length)) {
      let _slot;
      content = createVNode(resolveComponent("el-collapse"), {
        "class": [this.ns.e("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content"),
        "modelValue": this.defaultOpens,
        "onUpdate:modelValue": ($event) => this.defaultOpens = $event
      }, _isSlot(_slot = model.appMenuItems.map((item) => {
        if (item.itemType !== "MENUITEM") {
          return null;
        }
        return this.renderGroup(item);
      })) ? _slot : {
        default: () => [_slot]
      });
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "controller": this.c
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

export { AppMenuPortletControl };
