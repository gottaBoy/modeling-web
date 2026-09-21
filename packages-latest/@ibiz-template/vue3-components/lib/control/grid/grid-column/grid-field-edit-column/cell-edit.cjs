'use strict';

var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var vue = require('vue');

"use strict";
function useCellEdit(props, componentRef) {
  const c = props.controller;
  const disabled = vue.computed(() => {
    return props.row.editColStates[c.fieldName].disabled;
  });
  const readonly = vue.computed(() => {
    return props.row.editColStates[c.fieldName].readonly;
  });
  const hasError = vue.computed(() => !!props.row.errors[c.fieldName]);
  const editable = vue.computed(
    () => props.row.editColStates[c.fieldName].editable
  );
  const setEditable = (flag) => {
    props.row.editColStates[c.fieldName].editable = flag;
  };
  const cellEditable = vue.computed(() => {
    return !disabled.value && !readonly.value && !hasError.value;
  });
  const editorShowEdit = vue.computed(() => {
    return hasError.value || cellEditable.value && editable.value;
  });
  const editorReadOnly = vue.computed(() => {
    return !editorShowEdit.value;
  });
  const editorDisabled = false;
  const isAutoFocus = vue.computed(() => {
    return !hasError.value;
  });
  const showEditMask = vue.computed(() => {
    return cellEditable.value && !editable.value;
  });
  const stopPropagation = vue.computed(() => {
    return cellEditable.value || editorShowEdit.value;
  });
  let funcs;
  const onMaskClick = () => {
    setEditable(true);
    funcs = vue3Util.useClickOutside(componentRef, async (_evt) => {
      setEditable(false);
      funcs.stop();
    });
  };
  const onFocus = () => {
    if (funcs) {
      funcs.stop();
    }
    ibiz.log.debug("".concat(c.fieldName, "\u5C5E\u6027\u7F16\u8F91\u5668focus\u4E8B\u4EF6"));
  };
  const onBlur = () => {
    ibiz.log.debug("".concat(c.fieldName, "\u5C5E\u6027\u7F16\u8F91\u5668blur\u4E8B\u4EF6"));
    setEditable(false);
    if (c.grid.editSaveMode === "cell-blur") {
      c.grid.save(props.row.data);
    }
  };
  let cleanKeyUp = core.NOOP;
  const isEscOut = vue.ref(false);
  cleanKeyUp = core.listenJSEvent(window, "keyup", (e) => {
    if (e.code === "Escape" && editable.value) {
      setEditable(false);
      isEscOut.value = true;
    }
  });
  vue.onUnmounted(() => {
    if (cleanKeyUp !== core.NOOP) {
      cleanKeyUp();
    }
  });
  const gridEditItemProps = vue.reactive({
    showEditMask,
    stopPropagation,
    isEscOut,
    onMaskClick
  });
  const editorProps = vue.reactive({
    autoFocus: isAutoFocus,
    disabled: editorDisabled,
    readonly: editorReadOnly,
    onBlur,
    onFocus
  });
  return {
    gridEditItemProps,
    editorProps,
    editable
  };
}

exports.useCellEdit = useCellEdit;
