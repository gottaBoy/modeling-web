'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var core = require('@ibiz-template/core');
require('./ibiz-mpicker.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizMPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMPicker",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("mpicker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.pickup"),
      selector: ".".concat(ns.em("icon", "pickup"))
    }, {
      class: semanticClass("editor.item"),
      selector: ".el-tag"
    }, {
      class: semanticClass("editor.item.label"),
      selector: ".el-tag__content"
    }, {
      class: semanticClass("editor.item.remove"),
      selector: ".el-tag__close"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.pickup"),
      selector: ".".concat(ns.em("icon", "pickup"))
    }, {
      style: semanticStyle("editor.item"),
      selector: ".el-tag"
    }, {
      style: semanticStyle("editor.item.label"),
      selector: ".el-tag__content"
    }, {
      style: semanticStyle("editor.item.remove"),
      selector: ".el-tag__close"
    }];
    const curValue = vue.ref([]);
    const items = vue.ref([]);
    const selectItems = vue.ref([]);
    const open = vue.ref(false);
    const loading = vue.ref(false);
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const actionPostion = ((_a = c.model.editorParams) == null ? void 0 : _a.actionpostion) || "bottom";
    const overflowMode = c.editorParams.overflowMode || c.editorParams.overflowmode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
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
    const handleOpenViewClose = async (result) => {
      const selects = [];
      if (result && Array.isArray(result)) {
        const calcPromises = result.map(async (select) => {
          const item = select;
          if (select.srfnodeid) {
            Object.assign(item, select._deData);
          }
          const dataItems = await c.calcFillDataItems(item);
          const res = {};
          dataItems.forEach((dataItem) => {
            Object.assign(res, {
              [dataItem.id]: dataItem.value
            });
          });
          return res;
        });
        const dataItemsList = await Promise.all(calcPromises);
        result.forEach((select, _index) => {
          Object.assign(select, {
            [c.keyName]: select[c.keyName] ? select[c.keyName] : select.srfkey,
            [c.textName]: select[c.textName] ? select[c.textName] : select.srfmajortext
          });
          const data = dataItemsList[_index];
          if (c.model.valueType === "OBJECTS") {
            selects.push({
              ...c.handleObjectParams(select),
              ...data
            });
          } else if (c.objectIdField) {
            selects.push(select[c.keyName]);
          } else {
            selects.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName],
              ...data
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
    const onSelect = async (selects) => {
      var _a2;
      setEditable(false);
      if (selects.includes("empty") || selects.some((selectKey) => selectKey.includes("DEUIACTION"))) {
        (_a2 = editorRef.value) == null ? void 0 : _a2.blur();
        return resetCurValue();
      }
      const val = [];
      let value = null;
      const selections = selects.map((select) => {
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
        return item;
      });
      const calcPromises = selections.map(async (select) => {
        const dataItems = await c.calcFillDataItems(select);
        const res = {};
        dataItems.forEach((dataItem) => {
          Object.assign(res, {
            [dataItem.id]: dataItem.value
          });
        });
        return res;
      });
      const dataItemsList = await Promise.all(calcPromises);
      selections.forEach((item, index) => {
        const data = dataItemsList[index];
        if (c.model.valueType === "OBJECTS") {
          val.push({
            ...c.handleObjectParams(item),
            ...data
          });
        } else if (c.objectIdField) {
          val.push(item[c.keyName]);
        } else {
          val.push({
            [c.keyName]: item[c.keyName],
            [c.textName]: item[c.textName],
            ...data
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
      if (c.objectNameField)
        onSearch("");
    });
    const renderActionItems = () => {
      return c.actionDetails.map((item) => {
        if (!c.groupActionState[item.id].visible)
          return;
        const semanticParams = {
          item,
          state: c.groupActionState[item.id]
        };
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "key": item.id,
          "label": item.caption,
          "value": "DEUIACTION-".concat(item.id),
          "disabled": c.groupActionState[item.id].disabled,
          "title": core.showTitle(isEllipsis ? item.tooltip : ""),
          "class": [ns.be("popper", "action"), semanticClass("editor.popup.action")],
          "style": semanticStyle("editor.popup.action")
        }, {
          default: () => vue.createVNode("div", {
            "class": [ns.e("action-item"), ns.is("disabled", c.groupActionState[item.id].disabled)],
            "onClick": (event) => {
              if (!c.groupActionState[item.id].disabled)
                c.onActionClick(item, props.data, event);
            }
          }, [item.showIcon && item.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": item.sysImage,
            "class": [ns.em("action-item", "icon"), semanticClass("editor.popup.action.icon", semanticParams)],
            "style": semanticStyle("editor.popup.action.icon", semanticParams)
          }, null), vue.createVNode("span", {
            "class": [ns.em("action-item", "caption"), ns.em("action-item", "label"), semanticClass("editor.popup.action.label", semanticParams)],
            "style": semanticStyle("editor.popup.action.label", semanticParams)
          }, [item.showCaption ? item.caption : ""])])
        });
      });
    };
    const renderListItems = () => {
      if (!items.value.length)
        return [vue.createVNode(vue.resolveComponent("el-option"), {
          "value": "empty",
          "class": [ns.be("popper", "item"), semanticClass("editor.popup.empty")],
          "style": semanticStyle("editor.popup.empty")
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("iBizNoData"), {
            "class": ns.e("empty"),
            "onClick": (event) => event.stopPropagation()
          }, null)]
        })];
      return items.value.map((item) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "key": item[c.keyName],
          "value": item[c.keyName],
          "label": item[c.textName],
          "class": [ns.be("popper", "item"), semanticClass("editor.popup.item", {
            item
          })],
          "style": semanticStyle("editor.popup.item", {
            item
          }),
          "title": core.showTitle(isEllipsis ? item[c.textName] : "")
        }, {
          default: () => {
            var _a2;
            if (c.acItemProvider) {
              const component = vue.resolveComponent(c.acItemProvider.component);
              return vue.h(component, {
                item,
                controller: c
              });
            }
            const panel = (_a2 = c.deACMode) == null ? void 0 : _a2.itemLayoutPanel;
            if (panel)
              return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
                "data": item,
                "modelData": panel,
                "context": c.context,
                "params": c.params
              }, null);
            return vue.createVNode("span", null, [item[c.textName] != null ? item[c.textName] : ""]);
          }
        });
      });
    };
    const renderListContent = () => {
      if (actionPostion === "top")
        return [...renderActionItems(), ...renderListItems()];
      return [...renderListItems(), ...renderActionItems()];
    };
    return {
      c,
      ns,
      items,
      loading,
      curValue,
      valueText,
      editorRef,
      isEllipsis,
      isEditable,
      childClass,
      childStyle,
      selectItems,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onSearch,
      onSelect,
      onRemove,
      onOpenChange,
      handleKeyUp,
      setEditable,
      openPickUpView,
      renderListContent
    };
  },
  render() {
    let _slot;
    const editContent = [!this.readonly && vue.createVNode(vue.resolveComponent("el-select"), vue.mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("select"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "filterable": true,
      "remote": true,
      "multiple": true,
      "popper-class": [this.ns.b("popper"), this.ns.e("transfer"), this.semanticClass("editor.popup"), this.ns.is("empty", !this.items.length)],
      "popper-style": this.semanticStyle("editor.popup"),
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
      "fit-input-width": this.isEllipsis,
      "remote-show-suffix": this.c.model.showTrigger
    }, this.$attrs), _isSlot(_slot = this.renderListContent()) ? _slot : {
      default: () => [_slot]
    }), !this.readonly && vue.createVNode("div", {
      "class": this.ns.e("buns-position")
    }, [this.c.model.pickupAppViewId ? vue.createVNode("div", {
      "class": this.ns.e("btns"),
      "onClick": this.openPickUpView
    }, [vue.createVNode("ion-icon", {
      "name": "search",
      "class": [this.ns.e("icon"), this.ns.em("icon", "pickup")]
    }, null)]) : null])];
    const readonlyContent = vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m("readonly"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.curValue.length > 0 ? this.selectItems.map((item) => {
      return vue.createVNode("span", {
        "class": [this.ns.b("content-item"), this.ns.e("item"), this.semanticClass("editor.item", {
          item
        })],
        "style": this.semanticStyle("editor.item", {
          item
        })
      }, [item[this.c.textName]]);
    }) : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.IBizMPicker = IBizMPicker;
