import { defineComponent, createVNode, resolveComponent, mergeProps, ref, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { CoopPosController } from './coop-pos.controller.mjs';
import './coop-pos.css';

"use strict";
const CoopPos = /* @__PURE__ */ defineComponent({
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
      type: CoopPosController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("coop-pos");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const errorIcons = ref([]);
    const messages = computed(() => {
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
          content = createVNode("img", {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [this.c.state.messageModes ? createVNode("div", {
      "class": [this.ns.e("on-line-editing"), this.semanticClass("content")],
      "style": this.semanticStyle("content")
    }, [this.messages.map((message) => {
      return createVNode("div", {
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
    })]) : createVNode(resolveComponent("iBizCoopAlert"), mergeProps({
      "key": this.c.state.key
    }, this.c.state.alertParams), null)]);
  }
});

export { CoopPos };
