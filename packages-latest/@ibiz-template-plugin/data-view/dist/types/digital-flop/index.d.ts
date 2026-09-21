export declare const IBizDigitalFlop: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    value: (ArrayConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./digital-flop.controller').DigitalFlopController>, undefined, undefined>;
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
    ns: Namespace;
    c: import('./digital-flop.controller').DigitalFlopController;
    curValue: import('vue').ComputedRef<string>;
    styles: import('vue').ComputedRef<{
        [x: number]: string;
    }>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (ArrayConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./digital-flop.controller').DigitalFlopController>, undefined, undefined>;
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
