'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./panel-tab-panel.css');
var panelTabPanel_controller = require('./panel-tab-panel.controller.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelTabPanel = /* @__PURE__ */ vue.defineComponent({
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
      type: panelTabPanel_controller.PanelTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-tab-panel");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const {
      state
    } = props.controller;
    const classArr = vue.computed(() => {
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
    return vue.withDirectives(vue.createVNode(vue.resolveComponent("el-tabs"), {
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
      return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
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
    }), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.PanelTabPanel = PanelTabPanel;
