'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./panel-view-content.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelViewContent = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelViewContent",
  props: {
    /**
     * @description  容器模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description  容器控制器
     */
    controller: {
      type: runtime.PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-view-content");
    const {
      showCaption,
      titleBarCloseMode,
      id
    } = props.modelData;
    const collapsible = titleBarCloseMode !== 0;
    const isCollapse = vue.ref(titleBarCloseMode === 2);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const changeCollapse = () => {
      if (collapsible) {
        isCollapse.value = !isCollapse.value;
      }
    };
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      const {
        view
      } = props.controller.panel;
      if (view.model.viewType) {
        result.push(ns.m(view.model.viewType.toLowerCase()));
      }
      result.push(ns.is("no-caption", !view.model.showCaptionBar));
      if (showCaption === true) {
        result = [...result, ...props.controller.containerClass, ns.is("collapse", collapsible && isCollapse.value), ns.is("hidden", !props.controller.state.visible)];
      }
      return result;
    });
    return {
      ns,
      isCollapse,
      classArr,
      changeCollapse,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
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
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.PanelViewContent = PanelViewContent;
