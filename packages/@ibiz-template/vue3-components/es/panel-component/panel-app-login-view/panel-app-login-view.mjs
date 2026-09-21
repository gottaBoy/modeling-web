import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { PanelAppLoginViewController } from './panel-app-login-view.controller.mjs';
import './panel-app-login-view.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelAppLoginView = /* @__PURE__ */ defineComponent({
  name: "IBizPanelAppLoginView",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelAppLoginViewController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-app-login-view");
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const cssVars = computed(() => {
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
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return createVNode("div", {
      "class": this.classArr,
      "style": this.cssVars,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

export { PanelAppLoginView };
