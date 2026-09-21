'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var repeaterSingleForm = require('./repeater-single-form/repeater-single-form.cjs');
var repeaterMultiForm = require('./repeater-multi-form/repeater-multi-form.cjs');
var repeaterGrid = require('./repeater-grid/repeater-grid.cjs');

"use strict";
const FormMDCtrlRepeater = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormMDCtrlRepeater",
  props: {
    controller: {
      type: runtime.FormMDCtrlRepeaterController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-mdctrl-repeater");
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
        return vue.createVNode(repeaterMultiForm.RepeaterMultiForm, {
          "class": classNames,
          "onChange": this.onDataChange,
          "controller": this.controller
        }, null);
      case "Grid":
        return vue.createVNode(repeaterGrid.RepeaterGrid, {
          "class": classNames,
          "controller": this.controller,
          "onChange": this.onDataChange
        }, null);
      case "SingleForm":
        return vue.createVNode(repeaterSingleForm.RepeaterSingleForm, {
          "class": classNames,
          "data": this.controller.value,
          "controller": this.controller,
          "onChange": this.onDataChange
        }, null);
      default:
        return vue.createVNode("div", {
          "class": classNames
        }, [ibiz.i18n.t("control.form.formMDctrlRepeater.noSupportStyle", {
          repeaterStyle: this.controller.repeaterStyle
        })]);
    }
  }
});

exports.FormMDCtrlRepeater = FormMDCtrlRepeater;
