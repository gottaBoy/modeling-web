import { defineComponent, createVNode, computed } from 'vue';
import '../../use/index.mjs';
import './panel-ctrl-view-page-caption.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
const PanelCtrlViewPageCaption = /* @__PURE__ */ defineComponent({
  name: "IBizPanelCtrlViewPageCaption",
  props: {
    /**
     * @description 视图标题模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 视图标题控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-ctrl-view-page-caption");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id), ns.is("mob", ibiz.env.isMob)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let editor = null;
    if (this.controller.data) {
      editor = createVNode("span", {
        "class": [this.ns.b("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [this.controller.state.caption]);
    }
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "onClick": (event) => this.controller.onClick(event)
    }, [editor]);
  }
});

export { PanelCtrlViewPageCaption };
