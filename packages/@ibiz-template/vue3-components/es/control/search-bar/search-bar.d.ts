import { PropType } from 'vue';
import { ISearchBar, ISearchBarGroup } from '@ibiz/model-core';
import './search-bar.scss';
import { IControlProvider, SearchBarController } from '@ibiz-template/runtime';
export declare const SearchBarControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<ISearchBar>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}, {
    c: SearchBarController;
    ns: import("@ibiz-template/core").Namespace;
    cssVars: import("vue").ComputedRef<Record<string, string>>;
    filterButtonRef: import("vue").Ref<any>;
    onClear: () => void;
    onSearch: () => void;
    onKeydown: (e: KeyboardEvent) => void;
    onGroupClick: (item: ISearchBarGroup) => void;
    triggerFilter: () => void;
    handleSave: () => void;
    renderAdvancedSearch: () => JSX.Element | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<ISearchBar>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>;
