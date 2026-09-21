'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./no-data.css');

"use strict";
const IBizNoData = /* @__PURE__ */ vue.defineComponent({
  name: "IBizNoData",
  props: {
    text: {
      type: String,
      default: "\u6682\u65E0\u6570\u636E"
    },
    emptyTextLanguageRes: {
      type: Object,
      default: void 0
    },
    hideNoDataImage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("no-data");
    const label = vue.ref(props.text);
    if (props.emptyTextLanguageRes) {
      label.value = ibiz.i18n.t(props.emptyTextLanguageRes.lanResTag, props.text);
    }
    return {
      ns,
      label
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("el-empty"), {
      "class": [this.ns.b(), this.hideNoDataImage ? "hideImage" : ""],
      "description": this.label
    }, {
      default: () => {
        var _a, _b;
        return [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)];
      }
    });
  }
});

exports.IBizNoData = IBizNoData;
