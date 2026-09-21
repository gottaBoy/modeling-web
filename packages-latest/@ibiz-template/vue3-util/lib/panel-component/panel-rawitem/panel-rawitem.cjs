'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelRawitem_controller = require('./panel-rawitem.controller.cjs');
require('./panel-rawitem.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const PanelRawItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelRawItem",
  props: {
    /**
     * @description 面板直接内容项模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板直接内容控制器
     */
    controller: {
      type: panelRawitem_controller.PanelRawItemController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-rawitem");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(c);
    const content = vue.ref("");
    const tempStyle = vue.ref("");
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
      return result;
    });
    vue.watch(() => c.data, async (newVal) => {
      if (newVal) {
        const rawItemModel = c.model.rawItem;
        if (!rawItemModel) {
          return;
        }
        let rawItemContent;
        const obj = {
          ...newVal
        };
        if (rawItemModel.contentType === "RAW") {
          rawItemContent = rawItemModel.caption;
        } else if (rawItemModel.contentType === "HTML") {
          rawItemContent = rawItemModel.content;
        }
        if (rawItemContent && rawItemModel.templateMode) {
          rawItemContent = await ibiz.util.hbs.render(rawItemContent.replace("//n", "\n"), Object.assign(obj, {
            data: {
              ...newVal
            }
          }));
        }
        content.value = rawItemContent;
      }
    }, {
      immediate: true
    });
    return {
      ns,
      classArr,
      tempStyle,
      content,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible)
      return;
    return vue.createVNode("div", {
      "class": [this.classArr, ibiz.config.common.enhancedUI === false ? this.controller.containerClass : "", this.semanticClass("root")],
      "style": [ibiz.config.common.enhancedUI === false ? this.tempStyle : "", this.semanticStyle("root")],
      "onClick": (event) => this.controller.onClick(event)
    }, [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
      "class": [ibiz.config.common.enhancedUI === true ? this.controller.containerClass : "", this.semanticClass("content")],
      "style": [ibiz.config.common.enhancedUI === true ? this.tempStyle : "", this.semanticStyle("content")],
      "rawItem": this.modelData,
      "content": this.content
    }, null)]);
  }
});

exports.PanelRawItem = PanelRawItem;
