import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, computed } from 'vue';
import { isSvg } from '@ibiz-template/core';
import '../../use/index.mjs';
import { PanelContainerImageController } from './panel-container-image.controller.mjs';
import './panel-container-image.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelContainerImage = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainerImage",
  props: {
    /**
     * @description 图片背景容器模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 图片背景容器控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
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
          const rawContent = image.rawContent.replace(/[\u4e00-\u9fff]/g, "");
          imgStr = "url(data:image/svg+xml;base64,".concat(btoa(rawContent), ")");
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
      backgroundStyle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state,
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        })
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "element-loading-text": this.controller.state.loadingText,
      "onClick": (event) => this.controller.onClick(event),
      "style": [this.backgroundStyle, this.semanticStyle("root")]
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { PanelContainerImage };
