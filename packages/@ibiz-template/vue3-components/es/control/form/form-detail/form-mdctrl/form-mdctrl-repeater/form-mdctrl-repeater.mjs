import { defineComponent, createVNode } from 'vue';
import { FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RepeaterSingleForm } from './repeater-single-form/repeater-single-form.mjs';
import { RepeaterMultiForm } from './repeater-multi-form/repeater-multi-form.mjs';
import { RepeaterGrid } from './repeater-grid/repeater-grid.mjs';

"use strict";
const FormMDCtrlRepeater = /* @__PURE__ */ defineComponent({
  name: "IBizFormMDCtrlRepeater",
  props: {
    controller: {
      type: FormMDCtrlRepeaterController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-mdctrl-repeater");
    const onDataChange = (data) => {
      props.controller.setValue(data);
    };
    return {
      ns,
      onDataChange
    };
  },
  render() {
    const classNames = [this.ns.b()];
    switch (this.controller.repeaterStyle) {
      case "MultiForm":
        return createVNode(RepeaterMultiForm, {
          "class": classNames,
          "onChange": this.onDataChange,
          "controller": this.controller
        }, null);
      case "Grid":
        return createVNode(RepeaterGrid, {
          "class": classNames,
          "controller": this.controller,
          "onChange": this.onDataChange
        }, null);
      case "SingleForm":
        return createVNode(RepeaterSingleForm, {
          "class": classNames,
          "data": this.controller.value,
          "controller": this.controller,
          "onChange": this.onDataChange
        }, null);
      default:
        return createVNode("div", {
          "class": classNames
        }, [ibiz.i18n.t("control.form.formMDctrlRepeater.noSupportStyle", {
          repeaterStyle: this.controller.repeaterStyle
        })]);
    }
  }
});

export { FormMDCtrlRepeater };
