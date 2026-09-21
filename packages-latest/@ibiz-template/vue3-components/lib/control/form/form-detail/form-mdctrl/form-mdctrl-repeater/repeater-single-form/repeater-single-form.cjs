'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
require('./repeater-single-form.css');

"use strict";
const RepeaterSingleForm = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRepeaterSingleForm",
  props: {
    data: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormMDCtrlRepeaterController,
      required: true
    },
    simpleDataIndex: {
      type: Number
    }
  },
  emits: {
    change: (_value) => true,
    created: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("repeater-single-form");
    const ns2 = vue3Util.useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.form);
    const onFormDataChange = (event) => {
      const item = event.data[0];
      const formData = item instanceof runtime.ControlVO ? item.getOrigin() : {
        ...item
      };
      const cloneData = {};
      if (formData && Object.keys(formData).length > 0) {
        Object.keys(formData).forEach((key) => {
          cloneData[key] = formData[key];
        });
      }
      emit("change", cloneData);
    };
    const onCreated = (event) => {
      emit("created", event);
    };
    return {
      ns,
      ns2,
      onFormDataChange,
      onCreated,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.repeatedForm) {
      throw new core.RuntimeError(ibiz.i18n.t("control.form.repeaterSingleForm.errorMessage"));
    }
    return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
      "class": [this.ns.b(), this.ns2.b("item"), this.semanticClass("mdctrl.item", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.item", {
        mdctrl: this.controller
      }),
      "context": this.controller.context,
      "params": this.controller.params,
      "modelData": this.controller.repeatedForm,
      "isSimple": true,
      "simpleDataIndex": this.simpleDataIndex,
      "data": this.data,
      "onFormDataChange": this.onFormDataChange,
      "onCreated": this.onCreated
    }, null);
  }
});

exports.RepeaterSingleForm = RepeaterSingleForm;
