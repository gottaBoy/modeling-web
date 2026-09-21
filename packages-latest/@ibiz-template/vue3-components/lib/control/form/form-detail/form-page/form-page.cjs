'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-page.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormPage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormPage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-page");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    let position = "top";
    if (props.modelData.tabHeaderPos) {
      position = props.modelData.tabHeaderPos.toLowerCase();
    }
    const onTabChange = (name) => {
      props.controller.setActiveTab(name);
    };
    return {
      ns,
      position,
      onTabChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b, _c, _d;
    let _slot;
    const {
      noTabHeader
    } = this.modelData;
    const defaultSlots = ((_c = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)[0]) == null ? void 0 : _c.children) || [];
    if (defaultSlots.length === 1 || noTabHeader) {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("page", {
          page: this.controller
        }), this.ns.m("no-tab-header")],
        "style": this.semanticStyle("page", {
          page: this.controller
        })
      }, [defaultSlots]);
    }
    return vue.createVNode(vue.resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.ns.b("tab"), this.semanticClass("page", {
        page: this.controller
      }), this.ns.e(this.position)],
      "style": this.semanticStyle("page", {
        page: this.controller
      }),
      "model-value": (_d = defaultSlots[0]) == null ? void 0 : _d.key,
      "tab-position": this.position,
      "onTabChange": this.onTabChange
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      if (!c.state.visible && !c.state.keepAlive) {
        return null;
      }
      return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
        "class": [this.ns.b("tab-item"), this.semanticClass("page.item", {
          page: this.controller,
          item: c
        })],
        "name": c.model.id,
        "style": this.semanticStyle("page.item", {
          page: this.controller,
          item: c
        }),
        "lazy": true
      }, {
        default: () => slot,
        label: () => {
          return vue.createVNode("span", {
            "class": [...c.labelClass, this.ns.b("tab-label"), this.semanticClass("page.label", {
              page: this.controller,
              item: c
            })],
            "style": this.semanticStyle("page.label", {
              page: this.controller,
              item: c
            })
          }, [c.model.sysImage ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": c.model.sysImage
          }, null) : null, c.model.caption]);
        }
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.FormPage = FormPage;
exports.default = FormPage;
