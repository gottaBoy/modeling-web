'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-mdctrl-md.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormMDCtrlMD = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormMDCtrlMD",
  props: {
    controller: {
      type: runtime.FormMDCtrlMDController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-mdctrl-md");
    const showActions = vue.computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });
    const onCreated = (event) => {
      props.controller.setMDControl(event.ctrl);
    };
    const isSelected = vue.ref(false);
    const onSelectionChange = (event) => {
      isSelected.value = event.data.length > 0;
    };
    return {
      ns,
      showActions,
      isSelected,
      onCreated,
      onSelectionChange
    };
  },
  render() {
    let _slot, _slot2;
    const {
      mdProvider,
      model
    } = this.controller;
    const isLoaded = this.controller.form.state.isLoaded;
    let controlComponent = null;
    if (isLoaded) {
      const controlProps = {
        class: this.ns.b("content"),
        modelData: model.contentControl,
        context: this.controller.form.context,
        params: this.controller.form.params,
        onCreated: this.onCreated,
        onSelectionChange: this.onSelectionChange
      };
      if (model.contentType === "GRID") {
        controlProps.rowEditOpen = true;
      }
      controlComponent = vue.h(vue.resolveComponent(mdProvider.component), controlProps);
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [controlComponent, this.showActions && vue.createVNode("div", {
      "class": this.ns.b("actions")
    }, [this.controller.enableCreate && vue.createVNode(vue.resolveComponent("el-button"), {
      "class": [this.ns.be("actions", "create"), this.ns.be("actions", "btn")],
      "onClick": () => this.controller.create()
    }, _isSlot(_slot = ibiz.i18n.t("app.add")) ? _slot : {
      default: () => [_slot]
    }), this.controller.enableDelete && vue.createVNode(vue.resolveComponent("el-button"), {
      "type": "danger",
      "disabled": !this.isSelected,
      "class": [this.ns.be("actions", "remove"), this.ns.be("actions", "btn")],
      "onClick": () => this.controller.remove()
    }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
      default: () => [_slot2]
    })])]);
  }
});

exports.FormMDCtrlMD = FormMDCtrlMD;
