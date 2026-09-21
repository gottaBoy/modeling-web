import { defineComponent, ref, computed, watch, onMounted, createVNode, resolveComponent, mergeProps, h } from 'vue';
import { getDataPickerProps, getEditorEmits, useNamespace, renderString } from '@ibiz-template/vue3-util';
import { isNil, clone } from 'ramda';
import './ibiz-picker-dropdown.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const IBizPickerDropDown = /* @__PURE__ */ defineComponent({
  name: "IBizPickerDropDown",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("picker-dropdown");
    const c = props.controller;
    const curValue = ref("");
    const items = ref([]);
    const shouldLoad = ref(false);
    const refValue = ref("");
    const isEditable = ref(false);
    const editorRef = ref();
    const loading = ref(false);
    let waitQuery = null;
    const isLoaded = ref(false);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const resetCurValue = () => {
      if (c.model.valueType === "OBJECT") {
        curValue.value = props.value ? props.value[c.objectNameField] : null;
      } else {
        curValue.value = props.value;
      }
      if (props.value === null) {
        curValue.value = "";
      }
      const value = props.data[c.valueItem];
      refValue.value = value || curValue.value;
      const index = items.value.findIndex((item) => Object.is(item[c.keyName], value));
      if (index !== -1) {
        return;
      }
      items.value = [];
      if (!isNil(props.value) && !isNil(value)) {
        items.value.push({
          [c.textName]: props.value,
          [c.keyName]: value
        });
      }
    };
    watch(() => props.value, (newVal) => {
      if (newVal || newVal === null) {
        resetCurValue();
      }
    }, {
      immediate: true
    });
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const onSearch = async (query) => {
      if (!shouldLoad.value) {
        return;
      }
      if (c.model.appDataEntityId && loading.value === false) {
        loading.value = true;
        try {
          let trimQuery = "";
          if (query !== props.value) {
            trimQuery = query.trim();
          }
          const res = await c.getServiceData(trimQuery, props.data);
          if (res) {
            items.value = res.data;
          }
        } finally {
          loading.value = false;
          isLoaded.value = true;
          if (waitQuery != null) {
            const selfQuery = waitQuery;
            waitQuery = null;
            await onSearch(selfQuery);
          }
        }
      } else {
        waitQuery = query;
      }
    };
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const onACSelect = async (data) => {
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", dataItem.value, dataItem.id);
        });
      }
      const item = clone(data);
      Object.assign(item, {
        [c.keyName]: item[c.keyName] ? item[c.keyName] : item.srfkey,
        [c.textName]: item[c.textName] ? item[c.textName] : item.srfmajortext
      });
      if (c.valueItem) {
        emit("change", item[c.keyName], c.valueItem);
      }
      if (c.model.valueType === "OBJECT") {
        emit("change", c.handleObjectParams(item));
      } else {
        emit("change", data[c.textName]);
      }
      setEditable(false);
    };
    const onSelect = (select) => {
      shouldLoad.value = false;
      setEditable(false);
      if (select === "empty") {
        resetCurValue();
        return;
      }
      const actionItem = c.actionDetails.find((detail) => detail.id === select);
      if (actionItem) {
        c.onActionClick(actionItem, props.data);
        resetCurValue();
        return;
      }
      const index = items.value.findIndex((item) => Object.is(item[c.keyName], select));
      if (index >= 0) {
        onACSelect(items.value[index]);
      }
    };
    const onOpenChange = (isOpen) => {
      if (isOpen) {
        items.value = [];
        onSearch("");
      }
    };
    const onClear = () => {
      const dataItems = c.dataItems;
      if (dataItems == null ? void 0 : dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", null, dataItem.id);
        });
      }
      if (c.valueItem) {
        emit("change", null, c.valueItem);
      }
      emit("change", null);
    };
    const onFocus = (e) => {
      shouldLoad.value = true;
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      shouldLoad.value = false;
      emit("blur", e);
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const onClick = () => {
      shouldLoad.value = true;
    };
    const valueText = computed(() => {
      return renderString(curValue.value);
    });
    watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    onMounted(() => {
      watch(() => props.data[c.valueItem], async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!isLoaded.value && editorRef.value && isNil(props.value) && !isNil(newVal)) {
            shouldLoad.value = true;
            await onSearch("");
            shouldLoad.value = false;
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (editorRef.value && isNil(props.value) && !isNil(newVal)) {
              emit("change", curValue.value, c.model.id, true);
            }
          }
          refValue.value = newVal;
          if (newVal === null) {
            emit("change", null, c.model.id, true);
          }
        }
      }, {
        immediate: true,
        deep: true
      });
    });
    const renderActionItem = (detail) => {
      if (!c.groupActionState[detail.id].visible) {
        return;
      }
      return createVNode(resolveComponent("el-option"), {
        "value": detail.id,
        "title": showTitle(detail.tooltip),
        "disabled": c.groupActionState[detail.id].disabled
      }, {
        default: () => [createVNode("div", {
          "class": ns.e("action-item"),
          "onClick": (event) => c.onActionClick(detail, props.data, event)
        }, [detail.showIcon && detail.sysImage && createVNode(resolveComponent("iBizIcon"), {
          "icon": detail.sysImage
        }, null), detail.showCaption ? detail.caption : ""])]
      });
    };
    const renderGroupAction = () => {
      const actionDetails = c.actionDetails;
      if (!actionDetails.length || !c.groupActionState.visible) {
        return;
      }
      return actionDetails.map((item) => {
        return renderActionItem(item);
      });
    };
    const renderEmpty = () => {
      if (items.value.length) {
        return;
      }
      return createVNode(resolveComponent("el-option"), {
        "value": "empty"
      }, {
        default: () => [createVNode(resolveComponent("iBizNoData"), {
          "class": ns.e("empty"),
          "onClick": (event) => event.stopPropagation()
        }, null)]
      });
    };
    return {
      ns,
      c,
      refValue,
      curValue,
      valueText,
      loading,
      items,
      onOpenChange,
      onClear,
      onSelect,
      onSearch,
      onFocus,
      onBlur,
      onClick,
      handleKeyUp,
      editorRef,
      isEditable,
      setEditable,
      showFormDefaultContent,
      renderGroupAction,
      renderEmpty
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const editContent = this.readonly ? this.value : createVNode(resolveComponent("el-select"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("select")],
      "modelValue": this.refValue,
      "onUpdate:modelValue": ($event) => this.refValue = $event,
      "filterable": true,
      "remote": true,
      "remote-show-suffix": this.c.model.showTrigger,
      "clearable": true,
      "popper-class": [this.ns.e("transfer"), this.ns.is("empty", !this.items.length)],
      "loading": this.loading,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "remote-method": this.onSearch,
      "onVisibleChange": this.onOpenChange,
      "onChange": this.onSelect,
      "onClear": this.onClear,
      "disabled": this.disabled,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "onKeyup": this.handleKeyUp,
      "onClick": this.onClick,
      "fit-input-width": isEllipsis
    }, this.$attrs), {
      default: () => [this.items.map((item) => {
        return createVNode(resolveComponent("el-option"), {
          "title": showTitle(isEllipsis ? item[this.c.textName] : ""),
          "value": item[this.c.keyName],
          "key": item[this.c.keyName],
          "label": item[this.c.textName]
        }, {
          default: () => {
            var _a;
            if (this.c.acItemProvider) {
              const component = resolveComponent(this.c.acItemProvider.component);
              return h(component, {
                item,
                controller: this.c
              });
            }
            const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
            if (panel) {
              return createVNode(resolveComponent("iBizControlShell"), {
                "data": item,
                "modelData": panel,
                "context": this.c.context,
                "params": this.c.params
              }, null);
            }
            return createVNode("span", null, [item[this.c.textName] != null ? item[this.c.textName] : ""]);
          }
        });
      }), this.renderEmpty(), this.renderGroupAction()]
    });
    const readonlyContent = createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.curValue ? this.valueText : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizPickerDropDown };
