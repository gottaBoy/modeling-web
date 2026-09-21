import { PropType } from 'vue';
export declare const BIAggmodeSelect: import("vue").DefineComponent<{
    item: {
        type: PropType<IData>;
        required: true;
    };
    value: {
        type: StringConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    aggModeList: {
        name: string;
        value: string;
    }[];
    aggmodeVisible: import("vue").Ref<boolean>;
    handleClick: (event: MouseEvent) => void;
    aggModeClick: (value: string, event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<IData>;
        required: true;
    };
    value: {
        type: StringConstructor;
    };
}>>, {}, {}>;
