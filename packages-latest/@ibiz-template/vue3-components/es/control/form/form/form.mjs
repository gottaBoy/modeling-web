import { isVNode, defineComponent, createVNode, resolveComponent, renderSlot, h } from 'vue';
import { ControlType, filterPresetAttrs, ScriptFactory, findChildFormDetails } from '@ibiz-template/runtime';
import { useNamespace, useControlPopoverzIndex, useSemanticNode } from '@ibiz-template/vue3-util';
import './form.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormControl = /* @__PURE__ */ defineComponent({
  name: "IBizFormControl",
  props: {
    /**
     * @description 部件控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    const ns = useNamespace("control-form");
    const c = props.controller;
    useControlPopoverzIndex(c);
    const slotProps = {
      form: c
    };
    const renderAttrs = (model) => {
      const attrs = {};
      filterPresetAttrs(model.controlAttributes).forEach((item) => {
        if (item.attrName && item.attrValue) {
          attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
            ...props.controller.getEventArgs(),
            data: props.controller.data
          });
        }
      });
      return attrs;
    };
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const renderByDetailType = (detail, isRoot = false) => {
      const {
        hidden,
        userTag
      } = detail;
      if (hidden || !isRoot && c.model.enableAdvanceSearch && userTag !== "permanent")
        return;
      const detailId = detail.id;
      if (slots[detailId]) {
        return renderSlot(slots, detailId, {
          model: detail,
          data: c.state.data,
          value: c.state.data[detailId],
          controller: c.details[detailId]
        });
      }
      const childSlots = {};
      if (detail.detailType === "FORMITEM" && slots["".concat(detailId, "_editor")]) {
        childSlots.default = (...args) => {
          return slots["".concat(detailId, "_editor")](...args);
        };
      }
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
      renderByDetailType,
      semanticClass,
      semanticStyle
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
        const formSlotKey = model.controlType === ControlType.SEARCHFORM ? "searchform" : "form";
        const key = controlPanel ? formSlotKey : "default";
        slots[key] = () => {
          return createVNode(resolveComponent("iBizFormPage"), {
            "modelData": this.c.model,
            "controller": this.c
          }, {
            default: () => {
              var _a;
              return [(_a = this.c.model.deformPages) == null ? void 0 : _a.map((page) => {
                return this.renderByDetailType(page, true);
              })];
            }
          });
        };
      }
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "controller": this.c
    }, _isSlot(slots) ? slots : {
      default: () => [slots]
    });
  }
});

export { FormControl };
