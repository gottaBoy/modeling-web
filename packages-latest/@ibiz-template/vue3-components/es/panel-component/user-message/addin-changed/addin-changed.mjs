import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './addin-changed.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const AddinChanged = /* @__PURE__ */ defineComponent({
  name: "IBizAddinChanged",
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup() {
    const ns = useNamespace("addin-changed");
    const onClick = () => {
      window.location.reload();
    };
    return {
      ns,
      onClick
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b()],
      "onClick": this.onClick,
      "title": showTitle(ibiz.i18n.t("panelComponent.addinChanged.tip"))
    }, [createVNode("div", {
      "class": this.ns.b("left")
    }, [createVNode("ion-icon", {
      "name": "list-outline"
    }, null)]), createVNode("div", {
      "class": this.ns.b("center")
    }, [createVNode("div", {
      "class": this.ns.e("caption")
    }, [ibiz.i18n.t("panelComponent.addinChanged.title")]), createVNode("div", {
      "class": this.ns.e("content")
    }, [ibiz.i18n.t("panelComponent.addinChanged.content")])])]);
  }
});

export { AddinChanged };
