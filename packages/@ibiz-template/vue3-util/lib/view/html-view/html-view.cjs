'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('../../use/index.cjs');
require('./html-view.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useViewController = require('../../use/view/use-view-controller/use-view-controller.cjs');

"use strict";
const HtmlView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHtmlView",
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
    var _a;
    const ns = namespace.useNamespace("view");
    const c = useViewController.useViewController((...args) => new runtime.ViewController(...args));
    const controls = ((_a = c.model.viewLayoutPanel) == null ? void 0 : _a.controls) || c.model.controls;
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    const isLoading = vue.ref(false);
    const url = vue.computed(() => {
      if (c.model) {
        const {
          htmlUrl
        } = c.model;
        if (htmlUrl) {
          return htmlUrl;
        }
      }
      return "";
    });
    vue.onBeforeMount(() => {
      if (url.value) {
        isLoading.value = true;
      }
    });
    const onLoad = () => {
      isLoading.value = false;
    };
    return {
      c,
      ns,
      controls,
      viewClassNames,
      url,
      isLoading,
      onLoad
    };
  },
  render() {
    if (this.url) {
      return vue.withDirectives(vue.createVNode("div", {
        "class": this.viewClassNames
      }, [vue.createVNode("iframe", {
        "src": this.url,
        "onLoad": () => this.onLoad()
      }, null)]), [[vue.resolveDirective("loading"), this.isLoading]]);
    }
    let Content = null;
    const provider = runtime.getErrorViewProvider("404");
    if (provider) {
      if (typeof provider.component === "string") {
        Content = vue.h(vue.resolveComponent(provider.component));
      }
      Content = vue.h(provider.component);
    }
    return vue.createVNode("div", {
      "class": this.viewClassNames
    }, [Content]);
  }
});

exports.HtmlView = HtmlView;
