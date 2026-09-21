'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var panelContainerGroup_controller = require('./panel-container-group.controller.cjs');
require('./panel-container-group.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelContainerGroup = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainerGroup",
  props: {
    /**
     * @description 分组容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分组容器控制器
     */
    controller: {
      type: panelContainerGroup_controller.PanelContainerGroupController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-container-group");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const isCollapse = vue.ref(!props.controller.defaultExpansion);
    const {
      zIndex
    } = vue3Util.useUIStore();
    const changeCollapse = () => {
      if (!props.controller.disableClose) {
        isCollapse.value = !isCollapse.value;
      }
    };
    const onActionClick = async (detail, event) => {
      const tempParams = {
        srfgroupid: props.modelData.codeName
      };
      await props.controller.onActionClick(detail, event, tempParams);
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
      isCollapse,
      zIndex,
      changeCollapse,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const {
      state
    } = this.controller;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("hidden", !this.controller.state.visible), this.semanticClass("root")];
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
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
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
        "class": [this.ns.b("header"), this.semanticClass("header")],
        "style": this.semanticStyle("header"),
        "onClick": this.changeCollapse
      }, [vue.createVNode("div", {
        "class": [this.ns.be("header", "left")]
      }, [vue.createVNode("div", {
        "class": [this.ns.e("caption"), ...this.controller.labelClass]
      }, [this.modelData.sysImage && vue.createVNode(vue3Util.IBizIcon, {
        "class": [this.ns.em("caption", "icon"), this.semanticClass("icon")],
        "style": this.semanticStyle("icon"),
        "icon": this.modelData.sysImage
      }, null), vue.createVNode("span", {
        "class": [this.semanticClass("caption")],
        "style": this.semanticStyle("caption")
      }, [this.captionText]), this.modelData.counterId && vue.createVNode("span", {
        "class": [this.ns.e("counter"), this.semanticClass("counter")],
        "style": this.semanticStyle("counter")
      }, [vue.createTextVNode("("), this.controller.state.counterData[this.modelData.counterId], vue.createTextVNode(")")])])]), vue.createVNode("div", {
        "class": [this.ns.be("header", "right")]
      }, [this.modelData.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "zIndex": this.zIndex.zIndex,
        "class": [this.ns.e("toolbar"), this.semanticClass("toolbar")],
        "style": this.semanticStyle("toolbar"),
        "action-details": this.modelData.uiactionGroup.uiactionGroupDetails,
        "actions-state": state.actionGroupState,
        "onActionClick": this.onActionClick,
        "caption": this.modelData.uiactionGroup.name,
        "mode": this.modelData.actionGroupExtractMode === "ITEMS" ? "dropdown" : "buttons"
      }, null), this.modelData.titleBarCloseMode !== void 0 && this.modelData.titleBarCloseMode !== 0 && (this.isCollapse ? vue.createVNode("ion-icon", {
        "name": "caret-forward-sharp"
      }, null) : vue.createVNode("ion-icon", {
        "name": "caret-down-sharp"
      }, null))])]);
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": classArr,
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [header, vue.createVNode("div", {
      "class": [this.ns.b("content"), this.semanticClass("content")],
      "style": this.semanticStyle("content")
    }, [content])]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.PanelContainerGroup = PanelContainerGroup;
