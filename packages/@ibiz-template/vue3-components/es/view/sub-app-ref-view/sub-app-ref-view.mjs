import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { ViewController } from '@ibiz-template/runtime';
import { useNamespace, useViewController } from '@ibiz-template/vue3-util';
import './sub-app-ref-view.css';

"use strict";
const SubAppRefView = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("sub-app-ref-view");
    const c = useViewController((...args) => new ViewController(...args));
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    const htmlUrl = computed(() => {
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
    return createVNode("div", {
      "class": this.viewClassNames
    }, [createVNode(resolveComponent("el-result"), {
      "class": this.ns.b("result"),
      "icon": "info"
    }, null), this.c.model.caption && createVNode("div", {
      "class": this.ns.b("caption")
    }, [this.c.model.caption]), this.c.model.subCaption && createVNode("div", {
      "class": this.ns.b("sub-caption")
    }, [this.c.model.subCaption]), this.htmlUrl && createVNode(resolveComponent("el-button"), {
      "class": this.ns.b("btn"),
      "onClick": this.handleClick,
      "size": "large"
    }, {
      default: () => [this.c.model.title || ibiz.i18n.t("view.subAppRefView.jump")]
    })]);
  }
});

export { SubAppRefView };
