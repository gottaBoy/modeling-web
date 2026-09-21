'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
require('./ibiz-picker.css');
var core = require('@ibiz-template/core');

"use strict";
const IBizPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPicker",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("picker");
    const c = props.controller;
    const curValue = vue.ref("");
    const items = vue.ref([]);
    const isShowAll = vue.ref(true);
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const isLoaded = vue.ref(false);
    const isReverse = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const resetCurValue = () => {
      const value = props.value;
      if (c.model.valueType === "OBJECT") {
        curValue.value = value ? value[c.objectNameField] : null;
      } else {
        curValue.value = value;
      }
      if (value === null) {
        curValue.value = "";
      }
      const valueItem = props.data[c.valueItem];
      const index = items.value.findIndex((item) => Object.is(item[c.keyName], valueItem));
      if (index !== -1) {
        return;
      }
      items.value = [];
      if (value && !ramda.isEmpty(valueItem)) {
        items.value.push({
          [c.textName]: value,
          [c.keyName]: valueItem
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
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const handleDataSelect = async (data) => {
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", dataItem.value, dataItem.id);
        });
      }
      Object.assign(data, {
        [c.keyName]: data[c.keyName] ? data[c.keyName] : data.srfkey,
        [c.textName]: data[c.textName] ? data[c.textName] : data.srfmajortext
      });
      if (c.valueItem) {
        emit("change", data[c.keyName], c.valueItem);
      }
      if (c.model.valueType === "OBJECT") {
        emit("change", c.handleObjectParams(data));
      } else {
        emit("change", data[c.textName]);
      }
      setEditable(false);
    };
    const openPickUpView = async (e) => {
      e.stopPropagation();
      const res = await c.openPickUpView(props.data);
      if (res && res[0]) {
        await handleDataSelect(res[0]);
      }
    };
    const openLinkView = async (e) => {
      e.stopPropagation();
      const res = await c.openLinkView(props.data);
      if (res && res.ok && res.data && res.data.length > 0) {
        await handleDataSelect(res.data[0]);
      }
    };
    const onSearch = async (query, cb) => {
      if (c.model.appDataEntityId) {
        let trimQuery = "";
        if (query !== props.value) {
          trimQuery = query.trim();
        }
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          items.value = res.data;
          isLoaded.value = true;
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
    const onACSelect = async (item) => {
      isShowAll.value = true;
      setEditable(false);
      if (item.srftype === "empty") {
        resetCurValue();
        return;
      }
      if (item.detailType === "DEUIACTION") {
        c.onActionClick(item, props.data);
        resetCurValue();
      } else {
        await handleDataSelect(item);
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
    const closeCircle = (c.linkView ? 1 : 0) + (c.pickupView ? 1 : 0);
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const onFocus = (e) => {
      isReverse.value = true;
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      isReverse.value = false;
      resetCurValue();
      emit("blur", e);
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
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
            await onSearch("");
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (editorRef.value && ramda.isNil(props.value) && !ramda.isNil(newVal)) {
              emit("change", curValue.value, c.model.id, true);
            }
          }
          if (newVal === null) {
            emit("change", null, c.model.id, true);
          }
        }
      }, {
        immediate: true
      });
    });
    const renderActionItem = (detail) => {
      if (!c.groupActionState[detail.id].visible) {
        return;
      }
      return vue.createVNode("div", {
        "class": [ns.e("action-item"), ns.is("disabled", c.groupActionState[detail.id].disabled)],
        "onClick": (event) => c.onActionClick(detail, props.data, event),
        "title": core.showTitle(detail.tooltip)
      }, [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": detail.sysImage
      }, null), detail.showCaption ? detail.caption : ""]);
    };
    const renderEmpty = () => {
      return vue.createVNode(vue.resolveComponent("iBizNoData"), {
        "class": ns.e("empty"),
        "onClick": (event) => event.stopPropagation()
      }, null);
    };
    return {
      ns,
      c,
      curValue,
      valueText,
      items,
      openPickUpView,
      openLinkView,
      onACSelect,
      onSearch,
      editorRef,
      onClear,
      onFocus,
      onBlur,
      handleKeyUp,
      closeCircle,
      isEditable,
      isReverse,
      setEditable,
      showFormDefaultContent,
      renderActionItem,
      renderEmpty
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const itemContent = (item) => {
      var _a;
      const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
      const {
        context,
        params
      } = this.c;
      let selected = item[this.c.textName] || item.srfmajortext === this.curValue;
      if (this.c.valueItem) {
        selected = (item[this.c.keyName] || item.srfkey) === this.data[this.c.valueItem];
      }
      const className = [this.ns.is("active", selected), this.ns.e("transfer-item")];
      if (this.c.acItemProvider) {
        const component = vue.resolveComponent(this.c.acItemProvider.component);
        return vue.h(component, {
          item,
          controller: this.c,
          class: className,
          onClick: () => {
            this.onACSelect(item);
          }
        });
      }
      return panel ? vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": item,
        "class": className,
        "modelData": panel,
        "context": context,
        "params": params,
        "onClick": () => {
          this.onACSelect(item);
        }
      }, null) : vue.createVNode("div", {
        "class": [this.ns.is("ellipsis", isEllipsis), ...className],
        "title": core.showTitle(isEllipsis ? item[this.c.textName] : ""),
        "onClick": () => {
          this.onACSelect(item);
        }
      }, [item[this.c.textName]]);
    };
    const editContent = this.c.noAC ? vue.createVNode(vue.resolveComponent("el-input"), vue.mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "placeholder": this.c.placeHolder,
      "onClear": this.onClear,
      "disabled": this.disabled,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp
    }, this.$attrs), {
      suffix: () => {
        if (this.$slots.append) {
          return this.$slots.append({});
        }
        if (this.c.noButton) {
          return;
        }
        return [this.c.model.pickupAppViewId ? vue.createVNode("ion-icon", {
          "onClick": this.openPickUpView,
          "name": "search"
        }, null) : null, this.c.model.linkAppViewId && this.curValue ? vue.createVNode("ion-icon", {
          "onClick": this.openLinkView,
          "name": "link-arrow"
        }, null) : null];
      }
    }) : vue.createVNode("div", {
      "class": [this.ns.e("autocomplete"), this.ns.m(this.closeCircle.toString())]
    }, [vue.createVNode(vue.resolveComponent("el-autocomplete"), vue.mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "value-key": this.c.textName,
      "placeholder": this.c.placeHolder,
      "clearable": true,
      "popper-class": [this.ns.e("transfer"), this.ns.is("empty", !this.items.length)],
      "fetch-suggestions": this.onSearch,
      "onClear": this.onClear,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp,
      "onSelect": this.onACSelect,
      "disabled": this.disabled,
      "fit-input-width": isEllipsis
    }, this.$attrs), {
      default: ({
        item
      }) => {
        if (this.$slots.append) {
          return this.$slots.append({});
        }
        if (item.srftype === "empty") {
          return this.renderEmpty();
        }
        if (item.detailType === "DEUIACTION") {
          return this.renderActionItem(item);
        }
        return itemContent(item);
      },
      suffix: () => {
        if (this.c.noButton) {
          return;
        }
        return [this.c.model.pickupAppViewId ? vue.createVNode("ion-icon", {
          "onClick": this.openPickUpView,
          "name": "search"
        }, null) : null, this.c.model.linkAppViewId && this.curValue ? vue.createVNode("ion-icon", {
          "onClick": this.openLinkView,
          "name": "link-arrow"
        }, null) : null, this.c.model.showTrigger && !this.c.model.pickupAppViewId ? vue.createVNode("ion-icon", {
          "name": "chevron-down-outline",
          "class": [this.ns.e("suffix"), this.ns.is("reverse", this.isReverse)]
        }, null) : null];
      }
    })]);
    const readonlyContent = vue.createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.curValue ? this.valueText : ibiz.config.common.emptyText]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizPicker = IBizPicker;
