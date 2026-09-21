'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var core = require('@ibiz-template/core');
require('./ibiz-autocomplete.css');

"use strict";
const IBizAutoComplete = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAutoComplete",
  props: vue3Util.getAutoCompleteProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("autocomplete");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorType = c.model.editorType;
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }];
    const curValue = vue.ref("");
    const items = vue.ref([]);
    const isShowAll = vue.ref(true);
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const isSearched = vue.ref(false);
    const isReverse = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(items, (newVal, oldVal) => {
      if (oldVal.length === 0 && newVal.length > 0) {
        const index = newVal.findIndex((item) => Object.is(item[c.keyName], props.value));
        if (index !== -1) {
          curValue.value = newVal[index][c.textName];
        }
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
    const onSearch = async (query, cb) => {
      if (c.model.appDataEntityId) {
        const trimQuery = query.trim();
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          items.value = res.data;
          isSearched.value = true;
          if (cb && cb instanceof Function) {
            if (items.value.length) {
              cb([...items.value, ...c.actionDetails]);
            } else {
              const empty = {
                srftype: "empty"
              };
              cb([empty, ...c.actionDetails]);
            }
          }
        }
      }
    };
    vue.watch(() => props.value, async (newVal, oldVal) => {
      if (newVal || newVal === null) {
        if (!isSearched.value && oldVal === void 0) {
          await onSearch("");
        }
        if (newVal === null) {
          curValue.value = "";
        }
        const index = items.value.findIndex((item) => Object.is(item[c.keyName], newVal));
        if (index !== -1) {
          curValue.value = items.value[index][c.textName];
        } else {
          curValue.value = newVal;
          if (newVal === null) {
            curValue.value = "";
          }
        }
      }
    }, {
      immediate: true
    });
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const handleDataSelect = async (data) => {
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", dataItem.value, dataItem.id);
        });
      }
      emit("change", data[c.keyName]);
    };
    const resetValue = () => {
      if (!items.value.length) {
        onSearch("");
      } else {
        const index = items.value.findIndex((item) => Object.is(item[c.keyName], props.value));
        if (index !== -1) {
          curValue.value = items.value[index][c.textName];
        }
      }
    };
    const onACSelect = async (item) => {
      isShowAll.value = true;
      setEditable(false);
      if (item.srftype === "empty") {
        resetValue();
        return;
      }
      if (item.detailType === "DEUIACTION") {
        c.onActionClick(item, props.data);
        resetValue();
      } else {
        await handleDataSelect(item);
      }
    };
    const onClear = () => {
      const dataItems = c.dataItems;
      if (dataItems.length > 0) {
        dataItems.forEach((dataItem) => {
          emit("change", null, dataItem.id);
        });
      }
      emit("change", null);
    };
    const onFocus = (e) => {
      isReverse.value = true;
      editorRef.value.loading = true;
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      isReverse.value = false;
      emit("blur", e);
      setEditable(false);
    };
    const triggerOnFocus = vue.computed(() => {
      return !Object.is("AC_NOBUTTON", editorType);
    });
    const autoCompleteClearable = vue.computed(() => {
      return !(Object.is("AC_NOBUTTON", editorType) || Object.is("AC_FS_NOBUTTON", editorType));
    });
    let isDebounce = false;
    let blurCacheValue;
    const debounceChange = lodashEs.debounce((val) => {
      if (blurCacheValue !== val) {
        emit("change", val);
      }
      blurCacheValue = void 0;
      isDebounce = false;
    }, 300, {
      leading: true
    });
    const handleInput = (val) => {
      if (editorType !== "AC_FS" && editorType !== "AC_FS_NOBUTTON") {
        isDebounce = true;
        debounceChange(val);
      }
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const renderActionItem = (detail) => {
      if (!c.groupActionState[detail.id].visible)
        return;
      const semanticParams = {
        item: detail,
        state: c.groupActionState[detail.id]
      };
      return vue.createVNode("div", {
        "class": [ns.e("action-item"), ns.be("popper", "action"), semanticClass("editor.popup.action", semanticParams), ns.is("disabled", c.groupActionState[detail.id].disabled)],
        "style": semanticStyle("editor.popup.action", semanticParams),
        "onClick": (event) => c.onActionClick(detail, props.data, event),
        "title": core.showTitle(detail.tooltip)
      }, [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": detail.sysImage,
        "class": [ns.em("action-item", "icon"), semanticClass("editor.popup.action.icon", semanticParams)],
        "style": semanticStyle("editor.popup.action.icon", semanticParams)
      }, null), vue.createVNode("span", {
        "class": [ns.em("action-item", "label"), ns.em("action-item", "caption"), semanticClass("editor.popup.action.label", semanticParams)],
        "style": semanticStyle("editor.popup.action.label", semanticParams)
      }, [detail.showCaption ? detail.caption : ""])]);
    };
    const renderEmpty = () => {
      return vue.createVNode(vue.resolveComponent("iBizNoData"), {
        "style": semanticStyle("editor.popup.empty"),
        "class": [ns.e("empty"), ns.be("popper", "item"), semanticClass("editor.popup.empty")],
        "onClick": (event) => event.stopPropagation()
      }, null);
    };
    return {
      c,
      ns,
      items,
      curValue,
      isReverse,
      editorRef,
      isDebounce,
      isEditable,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      triggerOnFocus,
      autoCompleteClearable,
      showFormDefaultContent,
      onBlur,
      onClear,
      onFocus,
      onSearch,
      onACSelect,
      setEditable,
      handleInput,
      handleKeyUp,
      renderEmpty,
      renderActionItem
    };
  },
  render() {
    var _a;
    const overflowMode = this.c.editorParams.overflowMode || this.c.editorParams.overflowmode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
    const {
      context,
      params
    } = this.c;
    const editContent = vue.createVNode(vue.resolveComponent("el-autocomplete"), vue.mergeProps({
      "class": [this.ns.b("input"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "value-key": this.c.textName,
      "placeholder": this.c.placeHolder,
      "placement": "bottom",
      "clearable": this.autoCompleteClearable,
      "popper-class": [this.ns.b("popper"), this.ns.e("transfer"), this.ns.is("empty", !this.items.length), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
      "teleported": !this.showFormDefaultContent,
      "fetch-suggestions": this.onSearch,
      "onClear": this.onClear,
      "disabled": this.disabled || this.readonly,
      "onSelect": this.onACSelect,
      "onInput": this.handleInput,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "onKeyup": this.handleKeyUp,
      "fit-input-width": isEllipsis
    }, this.$attrs), {
      default: ({
        item
      }) => {
        if (item.srftype === "empty")
          return this.renderEmpty();
        if (item.detailType === "DEUIACTION")
          return this.renderActionItem(item);
        if (this.c.acItemProvider) {
          const component = vue.resolveComponent(this.c.acItemProvider.component);
          return vue.h(component, {
            item,
            controller: this.c
          });
        }
        const className = [this.ns.is("ellipsis", isEllipsis), this.ns.e("transfer-item"), this.ns.be("popper", "item"), this.semanticClass("editor.popup.item", {
          item
        })];
        if (panel) {
          return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
            "data": item,
            "class": className,
            "modelData": panel,
            "context": context,
            "params": params,
            "onClick": () => {
              this.onACSelect(item);
            },
            "style": this.semanticStyle("editor.popup.item", {
              item
            })
          }, null);
        }
        return vue.createVNode("div", {
          "class": className,
          "title": core.showTitle(isEllipsis ? item[this.c.textName] : ""),
          "style": this.semanticStyle("editor.popup.item", {
            item
          })
        }, [item[this.c.textName]]);
      },
      suffix: () => {
        if (this.controller.model.showTrigger)
          return;
        vue.createVNode("ion-icon", {
          "name": "chevron-down-outline",
          "class": [this.ns.e("suffix"), this.ns.is("reverse", this.isReverse)]
        }, null);
      }
    });
    const readonlyContent = vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m("readonly"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.curValue]);
    const formDefaultContent = vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.curValue ? this.curValue : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.IBizAutoComplete = IBizAutoComplete;
