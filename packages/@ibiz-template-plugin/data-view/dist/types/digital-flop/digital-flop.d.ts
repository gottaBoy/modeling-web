import { DigitalFlopController } from './digital-flop.controller';

export declare const DigitalFlop: import('vue').DefineComponent<{
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<DigitalFlopController>, undefined, undefined>;
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
    c: DigitalFlopController;
    curValue: import('vue').ComputedRef<string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<DigitalFlopController>, undefined, undefined>;
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
