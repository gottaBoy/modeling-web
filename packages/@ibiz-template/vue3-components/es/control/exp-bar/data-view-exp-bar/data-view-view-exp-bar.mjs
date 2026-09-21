import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './data-view-exp-bar.css';
import { ExpBarControlController } from '@ibiz-template/runtime';
import { useExpBarRender, useWatchRouteChange } from '../render-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataViewExpBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizDataViewExpBarControl",
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
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new ExpBarControlController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      renderTitle,
      renderSearchBar
    } = useExpBarRender(c, ns);
    useWatchRouteChange(c);
    return {
      c,
      ns,
      renderTitle,
      renderSearchBar
    };
  },
  render() {
    const {
      isCreated
    } = this.c.state;
    const {
      XDataModel
    } = this.c;
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
            "mdctrlActiveMode": 1,
            "loadDefault": false
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

export { DataViewExpBarControl };
