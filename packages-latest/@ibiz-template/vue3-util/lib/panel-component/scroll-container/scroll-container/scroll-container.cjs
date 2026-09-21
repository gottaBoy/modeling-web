'use strict';

var vue = require('vue');
require('../../../use/index.cjs');
var scrollContainer_controller = require('./scroll-container.controller.cjs');
require('./scroll-container.css');
var namespace = require('../../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const ScrollContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScrollContainer",
  props: {
    /**
     * @description 滚动容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 滚动容器控制器
     */
    controller: {
      type: scrollContainer_controller.ScrollContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("scroll-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let left = null;
    let top = null;
    let right = null;
    let bottom = null;
    let center = null;
    const slotStylle = {};
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    defaultSlots.forEach((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return;
      }
      const {
        width,
        height
      } = props.controller.state.layout;
      switch (props.modelData.layoutPos.layoutPos) {
        case "WEST":
          left = slot;
          slotStylle.left = {
            width
          };
          break;
        case "EAST":
          right = slot;
          slotStylle.right = {
            width
          };
          break;
        case "NORTH":
          top = slot;
          slotStylle.top = {
            height
          };
          break;
        case "SOUTH":
          bottom = slot;
          slotStylle.bottom = {
            height
          };
          break;
        case "CENTER":
          center = slot;
          break;
        default:
          ibiz.log.debug(ibiz.i18n.t("vue3Util.panelComponent.unadaptedLayout", {
            layoutPos: props.modelData.layoutPos.layoutPos
          }));
          break;
      }
    });
    for (const key in slotStylle) {
      if (slotStylle[key].width || slotStylle[key].height) {
        slotStylle[key].flexShrink = 0;
      }
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [vue.createVNode("div", {
      "class": [this.ns.e("header"), this.semanticClass("header")],
      "style": [slotStylle.top, this.semanticStyle("header")]
    }, [top]), vue.createVNode("div", {
      "class": [this.ns.b("content"), this.semanticClass("content")],
      "style": this.semanticStyle("content")
    }, [vue.createVNode("div", {
      "class": [this.ns.be("content", "left"), this.semanticClass("left")],
      "style": [slotStylle.left, this.semanticStyle("left")]
    }, [left]), vue.createVNode("div", {
      "class": [this.ns.be("content", "center"), this.semanticClass("center")],
      "style": this.semanticStyle("center")
    }, [center]), vue.createVNode("div", {
      "class": [this.ns.be("content", "right"), this.semanticClass("right")],
      "style": [slotStylle.right, this.semanticStyle("right")]
    }, [right])]), vue.createVNode("div", {
      "class": [this.ns.e("footer"), this.semanticClass("footer")],
      "style": [slotStylle.bottom, this.semanticStyle("footer")]
    }, [bottom])]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.ScrollContainer = ScrollContainer;
