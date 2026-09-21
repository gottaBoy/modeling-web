import { createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './view-list.css';
import { DetailInfo } from '../detail-info/detail-info.mjs';
import DevtoolButton from '../devtool-button/devtool-button.mjs';

"use strict";
const ViewList = /* @__PURE__ */ defineComponent({
  name: "DevToolViewList",
  component: [DevtoolButton],
  props: {
    center: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("view-list");
    const renderRefreshByViewList = () => {
      return props.center.state.viewListRefreshKey;
    };
    const onItemClick = (view) => {
      if (props.center.state.selectedViewId === view.id) {
        props.center.selectView();
      } else {
        props.center.selectView(view);
      }
    };
    const onMouseEnter = (_event, view) => {
      props.center.hoverView(view);
    };
    const onMouseLeave = (_event, _view) => {
      props.center.hoverView();
    };
    return {
      ns,
      renderRefreshByViewList,
      onItemClick,
      onMouseEnter,
      onMouseLeave
    };
  },
  render() {
    this.renderRefreshByViewList();
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [this.center.activeViews.length > 0 && this.center.activeViews.map((view) => {
      const caption = "".concat(view.model.caption, "\uFF08").concat(view.model.codeName, "\uFF09");
      const isSelected = this.center.state.selectedViewId === view.id;
      return createVNode("div", {
        "class": [this.ns.b("item"), isSelected && this.ns.bm("item", "selected")],
        "onClick": () => this.onItemClick(view),
        "onMouseenter": (evt) => {
          this.onMouseEnter(evt, view);
        },
        "onMouseleave": (evt) => {
          this.onMouseLeave(evt, view);
        }
      }, [createVNode("div", {
        "class": this.ns.be("item", "header")
      }, [createVNode("div", {
        "class": this.ns.be("item", "caption"),
        "title": caption
      }, [caption]), createVNode("div", {
        "class": this.ns.be("item", "toolbar")
      }, [createVNode(DevtoolButton, {
        "title": "\u62F7\u8D1D\u4EE3\u7801\u540D\u79F0",
        "onClick": (evt) => {
          evt.stopPropagation();
          this.center.copyCodeName(view);
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "copy-outline"
        }, null)]
      }), createVNode(DevtoolButton, {
        "title": "\u6253\u5F00\u914D\u7F6E\u5E73\u53F0",
        "onClick": (evt) => {
          evt.stopPropagation();
          this.center.openStudioUrl(view);
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "create-outline"
        }, null)]
      }), createVNode(DevtoolButton, {
        "onClick": (evt) => {
          evt.stopPropagation();
          this.center.skimViewModel(view);
        },
        "title": "\u67E5\u770B\u89C6\u56FE\u6A21\u578B"
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "layers-outline"
        }, null)]
      }), createVNode(DevtoolButton, {
        "onClick": (evt) => {
          evt.stopPropagation();
          this.center.skimTempData(view);
        },
        "title": "\u8F93\u51FA\u4F5C\u7528\u57DF\u4E0B\u7684\u4E34\u65F6\u6570\u636E\u5230\u63A7\u5236\u53F0"
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "server-outline"
        }, null)]
      })])]), createVNode("div", {
        "class": this.ns.be("item", "content")
      }, [createVNode(DetailInfo, {
        "center": this.center
      }, null)])]);
    })]);
  }
});

export { ViewList };
