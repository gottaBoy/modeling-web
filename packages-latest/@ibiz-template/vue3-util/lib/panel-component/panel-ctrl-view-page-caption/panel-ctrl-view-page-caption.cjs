'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./panel-ctrl-view-page-caption.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const PanelCtrlViewPageCaption = /* @__PURE__ */ vue.defineComponent({
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
    const ns = namespace.useNamespace("panel-ctrl-view-page-caption");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
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
      editor = vue.createVNode("span", {
        "class": [this.ns.b("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [this.controller.state.caption]);
    }
    return vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "onClick": (event) => this.controller.onClick(event)
    }, [editor]);
  }
});

exports.PanelCtrlViewPageCaption = PanelCtrlViewPageCaption;
