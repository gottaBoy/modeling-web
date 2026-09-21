'use strict';

var vue = require('vue');
require('../../../use/index.cjs');
var scrollContainer_controller = require('./scroll-container.controller.cjs');
require('./scroll-container.css');
var namespace = require('../../../use/namespace/namespace.cjs');

"use strict";
const ScrollContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScrollContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
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
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    return {
      ns,
      classArr
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
    return vue.createVNode("div", {
      "class": this.classArr
    }, [vue.createVNode("div", {
      "class": [this.ns.e("header")],
      "style": slotStylle.top
    }, [top]), vue.createVNode("div", {
      "class": [this.ns.b("content")]
    }, [vue.createVNode("div", {
      "class": this.ns.be("content", "left"),
      "style": slotStylle.left
    }, [left]), vue.createVNode("div", {
      "class": this.ns.be("content", "center")
    }, [center]), vue.createVNode("div", {
      "class": this.ns.be("content", "right"),
      "style": slotStylle.right
    }, [right])]), vue.createVNode("div", {
      "class": [this.ns.e("footer")],
      "style": slotStylle.bottom
    }, [bottom])]);
  }
});

exports.ScrollContainer = ScrollContainer;
