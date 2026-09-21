import { defineComponent, ref, computed, createVNode, resolveComponent, mergeProps } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { CoopPosController } from './coop-pos.controller.mjs';
import './coop-pos.css';

"use strict";
const CoopPos = /* @__PURE__ */ defineComponent({
  name: "IBizCoopPos",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: CoopPosController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("coop-pos");
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
      renderItem
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass]
    }, [this.c.state.messageModes ? createVNode("div", {
      "class": this.ns.e("on-line-editing")
    }, [this.messages.map((message) => {
      return createVNode("div", {
        "class": this.ns.em("on-line-editing", "person"),
        "title": message.action ? ibiz.i18n.t("panelComponent.coopPos.".concat(message.action.toLowerCase()), {
          username: message.username
        }) : "",
        "style": "background-color: ".concat(ibiz.util.text.stringToHexColor(message.username))
      }, [this.renderItem(message)]);
    })]) : createVNode(resolveComponent("iBizCoopAlert"), mergeProps({
      "key": this.c.state.key
    }, this.c.state.alertParams), null)]);
  }
});

export { CoopPos };
