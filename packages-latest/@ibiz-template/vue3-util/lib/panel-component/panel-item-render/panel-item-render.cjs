'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelItemRender_controller = require('./panel-item-render.controller.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const PanelItemRender = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelItemRender",
  props: {
    /**
     * @description 面板项模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板项控制器
     */
    controller: {
      type: panelItemRender_controller.PanelItemRenderController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = namespace.useNamespace("panel-item-render");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const nsType = namespace.useNamespace("panel-".concat((_a = props.modelData.itemType) == null ? void 0 : _a.toLowerCase()));
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), nsType.b(), ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const htmlCode = vue.computed(() => {
      return props.controller.getPanelItemCustomHtml(props.modelData.controlRenders, props.controller.data);
    });
    return {
      ns,
      classArr,
      htmlCode,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "innerHTML": this.htmlCode,
      "onClick": (event) => this.controller.onClick(event)
    }, null);
  }
});

exports.PanelItemRender = PanelItemRender;
