'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
require('../../use/index.cjs');
var panelContainerImage_controller = require('./panel-container-image.controller.cjs');
require('./panel-container-image.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelContainerImage = /* @__PURE__ */ vue.defineComponent({
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
      type: panelContainerImage_controller.PanelContainerImageController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-container-image");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
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
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "slot": "content",
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
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
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "element-loading-text": this.controller.state.loadingText,
      "onClick": (event) => this.controller.onClick(event),
      "style": [this.backgroundStyle, this.semanticStyle("root")]
    }, [this.controller.model.cssStyle ? vue.createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.PanelContainerImage = PanelContainerImage;
