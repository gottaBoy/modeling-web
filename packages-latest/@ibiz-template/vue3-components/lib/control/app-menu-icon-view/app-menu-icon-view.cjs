'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./app-menu-icon-view.css');
var core = require('@ibiz-template/core');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const AppMenuIconViewControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAppMenuIconViewControl",
  props: {
    /**
     * @description 菜单模型数据
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
     * @description 是否折叠
     */
    collapse: Boolean,
    /**
     * @description 当前路径
     */
    currentPath: String
  },
  setup() {
    var _a;
    const c = vue3Util.useControlController((...args) => new runtime.AppMenuIconViewController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase(), "-iconview"));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const defaultActive = vue.ref("");
    const defaultOpens = vue.ref([]);
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
      return vue.createVNode("div", {
        "class": [ns.b("item"), ns.is("disabled", !item.appFuncId), semanticClass("item", {
          item
        })],
        "style": semanticStyle("item", {
          item
        }),
        "title": core.showTitle(item.tooltip || item.caption),
        "onClick": (event) => {
          if (item.appFuncId) {
            onClick(item.id, event);
          }
        }
      }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [ns.be("item", "icon"), semanticClass("item.icon", {
          item
        })],
        "style": semanticStyle("item.icon", {
          item
        }),
        "icon": item.sysImage
      }, null), counterId ? vue.createVNode(vue.resolveComponent("iBizBadge"), {
        "class": [ns.be("item", "counter"), semanticClass("item.counter", {
          item
        })],
        "style": semanticStyle("item.counter", {
          item
        }),
        "value": c.state.counterData[counterId]
      }, null) : null, vue.createVNode("span", {
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
      return vue.createVNode(vue.resolveComponent("el-collapse-item"), {
        "class": [ns.b("group"), semanticClass("group", {
          item
        })],
        "style": semanticStyle("group", {
          item
        }),
        "name": item.id,
        "title": core.showTitle(item.caption)
      }, {
        title: () => {
          return [vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": [ns.be("group", "icon"), semanticClass("group.icon", {
              item
            })],
            "style": semanticStyle("group.icon", {
              item
            }),
            "icon": item.sysImage
          }, null), vue.createVNode("span", {
            "class": [ns.be("group", "label"), semanticClass("group.caption", {
              item
            })],
            "style": semanticStyle("group.caption", {
              item
            })
          }, [item.caption]), counterId ? vue.createVNode(vue.resolveComponent("iBizBadge"), {
            "class": [ns.be("group", "counter"), semanticClass("group.counter", {
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
      content = vue.createVNode(vue.resolveComponent("el-collapse"), {
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "controller": this.c
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

exports.AppMenuIconViewControl = AppMenuIconViewControl;
