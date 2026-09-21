'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-picker-select-view.css');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizPickerSelectView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPickerSelectView",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("picker-select-view");
    const c = props.controller;
    const editorModel = c.model;
    const singleSelect = vue.ref(true);
    if (editorModel.editorParams) {
      if (editorModel.editorParams.multiple) {
        singleSelect.value = !c.toBoolean(editorModel.editorParams.multiple);
      }
    }
    const keySet = vue.ref([]);
    const items = vue.ref([]);
    const selectedData = vue.ref([]);
    const queryValue = vue.ref("");
    const visible = vue.ref(false);
    const pickViewWidth = vue.ref("auto");
    const context = vue.ref(c.context);
    const params = vue.ref(c.params);
    vue.watch(() => props.data, (newVal) => {
      const {
        context: tempContext,
        params: tempParams
      } = c.handlePublicParams(newVal, c.context, c.params);
      Object.assign(context.value, tempContext);
      Object.assign(params.value, tempParams);
    }, {
      immediate: true,
      deep: true
    });
    const isEditable = vue.ref(false);
    const multipleTempValue = vue.ref(null);
    const multipleTempText = vue.ref(null);
    const multipleObjs = vue.ref(null);
    const showView = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const triggerMenu = (show) => {
      if (props.disabled) {
        return;
      }
      if (!show) {
        visible.value = !visible.value;
      } else {
        visible.value = show;
      }
    };
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    vue.watch(() => props.value, (newVal) => {
      if (singleSelect.value) {
        if (c.model.valueType === "OBJECT") {
          queryValue.value = newVal ? newVal[c.objectNameField] : null;
        } else {
          queryValue.value = newVal || "";
        }
        if (!props.data || !c.valueItem || !props.data[c.valueItem]) {
          ibiz.log.error("\u503C\u9879\u5F02\u5E38");
        } else {
          selectedData.value = [{
            srfkey: props.data[c.valueItem],
            srfmajortext: props.value
          }];
          params.value.selecteddata = selectedData.value;
        }
      } else {
        const selectItems = [];
        keySet.value = [];
        items.value = [];
        if (newVal) {
          if (c.model.valueType === "OBJECTS") {
            newVal.forEach((item) => {
              const _item = ramda.clone(item);
              Object.assign(_item, {
                [c.keyName]: item[c.objectIdField],
                [c.textName]: item[c.objectNameField]
              });
              if (c.objectValueField) {
                Object.assign(_item, {
                  ...item[c.objectValueField]
                });
                delete _item[c.objectValueField];
              }
              if (_item[c.keyName]) {
                items.value.push(_item);
                keySet.value.push(_item[c.keyName]);
              }
            });
            selectItems.push(...newVal);
          } else if (!props.data || !c.valueItem || !props.data[c.valueItem]) {
            ibiz.log.error("\u503C\u9879\u5F02\u5E38");
          } else {
            const tempValue = props.data[c.valueItem].split(",");
            const tempText = newVal.split(",");
            tempValue.forEach((srfkey, index) => {
              selectItems.push({
                srfmajortext: tempText[index],
                srfkey
              });
            });
            selectItems.forEach((item) => {
              keySet.value.push(item.srfkey);
              const index = items.value.findIndex((i) => Object.is(i.srfkey, item.srfkey));
              if (index < 0) {
                items.value.push({
                  srfmajortext: item.srfmajortext,
                  srfkey: item.srfkey
                });
              }
            });
          }
        }
        selectedData.value = selectItems;
        multipleObjs.value = selectItems;
      }
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    vue.onMounted(() => {
      if (editorRef.value) {
        pickViewWidth.value = "".concat(editorRef.value.$parent.$el.offsetWidth, "px");
      }
    });
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
    const onInputChange = (e) => {
      if (!e) {
        onClear();
      }
    };
    const onViewDataChange = (event) => {
      if (event.length === 0) {
        if (singleSelect.value) {
          onClear();
        } else {
          items.value = [];
          if (c.model.valueType === "OBJECTS") {
            multipleObjs.value = null;
          } else {
            if (c.valueItem) {
              multipleTempValue.value = null;
            }
            multipleTempText.value = null;
          }
          keySet.value = [];
        }
        return;
      }
      if (singleSelect.value) {
        visible.value = false;
        if (c.valueItem) {
          const tempValue = event[0][c.keyName] ? event[0][c.keyName] : event[0].srfkey;
          emit("change", tempValue, c.valueItem);
        }
        const tempText = event[0][c.textName] ? event[0][c.textName] : event[0].srfmajortext;
        if (c.model.valueType === "OBJECT") {
          emit("change", c.handleObjectParams(event[0]));
        } else {
          emit("change", tempText);
        }
      } else if (c.model.valueType === "OBJECTS") {
        if (event && Array.isArray(event)) {
          const objs = [];
          event.forEach((item) => {
            const obj = c.handleObjectParams(item);
            objs.push(obj);
          });
          multipleObjs.value = objs;
        }
      } else {
        let tempValue = "";
        let tempText = "";
        if (event && Array.isArray(event)) {
          items.value = [];
          event.forEach((select) => {
            const srfkey = select[c.keyName] ? select[c.keyName] : select.srfkey;
            tempValue += "".concat(srfkey, ",");
            const srfmajortext = select[c.textName] ? select[c.textName] : select.srfmajortext;
            tempText += "".concat(srfmajortext, ",");
            const index = items.value.findIndex((item) => Object.is(item.srfkey, srfkey));
            if (index < 0) {
              items.value.push({
                srfmajortext,
                srfkey
              });
            }
          });
        }
        tempValue = tempValue.substring(0, tempValue.length - 1);
        tempText = tempText.substring(0, tempText.length - 1);
        if (c.valueItem) {
          multipleTempValue.value = tempValue;
        }
        multipleTempText.value = tempText;
      }
      if (!singleSelect.value) {
        if (event.length === 0) {
          items.value = [];
          keySet.value = [];
        } else if (Array.isArray(event)) {
          items.value = event.map((item) => {
            return {
              srfkey: item[c.keyName] || item.srfkey,
              srfmajortext: item[c.textName] || item.srfmajortext
            };
          });
          keySet.value = items.value.map((item) => item.srfkey);
        }
      }
      if (!singleSelect.value) {
        if (c.model.valueType === "OBJECTS") {
          emit("change", multipleObjs.value);
        } else {
          if (c.valueItem) {
            emit("change", multipleTempValue.value, c.valueItem);
          }
          emit("change", multipleTempText.value);
        }
      }
    };
    const openLinkView = async (e) => {
      e.stopPropagation();
      const res = await c.openLinkView(props.data);
      if (res && res.ok && res.data) {
        onViewDataChange(res.data);
      }
    };
    const onSelectChange = (selects) => {
      const val = [];
      if (selects.length > 0) {
        selects.forEach((select) => {
          const index = items.value.findIndex((item) => Object.is(item.srfkey, select));
          if (index >= 0) {
            val.push(items.value[index]);
          }
        });
      }
      if (c.model.valueType === "OBJECTS") {
        const objs = [];
        val.forEach((item) => {
          const obj = c.handleObjectParams(item);
          objs.push(obj);
        });
        emit("change", objs);
      } else {
        let tempValue = "";
        let tempText = "";
        val.forEach((select) => {
          const srfkey = select[c.keyName] ? select[c.keyName] : select.srfkey;
          tempValue += "".concat(srfkey, ",");
          const srfmajortext = select[c.textName] ? select[c.textName] : select.srfmajortext;
          tempText += "".concat(srfmajortext, ",");
        });
        tempValue = tempValue.substring(0, tempValue.length - 1);
        tempText = tempText.substring(0, tempText.length - 1);
        if (c.valueItem) {
          multipleTempValue.value = tempValue;
          emit("change", tempValue, c.valueItem);
        }
        multipleTempText.value = tempText;
        emit("change", tempText);
      }
    };
    const remoteMethod = (e) => {
      queryValue.value = e;
    };
    const onSelectionChange = (event) => {
      if (event.data) {
        onViewDataChange(event.data);
        if (singleSelect.value && editorRef.value) {
          editorRef.value.handleClose();
        }
      }
    };
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.DRAWER,
      viewUsage: 2,
      dismiss: (_data) => {
        onSelectionChange(_data);
      }
    });
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      emit("blur", e);
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      } else if (e.code === "Escape") {
        e.stopPropagation();
        if (editorRef.value) {
          editorRef.value.handleClose();
        }
      }
    };
    const valueText = vue.computed(() => {
      if (singleSelect.value) {
        return queryValue.value;
      }
      return selectedData.value.map((item) => item[c.textName]).join(",");
    });
    const onVisibleChange = (e) => {
      showView.value = e;
      if (e === false) {
        onBlur({});
      } else if (editorRef.value) {
        pickViewWidth.value = "".concat(editorRef.value.$parent.$el.offsetWidth, "px");
      }
    };
    const handleDropDownKeyDown = (e) => {
      if (e.code === "Escape") {
        e.stopPropagation();
        if (editorRef.value) {
          editorRef.value.handleClose();
        }
      }
    };
    const arrow = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 1024 1024",
        "xmlns": "http://www.w3.org/2000/svg"
      }, [vue.createVNode("path", {
        "fill": "currentColor",
        "d": "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      }, null)]);
    };
    return {
      ns,
      c,
      singleSelect,
      keySet,
      items,
      queryValue,
      visible,
      pickViewWidth,
      context,
      params,
      editorRef,
      onInputChange,
      triggerMenu,
      onViewDataChange,
      onClear,
      openLinkView,
      onSelectChange,
      remoteMethod,
      onSelectionChange,
      modal,
      onFocus,
      onBlur,
      handleKeyUp,
      valueText,
      isEditable,
      setEditable,
      showFormDefaultContent,
      onVisibleChange,
      showView,
      selectedData,
      handleDropDownKeyDown,
      arrow
    };
  },
  render() {
    const editContent = vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "ref": "editorRef",
      "trigger": "click",
      "disabled": this.disabled || this.readonly,
      "class": this.ns.b("select"),
      "popper-class": this.ns.b("popper"),
      "onVisibleChange": this.onVisibleChange,
      "onKeydown": this.handleDropDownKeyDown
    }, {
      default: () => {
        let _slot;
        return this.singleSelect ? vue.createVNode(vue.resolveComponent("el-input"), {
          "modelValue": this.queryValue,
          "onUpdate:modelValue": ($event) => this.queryValue = $event,
          "placeholder": this.c.placeHolder,
          "disabled": this.disabled,
          "readonly": this.readonly,
          "onChange": this.onInputChange,
          "clearable": true,
          "onFocus": (e) => {
            this.onFocus(e);
          },
          "onKeyup": this.handleKeyUp
        }, {
          suffix: () => {
            return [this.queryValue && !this.disabled && !this.readonly && vue.createVNode("ion-icon", {
              "onClick": this.onClear,
              "name": "clear"
            }, null), this.c.model.linkAppViewId && vue.createVNode("ion-icon", {
              "onClick": this.openLinkView,
              "name": "link-arrow"
            }, null), this.c.model.showTrigger && vue.createVNode("div", {
              "class": [this.ns.e("arrow"), this.showView ? "overturn" : ""]
            }, [this.arrow()])];
          }
        }) : vue.createVNode(vue.resolveComponent("el-select"), {
          "popper-class": this.ns.b("select-popover"),
          "model-value": this.keySet,
          "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
          "multiple": true,
          "filterable": true,
          "remote": true,
          "remote-method": this.remoteMethod,
          "onChange": this.onSelectChange,
          "onFocus": (e) => {
            this.onFocus(e);
          },
          "onKeyup": this.handleKeyUp,
          "disabled": this.disabled || this.readonly,
          "remote-show-suffix": this.c.model.showTrigger
        }, _isSlot(_slot = this.items.map((item, index) => {
          return vue.createVNode(vue.resolveComponent("el-option"), {
            "key": item.srfkey + index,
            "label": item.srfmajortext,
            "value": item.srfkey
          }, null);
        })) ? _slot : {
          default: () => [_slot]
        });
      },
      dropdown: () => {
        if (!this.showView) {
          return;
        }
        const viewShell = vue.resolveComponent("IBizViewShell");
        return this.c.pickupView && vue.h(viewShell, {
          context: this.context,
          params: this.params,
          viewId: this.c.pickupView.id,
          style: {
            height: "100%",
            width: this.pickViewWidth
          },
          state: {
            singleSelect: this.singleSelect,
            selectedData: this.selectedData
          },
          onSelectionChange: this.onSelectionChange,
          modal: this.modal
        });
      }
    });
    const readonlyContent = vue.createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.valueText ? this.singleSelect ? vue.createVNode("span", {
      "class": this.ns.b("content-item")
    }, [this.valueText]) : this.valueText.split(",").map((item) => vue.createVNode("span", {
      "class": this.ns.b("content-item")
    }, [item])) : ibiz.config.common.emptyText]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizPickerSelectView = IBizPickerSelectView;
