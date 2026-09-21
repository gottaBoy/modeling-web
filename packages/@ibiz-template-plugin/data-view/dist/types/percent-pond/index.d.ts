export declare const IBizPercentPond: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./percent-pond.controller').PercentPondController>, undefined, undefined>;
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
    useCover: () => string;
    total: import('vue').Ref<number, number>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./percent-pond.controller').PercentPondController>, undefined, undefined>;
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
}, {}>>;
