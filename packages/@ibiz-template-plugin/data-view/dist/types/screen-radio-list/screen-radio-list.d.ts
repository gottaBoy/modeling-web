import { ScreenRadioListEditorController } from './screen-radio-list.controller';

export declare const ScreenRadioList: import('vue').DefineComponent<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<ScreenRadioListEditorController>, undefined, undefined>;
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
    timer: null;
    ns: import('@ibiz-template/core').Namespace;
    editorModel: import('@ibiz/model-core').ICodeListEditor;
    items: import('vue').Ref<readonly IData[], readonly IData[]>;
    valueText: import('vue').ComputedRef<any>;
    onSelectValueChange: (value: string | number) => void;
    editorRef: import('vue').Ref<any, any>;
    renderMode: string;
    isBtnRoundCorner: boolean;
    showFormDefaultContent: import('vue').ComputedRef<boolean>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<ScreenRadioListEditorController>, undefined, undefined>;
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
}>> & {
    onFocus?: ((_event?: IData | undefined) => any) | undefined;
    onBlur?: ((_event?: IData | undefined) => any) | undefined;
    onChange?: ((_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => any) | undefined;
    onEnter?: ((_event?: IData | undefined) => any) | undefined;
    onInfoTextChange?: ((_text: string) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    autoFocus: boolean;
}, {}>;
