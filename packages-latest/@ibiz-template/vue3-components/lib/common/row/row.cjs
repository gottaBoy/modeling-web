'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./row.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizRow = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRow",
  props: {
    layout: Object
  },
  setup() {
    const ns = vue3Util.useNamespace("row");
    return {
      ns
    };
  },
  render() {
    var _a, _b, _c;
    const defaultSlot = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a);
    if (((_c = this.layout) == null ? void 0 : _c.layout) === "FLEX") {
      const {
        dir,
        align,
        valign
      } = this.layout;
      const _dir = dir;
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.m("flex"), this.ns.m(_dir)],
        "style": {
          flexDirection: _dir,
          justifyContent: align,
          alignItems: valign
        }
      }, [defaultSlot]);
    }
    return vue.createVNode(vue.resolveComponent("el-row"), {
      "class": [this.ns.b(), this.ns.m("grid")]
    }, _isSlot(defaultSlot) ? defaultSlot : {
      default: () => [defaultSlot]
    });
  }
});

exports.IBizRow = IBizRow;
