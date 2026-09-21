'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var repeaterSingleForm = require('../repeater-single-form/repeater-single-form.cjs');

"use strict";
const RepeaterMultiForm = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRepeaterMultiForm",
  props: {
    controller: {
      type: runtime.FormMDCtrlRepeaterController,
      required: true
    }
  },
  emits: {
    change: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("repeater-multi-form");
    const onValueChange = (value, index) => {
      const arrData = [...props.controller.value];
      arrData[index] = value;
      emit("change", arrData);
    };
    const onCreated = (index, event) => {
      props.controller.setRepeaterController("".concat(index), event.ctrl);
    };
    return {
      ns,
      onValueChange,
      onCreated
    };
  },
  render() {
    const items = this.controller.value;
    let userStyle = "";
    if (this.controller.model.userParam && this.controller.model.userParam.STYLE) {
      userStyle = this.controller.model.userParam.STYLE;
    }
    return vue.createVNode(vue.resolveComponent("iBizMDCtrlContainer"), {
      "class": this.ns.b(),
      "userStyle": userStyle,
      "items": items,
      "enableCreate": this.controller.enableCreate,
      "enableDelete": this.controller.enableDelete,
      "onAddClick": () => this.controller.create(),
      "onRemoveClick": (_item, index) => this.controller.remove(index)
    }, {
      item: ({
        data,
        index
      }) => {
        return vue.createVNode(repeaterSingleForm.RepeaterSingleForm, {
          "key": index,
          "data": data,
          "controller": this.controller,
          "onChange": (value) => {
            this.onValueChange(value, index);
          },
          "onCreated": (event) => this.onCreated(index, event)
        }, null);
      }
    });
  }
});

exports.RepeaterMultiForm = RepeaterMultiForm;
