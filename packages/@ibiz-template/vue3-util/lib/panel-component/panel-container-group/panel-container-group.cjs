'use strict';

var vue = require('vue');
var panelContainerGroup_controller = require('./panel-container-group.controller.cjs');
require('./panel-container-group.css');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelContainerGroup = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainerGroup",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelContainerGroup_controller.PanelContainerGroupController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-container-group");
    const isCollapse = vue.ref(!props.controller.defaultExpansion);
    const changeCollapse = () => {
      if (!props.controller.disableClose) {
        isCollapse.value = !isCollapse.value;
      }
    };
    const captionText = vue.computed(() => {
      const {
        captionItemName,
        caption,
        capLanguageRes
      } = props.modelData;
      if (captionItemName) {
        return props.controller.data[captionItemName];
      }
      let text = caption;
      if (capLanguageRes) {
        text = ibiz.i18n.t(capLanguageRes.lanResTag, caption);
      }
      return text;
    });
    return {
      ns,
      captionText,
      changeCollapse,
      isCollapse
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("hidden", !this.controller.state.visible)];
    if (this.modelData.showCaption === true) {
      classArr.push(this.ns.m("show-header"));
      classArr.push(this.ns.b("collapse"));
      classArr.push(this.ns.is("collapse", this.isCollapse));
      if (this.controller.disableClose) {
        classArr.push(this.ns.bm("collapse", "disable-close"));
      }
    }
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    let header = null;
    if (this.modelData.showCaption) {
      header = vue.createVNode("div", {
        "class": [this.ns.b("header")],
        "onClick": this.changeCollapse
      }, [vue.createVNode("div", {
        "class": [this.ns.be("header", "left")]
      }, [vue.createVNode("div", {
        "class": [this.ns.e("caption"), ...this.controller.labelClass]
      }, [this.captionText])]), vue.createVNode("div", {
        "class": [this.ns.be("header", "right")]
      }, [this.modelData.titleBarCloseMode !== void 0 && this.modelData.titleBarCloseMode !== 0 && (this.isCollapse ? vue.createVNode("ion-icon", {
        "name": "caret-forward-sharp"
      }, null) : vue.createVNode("ion-icon", {
        "name": "caret-down-sharp"
      }, null))])]);
    }
    return vue.createVNode("div", {
      "class": classArr
    }, [header, vue.createVNode("div", {
      "class": [this.ns.b("content")]
    }, [content])]);
  }
});

exports.PanelContainerGroup = PanelContainerGroup;
