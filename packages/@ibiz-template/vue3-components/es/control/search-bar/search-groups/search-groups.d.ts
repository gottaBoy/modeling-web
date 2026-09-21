import { PropType } from 'vue';
import { IBackendSearchBarGroup, SearchBarController } from '@ibiz-template/runtime';
import './search-groups.scss';
export declare const SearchGroups: import("vue").DefineComponent<{
    controller: {
        type: PropType<SearchBarController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: SearchBarController;
    showGroups: import("vue").ComputedRef<IBackendSearchBarGroup[]>;
    hiddenGroups: import("vue").ComputedRef<IBackendSearchBarGroup[]>;
    onGroupClick: (item: IBackendSearchBarGroup) => void;
    newDialogVisible: import("vue").Ref<boolean>;
    editDialogVisible: import("vue").Ref<boolean>;
    manageDialogVisible: import("vue").Ref<boolean>;
    newGroup: () => void;
    manageGroup: () => void;
    newForm: IData;
    newFormRef: import("vue").Ref<IData>;
    newFormRules: IData;
    handleNewFormSubmit: () => Promise<void>;
    handleNewFormCancel: () => void;
    editForm: IData;
    editFormRef: import("vue").Ref<IData>;
    editFormRules: IData;
    handleEditFormSubmit: () => Promise<void>;
    handleEditFormCancel: () => void;
    editGroup: (groupItem: IBackendSearchBarGroup) => void;
    removeGroup: (groupItem: IBackendSearchBarGroup) => void;
    isActiveMore: import("vue").ComputedRef<boolean>;
    onDragChange: (evt: IData) => Promise<void>;
    editLinkTitle: (groupItem: IBackendSearchBarGroup) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<SearchBarController>;
        required: true;
    };
}>>, {}, {}>;
