'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./list-exp-bar.css');
var runtime = require('@ibiz-template/runtime');
var renderUtil = require('../render-util.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ListExpBarControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizListExpBarControl",
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
    const c = vue3Util.useControlController((...args) => new runtime.ExpBarControlController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      renderTitle,
      renderSearchBar
    } = renderUtil.useExpBarRender(c, ns);
    renderUtil.useWatchRouteChange(c);
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
          return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

exports.ListExpBarControl = ListExpBarControl;
