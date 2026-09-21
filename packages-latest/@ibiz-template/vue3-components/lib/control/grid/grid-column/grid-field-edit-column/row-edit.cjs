'use strict';

var vue = require('vue');

"use strict";
function useRowEdit(props, _componentRef) {
  const c = props.controller;
  const disabled = vue.computed(() => {
    return props.row.editColStates[c.fieldName].disabled;
  });
  const readonly = vue.computed(() => {
    return props.row.editColStates[c.fieldName].readonly;
  });
  const editable = vue.computed(
    () => props.row.editColStates[c.fieldName].editable
  );
  const editorReadOnly = vue.computed(() => {
    return readonly.value || !editable.value;
  });
  const editorDisabled = vue.computed(() => {
    return editable.value && disabled.value;
  });
  const stopPropagation = vue.computed(() => {
    return editable.value;
  });
  const gridEditItemProps = vue.reactive({
    stopPropagation
  });
  const editorProps = vue.reactive({
    disabled: editorDisabled,
    readonly: editorReadOnly
  });
  return {
    gridEditItemProps,
    editorProps,
    editable
  };
}

exports.useRowEdit = useRowEdit;
