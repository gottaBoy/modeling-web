import { SearchBarController } from '@ibiz-template/runtime';
import { Ref } from 'vue';
export declare function useNewGroup(c: SearchBarController): {
    newDialogVisible: Ref<boolean>;
    newForm: IData;
    newFormRef: Ref<IData>;
    newFormRules: IData;
    handleNewFormSubmit: () => Promise<void>;
    handleNewFormCancel: () => void;
};
