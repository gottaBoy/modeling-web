import { IQuickSearchItem, SearchBarController } from '@ibiz-template/runtime';
import './quick-search-select.scss';
export declare const QuickSearchSelect: import("vue").DefineComponent<{
    controller: {
        type: typeof SearchBarController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onItemClick: (item: IQuickSearchItem) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof SearchBarController;
        required: true;
    };
}>>, {}, {}>;
