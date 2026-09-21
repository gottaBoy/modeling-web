'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
require('../../use/index.cjs');
var panelContainerImage_controller = require('./panel-container-image.controller.cjs');
require('./panel-container-image.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelContainerImage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainerImage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelContainerImage_controller.PanelContainerImageController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-container-image");
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const backgroundStyle = vue.computed(() => {
      const image = props.controller.model.sysImage;
      const styles = {};
      let imgStr = "";
      if (image == null ? void 0 : image.rawContent) {
        if (core.isSvg(image.rawContent)) {
          imgStr = "url(data:image/svg+xml;base64,".concat(btoa(image.rawContent), ")");
        } else {
          imgStr = "url(".concat(image.rawContent, ")");
        }
      } else if (image == null ? void 0 : image.imagePath) {
        imgStr = "url(".concat(image.imagePath, ")");
      }
      if (imgStr) {
        Object.assign(styles, {
          backgroundImage: imgStr
        });
      }
      return styles;
    });
    return {
      ns,
      classArr,
      backgroundStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
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
    return vue.createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      },
      "style": this.backgroundStyle
    }, [this.controller.model.cssStyle ? vue.createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

exports.PanelContainerImage = PanelContainerImage;
