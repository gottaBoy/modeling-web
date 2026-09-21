import { Ref } from 'vue';
import './ibiz-autocomplete.scss';
import { IAppDEUIActionGroupDetail } from '@ibiz/model-core';
import { AutoCompleteEditorController } from '../autocomplete-editor.controller';
export declare const IBizAutoComplete: import("vue").DefineComponent<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<AutoCompleteEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
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
    ns: import("@ibiz-template/core").Namespace;
    c: AutoCompleteEditorController;
    curValue: Ref<string | string[] | null>;
    triggerOnFocus: import("vue").ComputedRef<boolean>;
    autoCompleteClearable: import("vue").ComputedRef<boolean>;
    onSearch: (query: string, cb?: ((_items: IData[]) => void) | undefined) => Promise<void>;
    onClear: () => void;
    onFocus: (e: IData) => void;
    onBlur: (e: IData) => void;
    onACSelect: (item: IData) => Promise<void>;
    items: Ref<IData[]>;
    handleInput: (val: string | number) => void;
    isDebounce: boolean;
    handleKeyUp: (e: KeyboardEvent) => void;
    editorRef: Ref<any>;
    isEditable: Ref<boolean>;
    isReverse: Ref<boolean>;
    setEditable: (flag: boolean) => void;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
    renderActionItem: (detail: IAppDEUIActionGroupDetail) => JSX.Element | undefined;
    renderEmpty: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<AutoCompleteEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
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
