import { defineComponent, createVNode, resolveComponent } from 'vue';
import { ControlVO, FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
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
    const ns = useNamespace("repeater-single-form");
    const ns2 = useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const onFormDataChange = (event) => {
      const item = event.data[0];
      const formData = item instanceof ControlVO ? item.getOrigin() : {
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
      throw new RuntimeError(ibiz.i18n.t("control.form.repeaterSingleForm.errorMessage"));
    }
    return createVNode(resolveComponent("iBizControlShell"), {
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

export { RepeaterSingleForm };
