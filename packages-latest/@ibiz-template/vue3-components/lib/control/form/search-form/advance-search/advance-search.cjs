'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./advance-search.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const AdvanceSearch = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("advance-search");
    const c = props.controller;
    const renderAttrs = (model) => {
      const attrs = {};
      runtime.filterPresetAttrs(model.controlAttributes).forEach((item) => {
        if (item.attrName && item.attrValue) {
          attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
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
      const childDetails = runtime.findChildFormDetails(detail);
      if (childDetails.length) {
        childSlots.default = () => childDetails.map((child) => {
          return renderByDetailType(child);
        });
      }
      const provider = c.providers[detailId];
      if (!provider) {
        return vue.createVNode("div", null, [ibiz.i18n.t("control.form.noSupportDetailType", {
          detailType: detail.detailType
        })]);
      }
      const component = vue.resolveComponent(provider.component);
      return vue.h(component, {
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("header")
    }, [vue.createVNode("span", null, [ibiz.i18n.t("app.advanceSearch")])]), vue.createVNode("div", {
      "class": this.ns.e("search-form")
    }, [vue.createVNode(vue.resolveComponent("iBizFormPage"), {
      "modelData": this.controller.model,
      "controller": this.controller
    }, {
      default: () => {
        var _a;
        return [(_a = this.controller.model.deformPages) == null ? void 0 : _a.map((page) => {
          return this.renderByDetailType(page);
        })];
      }
    })]), vue.createVNode("div", {
      "class": this.ns.e("footer")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "type": "primary",
      "onClick": () => this.controller.search()
    }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
      default: () => [_slot]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "type": "primary",
      "onClick": () => this.controller.reset()
    }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
      default: () => [_slot2]
    })])]);
  }
});

exports.AdvanceSearch = AdvanceSearch;
