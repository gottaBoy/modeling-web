'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var renderUtil = require('../render-util.cjs');
require('./tree-exp-bar.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TreeExpBarControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeExpBarControl",
  props: {
    /**
     * @description 树导航栏模型数据
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
     * @description 导航数据
     */
    srfnav: {
      type: String,
      required: false
    },
    /**
     * @description 是否不需要导航视图
     */
    noNeedNavView: {
      type: Boolean,
      required: false
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.TreeExpBarController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle,
      renderTitle,
      renderSearchBar
    } = renderUtil.useExpBarRender(c, ns);
    renderUtil.useWatchRouteChange(c);
    const navigational = vue.computed(() => {
      return c.view.model.viewType && !["DEMPICKUPVIEW2", "DEPICKUPVIEW2"].includes(c.view.model.viewType);
    });
    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      navigational,
      renderTitle,
      renderSearchBar
    };
  },
  render() {
    const {
      state,
      XDataModel
    } = this.c;
    const {
      isCreated
    } = state;
    const slots = {
      captionbar: this.renderTitle,
      searchbar: this.renderSearchBar
    };
    if (isCreated) {
      if (XDataModel) {
        const key = this.c.controlPanel ? "treeexpbar_tree" : "default";
        slots[key] = () => {
          return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
            "class": [this.ns.e("content"), this.semanticClass("content")],
            "style": this.semanticStyle("content"),
            "context": this.c.context,
            "params": this.c.params,
            "modelData": XDataModel,
            "singleSelect": true,
            "navigational": this.navigational,
            "mdctrlActiveMode": 1,
            "loadDefault": false,
            "default-expanded-keys": this.c.defaultExpandedKeys
          }, null);
        };
      }
    }
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

exports.TreeExpBarControl = TreeExpBarControl;
