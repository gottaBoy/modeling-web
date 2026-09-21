import { SearchBarController } from '@ibiz-template/runtime';
import { Ref, reactive, ref } from 'vue';

export function useEditGroup(c: SearchBarController): {
  editDialogVisible: Ref<boolean>;
  editForm: IData;
  editFormRef: Ref<IData>;
  editFormRules: IData;
  handleEditFormSubmit: () => Promise<void>;
  handleEditFormCancel: () => void;
} {
  // 编辑
  const editDialogVisible = ref(false);

  // 编辑分组表单数据
  const editForm = reactive({
    caption: '',
  });

  // 编辑分组表单Ref
  const editFormRef = ref();

  // 编辑分组表单规则
  const editFormRules = reactive({
    caption: [
      {
        required: true,
        message: ibiz.i18n.t('control.searchBar.searchGroups.groupValueRule'),
        trigger: 'blur',
      },
    ],
  });

  // 编辑分组表单提交
  const handleEditFormSubmit = async () => {
    if (editFormRef.value) {
      await editFormRef.value.validate(
        async (valid: boolean, _fields: IData[]) => {
          if (valid) {
            if (c.currentEditGroup) {
              const res = await c.service.update(c.currentEditGroup.id!, {
                caption: editForm.caption,
              });
              if (res.ok) {
                // 更改UI上的caption
                const index = c.state.searchBarGroups.findIndex(
                  item => item.id === c.currentEditGroup!.id,
                );
                if (index !== -1) {
                  c.state.searchBarGroups[index].caption = editForm.caption;
                }
              }
            }
            ibiz.message.success(
              `${ibiz.i18n.t('control.common.updateSuccess')}！`,
            );
            editDialogVisible.value = false;
          }
        },
      );
    }
  };

  // 编辑分组表单取消
  const handleEditFormCancel = () => {
    editDialogVisible.value = false;
  };

  return {
    editDialogVisible,
    editForm,
    editFormRef,
    editFormRules,
    handleEditFormSubmit,
    handleEditFormCancel,
  };
}
