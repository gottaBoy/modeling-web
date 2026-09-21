import { defineComponent, ref, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './no-data.css';

"use strict";
const IBizNoData = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("no-data");
    const label = ref(props.text);
    if (props.emptyTextLanguageRes) {
      label.value = ibiz.i18n.t(props.emptyTextLanguageRes.lanResTag, props.text);
    }
    return {
      ns,
      label
    };
  },
  render() {
    return createVNode(resolveComponent("el-empty"), {
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

export { IBizNoData };
