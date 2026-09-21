import { isVNode, defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { TreeExpBarController } from '@ibiz-template/runtime';
import { useExpBarRender, useWatchRouteChange } from '../render-util.mjs';
import './tree-exp-bar.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TreeExpBarControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new TreeExpBarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle,
      renderTitle,
      renderSearchBar
    } = useExpBarRender(c, ns);
    useWatchRouteChange(c);
    const navigational = computed(() => {
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
          return createVNode(resolveComponent("iBizControlShell"), {
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
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

export { TreeExpBarControl };
