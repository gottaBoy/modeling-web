import { ScreenRealTimeController } from './screen-real-time.controller';

export declare const ScreenRealTime: import('vue').DefineComponent<{
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<ScreenRealTimeController>, undefined, undefined>;
    data: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    c: ScreenRealTimeController;
    leftText: import('vue').Ref<string, string>;
    week: import('vue').Ref<string, string>;
    rightText: import('vue').Ref<string, string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<ScreenRealTimeController>, undefined, undefined>;
    data: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
}>>, {
    disabled: boolean;
    readonly: boolean;
    autoFocus: boolean;
}, {}>;
