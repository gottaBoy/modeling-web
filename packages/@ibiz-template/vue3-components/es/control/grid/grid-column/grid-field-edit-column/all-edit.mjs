import { computed, reactive } from 'vue';

"use strict";
function useAllEdit(props, _componentRef) {
  const c = props.controller;
  const disabled = computed(() => {
    return props.row.editColStates[c.fieldName].disabled;
  });
  const readonly = computed(() => {
    return props.row.editColStates[c.fieldName].readonly;
  });
  const editable = computed(() => props.controller.grid.state.rowEditOpen);
  const editorReadOnly = computed(() => {
    return readonly.value || !editable.value;
  });
  const editorDisabled = computed(() => {
    return editable.value && disabled.value;
  });
  const stopPropagation = computed(() => {
    return editable.value;
  });
  const onBlur = () => {
    if (c.grid.editSaveMode === "cell-blur") {
      c.grid.save(props.row.data);
    }
  };
  const gridEditItemProps = reactive({
    stopPropagation
  });
  const editorProps = reactive({
    disabled: editorDisabled,
    readonly: editorReadOnly,
    onBlur
  });
  return {
    gridEditItemProps,
    editorProps
  };
}

export { useAllEdit };
