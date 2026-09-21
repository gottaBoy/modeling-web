import { isVNode, defineComponent, computed, ref, createVNode, resolveComponent } from 'vue';
import '../../use/index.mjs';
import { GridContainerController } from './grid-container.controller.mjs';
import './grid-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GridContainer = /* @__PURE__ */ defineComponent({
  name: "IBizGridContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: GridContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("grid-container");
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const layoutModel = computed(() => {
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
    const adaptCols = ref(void 0);
    const adaptGrow = ref(12);
    return {
      ns,
      classArr,
      layoutModel,
      convertLayoutPos,
      adaptGrow,
      adaptCols
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
    return createVNode(resolveComponent("iBizRow"), {
      "class": this.classArr,
      "layout": this.layoutModel
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": this.convertLayoutPos(props.modelData.layoutPos, this.adaptGrow),
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { GridContainer };
