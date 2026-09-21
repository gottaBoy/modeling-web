'use strict';

var vue = require('vue');

"use strict";
function useAllEdit(props, _componentRef) {
  const c = props.controller;
  const disabled = vue.computed(() => {
    return props.row.editColStates[c.name].disabled;
  });
  const readonly = vue.computed(() => {
    return props.row.editColStates[c.name].readonly;
  });
  const editable = vue.computed(() => props.controller.treeGrid.state.rowEditOpen);
  const editorReadOnly = vue.computed(() => {
    return readonly.value || !editable.value;
  });
  const editorDisabled = vue.computed(() => {
    return editable.value && disabled.value;
  });
  const stopPropagation = vue.computed(() => {
    return editable.value;
  });
  const onBlur = () => {
    if (c.treeGrid.editSaveMode === "cell-blur") {
      c.treeGrid.save(props.row.data);
    }
  };
  const gridEditItemProps = vue.reactive({
    stopPropagation
  });
  const editorProps = vue.reactive({
    disabled: editorDisabled,
    readonly: editorReadOnly,
    onBlur
  });
  return {
    gridEditItemProps,
    editorProps
  };
}

exports.useAllEdit = useAllEdit;
