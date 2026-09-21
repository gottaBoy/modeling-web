'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var coopPos_controller = require('./coop-pos.controller.cjs');
require('./coop-pos.css');

"use strict";
const CoopPos = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCoopPos",
  props: {
    /**
     * @description 协同占位控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 协同占位控件控制器
     */
    controller: {
      type: coopPos_controller.CoopPosController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("coop-pos");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const errorIcons = vue.ref([]);
    const messages = vue.computed(() => {
      const values = [...c.state.messageMap.values()];
      return values.filter((value) => !value.action || (c.state.messageModes || []).includes(value.action));
    });
    const handleError = (url) => {
      errorIcons.value.push(url);
    };
    const renderItem = (message) => {
      let content = ibiz.util.text.abbreviation(message.username) || message.username;
      if (c.showMode === "avatar") {
        const iconurl = c.getIconUrlByName(message.username);
        const url = c.getDownloadUrl(iconurl);
        if (url && !errorIcons.value.includes(url)) {
          content = vue.createVNode("img", {
            "class": ns.e("img"),
            "src": url,
            "onError": () => handleError(url)
          }, null);
        }
      }
      return content;
    };
    return {
      ns,
      c,
      messages,
      renderItem,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [this.c.state.messageModes ? vue.createVNode("div", {
      "class": [this.ns.e("on-line-editing"), this.semanticClass("content")],
      "style": this.semanticStyle("content")
    }, [this.messages.map((message) => {
      return vue.createVNode("div", {
        "class": [this.ns.em("on-line-editing", "person"), this.semanticClass("item", {
          item: message
        })],
        "title": message.action ? ibiz.i18n.t("panelComponent.coopPos.".concat(message.action.toLowerCase()), {
          username: message.username
        }) : "",
        "style": ["background-color: ".concat(ibiz.util.text.stringToHexColor(message.username)), this.semanticStyle("item", {
          item: message
        })]
      }, [this.renderItem(message)]);
    })]) : vue.createVNode(vue.resolveComponent("iBizCoopAlert"), vue.mergeProps({
      "key": this.c.state.key
    }, this.c.state.alertParams), null)]);
  }
});

exports.CoopPos = CoopPos;
