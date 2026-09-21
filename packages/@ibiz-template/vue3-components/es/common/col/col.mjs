import { defineComponent, computed, createVNode, h, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { calcContentAlignStyle } from '@ibiz-template/runtime';
import './col.css';

"use strict";
function calcGridSpanOffset(span, offset, layout) {
  const multiplier = layout === "TABLE_24COL" ? 1 : 2;
  const spanDefault = layout === "TABLE_24COL" ? 24 : 12;
  const _span = !span || span === -1 ? spanDefault : span;
  const _offset = !offset || offset === -1 ? 0 : offset;
  const result = {
    span: _span * multiplier
  };
  if (_offset !== 0) {
    result.offset = _offset;
  }
  return result;
}
const IBizCol = /* @__PURE__ */ defineComponent({
  name: "IBizCol",
  props: {
    layoutPos: {
      type: Object,
      required: true
    },
    state: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("col");
    const spacingClass = computed(() => {
      const ns2 = useNamespace("spacing");
      const classArr = [];
      const spacings = {
        top: props.layoutPos.spacingTop,
        bottom: props.layoutPos.spacingBottom,
        left: props.layoutPos.spacingLeft,
        right: props.layoutPos.spacingRight
      };
      Object.keys(spacings).forEach((position) => {
        const value = spacings[position];
        if (!value) {
          return;
        }
        classArr.push(ns2.bm(position, value.toLowerCase()));
      });
      return classArr;
    });
    const gridAttrs = computed(() => {
      const gridLayoutPos = props.layoutPos;
      if (gridLayoutPos.layout === "FLEX") {
        return {};
      }
      const {
        colXS,
        colXSOffset,
        colSM,
        colSMOffset,
        colMD,
        colMDOffset,
        colLG,
        colLGOffset
      } = gridLayoutPos;
      return {
        xs: calcGridSpanOffset(colXS, colXSOffset, gridLayoutPos.layout),
        sm: calcGridSpanOffset(colSM, colSMOffset, gridLayoutPos.layout),
        md: calcGridSpanOffset(colMD, colMDOffset, gridLayoutPos.layout),
        lg: calcGridSpanOffset(colLG, colLGOffset, gridLayoutPos.layout)
      };
    });
    const alignStyle = calcContentAlignStyle(props.layoutPos);
    const cssVars = computed(() => {
      const layout = props.state.layout;
      const styles = {
        width: layout.width,
        height: layout.height,
        ...alignStyle || {}
      };
      Object.assign(styles, layout.extraStyle);
      return styles;
    });
    const colClass = computed(() => {
      var _a;
      const result = [ns.b(), ((_a = props.layoutPos) == null ? void 0 : _a.layout) === "FLEX" ? ns.m("flex") : ns.m("grid"), ns.is("hidden", !props.state.visible), ...spacingClass.value, !alignStyle ? "" : ns.m("self-align"), ...props.state.layout.extraClass];
      return result;
    });
    return {
      ns,
      colClass,
      gridAttrs,
      cssVars
    };
  },
  render() {
    var _a, _b, _c;
    if (!this.state.visible && !this.state.keepAlive) {
      return null;
    }
    const defaultSlot = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a);
    if (((_c = this.layoutPos) == null ? void 0 : _c.layout) === "FLEX") {
      const pos = this.layoutPos;
      return createVNode("div", {
        "class": this.colClass,
        "style": {
          flexGrow: pos.grow,
          flexShrink: pos.shrink === 1 ? void 0 : pos.shrink,
          flexBasis: pos.basis,
          ...this.cssVars
        }
      }, [defaultSlot]);
    }
    return h(resolveComponent("el-col"), {
      class: this.colClass,
      style: this.cssVars,
      ...this.gridAttrs
    }, {
      default: () => defaultSlot
    });
  }
});

export { IBizCol };
