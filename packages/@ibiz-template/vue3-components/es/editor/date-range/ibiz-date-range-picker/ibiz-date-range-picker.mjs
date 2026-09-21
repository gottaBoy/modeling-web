import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getDateRangeProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import { clone } from 'ramda';
import dayjs from 'dayjs';
import './ibiz-date-range-picker.css';

"use strict";
const IBizDateRangePicker = /* @__PURE__ */ defineComponent({
  name: "IBizDateRangePicker",
  props: getDateRangeProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("date-range-picker");
    const c = props.controller;
    const editorModel = c.model;
    let valueSeparator = ",";
    let unlinkPanels = false;
    const startPlaceHolder = editorModel.placeHolder ? editorModel.placeHolder.split(";")[0] || "" : "";
    const endPlaceHolder = editorModel.placeHolder ? editorModel.placeHolder.split(";")[1] || "" : "";
    let rangeSeparator = ibiz.i18n.t("editor.dateRange.rangeSeparator");
    if (editorModel.editorParams) {
      if (editorModel.editorParams.valueSeparator) {
        valueSeparator = editorModel.editorParams.valueSeparator;
      }
      if (editorModel.editorParams.rangeSeparator) {
        rangeSeparator = editorModel.editorParams.rangeSeparator;
      }
      if (editorModel.editorParams.unlinkPanels) {
        unlinkPanels = c.toBoolean(editorModel.editorParams.unlinkPanels);
      }
    }
    const type = ref("daterange");
    switch (editorModel.editorType) {
      case "DATERANGE":
        type.value = "datetimerange";
        break;
      case "DATERANGE_NOTIME":
        type.value = "daterange";
        break;
      default:
        type.value = "datetimerange";
    }
    const format = ref("YYYY-MM-DD");
    const valueFormat = c.valueFormat;
    if (valueFormat) {
      format.value = valueFormat;
    }
    const refFormItem = ref([]);
    const editorItems = editorModel.editorItems;
    if (editorItems && editorItems.length > 0) {
      const editorItemNames = editorItems.map((item) => item.id);
      refFormItem.value = editorItemNames;
    }
    const isEditable = ref(false);
    const editorRef = ref();
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
    const curValue = computed({
      get() {
        let value = [];
        if (refFormItem.value.length > 0) {
          refFormItem.value.forEach((name) => {
            if (props.data[name]) {
              value.push(props.data[name]);
            }
          });
        } else if (props.value && typeof props.value === "string") {
          const dates = props.value.split(valueSeparator);
          value = dates.every((date) => dayjs(date).isValid()) ? dates : [];
        }
        return value;
      },
      set(dates) {
        if (dates && dates.length > 0) {
          emit("change", dates.join(valueSeparator));
          if (refFormItem.value.length > 0) {
            dates.forEach((date, index) => {
              emit("change", date, refFormItem.value[index]);
            });
          }
        } else {
          emit("change", null);
          if (refFormItem.value.length > 0) {
            refFormItem.value.forEach((date, index) => {
              emit("change", null, refFormItem.value[index]);
            });
          }
        }
        setEditable(false);
      }
    });
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
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
    const onCalendarChange = (val) => {
      c.dateRange = clone(val);
    };
    const valueText = computed(() => {
      if (curValue.value.length > 0) {
        return "".concat(curValue.value[0], " ").concat(rangeSeparator, " ").concat(curValue.value[1]);
      }
      return null;
    });
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      refFormItem,
      curValue,
      type,
      format,
      valueSeparator,
      startPlaceHolder,
      endPlaceHolder,
      rangeSeparator,
      unlinkPanels,
      onFocus,
      onBlur,
      editorRef,
      valueText,
      isEditable,
      setEditable,
      showFormDefaultContent,
      handleKeyUp,
      onCalendarChange
    };
  },
  render() {
    const editContent = createVNode(resolveComponent("el-date-picker"), mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "class": this.ns.b("input"),
      "type": this.type,
      "popper-class": this.ns.b("popper"),
      "format": this.format,
      "value-format": this.format,
      "disabled": this.disabled,
      "readonly": this.readonly,
      "range-separator": this.rangeSeparator,
      "start-placeholder": this.startPlaceHolder,
      "end-placeholder": this.endPlaceHolder,
      "unlink-panels": this.unlinkPanels,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "onCalendarChange": this.onCalendarChange
    }, this.$attrs), null);
    const readonlyContent = createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.ns.is("has-val", this.curValue.length > 0)]
    }, [this.curValue.length > 0 ? createVNode(resolveComponent("el-date-picker"), mergeProps({
      "model-value": this.curValue,
      "class": this.ns.b("default-input"),
      "type": this.type,
      "format": this.format,
      "value-format": this.format,
      "readonly": true,
      "range-separator": this.rangeSeparator,
      "start-placeholder": this.startPlaceHolder,
      "end-placeholder": this.endPlaceHolder,
      "unlink-panels": this.unlinkPanels
    }, this.$attrs), null) : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizDateRangePicker };
