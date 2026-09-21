import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { isSvg } from '@ibiz-template/core';
import '../../use/index.mjs';
import { PanelContainerImageController } from './panel-container-image.controller.mjs';
import './panel-container-image.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelContainerImage = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainerImage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelContainerImageController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-container-image");
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const backgroundStyle = computed(() => {
      const image = props.controller.model.sysImage;
      const styles = {};
      let imgStr = "";
      if (image == null ? void 0 : image.rawContent) {
        if (isSvg(image.rawContent)) {
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
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      },
      "style": this.backgroundStyle
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

export { PanelContainerImage };
