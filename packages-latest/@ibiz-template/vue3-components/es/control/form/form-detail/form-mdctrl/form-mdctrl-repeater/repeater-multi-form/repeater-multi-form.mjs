import { defineComponent, createVNode, resolveComponent } from 'vue';
import { FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RepeaterSingleForm } from '../repeater-single-form/repeater-single-form.mjs';

"use strict";
const RepeaterMultiForm = /* @__PURE__ */ defineComponent({
  name: "IBizRepeaterMultiForm",
  props: {
    controller: {
      type: FormMDCtrlRepeaterController,
      required: true
    }
  },
  emits: {
    change: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("repeater-multi-form");
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
    return createVNode(resolveComponent("iBizMDCtrlContainer"), {
      "class": this.ns.b(),
      "userStyle": userStyle,
      "items": items,
      "controller": this.controller,
      "enableCreate": this.controller.enableCreate,
      "enableDelete": this.controller.enableDelete,
      "enableSort": this.controller.enableSort,
      "onAddClick": () => this.controller.create(),
      "onRemoveClick": (_item, index) => this.controller.remove(index),
      "onDragChange": (draggedIndex, targetIndex) => {
        this.controller.dragChange(draggedIndex, targetIndex);
      }
    }, {
      item: ({
        data,
        index
      }) => {
        return createVNode(RepeaterSingleForm, {
          "key": index,
          "data": data,
          "simpleDataIndex": index,
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

export { RepeaterMultiForm };
