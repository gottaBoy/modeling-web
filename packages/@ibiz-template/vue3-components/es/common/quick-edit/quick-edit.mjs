import { isVNode, defineComponent, ref, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { findChildFormDetails } from '@ibiz-template/runtime';
import './quick-edit.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizQuickEdit = /* @__PURE__ */ defineComponent({
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
    }
  },
  emits: {
    close: (_modalData) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("quick-edit");
    const controller = ref(void 0);
    const editItemModel = [];
    const findEditItem = (detail) => {
      const childern = findChildFormDetails(detail);
      childern.forEach((child) => {
        if (child.detailType === "FORMITEM" && !child.hidden) {
          editItemModel.push(child);
        }
        findEditItem(child);
      });
    };
    const init = () => {
      var _a;
      if (props.modelData) {
        (_a = props.modelData.deformPages) == null ? void 0 : _a.forEach((child) => {
          findEditItem(child);
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
    const onConfirm = () => {
      let data;
      if (controller.value) {
        const item = getEditItemData();
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("iBizControlShell"), {
      "params": this.params,
      "context": this.context,
      "modelData": this.modelData,
      "onCreated": this.onCreated
    }, null), createVNode("div", {
      "class": this.ns.e("footer")
    }, [createVNode(resolveComponent("el-button"), {
      "text": true,
      "onClick": this.onCancel
    }, _isSlot(_slot = ibiz.i18n.t("app.cancel")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.onConfirm
    }, _isSlot(_slot2 = ibiz.i18n.t("app.confirm")) ? _slot2 : {
      default: () => [_slot2]
    })])]);
  }
});

export { IBizQuickEdit };
