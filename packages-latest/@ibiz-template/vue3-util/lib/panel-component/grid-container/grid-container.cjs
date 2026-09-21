'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var gridContainer_controller = require('./grid-container.controller.cjs');
require('./grid-container.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const GridContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridContainer",
  props: {
    /**
     * @description 栅格容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 栅格容器控制器
     */
    controller: {
      type: gridContainer_controller.GridContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("grid-container");
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
    const layoutModel = vue.computed(() => {
      return {
        ...props.modelData.layout,
        layout: "TABLE_12COL"
      };
    });
    const convertLayoutPos = (layoutPos, adaptGrow2) => {
      const result = {
        ...layoutPos,
        layout: "TABLE_12COL",
        colXS: layoutPos.grow || adaptGrow2,
        colSM: layoutPos.grow || adaptGrow2,
        colMD: layoutPos.grow || adaptGrow2,
        colLG: layoutPos.grow || adaptGrow2
      };
      delete result.grow;
      return result;
    };
    const adaptCols = vue.ref(void 0);
    const adaptGrow = vue.ref(12);
    return {
      ns,
      classArr,
      layoutModel,
      convertLayoutPos,
      adaptGrow,
      adaptCols,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    if (this.adaptCols === void 0) {
      let currentGrow = 0;
      let adaptCols = 0;
      defaultSlots.forEach((slot) => {
        const props = slot.props;
        if (props && props.modelData && props.modelData.layoutPos) {
          if (typeof props.modelData.layoutPos.grow === "number") {
            currentGrow += props.modelData.layoutPos.grow;
          } else if (typeof props.modelData.layoutPos.grow === "undefined") {
            adaptCols += 1;
          }
        }
      });
      let adaptGrow = 12;
      if (adaptCols > 0) {
        adaptGrow = (12 - currentGrow) / adaptCols;
      }
      this.adaptCols = adaptCols;
      this.adaptGrow = adaptGrow;
    }
    return vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "layout": this.layoutModel,
      "element-loading-text": this.controller.state.loadingText
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "class": this.semanticClass("item"),
        "style": this.semanticStyle("item"),
        "layoutPos": this.convertLayoutPos(props.modelData.layoutPos, this.adaptGrow),
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.GridContainer = GridContainer;
