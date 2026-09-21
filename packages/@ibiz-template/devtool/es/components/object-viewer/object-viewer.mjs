import { createVNode, createTextVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../collapse/index.mjs';
import './object-viewer.css';
import { DevToolCollapse } from '../collapse/devtool-collapse/devtool-collapse.mjs';
import { DevToolCollapsePanel } from '../collapse/devtool-collapse-panel/devtool-collapse-panel.mjs';

"use strict";
const ObjectViewer = /* @__PURE__ */ defineComponent({
  name: "DevToolObjectViewer",
  component: [DevToolCollapse, DevToolCollapsePanel],
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("object-viewer");
    const copy = (value) => {
      if (!value) {
        return;
      }
      const result = ibiz.util.text.copy(value);
      if (result) {
        ibiz.message.success("\u62F7\u8D1D\u6210\u529F!");
      } else {
        ibiz.message.error("\u62F7\u8D1D\u5931\u8D25\uFF0C\u6D4F\u89C8\u5668copy\u64CD\u4F5C\u4E0D\u88AB\u652F\u6301\u6216\u672A\u88AB\u542F\u7528!");
      }
    };
    return {
      ns,
      copy
    };
  },
  render() {
    if (!this.obj) {
      return null;
    }
    const keys = Object.keys(this.obj);
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [keys.map((key) => {
      const value = this.obj[key];
      if (typeof value === "object" && value !== null) {
        return createVNode(DevToolCollapse, {
          "value": ["sub"]
        }, {
          default: () => [createVNode(DevToolCollapsePanel, {
            "title": key,
            "name": "sub"
          }, {
            default: () => [createVNode(ObjectViewer, {
              "obj": value
            }, null)]
          })]
        });
      }
      return createVNode("div", {
        "class": this.ns.b("item")
      }, [createVNode("div", {
        "class": this.ns.be("item", "key"),
        "title": key,
        "onClick": (e) => {
          e.stopPropagation();
          this.copy(key);
        }
      }, [key]), createVNode("div", {
        "class": this.ns.be("item", "separator")
      }, [createTextVNode(":")]), createVNode("div", {
        "class": this.ns.be("item", "value"),
        "title": value,
        "onClick": (e) => {
          e.stopPropagation();
          this.copy(value);
        }
      }, ["".concat(value)])]);
    })]);
  }
});

export { ObjectViewer };
