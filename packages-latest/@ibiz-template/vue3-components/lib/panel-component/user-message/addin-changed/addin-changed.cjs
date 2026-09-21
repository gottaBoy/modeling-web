'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./addin-changed.css');
var core = require('@ibiz-template/core');

"use strict";
const AddinChanged = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("addin-changed");
    const onClick = () => {
      window.location.reload();
    };
    return {
      ns,
      onClick
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()],
      "onClick": this.onClick,
      "title": core.showTitle(ibiz.i18n.t("panelComponent.addinChanged.tip"))
    }, [vue.createVNode("div", {
      "class": this.ns.b("left")
    }, [vue.createVNode("ion-icon", {
      "name": "list-outline"
    }, null)]), vue.createVNode("div", {
      "class": this.ns.b("center")
    }, [vue.createVNode("div", {
      "class": this.ns.e("caption")
    }, [ibiz.i18n.t("panelComponent.addinChanged.title")]), vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [ibiz.i18n.t("panelComponent.addinChanged.content")])])]);
  }
});

exports.AddinChanged = AddinChanged;
