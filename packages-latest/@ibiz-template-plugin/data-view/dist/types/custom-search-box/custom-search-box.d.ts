import { CustomSearchBoxEditorController } from './custom-search-box.controller';

export declare const CustomSearchBox: import('vue').DefineComponent<{
    value: (ArrayConstructor | NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<CustomSearchBoxEditorController>, undefined, undefined>;
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
    c: CustomSearchBoxEditorController;
    ns: Namespace;
    searchValue: import('vue').Ref<string, string>;
    onSearch: () => void;
    handleKeyUp: (e: KeyboardEvent) => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: any) => boolean;
    focus: (_event?: any) => boolean;
    enter: (_event?: any) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: (ArrayConstructor | NumberConstructor | StringConstructor)[];
    controller: import('@ibiz-template/vue3-util').RequiredProp<import('vue').PropType<CustomSearchBoxEditorController>, undefined, undefined>;
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
}, {}>;
