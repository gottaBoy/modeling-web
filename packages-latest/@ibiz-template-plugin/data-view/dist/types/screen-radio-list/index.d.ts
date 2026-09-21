export declare const IBizScreenRadioList: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    value: (NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./screen-radio-list.controller').ScreenRadioListEditorController>, undefined, undefined>;
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
    ns: Namespace;
    c: import('./screen-radio-list.controller').ScreenRadioListEditorController;
    editorModel: import('@ibiz/model-core').ICodeListEditor;
    items: import('vue').Ref<readonly any[], readonly any[] | readonly IData[]>;
    valueText: import('vue').ComputedRef<any>;
    onSelectValueChange: (value: string | number) => void;
    editorRef: import('vue').Ref<any, any>;
    showFormDefaultContent: import('vue').ComputedRef<boolean>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: any) => boolean;
    focus: (_event?: any) => boolean;
    enter: (_event?: any) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<import('./screen-radio-list.controller').ScreenRadioListEditorController>, undefined, undefined>;
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
    onFocus?: ((_event?: any) => any) | undefined;
    onBlur?: ((_event?: any) => any) | undefined;
    onChange?: ((_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => any) | undefined;
    onEnter?: ((_event?: any) => any) | undefined;
    onInfoTextChange?: ((_text: string) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    autoFocus: boolean;
}, {}>>;
