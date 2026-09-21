import { ref, watch, onMounted, onUnmounted, provide, createVNode, defineComponent } from 'vue';
import { useNamespace, useClickOutside } from '@ibiz-template/vue3-util';
import './devtool-select.css';

"use strict";
const DevtoolSelect = /* @__PURE__ */ defineComponent({
  name: "DevtoolSelect",
  props: {
    placeholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9"
    },
    value: {
      type: String
    },
    width: {
      type: Number,
      default: 182
    },
    options: {
      type: Array
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("devtool-select");
    const isShow = ref(false);
    const curLabel = ref("");
    const curValue = ref("");
    const options = ref([]);
    const provideData = {
      isShow,
      curLabel,
      curValue,
      options
    };
    watch(() => curValue.value, () => {
      emit("change", curValue.value);
    });
    watch(() => props.options, () => {
      if (props.options) {
        options.value = props.options;
      }
    }, {
      immediate: true,
      deep: true
    });
    const editorRef = ref();
    let funcs;
    const showOption = () => {
      isShow.value = !isShow.value;
    };
    onMounted(() => {
      if (editorRef.value) {
        funcs = useClickOutside(editorRef, async (_evt) => {
          if (isShow.value) {
            showOption();
          }
        });
      }
    });
    onUnmounted(() => {
      if (funcs && funcs.stop) {
        funcs.stop();
      }
    });
    provide("select", {
      isShow,
      curLabel,
      curValue,
      showOption
    });
    watch(() => props.value, () => {
      const curOption = options.value.filter((item) => item === props.value);
      if (curOption.length > 0) {
        curLabel.value = curOption[0];
        curValue.value = curOption[0];
      }
    }, {
      immediate: true,
      deep: true
    });
    const renderSvg = () => {
      return createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }, [createVNode("path", {
        "fill": "currentColor",
        "d": "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      }, null)]);
    };
    return {
      ns,
      editorRef,
      isShow,
      curLabel,
      curValue,
      options,
      showOption,
      provideData,
      renderSvg
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "id": "select",
      "class": this.ns.b(),
      "style": {
        width: "".concat(this.width, "px")
      },
      "onClick": this.showOption,
      "ref": "editorRef"
    }, [createVNode("div", {
      "class": this.ns.e("title")
    }, [this.curLabel ? createVNode("span", null, [this.curLabel]) : createVNode("span", {
      "class": this.ns.e("placeholder")
    }, [this.placeholder]), createVNode("span", {
      "class": [this.ns.e("icon"), this.isShow ? "reverse" : ""]
    }, [this.renderSvg()])]), createVNode("div", {
      "class": this.ns.e("option"),
      "style": {
        display: this.isShow ? "block" : "none"
      }
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

export { DevtoolSelect, DevtoolSelect as default };
