'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelRawitem_controller = require('./panel-rawitem.controller.cjs');
require('./panel-rawitem.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelRawItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelRawItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelRawitem_controller.PanelRawItemController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-rawitem");
    const c = props.controller;
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
      result.push(...props.controller.containerClass);
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
      content
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return vue.createVNode("div", {
      "class": this.classArr,
      "style": this.tempStyle,
      "onClick": (event) => {
        this.controller.onClick(event);
      }
    }, [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
      "rawItem": this.modelData,
      "content": this.content
    }, null)]);
  }
});

exports.PanelRawItem = PanelRawItem;
