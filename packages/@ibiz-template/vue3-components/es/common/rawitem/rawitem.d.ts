import { PropType, Ref } from 'vue';
import { IRawItemContainer } from '@ibiz/model-core';
import './rawitem.scss';
export declare const IBizRawItem: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: false;
    };
    content: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    rawItem: {
        type: PropType<IRawItemContainer>;
        required: false;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    rawItemText: Ref<string | number | IData>;
    playerParams: Ref<{
        id: string;
        path: string;
        mute: boolean;
        autoplay: boolean;
        replay: boolean;
        showcontrols: boolean;
    }>;
    dividerParams: Ref<{
        contentPosition: string;
        html: string;
    }>;
    alertParams: Ref<{
        type: string;
        title: string;
        closeabled: boolean;
        showIcon: boolean;
    }>;
    rawItemType: Ref<string>;
    rawItemContent: Ref<string | number | IData>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: false;
    };
    content: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    rawItem: {
        type: PropType<IRawItemContainer>;
        required: false;
    };
}>>, {}, {}>;
