import { defineComponent, createVNode, resolveComponent } from 'vue';
import { FormMDCtrlRepeaterController, ControlVO } from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './repeater-single-form.css';

"use strict";
const RepeaterSingleForm = /* @__PURE__ */ defineComponent({
  name: "IBizRepeaterSingleForm",
  props: {
    data: {
      type: Object,
      required: true
    },
    controller: {
      type: FormMDCtrlRepeaterController,
      required: true
    }
  },
  emits: {
    change: (_value) => true,
    created: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("repeater-single-form");
    const onFormDataChange = (event) => {
      const item = event.data[0];
      const formData = item instanceof ControlVO ? item.clone() : {
        ...item
      };
      emit("change", formData);
    };
    const onCreated = (event) => {
      emit("created", event);
    };
    return {
      ns,
      onFormDataChange,
      onCreated
    };
  },
  render() {
    if (!this.controller.repeatedForm) {
      throw new RuntimeError(ibiz.i18n.t("control.form.repeaterSingleForm.errorMessage"));
    }
    return createVNode(resolveComponent("iBizControlShell"), {
      "class": this.ns.b(),
      "context": this.controller.context,
      "params": this.controller.params,
      "modelData": this.controller.repeatedForm,
      "isSimple": true,
      "data": this.data,
      "onFormDataChange": this.onFormDataChange,
      "onCreated": this.onCreated
    }, null);
  }
});

export { RepeaterSingleForm };
