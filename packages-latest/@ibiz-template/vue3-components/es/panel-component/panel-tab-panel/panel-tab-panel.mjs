import { isVNode, defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './panel-tab-panel.css';
import { PanelTabPanelController } from './panel-tab-panel.controller.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelTabPanel = /* @__PURE__ */ defineComponent({
  name: "IBizPanelTabPanel",
  props: {
    /**
     * @description 分页面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分页面板控制器
     */
    controller: {
      type: PanelTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-tab-panel");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      state
    } = props.controller;
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    const childClass = [{
      class: semanticClass("label"),
      selector: ".el-tabs__item"
    }];
    const childStyle = [{
      style: semanticStyle("label"),
      selector: ".el-tabs__item"
    }];
    const onTabClick = (tabIns, event) => {
      props.controller.onTabChange(tabIns.props.name);
    };
    return {
      ns,
      state,
      classArr,
      onTabClick,
      semanticClass,
      semanticStyle,
      childClass,
      childStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    if (!this.controller.state.visible) {
      return;
    }
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return withDirectives(createVNode(resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root"),
      "model-value": this.state.activeTab,
      "onTabClick": this.onTabClick
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      if (!c.state.visible && !c.state.keepAlive) {
        return null;
      }
      return createVNode(resolveComponent("el-tab-pane"), {
        "class": [this.ns.b("tab-item"), this.semanticClass("item", {
          item: c
        })],
        "style": this.semanticStyle("item", {
          item: c
        }),
        "label": c.model.caption,
        "name": c.model.id,
        "lazy": true
      }, {
        default: () => [this.state.activeTab === c.model.id && slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { PanelTabPanel };
