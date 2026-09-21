import { PropType } from 'vue';
import { IAppBIReport } from '@ibiz/model-core';
import { IAppBIDrillDetailData } from '../../interface';
declare const _default: import("vue").DefineComponent<{
    appViewId: {
        type: StringConstructor;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    data: {
        type: PropType<IAppBIDrillDetailData>;
        required: true;
    };
    reportModel: {
        type: PropType<IAppBIReport>;
        required: true;
    };
    config: {
        type: PropType<IAppBIReport>;
        required: true;
    };
    dynamicDataDic: {
        type: PropType<IData>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    caption: import("vue").Ref<string>;
    items: import("vue").Ref<{
        text?: string | undefined;
        name: string;
        value?: unknown;
        valueText?: string | undefined;
    }[]>;
    activeItems: import("vue").Ref<string[]>;
    activeText: import("vue").Ref<string>;
    customParams: import("vue").Ref<IParams>;
    isLoaded: import("vue").Ref<boolean>;
    handleClick: (item: {
        text?: string | undefined;
        name: string;
        value?: unknown;
        valueText?: string | undefined;
    }) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    appViewId: {
        type: StringConstructor;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    data: {
        type: PropType<IAppBIDrillDetailData>;
        required: true;
    };
    reportModel: {
        type: PropType<IAppBIReport>;
        required: true;
    };
    config: {
        type: PropType<IAppBIReport>;
        required: true;
    };
    dynamicDataDic: {
        type: PropType<IData>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
