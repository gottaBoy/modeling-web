import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { useClickOutside } from '@ibiz-template/vue3-util';
import { computed, ref, onUnmounted, reactive } from 'vue';

"use strict";
function useCellEdit(props, componentRef) {
  const c = props.controller;
  const disabled = computed(() => {
    return props.row.editColStates[c.fieldName].disabled;
  });
  const readonly = computed(() => {
    return props.row.editColStates[c.fieldName].readonly;
  });
  const hasError = computed(() => !!props.row.errors[c.fieldName]);
  const editable = computed(
    () => props.row.editColStates[c.fieldName].editable
  );
  const setEditable = (flag) => {
    props.row.editColStates[c.fieldName].editable = flag;
  };
  const cellEditable = computed(() => {
    return !disabled.value && !readonly.value && !hasError.value;
  });
  const editorShowEdit = computed(() => {
    return hasError.value || cellEditable.value && editable.value;
  });
  const editorReadOnly = computed(() => {
    return !editorShowEdit.value;
  });
  const editorDisabled = false;
  const isAutoFocus = computed(() => {
    return !hasError.value;
  });
  const showEditMask = computed(() => {
    return cellEditable.value && !editable.value;
  });
  const stopPropagation = computed(() => {
    return cellEditable.value || editorShowEdit.value;
  });
  let funcs;
  const onMaskClick = () => {
    setEditable(true);
    funcs = useClickOutside(componentRef, async (_evt) => {
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
  let cleanKeyUp = NOOP;
  const isEscOut = ref(false);
  cleanKeyUp = listenJSEvent(window, "keyup", (e) => {
    if (e.code === "Escape" && editable.value) {
      setEditable(false);
      isEscOut.value = true;
    }
  });
  onUnmounted(() => {
    if (cleanKeyUp !== NOOP) {
      cleanKeyUp();
    }
  });
  const gridEditItemProps = reactive({
    showEditMask,
    stopPropagation,
    isEscOut,
    onMaskClick
  });
  const editorProps = reactive({
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

export { useCellEdit };
