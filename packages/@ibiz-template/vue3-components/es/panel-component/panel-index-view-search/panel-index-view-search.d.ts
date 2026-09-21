import { IPanelRawItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import './panel-index-view-search.scss';
export declare const PanelIndexViewSearch: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    isCollapse: import("vue").ComputedRef<any>;
    onInput: (value: string) => void;
    onSearch: () => Promise<void>;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    query: import("vue").Ref<string>;
    menuAlign: import("vue").ComputedRef<string>;
    onEnter: (event: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
