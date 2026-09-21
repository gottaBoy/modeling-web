import { computed, reactive } from 'vue';

"use strict";
function useRowEdit(props, _componentRef) {
  const c = props.controller;
  const disabled = computed(() => {
    return props.row.editColStates[c.fieldName].disabled;
  });
  const readonly = computed(() => {
    return props.row.editColStates[c.fieldName].readonly;
  });
  const editable = computed(
    () => props.row.editColStates[c.fieldName].editable
  );
  const editorReadOnly = computed(() => {
    return readonly.value || !editable.value;
  });
  const editorDisabled = computed(() => {
    return editable.value && disabled.value;
  });
  const stopPropagation = computed(() => {
    return editable.value;
  });
  const gridEditItemProps = reactive({
    stopPropagation
  });
  const editorProps = reactive({
    disabled: editorDisabled,
    readonly: editorReadOnly
  });
  return {
    gridEditItemProps,
    editorProps
  };
}

export { useRowEdit };
