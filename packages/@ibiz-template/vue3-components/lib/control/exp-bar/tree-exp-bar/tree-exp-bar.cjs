'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./tree-exp-bar.css');
var runtime = require('@ibiz-template/runtime');
var renderUtil = require('../render-util.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TreeExpBarControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.TreeExpBarController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
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
          return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
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
      "controller": this.c
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

exports.TreeExpBarControl = TreeExpBarControl;
