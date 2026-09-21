import { isVNode, defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { PanelAppLoginViewController } from './panel-app-login-view.controller.mjs';
import './panel-app-login-view.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelAppLoginView = /* @__PURE__ */ defineComponent({
  name: "IBizPanelAppLoginView",
  props: {
    /**
     *  @description 面板容器（应用登录视图）模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     *  @description 面板容器（应用登录视图）控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
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
      cssVars,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": [this.cssVars, this.semanticStyle("root")],
      "onClick": (event) => this.controller.onClick(event)
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

export { PanelAppLoginView };
