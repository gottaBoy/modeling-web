'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormControl",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    const ns = vue3Util.useNamespace("control-form");
    const c = props.controller;
    const slotProps = {
      form: c
    };
    const renderAttrs = (model) => {
      var _a;
      const attrs = {};
      (_a = model.controlAttributes) == null ? void 0 : _a.forEach((item) => {
        if (item.attrName && item.attrValue) {
          attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
            ...props.controller.getEventArgs(),
            data: props.controller.data
          });
        }
      });
      return attrs;
    };
    const renderByDetailType = (detail) => {
      if (detail.hidden) {
        return;
      }
      const detailId = detail.id;
      if (slots[detailId]) {
        return vue.renderSlot(slots, detailId, {
          model: detail,
          data: c.state.data,
          value: c.state.data[detailId]
        });
      }
      const childSlots = {};
      if (detail.detailType === "FORMITEM" && slots["".concat(detailId, "_editor")]) {
        childSlots.default = (...args) => {
          return slots["".concat(detailId, "_editor")](...args);
        };
      }
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
    const FormDetail = (_props) => {
      const {
        modelData
      } = _props;
      const detailModels = modelData instanceof Array ? modelData : [modelData];
      return detailModels.map((detail) => {
        return renderByDetailType(detail);
      });
    };
    FormDetail.props = ["modelData"];
    slotProps.FormDetail = FormDetail;
    return {
      ns,
      c,
      FormDetail,
      slotProps,
      renderByDetailType
    };
  },
  render() {
    const {
      state,
      model,
      controlPanel
    } = this.c;
    const {
      isCreated
    } = state;
    const slots = {};
    if (isCreated) {
      if (this.$slots.default) {
        slots.default = () => {
          return this.$slots.default({
            ...this.slotProps
          });
        };
      } else {
        const formSlotKey = model.controlType === runtime.ControlType.SEARCHFORM ? "searchform" : "form";
        const key = controlPanel ? formSlotKey : "default";
        slots[key] = () => {
          return vue.createVNode(vue.resolveComponent("iBizFormPage"), {
            "modelData": this.c.model,
            "controller": this.c
          }, {
            default: () => {
              var _a;
              return [(_a = this.c.model.deformPages) == null ? void 0 : _a.map((page) => {
                return this.renderByDetailType(page);
              })];
            }
          });
        };
      }
    }
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "class": [this.ns.b()],
      "controller": this.c
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

exports.FormControl = FormControl;
