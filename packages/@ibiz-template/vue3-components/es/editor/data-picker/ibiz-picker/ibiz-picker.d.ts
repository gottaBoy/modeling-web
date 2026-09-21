import { Ref } from 'vue';
import './ibiz-picker.scss';
import { IAppDEUIActionGroupDetail } from '@ibiz/model-core';
import { PickerEditorController } from '../picker-editor.controller';
export declare const IBizPicker: import("vue").DefineComponent<{
    value: (ArrayConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<PickerEditorController>, undefined, undefined>;
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
    c: PickerEditorController;
    curValue: Ref<string | string[] | null>;
    valueText: import("vue").ComputedRef<string>;
    items: Ref<IData[]>;
    openPickUpView: (e: MouseEvent) => Promise<void>;
    openLinkView: (e: MouseEvent) => Promise<void>;
    onACSelect: (item: IData) => Promise<void>;
    onSearch: (query: string, cb?: ((_items: IData[]) => void) | undefined) => Promise<void>;
    editorRef: Ref<any>;
    onClear: () => void;
    onFocus: (e: IData) => void;
    onBlur: (e: IData) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
    closeCircle: number;
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
    value: (ArrayConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<PickerEditorController>, undefined, undefined>;
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
