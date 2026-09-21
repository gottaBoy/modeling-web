import { defineComponent, ref, computed, watch, resolveComponent, createVNode, h, createTextVNode } from 'vue';
import { getDataPickerProps, getEditorEmits, useNamespace, useFocusAndBlur } from '@ibiz-template/vue3-util';
import './ibiz-picker-embed-view.css';

"use strict";
const IBizPickerEmbedView = /* @__PURE__ */ defineComponent({
  name: "IBizPickerEmbedView",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("picker-embed-view");
    const c = props.controller;
    const context = ref(c.context.clone());
    const params = ref({
      ...c.params
    });
    const cloneParams = computed(() => {
      return {
        ...params.value
      };
    });
    watch(() => props.data, (newVal) => {
      const {
        context: _context,
        params: _params
      } = c.handlePublicParams(newVal, c.context, c.params);
      const newContext = Object.assign(c.context.clone(), _context);
      const newParams = Object.assign({
        ...c.params
      }, _params);
      if (JSON.stringify(context.value) !== JSON.stringify(newContext) || JSON.stringify(params.value) !== JSON.stringify(newParams)) {
        context.value = newContext;
        params.value = newParams;
      }
    }, {
      deep: true,
      immediate: true
    });
    const editorParams = c.model.editorParams;
    const singleSelect = ref(true);
    const checkStrictly = ref(true);
    const isShowText = ref(true);
    if (editorParams) {
      if (editorParams.multiple) {
        singleSelect.value = !c.toBoolean(editorParams.multiple);
      }
      if (editorParams.checkStrictly) {
        checkStrictly.value = c.toBoolean(editorParams.checkStrictly);
      }
      if (editorParams.isShowText) {
        isShowText.value = c.toBoolean(editorParams.isShowText);
      }
    }
    const selectedData = ref([]);
    watch(() => props.value, (newVal) => {
      var _a, _b, _c, _d;
      selectedData.value = [];
      if (newVal) {
        if (c.valueItem) {
          const tempValue = (_c = (_b = (_a = props.data) == null ? void 0 : _a[c.valueItem]) == null ? void 0 : _b.split) == null ? void 0 : _c.call(_b, ",");
          const tempText = (_d = newVal == null ? void 0 : newVal.split) == null ? void 0 : _d.call(newVal, ",");
          if (tempValue && tempText) {
            selectedData.value = tempValue.map((srfkey, index) => {
              return {
                srfkey,
                srfmajortext: tempText[index]
              };
            });
          }
        }
      }
    }, {
      immediate: true
    });
    const onViewDataChange = (event) => {
      let tempValue = "";
      let temText = "";
      if (event && Array.isArray(event)) {
        event.forEach((select) => {
          tempValue += "".concat(select.srfkey, ",");
          temText += "".concat(select.srfmajortext, ",");
        });
        tempValue = tempValue.substring(0, tempValue.length - 1);
        temText = temText.substring(0, temText.length - 1);
        if (c.valueItem) {
          emit("change", tempValue, c.valueItem);
        }
        emit("change", temText);
      }
    };
    const onSelectionChange = (event) => {
      onViewDataChange(event.data);
    };
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    return {
      ns,
      c,
      context,
      params,
      editorRef,
      singleSelect,
      checkStrictly,
      isShowText,
      selectedData,
      cloneParams,
      onSelectionChange
    };
  },
  render() {
    const viewShell = resolveComponent("IBizViewShell");
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.isShowText ? this.ns.m("show-value") : ""],
      "ref": "editorRef"
    }, [this.c.model.pickupAppViewId ? [createVNode("div", {
      "class": this.ns.b("view")
    }, [h(viewShell, {
      context: this.context,
      params: this.cloneParams,
      viewId: this.c.model.pickupAppViewId,
      state: {
        singleSelect: this.singleSelect,
        checkStrictly: this.checkStrictly,
        selectedData: this.selectedData
      },
      onSelectionChange: this.onSelectionChange
    })]), this.isShowText && createVNode("div", {
      "class": this.ns.b("value")
    }, [this.$props.value ? this.$props.value.split(",").map((item) => {
      return createVNode("span", null, [item, createTextVNode("; ")]);
    }) : createVNode("span", null, [this.c.placeHolder])])] : null]);
  }
});

export { IBizPickerEmbedView };
