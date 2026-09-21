'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var panelAppLoginView_controller = require('./panel-app-login-view.controller.cjs');
require('./panel-app-login-view.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelAppLoginView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelAppLoginView",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelAppLoginView_controller.PanelAppLoginViewController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-app-login-view");
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const cssVars = vue.computed(() => {
      let styles = {};
      const pathName = window.location.pathname;
      if (pathName) {
        const lastIndex = pathName.lastIndexOf("/");
        if (lastIndex !== -1) {
          const path = pathName.substring(0, lastIndex + 1);
          styles = {
            "header-url": "url('".concat(path, "assets/images/login-header.png')"),
            "avatar-url": "url('".concat(path, "assets/images/login-avatar.png')")
          };
        }
      }
      return ns.cssVarBlock(styles);
    });
    return {
      ns,
      classArr,
      cssVars
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return vue.createVNode("div", {
      "class": this.classArr,
      "style": this.cssVars,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [this.controller.model.cssStyle ? vue.createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

exports.PanelAppLoginView = PanelAppLoginView;
