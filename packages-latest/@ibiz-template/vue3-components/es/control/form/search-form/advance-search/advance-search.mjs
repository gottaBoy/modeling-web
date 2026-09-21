import { isVNode, defineComponent, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { filterPresetAttrs, ScriptFactory, findChildFormDetails } from '@ibiz-template/runtime';
import './advance-search.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AdvanceSearch = /* @__PURE__ */ defineComponent({
  name: "IBizAdvanceSearch",
  props: {
    controller: {
      type: Object,
      required: true
    },
    modal: {
      type: Object
    }
  },
  setup(props) {
    const ns = useNamespace("advance-search");
    const c = props.controller;
    const renderAttrs = (model) => {
      const attrs = {};
      filterPresetAttrs(model.controlAttributes).forEach((item) => {
        if (item.attrName && item.attrValue) {
          attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
            ...c.getEventArgs(),
            data: c.data
          });
        }
      });
      return attrs;
    };
    const renderByDetailType = (detail) => {
      const {
        hidden,
        userTag
      } = detail;
      if (hidden || userTag === "permanent")
        return;
      const detailId = detail.id;
      const childSlots = {};
      const childDetails = findChildFormDetails(detail);
      if (childDetails.length) {
        childSlots.default = () => childDetails.map((child) => {
          return renderByDetailType(child);
        });
      }
      const provider = c.providers[detailId];
      if (!provider) {
        return createVNode("div", null, [ibiz.i18n.t("control.form.noSupportDetailType", {
          detailType: detail.detailType
        })]);
      }
      const component = resolveComponent(provider.component);
      return h(component, {
        modelData: detail,
        controller: c.details[detailId],
        key: detail.id,
        attrs: renderAttrs(detail)
      }, childSlots);
    };
    return {
      ns,
      renderByDetailType
    };
  },
  render() {
    let _slot, _slot2;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header")
    }, [createVNode("span", null, [ibiz.i18n.t("app.advanceSearch")])]), createVNode("div", {
      "class": this.ns.e("search-form")
    }, [createVNode(resolveComponent("iBizFormPage"), {
      "modelData": this.controller.model,
      "controller": this.controller
    }, {
      default: () => {
        var _a;
        return [(_a = this.controller.model.deformPages) == null ? void 0 : _a.map((page) => {
          return this.renderByDetailType(page);
        })];
      }
    })]), createVNode("div", {
      "class": this.ns.e("footer")
    }, [createVNode(resolveComponent("el-button"), {
      "type": "primary",
      "onClick": () => this.controller.search()
    }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("el-button"), {
      "type": "primary",
      "onClick": () => this.controller.reset()
    }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
      default: () => [_slot2]
    })])]);
  }
});

export { AdvanceSearch };
