'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./teleport-placeholder.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const TeleportPlaceholder = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTeleportPlaceholder",
  props: {
    /**
     * @description 传送占位模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 传送占位控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("teleport-placeholder");
    const tempStyle = vue.ref("");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const {
      rawItem
    } = props.modelData;
    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr,
      tempStyle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return vue.createVNode("div", {
      "id": this.controller.state.teleportTag,
      "class": [this.classArr, this.semanticClass("root")],
      "style": [this.tempStyle, this.semanticStyle("root")]
    }, null);
  }
});

exports.TeleportPlaceholder = TeleportPlaceholder;
