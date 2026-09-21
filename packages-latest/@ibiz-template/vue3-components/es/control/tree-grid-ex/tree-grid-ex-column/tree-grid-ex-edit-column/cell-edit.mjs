import { useClickOutside } from '@ibiz-template/vue3-util';
import { computed, reactive } from 'vue';

"use strict";
function useCellEdit(props, componentRef) {
  const c = props.controller;
  const disabled = computed(() => {
    return props.row.editColStates[c.name].disabled;
  });
  const readonly = computed(() => {
    return props.row.editColStates[c.name].readonly;
  });
  const hasError = computed(() => !!props.row.errors[c.name]);
  const editable = computed(() => props.row.editColStates[c.name].editable);
  const setEditable = (flag) => {
    props.row.editColStates[c.name].editable = flag;
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
    return cellEditable.value;
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
    ibiz.log.debug("".concat(c.name, "\u5C5E\u6027\u7F16\u8F91\u5668focus\u4E8B\u4EF6"));
  };
  const onBlur = () => {
    ibiz.log.debug("".concat(c.name, "\u5C5E\u6027\u7F16\u8F91\u5668blur\u4E8B\u4EF6"));
    setEditable(false);
    if (c.treeGrid.editSaveMode === "cell-blur") {
      c.treeGrid.save(props.row.data);
    }
  };
  const gridEditItemProps = reactive({
    showEditMask,
    stopPropagation,
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
    editorProps
  };
}

export { useCellEdit };
