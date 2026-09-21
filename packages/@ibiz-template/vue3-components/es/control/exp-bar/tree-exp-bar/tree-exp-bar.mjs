import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './tree-exp-bar.css';
import { TreeExpBarController } from '@ibiz-template/runtime';
import { useExpBarRender, useWatchRouteChange } from '../render-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TreeExpBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizTreeExpBarControl",
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
    srfnav: {
      type: String,
      required: false
    },
    noNeedNavView: {
      type: Boolean,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new TreeExpBarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
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
        const key = this.c.controlPanel ? XDataModel.name : "default";
        slots[key] = () => {
          return createVNode(resolveComponent("iBizControlShell"), {
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
      "controller": this.c
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

export { TreeExpBarControl };
