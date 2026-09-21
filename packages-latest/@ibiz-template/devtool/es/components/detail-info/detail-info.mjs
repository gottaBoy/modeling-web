import { ref, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../collapse/index.mjs';
import './detail-info.css';
import { ObjectViewer } from '../object-viewer/object-viewer.mjs';
import { DevToolCollapse } from '../collapse/devtool-collapse/devtool-collapse.mjs';
import { DevToolCollapsePanel } from '../collapse/devtool-collapse-panel/devtool-collapse-panel.mjs';

"use strict";
const DetailInfo = /* @__PURE__ */ defineComponent({
  name: "DevToolDetailInfo",
  component: [DevToolCollapse, DevToolCollapsePanel],
  props: {
    center: {
      type: Object,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("detail-info");
    const expandItems = ref(["context"]);
    return {
      ns,
      expandItems
    };
  },
  render() {
    this.center.state.viewListRefreshKey;
    if (!this.center.state.selectedViewId) {
      return null;
    }
    const view = this.center.activeViews.find((item) => item.id === this.center.state.selectedViewId);
    if (!view) {
      return null;
    }
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode(DevToolCollapse, {
      "value": this.expandItems
    }, {
      default: () => [createVNode(DevToolCollapsePanel, {
        "title": "\u89C6\u56FE\u4E0A\u4E0B\u6587",
        "name": "context"
      }, {
        default: () => [createVNode(ObjectViewer, {
          "obj": view.context
        }, null)]
      }), createVNode(DevToolCollapsePanel, {
        "title": "\u89C6\u56FE\u53C2\u6570",
        "name": "viewparams"
      }, {
        default: () => [view.params && createVNode(ObjectViewer, {
          "obj": view.params
        }, null)]
      })]
    })]);
  }
});

export { DetailInfo };
