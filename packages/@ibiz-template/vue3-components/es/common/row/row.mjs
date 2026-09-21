import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './row.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizRow = /* @__PURE__ */ defineComponent({
  name: "IBizRow",
  props: {
    layout: Object
  },
  setup() {
    const ns = useNamespace("row");
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
      return createVNode("div", {
        "class": [this.ns.b(), this.ns.m("flex"), this.ns.m(_dir)],
        "style": {
          flexDirection: _dir,
          justifyContent: align,
          alignItems: valign
        }
      }, [defaultSlot]);
    }
    return createVNode(resolveComponent("el-row"), {
      "class": [this.ns.b(), this.ns.m("grid")]
    }, _isSlot(defaultSlot) ? defaultSlot : {
      default: () => [defaultSlot]
    });
  }
});

export { IBizRow };
