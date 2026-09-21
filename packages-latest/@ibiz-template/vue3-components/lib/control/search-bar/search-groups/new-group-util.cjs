'use strict';

var vue = require('vue');

"use strict";
function useNewGroup(c) {
  const newDialogVisible = vue.ref(false);
  const newForm = vue.reactive({
    caption: ""
  });
  const newFormRef = vue.ref();
  const newFormRules = vue.reactive({
    caption: [
      {
        required: true,
        message: ibiz.i18n.t("control.searchBar.searchGroups.groupValueRule"),
        trigger: "blur"
      }
    ]
  });
  const handleNewFormCancel = () => {
    if (newFormRef.value) {
      newFormRef.value.resetFields();
    }
    newDialogVisible.value = false;
  };
  const handleNewFormSubmit = async () => {
    if (newFormRef.value) {
      await newFormRef.value.validate(
        async (valid, _fields) => {
          if (valid) {
            const sameCaptionGroup = c.state.searchBarGroups.find((group) => {
              return group.caption === newForm.caption;
            });
            if (sameCaptionGroup) {
              ibiz.message.error(
                ibiz.i18n.t("control.searchBar.searchGroups.errorMessage")
              );
              return;
            }
            await c.service.create(newForm.caption);
            handleNewFormCancel();
            await c.initSearBarGroups();
            ibiz.message.success(
              "".concat(ibiz.i18n.t("control.common.newSuccCreated"), "\uFF01")
            );
          }
        }
      );
    }
  };
  return {
    newDialogVisible,
    newForm,
    newFormRef,
    newFormRules,
    handleNewFormSubmit,
    handleNewFormCancel
  };
}

exports.useNewGroup = useNewGroup;
