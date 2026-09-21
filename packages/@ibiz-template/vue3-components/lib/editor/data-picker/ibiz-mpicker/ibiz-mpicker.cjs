'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-mpicker.css');
var lodashEs = require('lodash-es');
var core = require('@ibiz-template/core');

"use strict";
const IBizMPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMPicker",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("mpicker");
    const c = props.controller;
    const curValue = vue.ref([]);
    const items = vue.ref([]);
    const selectItems = vue.ref([]);
    const open = vue.ref(false);
    const loading = vue.ref(false);
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const resetCurValue = () => {
      curValue.value = [];
      selectItems.value = [];
      if (props.value) {
        if (c.model.valueType === "OBJECTS") {
          props.value.forEach((item) => {
            const _item = lodashEs.clone(item);
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
              selectItems.value.push(_item);
            }
          });
        } else if (c.objectIdField && c.model.valueSeparator) {
          const values = props.value.split(c.model.valueSeparator);
          values.forEach((value) => {
            selectItems.value.push({
              [c.keyName]: value
            });
          });
        } else {
          try {
            selectItems.value = JSON.parse(props.value);
          } catch (error) {
            ibiz.log.error("SIMPLE\u7C7B\u578B\u5730\u5740\u680F\u503C\u683C\u5F0F".concat(props.value, "\u4E0D\u7B26\u5408JSON\u5B57\u7B26\u4E32\u8981\u6C42"));
          }
        }
        selectItems.value.forEach((item) => {
          curValue.value.push(item[c.keyName]);
          const index = items.value.findIndex((i) => Object.is(i[c.keyName], item[c.keyName]));
          if (index < 0) {
            items.value.push({
              [c.keyName]: item[c.keyName],
              [c.textName]: item[c.textName]
            });
          }
        });
      }
    };
    vue.watch(() => props.value, () => {
      resetCurValue();
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
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
    const handleOpenViewClose = (result) => {
      const selects = [];
      if (result && Array.isArray(result)) {
        result.forEach((select) => {
          Object.assign(select, {
            [c.keyName]: select[c.keyName] ? select[c.keyName] : select.srfkey,
            [c.textName]: select[c.textName] ? select[c.textName] : select.srfmajortext
          });
          if (c.model.valueType === "OBJECTS") {
            selects.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            selects.push(select[c.keyName]);
          } else {
            selects.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName]
            });
          }
          const index = items.value.findIndex((item) => Object.is(item[c.keyName], select[c.keyName]));
          if (index < 0) {
            items.value.push(select);
          }
        });
      }
      let value = null;
      if (selects.length > 0) {
        if (c.model.valueType === "OBJECTS") {
          value = selects;
        } else {
          value = c.objectIdField ? selects.join(c.model.valueSeparator) : JSON.stringify(selects);
        }
      }
      emit("change", value);
      setEditable(false);
    };
    const openPickUpView = async () => {
      let selectedData;
      if (selectItems.value.length) {
        const _selectItems = JSON.parse(JSON.stringify(selectItems.value));
        _selectItems.forEach((item, index) => {
          _selectItems[index].srfkey = item[c.keyName];
          _selectItems[index].srfmajortext = item[c.textName];
        });
        selectedData = JSON.stringify(_selectItems);
      }
      const res = await c.openPickUpView(props.data, selectedData);
      if (res) {
        handleOpenViewClose(res);
      }
    };
    const onSelect = (selects) => {
      setEditable(false);
      if (selects.includes("empty")) {
        resetCurValue();
        return;
      }
      const val = [];
      let value = null;
      selects.forEach((select) => {
        let index = items.value.findIndex((item2) => Object.is(item2[c.keyName], select));
        let item = {};
        if (index >= 0) {
          item = items.value[index];
        } else {
          index = selectItems.value.findIndex((selectItem) => Object.is(selectItem[c.keyName], select));
          if (index >= 0) {
            item = selectItems.value[index];
          }
        }
        if (c.model.valueType === "OBJECTS") {
          val.push(c.handleObjectParams(item));
        } else if (c.objectIdField) {
          val.push(item[c.keyName]);
        } else {
          val.push({
            [c.keyName]: item[c.keyName],
            [c.textName]: item[c.textName]
          });
        }
      });
      if (val.length > 0) {
        if (c.model.valueType === "OBJECTS") {
          value = val;
        } else {
          value = c.objectIdField ? val.join(c.model.valueSeparator) : JSON.stringify(val);
        }
      }
      emit("change", value);
    };
    const onRemove = (tag) => {
      const index = selectItems.value.findIndex((item) => Object.is(item[c.keyName], tag));
      if (index >= 0) {
        selectItems.value.splice(index, 1);
        const val = [];
        let value = null;
        selectItems.value.forEach((select) => {
          if (c.model.valueType === "OBJECTS") {
            val.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            val.push(select[c.keyName]);
          } else {
            val.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName]
            });
          }
        });
        if (val.length > 0) {
          if (c.model.valueType === "OBJECTS") {
            value = val;
          } else {
            value = c.objectIdField ? val.join(c.model.valueSeparator) : JSON.stringify(val);
          }
        }
        emit("change", value);
      }
    };
    const onSearch = async (query) => {
      if (c.model.appDataEntityId) {
        loading.value = true;
        try {
          const trimQuery = query.trim();
          const res = await c.getServiceData(trimQuery, props.data);
          loading.value = false;
          if (res) {
            items.value = res.data;
          }
        } catch (error) {
          loading.value = false;
        }
      }
    };
    const onOpenChange = (flag) => {
      open.value = flag;
      if (open.value) {
        items.value = [];
        onSearch("");
      }
    };
    const valueText = vue.computed(() => {
      return selectItems.value.map((item) => {
        return item[c.textName];
      }).join(",");
    });
    vue.watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
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
      }
    };
    vue.onMounted(() => {
      if (c.objectNameField) {
        onSearch("");
      }
    });
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
      curValue,
      loading,
      items,
      valueText,
      onSearch,
      onOpenChange,
      onSelect,
      onRemove,
      openPickUpView,
      onFocus,
      onBlur,
      handleKeyUp,
      selectItems,
      editorRef,
      isEditable,
      setEditable,
      showFormDefaultContent,
      renderEmpty
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const editContent = [!this.readonly && vue.createVNode(vue.resolveComponent("el-select"), vue.mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("select")],
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "filterable": true,
      "remote": true,
      "multiple": true,
      "popper-class": [this.ns.e("transfer"), this.ns.is("empty", !this.items.length)],
      "teleported": !this.showFormDefaultContent,
      "loading": this.loading,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "remote-method": this.onSearch,
      "onVisibleChange": this.onOpenChange,
      "onChange": this.onSelect,
      "onRemoveTag": this.onRemove,
      "disabled": this.disabled,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "onKeyup": this.handleKeyUp,
      "fit-input-width": isEllipsis,
      "remote-show-suffix": this.c.model.showTrigger
    }, this.$attrs), {
      default: () => [this.items.map((item) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "title": core.showTitle(isEllipsis ? item[this.c.textName] : ""),
          "key": item[this.c.keyName],
          "value": item[this.c.keyName],
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
      }), this.renderEmpty()]
    }), !this.readonly && vue.createVNode("div", {
      "class": this.ns.e("buns-position")
    }, [this.c.model.pickupAppViewId ? vue.createVNode("div", {
      "class": this.ns.e("btns"),
      "onClick": this.openPickUpView
    }, [vue.createVNode("ion-icon", {
      "name": "search"
    }, null)]) : null])];
    const readonlyContent = vue.createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.curValue.length > 0 ? this.selectItems.map((item) => {
      return vue.createVNode("span", {
        "class": this.ns.b("content-item")
      }, [item[this.c.textName]]);
    }) : ibiz.config.common.emptyText]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizMPicker = IBizMPicker;
