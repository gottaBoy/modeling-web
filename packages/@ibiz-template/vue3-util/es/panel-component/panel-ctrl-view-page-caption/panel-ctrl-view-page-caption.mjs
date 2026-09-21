import { defineComponent, computed, createVNode } from 'vue';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelCtrlViewPageCaption = /* @__PURE__ */ defineComponent({
  name: "IBizPanelCtrlViewPageCaption",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-ctrl-view-page-caption");
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    let editor = null;
    if (this.controller.data) {
      editor = createVNode("span", {
        "class": this.ns.b("content")
      }, [this.controller.state.caption]);
    }
    return createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [editor]);
  }
});

export { PanelCtrlViewPageCaption };
