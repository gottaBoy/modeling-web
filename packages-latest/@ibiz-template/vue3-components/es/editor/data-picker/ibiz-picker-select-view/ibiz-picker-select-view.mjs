import { isVNode, defineComponent, createVNode, resolveComponent, h, withDirectives, resolveDirective, ref, computed, watch, onMounted } from 'vue';
import { useNamespace, useSemanticNode, useFocusAndBlur, getEditorEmits, getDataPickerProps } from '@ibiz-template/vue3-util';
import { clone } from 'ramda';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import './ibiz-picker-select-view.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizPickerSelectView = /* @__PURE__ */ defineComponent({
  name: "IBizPickerSelectView",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = useNamespace("picker-select-view");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.link"),
      selector: ".".concat(ns.em("icon", "link"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.link"),
      selector: ".".concat(ns.em("icon", "link"))
    }];
    const singleSelect = ref(true);
    if (editorModel.editorParams) {
      if (editorModel.editorParams.multiple) {
        singleSelect.value = !c.toBoolean(editorModel.editorParams.multiple);
      }
    }
    const keySet = ref([]);
    const items = ref([]);
    const selectedData = ref([]);
    const queryValue = ref("");
    const visible = ref(false);
    const pickViewWidth = ref("auto");
    const context = ref(c.context.clone());
    const params = ref({
      ...c.params
    });
    const cloneParams = computed(() => {
      return {
        checkstrictly: true,
        ...params.value
      };
    });
    watch(() => props.data, (newVal) => {
      const {
        context: tempContext,
        params: tempParams
      } = c.handlePublicParams(newVal, c.context, c.params);
      const newContext = Object.assign(c.context.clone(), tempContext);
      const newParams = {
        ...c.params,
        ...tempParams
      };
      if (JSON.stringify(context.value) !== JSON.stringify(newContext))
        context.value = newContext;
      if (JSON.stringify(params.value) !== JSON.stringify(newParams))
        params.value = newParams;
    }, {
      immediate: true,
      deep: true
    });
    const isEditable = ref(false);
    const multipleTempValue = ref(null);
    const multipleTempText = ref(null);
    const multipleObjs = ref(null);
    const showView = ref(false);
    const isDesignPreview = ((_a = c.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    const showFormDefaultContent = computed(() => {
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
    } = useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    watch(() => props.value, (newVal) => {
      if (singleSelect.value) {
        if (c.model.valueType === "OBJECT") {
          queryValue.value = newVal ? newVal[c.objectNameField] : null;
        } else {
          queryValue.value = newVal || "";
        }
        if (!c.valueItem && !isDesignPreview) {
          ibiz.log.error("\u503C\u9879\u5F02\u5E38");
        } else {
          selectedData.value = [{
            srfkey: props.data[c.valueItem],
            srfmajortext: props.value
          }];
        }
      } else {
        const selectItems = [];
        keySet.value = [];
        items.value = [];
        if (newVal) {
          if (c.model.valueType === "OBJECTS") {
            newVal.forEach((item) => {
              const _item = clone(item);
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
          } else if (!c.valueItem) {
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
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    onMounted(() => {
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
    const onSelectionChange = (event, isClose = false) => {
      if (event.data) {
        onViewDataChange(event.data);
        if (isClose && editorRef.value) {
          editorRef.value.handleClose();
        }
      }
    };
    const modal = new Modal({
      mode: ViewMode.DRAWER,
      viewUsage: 2,
      dismiss: (_data) => {
        onSelectionChange(_data, true);
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
    const valueText = computed(() => {
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
      return createVNode("svg", {
        "viewBox": "0 0 1024 1024",
        "xmlns": "http://www.w3.org/2000/svg"
      }, [createVNode("path", {
        "fill": "currentColor",
        "d": "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      }, null)]);
    };
    return {
      c,
      ns,
      items,
      modal,
      keySet,
      params,
      visible,
      context,
      showView,
      editorRef,
      valueText,
      childClass,
      childStyle,
      isEditable,
      queryValue,
      cloneParams,
      selectedData,
      singleSelect,
      pickViewWidth,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      arrow,
      onBlur,
      onClear,
      onFocus,
      triggerMenu,
      setEditable,
      handleKeyUp,
      openLinkView,
      remoteMethod,
      onInputChange,
      onSelectChange,
      onVisibleChange,
      onViewDataChange,
      onSelectionChange,
      handleDropDownKeyDown
    };
  },
  render() {
    const editContent = createVNode(resolveComponent("el-dropdown"), {
      "ref": "editorRef",
      "trigger": "click",
      "disabled": this.disabled || this.readonly,
      "class": [this.ns.b("select"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
      "onVisibleChange": this.onVisibleChange,
      "onKeydown": this.handleDropDownKeyDown
    }, {
      default: () => {
        let _slot;
        return this.singleSelect ? createVNode(resolveComponent("el-input"), {
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
            return [this.c.model.linkAppViewId && createVNode("ion-icon", {
              "name": "link-arrow",
              "onClick": this.openLinkView,
              "class": [this.ns.e("icon"), this.ns.em("icon", "link")]
            }, null), this.c.model.showTrigger && createVNode("div", {
              "class": [this.ns.e("arrow"), this.showView ? "overturn" : ""]
            }, [this.arrow()])];
          }
        }) : createVNode(resolveComponent("el-select"), {
          "model-value": this.keySet,
          "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
          "multiple": true,
          "filterable": true,
          "remote": true,
          "popper-class": [this.ns.b("popper"), this.ns.b("select-popover"), this.semanticClass("editor.popup")],
          "popper-style": this.semanticStyle("editor.popup"),
          "remote-method": this.remoteMethod,
          "onChange": this.onSelectChange,
          "onFocus": (e) => {
            this.onFocus(e);
          },
          "onKeyup": this.handleKeyUp,
          "disabled": this.disabled || this.readonly,
          "remote-show-suffix": this.c.model.showTrigger
        }, _isSlot(_slot = this.items.map((item, index) => {
          return createVNode(resolveComponent("el-option"), {
            "key": item.srfkey + index,
            "label": item.srfmajortext,
            "value": item.srfkey
          }, null);
        })) ? _slot : {
          default: () => [_slot]
        });
      },
      dropdown: () => {
        var _a, _b;
        if (!this.showView)
          return;
        const viewShell = resolveComponent("IBizViewShell");
        return this.c.pickupView && h(viewShell, {
          modal: this.modal,
          context: this.context,
          params: this.cloneParams,
          viewId: this.c.pickupView.id,
          style: {
            height: "".concat(((_a = this.c.editorParams) == null ? void 0 : _a.pickupViewHeight) || ((_b = this.c.editorParams) == null ? void 0 : _b.pickupviewheight) || 500, "px"),
            width: this.pickViewWidth
          },
          state: {
            singleSelect: this.singleSelect,
            selectedData: this.selectedData
          },
          onSelectionChange: (event) => this.onSelectionChange(event, this.singleSelect)
        });
      }
    });
    const readonlyContent = createVNode("div", {
      "class": [this.ns.b(), this.ns.e("content"), this.ns.m("readonly"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText]);
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText ? this.singleSelect ? createVNode("span", {
      "class": [this.ns.b("content-item"), this.semanticClass("editor.item")],
      "style": this.semanticStyle("editor.item")
    }, [this.valueText]) : this.valueText.split(",").map((item) => createVNode("span", {
      "class": [this.ns.b("content-item"), this.semanticClass("editor.item")],
      "style": this.semanticStyle("editor.item")
    }, [item])) : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return withDirectives(createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { IBizPickerSelectView };
