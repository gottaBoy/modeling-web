import { ref, inject, watch, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { TransitionHeight } from '../transition-height/transition-height.mjs';
import './devtool-collapse-panel.css';

"use strict";
const DevToolCollapsePanel = /* @__PURE__ */ defineComponent({
  name: "DevToolCollapsePanel",
  component: [TransitionHeight],
  props: {
    title: String,
    // 折叠面板的标题
    name: String,
    // 折叠面板的名字，即为唯一标识符（不可与其他重复！）
    // 是否隐藏小箭头，默认false，即展示小箭头
    hiddenArrow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ns = useNamespace("devtool-collapse-panel");
    const transitionWrap = ref();
    const height = ref(0);
    const collapse = inject("collapse");
    const isOpen = ref(false);
    watch(() => [collapse.openArr.value, props.name], () => {
      isOpen.value = collapse.openArr.value.includes(props.name);
    }, {
      immediate: true,
      deep: true
    });
    const handleHeaderClick = (event) => {
      event.stopPropagation();
      collapse.updateVModel(props.name, isOpen.value);
      isOpen.value = !isOpen.value;
    };
    const renderSvg = () => {
      return createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }, [createVNode("path", {
        "fill": "currentColor",
        "d": "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      }, null)]);
    };
    return {
      ns,
      transitionWrap,
      height,
      handleHeaderClick,
      isOpen,
      renderSvg
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header"),
      "onClick": (event) => this.handleHeaderClick(event)
    }, [createVNode("span", null, [this.title]), !this.hiddenArrow ? createVNode("div", {
      "class": [this.ns.e("icon"), this.isOpen ? "rotate90deg" : ""]
    }, [this.renderSvg()]) : null]), createVNode(TransitionHeight, {
      "class": "transitionHeight",
      "show": this.isOpen,
      "key": createUUID()
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": this.ns.e("body")
        }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])];
      }
    })]);
  }
});

export { DevToolCollapsePanel, DevToolCollapsePanel as default };
