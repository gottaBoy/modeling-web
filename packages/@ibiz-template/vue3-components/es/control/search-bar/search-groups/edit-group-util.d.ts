import { SearchBarController } from '@ibiz-template/runtime';
import { Ref } from 'vue';
export declare function useEditGroup(c: SearchBarController): {
    editDialogVisible: Ref<boolean>;
    editForm: IData;
    editFormRef: Ref<IData>;
    editFormRules: IData;
    handleEditFormSubmit: () => Promise<void>;
    handleEditFormCancel: () => void;
};
