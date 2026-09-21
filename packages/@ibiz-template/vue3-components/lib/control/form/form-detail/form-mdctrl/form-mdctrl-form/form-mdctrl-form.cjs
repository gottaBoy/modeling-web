'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-mdctrl-form.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormMDCtrlForm = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormMDCtrlForm",
  props: {
    controller: {
      type: runtime.FormMDCtrlFormController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-mdctrl-form");
    const showActions = vue.computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });
    const renderAddBtn = () => {
      let _slot;
      return vue.createVNode(vue.resolveComponent("el-button"), {
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
      return vue.createVNode(vue.resolveComponent("iBizMDCtrlContainer2"), {
        "controller": this.controller,
        "items": state.items
      }, {
        item: ({
          data
        }) => {
          if (!formProvider) {
            return vue.createVNode("div", null, [ibiz.i18n.t("control.form.formMDctrlForm.noFindProvider")]);
          }
          const formComponent = vue.h(vue.resolveComponent(formProvider.component), {
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
    return vue.createVNode(vue.resolveComponent("iBizMDCtrlContainer"), {
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
          return vue.createVNode("div", null, [ibiz.i18n.t("control.form.formMDctrlForm.noFindProvider")]);
        }
        const formComponent = vue.h(vue.resolveComponent(formProvider.component), {
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

exports.FormMDCtrlForm = FormMDCtrlForm;
