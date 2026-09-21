import { defineComponent, withDirectives, createVNode, resolveDirective, h, resolveComponent, ref, onBeforeMount } from 'vue';
import { getErrorViewProvider, HtmlViewController } from '@ibiz-template/runtime';
import '../../use/index.mjs';
import './html-view.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useViewController } from '../../use/view/use-view-controller/use-view-controller.mjs';

"use strict";
const HtmlView = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("view");
    const c = useViewController((model, ...args) => new HtmlViewController(model, ...args));
    const controls = ((_a = c.model.viewLayoutPanel) == null ? void 0 : _a.controls) || c.model.controls;
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    const isLoading = ref(false);
    onBeforeMount(() => {
      if (c.state.htmlUrl) {
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
      isLoading,
      onLoad
    };
  },
  render() {
    if (!this.c.state.isCreated)
      return;
    if (this.c.state.htmlUrl) {
      return withDirectives(createVNode("div", {
        "class": this.viewClassNames,
        "element-loading-text": this.c.state.loadingText
      }, [createVNode("iframe", {
        "src": this.c.state.htmlUrl,
        "onLoad": () => this.onLoad()
      }, null)]), [[resolveDirective("loading"), this.isLoading]]);
    }
    let Content = null;
    const provider = getErrorViewProvider("404");
    if (provider) {
      if (typeof provider.component === "string") {
        Content = h(resolveComponent(provider.component));
      }
      Content = h(provider.component);
    }
    return createVNode("div", {
      "class": this.viewClassNames
    }, [Content]);
  }
});

export { HtmlView };
