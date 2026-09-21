import { isVNode, defineComponent, computed, createVNode, resolveComponent, h } from 'vue';
import { FormMDCtrlFormController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-mdctrl-form.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormMDCtrlForm = /* @__PURE__ */ defineComponent({
  name: "IBizFormMDCtrlForm",
  props: {
    controller: {
      type: FormMDCtrlFormController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-mdctrl-form");
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });
    const renderAddBtn = () => {
      let _slot;
      return createVNode(resolveComponent("el-button"), {
        "class": [ns.be("item-actions", "create"), ns.be("item-actions", "btn")],
        "onClick": () => props.controller.create()
      }, _isSlot(_slot = ibiz.i18n.t("app.add")) ? _slot : {
        default: () => [_slot]
      });
    };
    const onCreated = (id, event) => {
      props.controller.setFormController(id, event.ctrl);
    };
    return {
      ns,
      showActions,
      onCreated,
      renderAddBtn
    };
  },
  render() {
    const {
      state,
      formProvider,
      model
    } = this.controller;
    if (model.detailStyle === "STYLE2") {
      return createVNode(resolveComponent("iBizMDCtrlContainer2"), {
        "controller": this.controller,
        "items": state.items
      }, {
        item: ({
          data
        }) => {
          if (!formProvider) {
            return createVNode("div", null, [ibiz.i18n.t("control.form.formMDctrlForm.noFindProvider")]);
          }
          const formComponent = h(resolveComponent(formProvider.component), {
            class: this.ns.be("item", "form"),
            key: data.id,
            modelData: model.contentControl,
            context: data.context,
            params: data.params,
            onCreated: (event) => {
              this.onCreated(data.id, event);
            }
          });
          return formComponent;
        }
      });
    }
    return createVNode(resolveComponent("iBizMDCtrlContainer"), {
      "class": this.ns.b(),
      "items": state.items,
      "enableCreate": this.controller.enableCreate,
      "enableDelete": this.controller.enableDelete,
      "onAddClick": () => this.controller.create(),
      "onRemoveClick": (item) => this.controller.remove(item.id)
    }, {
      item: ({
        data
      }) => {
        if (!formProvider) {
          return createVNode("div", null, [ibiz.i18n.t("control.form.formMDctrlForm.noFindProvider")]);
        }
        const formComponent = h(resolveComponent(formProvider.component), {
          class: this.ns.be("item", "form"),
          key: data.id,
          modelData: model.contentControl,
          context: data.context,
          params: data.params,
          onCreated: (event) => {
            this.onCreated(data.id, event);
          }
        });
        return formComponent;
      }
    });
  }
});

export { FormMDCtrlForm };
