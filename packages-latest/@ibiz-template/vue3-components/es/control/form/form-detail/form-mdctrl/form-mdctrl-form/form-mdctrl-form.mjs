import { isVNode, defineComponent, createVNode, resolveComponent, h, computed } from 'vue';
import { FormMDCtrlFormController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
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
    const ns2 = useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });
    const renderAddBtn = () => {
      let _slot;
      return createVNode(resolveComponent("el-button"), {
        "class": [ns.be("item-actions", "create"), ns.be("item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", props.controller, "create")],
        "style": semanticStyle("mdctrl.button", props.controller, "create"),
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
      ns2,
      showActions,
      onCreated,
      renderAddBtn,
      semanticClass,
      semanticStyle
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
            class: [this.ns.be("item", "form"), this.ns2.b("item"), this.semanticClass("mdctrl.item", {
              mdctrl: this.controller
            })],
            style: this.semanticStyle("mdctrl.item", {
              mdctrl: this.controller
            }),
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
      "class": [this.ns.b()],
      "items": state.items,
      "controller": this.controller,
      "enableCreate": this.controller.enableCreate,
      "enableDelete": this.controller.enableDelete,
      "onAddClick": () => this.controller.create(),
      "onRemoveClick": (item) => this.controller.remove(item.id)
    }, {
      item: ({
        data,
        index
      }) => {
        if (!formProvider) {
          return createVNode("div", null, [ibiz.i18n.t("control.form.formMDctrlForm.noFindProvider")]);
        }
        const formComponent = h(resolveComponent(formProvider.component), {
          class: [this.ns.be("item", "form"), this.ns2.b("item"), this.semanticClass("mdctrl.item", {
            mdctrl: this.controller
          })],
          style: this.semanticStyle("mdctrl.item", {
            mdctrl: this.controller
          }),
          key: data.id,
          modelData: model.contentControl,
          mdCtrlFormIndex: index,
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
