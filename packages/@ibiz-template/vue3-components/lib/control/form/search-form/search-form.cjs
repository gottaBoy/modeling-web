'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./search-form.css');

"use strict";
const SearchFormControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSearchFormControl",
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
    isSimple: {
      type: Boolean,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.SearchFormController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.details);
      keys.forEach((key) => {
        const detail = c.details[key];
        detail.state = vue.reactive(detail.state);
      });
    });
    return {
      c,
      ns
    };
  },
  render() {
    const {
      state
    } = this.c;
    if (!state.isCreated) {
      return;
    }
    return vue.createVNode(vue.resolveComponent("iBizFormControl"), {
      "class": [this.ns.b()],
      "controller": this.c,
      "onKeyup": (e) => this.c.onKeyUp(e)
    }, {
      ...this.$slots
    });
  }
});

exports.SearchFormControl = SearchFormControl;
