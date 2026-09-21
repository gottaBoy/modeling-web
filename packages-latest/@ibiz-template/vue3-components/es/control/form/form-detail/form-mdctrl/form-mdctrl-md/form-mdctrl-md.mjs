import { isVNode, defineComponent, h, resolveComponent, createVNode, computed, ref } from 'vue';
import { FormMDCtrlMDController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-mdctrl-md.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormMDCtrlMD = /* @__PURE__ */ defineComponent({
  name: "IBizFormMDCtrlMD",
  props: {
    controller: {
      type: FormMDCtrlMDController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-mdctrl-md");
    const ns2 = useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });
    const onCreated = (event) => {
      props.controller.setMDControl(event.ctrl);
    };
    const isSelected = ref(false);
    const onSelectionChange = (event) => {
      isSelected.value = event.data.length > 0;
    };
    const handleRemove = () => {
      isSelected.value = false;
      props.controller.remove();
    };
    const renderRemoveBtn = () => {
      let _slot2;
      if (!props.controller.enableDelete)
        return null;
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return createVNode(resolveComponent("el-popconfirm"), {
          "title": showTitle(ibiz.i18n.t("control.form.mdCtrlContainer.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => handleRemove()
        }, {
          reference: () => {
            let _slot;
            return createVNode(resolveComponent("el-button"), {
              "type": "danger",
              "disabled": !isSelected.value,
              "class": [ns.be("actions", "remove"), ns.be("actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })],
              "style": semanticStyle("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })
            }, _isSlot(_slot = ibiz.i18n.t("app.delete")) ? _slot : {
              default: () => [_slot]
            });
          }
        });
      }
      return createVNode(resolveComponent("el-button"), {
        "type": "danger",
        "disabled": !isSelected.value,
        "class": [ns.be("actions", "remove"), ns.be("actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        }),
        "onClick": () => handleRemove()
      }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
        default: () => [_slot2]
      });
    };
    return {
      ns,
      ns2,
      showActions,
      onCreated,
      onSelectionChange,
      renderRemoveBtn,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let _slot3;
    const {
      mdProvider,
      model
    } = this.controller;
    let controlComponent = null;
    const controlProps = {
      modelData: model.contentControl,
      context: this.controller.form.context,
      params: this.controller.form.params,
      loadDefault: false,
      onCreated: this.onCreated,
      onSelectionChange: this.onSelectionChange
    };
    if (model.contentType === "GRID") {
      controlProps.rowEditOpen = true;
    }
    controlComponent = h(resolveComponent(mdProvider.component), controlProps);
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": [this.ns.b("content")]
    }, [controlComponent]), this.showActions && createVNode("div", {
      "class": this.ns.b("actions")
    }, [this.controller.enableCreate && createVNode(resolveComponent("el-button"), {
      "class": [this.ns.be("actions", "create"), this.ns.be("actions", "btn"), this.ns2.b("button"), this.semanticClass("mdctrl.button", {
        mdctrl: this.controller,
        tag: "create"
      })],
      "style": this.semanticStyle("mdctrl.button", {
        mdctrl: this.controller,
        tag: "create"
      }),
      "onClick": () => this.controller.create()
    }, _isSlot(_slot3 = ibiz.i18n.t("app.add")) ? _slot3 : {
      default: () => [_slot3]
    }), this.renderRemoveBtn()])]);
  }
});

export { FormMDCtrlMD };
