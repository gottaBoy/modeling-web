'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');

"use strict";
const AsyncActionResult = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAsyncActionResult",
  props: {
    asyncAction: {
      type: Object,
      required: true
    },
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("async-action-preview");
    const message = vue.computed(() => {
      if (lodashEs.isObject(props.asyncAction.actionresult)) {
        return JSON.stringify(props.asyncAction.actionresult);
      }
      return "".concat(props.asyncAction.actionresult);
    });
    return {
      ns,
      message
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [this.message]);
  }
});

exports.AsyncActionResult = AsyncActionResult;
