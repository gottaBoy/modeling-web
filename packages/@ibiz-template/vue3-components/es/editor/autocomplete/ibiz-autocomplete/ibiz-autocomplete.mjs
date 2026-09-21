import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps, h } from 'vue';
import { getAutoCompleteProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-autocomplete.css';
import { debounce } from 'lodash-es';
import { showTitle } from '@ibiz-template/core';

"use strict";
const IBizAutoComplete = /* @__PURE__ */ defineComponent({
  name: "IBizAutoComplete",
  props: getAutoCompleteProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("autocomplete");
    const c = props.controller;
    const editorType = c.model.editorType;
    const curValue = ref("");
    const items = ref([]);
    const isShowAll = ref(true);
    const isEditable = ref(false);
    const editorRef = ref();
    const isSearched = ref(false);
    const isReverse = ref(false);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(items, (newVal, oldVal) => {
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
    watch(() => props.value, async (newVal, oldVal) => {
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
    watch(editorRef, (newVal) => {
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
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      isReverse.value = false;
      emit("blur", e);
      setEditable(false);
    };
    const triggerOnFocus = computed(() => {
      return !Object.is("AC_NOBUTTON", editorType);
    });
    const autoCompleteClearable = computed(() => {
      return !(Object.is("AC_NOBUTTON", editorType) || Object.is("AC_FS_NOBUTTON", editorType));
    });
    let isDebounce = false;
    let blurCacheValue;
    const debounceChange = debounce((val) => {
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
      if (!c.groupActionState[detail.id].visible) {
        return;
      }
      return createVNode("div", {
        "class": [ns.e("action-item"), ns.is("disabled", c.groupActionState[detail.id].disabled)],
        "onClick": (event) => c.onActionClick(detail, props.data, event),
        "title": showTitle(detail.tooltip)
      }, [detail.showIcon && detail.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "icon": detail.sysImage
      }, null), detail.showCaption ? detail.caption : ""]);
    };
    const renderEmpty = () => {
      return createVNode(resolveComponent("iBizNoData"), {
        "class": ns.e("empty"),
        "onClick": (event) => event.stopPropagation()
      }, null);
    };
    return {
      ns,
      c,
      curValue,
      triggerOnFocus,
      autoCompleteClearable,
      onSearch,
      onClear,
      onFocus,
      onBlur,
      onACSelect,
      items,
      handleInput,
      isDebounce,
      handleKeyUp,
      editorRef,
      isEditable,
      isReverse,
      setEditable,
      showFormDefaultContent,
      renderActionItem,
      renderEmpty
    };
  },
  render() {
    var _a;
    const overflowMode = this.c.editorParams.overflowMode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
    const {
      context,
      params
    } = this.c;
    const editContent = createVNode(resolveComponent("el-autocomplete"), mergeProps({
      "class": this.ns.b("input"),
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "value-key": this.c.textName,
      "placeholder": this.c.placeHolder,
      "placement": "bottom",
      "clearable": this.autoCompleteClearable,
      "popper-class": [this.ns.e("transfer"), this.ns.is("empty", !this.items.length)],
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
        if (item.srftype === "empty") {
          return this.renderEmpty();
        }
        if (item.detailType === "DEUIACTION") {
          return this.renderActionItem(item);
        }
        if (this.c.acItemProvider) {
          const component = resolveComponent(this.c.acItemProvider.component);
          return h(component, {
            item,
            controller: this.c
          });
        }
        const className = [this.ns.is("ellipsis", isEllipsis), this.ns.e("transfer-item")];
        if (panel) {
          return createVNode(resolveComponent("iBizControlShell"), {
            "data": item,
            "class": className,
            "modelData": panel,
            "context": context,
            "params": params,
            "onClick": () => {
              this.onACSelect(item);
            }
          }, null);
        }
        return createVNode("div", {
          "class": className,
          "title": showTitle(isEllipsis ? item[this.c.textName] : "")
        }, [item[this.c.textName]]);
      },
      suffix: () => {
        if (this.controller.model.showTrigger) {
          return createVNode("ion-icon", {
            "name": "chevron-down-outline",
            "class": [this.ns.e("suffix"), this.ns.is("reverse", this.isReverse)]
          }, null);
        }
      }
    });
    const readonlyContent = createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.curValue]);
    const formDefaultContent = createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.curValue ? this.curValue : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizAutoComplete };
