'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./sub-app-ref-view.css');

"use strict";
const SubAppRefView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSubAppRefView",
  props: {
    context: Object,
    params: {
      type: Object,
      default: () => ({})
    },
    modelData: {
      type: Object,
      required: true
    },
    modal: {
      type: Object
    },
    state: {
      type: Object
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("sub-app-ref-view");
    const c = vue3Util.useViewController((...args) => new runtime.ViewController(...args));
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    const htmlUrl = vue.computed(() => {
      return ibiz.env.marketAddress || window.Environment.marketAddress;
    });
    const handleClick = () => {
      if (htmlUrl.value) {
        window.open(htmlUrl.value, "_blank");
      }
    };
    return {
      c,
      ns,
      viewClassNames,
      htmlUrl,
      handleClick
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.viewClassNames
    }, [vue.createVNode(vue.resolveComponent("el-result"), {
      "class": this.ns.b("result"),
      "icon": "info"
    }, null), this.c.model.caption && vue.createVNode("div", {
      "class": this.ns.b("caption")
    }, [this.c.model.caption]), this.c.model.subCaption && vue.createVNode("div", {
      "class": this.ns.b("sub-caption")
    }, [this.c.model.subCaption]), this.htmlUrl && vue.createVNode(vue.resolveComponent("el-button"), {
      "class": this.ns.b("btn"),
      "onClick": this.handleClick,
      "size": "large"
    }, {
      default: () => [this.c.model.title || ibiz.i18n.t("view.subAppRefView.jump")]
    })]);
  }
});

exports.SubAppRefView = SubAppRefView;
