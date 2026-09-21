import { isVNode, defineComponent, ref, createVNode, resolveComponent } from 'vue';
import { AppMenuIconViewController } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './app-menu-icon-view.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AppMenuIconViewControl = /* @__PURE__ */ defineComponent({
  name: "IBizAppMenuIconViewControl",
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
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase(), "-iconview"));
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
      return createVNode("div", {
        "class": [ns.b("item"), ns.is("disabled", !item.appFuncId)],
        "title": showTitle(item.tooltip || item.caption),
        "onClick": (event) => {
          if (item.appFuncId) {
            onClick(item.id, event);
          }
        }
      }, [createVNode(resolveComponent("iBizIcon"), {
        "class": ns.be("item", "icon"),
        "icon": item.sysImage
      }, null), createVNode("span", {
        "class": ns.be("item", "label")
      }, [item.caption])]);
    };
    const renderGroup = (item) => {
      const state = c.state.menuItemsState[item.id];
      if (!state.visible) {
        return null;
      }
      return createVNode(resolveComponent("el-collapse-item"), {
        "class": ns.b("group"),
        "name": item.id,
        "title": showTitle(item.caption)
      }, {
        default: () => {
          var _a2;
          return [(_a2 = item.appMenuItems) == null ? void 0 : _a2.map((child) => {
            return renderItem(child);
          })];
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
      renderItem
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
        "class": this.ns.e("content"),
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
      "class": [this.ns.b()],
      "controller": this.c
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

export { AppMenuIconViewControl };
