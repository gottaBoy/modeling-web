'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
require('./ibiz-picker-dropdown.css');
var core = require('@ibiz-template/core');

"use strict";
const IBizPickerDropDown = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPickerDropDown",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("picker-dropdown");
    const c = props.controller;
    const curValue = vue.ref("");
    const items = vue.ref([]);
    const shouldLoad = vue.ref(false);
    const refValue = vue.ref("");
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const loading = vue.ref(false);
    let waitQuery = null;
    const isLoaded = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
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
      if (!ramda.isNil(props.value) && !ramda.isNil(value)) {
        items.value.push({
          [c.textName]: props.value,
          [c.keyName]: value
        });
      }
    };
    vue.watch(() => props.value, (newVal) => {
      if (newVal || newVal === null) {
        resetCurValue();
      }
    }, {
      immediate: true
    });
    vue.watch(editorRef, (newVal) => {
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
      const item = ramda.clone(data);
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
    const valueText = vue.computed(() => {
      return vue3Util.renderString(curValue.value);
    });
    vue.watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    vue.onMounted(() => {
      vue.watch(() => props.data[c.valueItem], async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!isLoaded.value && editorRef.value && ramda.isNil(props.value) && !ramda.isNil(newVal)) {
            shouldLoad.value = true;
            await onSearch("");
            shouldLoad.value = false;
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (editorRef.value && ramda.isNil(props.value) && !ramda.isNil(newVal)) {
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
      return vue.createVNode(vue.resolveComponent("el-option"), {
        "value": detail.id,
        "title": core.showTitle(detail.tooltip),
        "disabled": c.groupActionState[detail.id].disabled
      }, {
        default: () => [vue.createVNode("div", {
          "class": ns.e("action-item"),
          "onClick": (event) => c.onActionClick(detail, props.data, event)
        }, [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
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
      return vue.createVNode(vue.resolveComponent("el-option"), {
        "value": "empty"
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("iBizNoData"), {
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
    const editContent = this.readonly ? this.value : vue.createVNode(vue.resolveComponent("el-select"), vue.mergeProps({
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
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "title": core.showTitle(isEllipsis ? item[this.c.textName] : ""),
          "value": item[this.c.keyName],
          "key": item[this.c.keyName],
          "label": item[this.c.textName]
        }, {
          default: () => {
            var _a;
            if (this.c.acItemProvider) {
              const component = vue.resolveComponent(this.c.acItemProvider.component);
              return vue.h(component, {
                item,
                controller: this.c
              });
            }
            const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
            if (panel) {
              return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
                "data": item,
                "modelData": panel,
                "context": this.c.context,
                "params": this.c.params
              }, null);
            }
            return vue.createVNode("span", null, [item[this.c.textName] != null ? item[this.c.textName] : ""]);
          }
        });
      }), this.renderEmpty(), this.renderGroupAction()]
    });
    const readonlyContent = vue.createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.curValue ? this.valueText : ibiz.config.common.emptyText]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizPickerDropDown = IBizPickerDropDown;
