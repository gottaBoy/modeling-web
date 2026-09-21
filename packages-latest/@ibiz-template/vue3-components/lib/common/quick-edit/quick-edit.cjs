'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./quick-edit.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizQuickEdit = /* @__PURE__ */ vue.defineComponent({
  name: "IBizQuickEdit",
  props: {
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    modelData: {
      type: Object
    },
    isFilterHiddenItem: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    close: (_modalData) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("quick-edit");
    const controller = vue.ref(void 0);
    const editItemModel = [];
    const hiddenItemModel = [];
    const findItem = (detail) => {
      const childern = runtime.findChildFormDetails(detail);
      childern.forEach((child) => {
        if (child.detailType === "FORMITEM" && !child.hidden) {
          editItemModel.push(child);
        }
        if (child.detailType === "FORMITEM" && child.hidden) {
          hiddenItemModel.push(child);
        }
        findItem(child);
      });
    };
    const init = () => {
      var _a;
      if (props.modelData) {
        (_a = props.modelData.deformPages) == null ? void 0 : _a.forEach((child) => {
          findItem(child);
        });
      }
    };
    init();
    const onCreated = (event) => {
      controller.value = event.ctrl;
    };
    const getEditItemData = () => {
      const data = {};
      const item = controller.value.getDiffData();
      editItemModel.forEach((formItem) => {
        const uiKey = formItem.id.toLowerCase();
        const deKey = formItem.fieldName || formItem.appDEFieldId;
        if (item[uiKey]) {
          data[deKey] = item[uiKey];
        }
      });
      return data;
    };
    const getItemData = () => {
      const data = {};
      const item = controller.value.getDiffData();
      [...editItemModel, ...hiddenItemModel].forEach((formItem) => {
        const uiKey = formItem.id.toLowerCase();
        const deKey = formItem.fieldName || formItem.appDEFieldId;
        if (item[uiKey]) {
          data[deKey] = item[uiKey];
        }
      });
      return data;
    };
    const onConfirm = () => {
      let data;
      if (controller.value) {
        const item = props.isFilterHiddenItem ? getEditItemData() : getItemData();
        if (Object.keys(item).length > 0) {
          data = [item];
        }
      }
      emit("close", {
        ok: true,
        data
      });
    };
    const onCancel = () => {
      emit("close", {
        ok: false
      });
    };
    return {
      ns,
      onCreated,
      onConfirm,
      onCancel
    };
  },
  render() {
    let _slot, _slot2;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("iBizControlShell"), vue.mergeProps({
      "params": this.params,
      "context": this.context,
      "modelData": this.modelData,
      "onCreated": this.onCreated
    }, this.$attrs), null), vue.createVNode("div", {
      "class": this.ns.e("footer")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "text": true,
      "onClick": this.onCancel
    }, _isSlot(_slot = ibiz.i18n.t("app.cancel")) ? _slot : {
      default: () => [_slot]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onConfirm
    }, _isSlot(_slot2 = ibiz.i18n.t("app.confirm")) ? _slot2 : {
      default: () => [_slot2]
    })])]);
  }
});

exports.IBizQuickEdit = IBizQuickEdit;
