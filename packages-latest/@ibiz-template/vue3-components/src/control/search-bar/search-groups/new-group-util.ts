import { SearchBarController } from '@ibiz-template/runtime';
import { Ref, reactive, ref } from 'vue';

export function useNewGroup(c: SearchBarController): {
  newDialogVisible: Ref<boolean>;
  newForm: IData;
  newFormRef: Ref<IData>;
  newFormRules: IData;
  handleNewFormSubmit: () => Promise<void>;
  handleNewFormCancel: () => void;
} {
  // 新建
  const newDialogVisible = ref(false);

  // 新建分组表单数据
  const newForm = reactive({
    caption: '',
  });

  // 新建分组表单Ref
  const newFormRef = ref();

  // 新建分组表单规则
  const newFormRules = reactive({
    caption: [
      {
        required: true,
        message: ibiz.i18n.t('control.searchBar.searchGroups.groupValueRule'),
        trigger: 'blur',
      },
    ],
  });

  // 新建分组表单取消
  const handleNewFormCancel = () => {
    if (newFormRef.value) {
      newFormRef.value.resetFields();
    }
    newDialogVisible.value = false;
  };

  // 新建分组表单提交
  const handleNewFormSubmit = async () => {
    if (newFormRef.value) {
      await newFormRef.value.validate(
        async (valid: boolean, _fields: IData[]) => {
          if (valid) {
            const sameCaptionGroup = c.state.searchBarGroups.find(group => {
              return group.caption === newForm.caption;
            });
            if (sameCaptionGroup) {
              ibiz.message.error(
                ibiz.i18n.t('control.searchBar.searchGroups.errorMessage'),
              );
              return;
            }
            await c.service.create(newForm.caption);
            handleNewFormCancel();
            await c.initSearBarGroups();
            ibiz.message.success(
              `${ibiz.i18n.t('control.common.newSuccCreated')}！`,
            );
          }
        },
      );
    }
  };

  return {
    newDialogVisible,
    newForm,
    newFormRef,
    newFormRules,
    handleNewFormSubmit,
    handleNewFormCancel,
  };
}
