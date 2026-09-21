'use strict';

var vue = require('vue');

"use strict";
function useEditGroup(c) {
  const editDialogVisible = vue.ref(false);
  const editForm = vue.reactive({
    caption: ""
  });
  const editFormRef = vue.ref();
  const editFormRules = vue.reactive({
    caption: [
      {
        required: true,
        message: ibiz.i18n.t("control.searchBar.searchGroups.groupValueRule"),
        trigger: "blur"
      }
    ]
  });
  const handleEditFormSubmit = async () => {
    if (editFormRef.value) {
      await editFormRef.value.validate(
        async (valid, _fields) => {
          if (valid) {
            if (c.currentEditGroup) {
              const res = await c.service.update(c.currentEditGroup.id, {
                caption: editForm.caption
              });
              if (res.ok) {
                const index = c.state.searchBarGroups.findIndex(
                  (item) => item.id === c.currentEditGroup.id
                );
                if (index !== -1) {
                  c.state.searchBarGroups[index].caption = editForm.caption;
                }
              }
            }
            ibiz.message.success(
              "".concat(ibiz.i18n.t("control.common.updateSuccess"), "\uFF01")
            );
            editDialogVisible.value = false;
          }
        }
      );
    }
  };
  const handleEditFormCancel = () => {
    editDialogVisible.value = false;
  };
  return {
    editDialogVisible,
    editForm,
    editFormRef,
    editFormRules,
    handleEditFormSubmit,
    handleEditFormCancel
  };
}

exports.useEditGroup = useEditGroup;
