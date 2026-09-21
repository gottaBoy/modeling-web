import { Ref } from 'vue';
import './ibiz-picker-select-view.scss';
import { IModalData, Modal } from '@ibiz-template/runtime';
import { PickerEditorController } from '../picker-editor.controller';
export declare const IBizPickerSelectView: import("vue").DefineComponent<{
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
    singleSelect: Ref<boolean>;
    keySet: Ref<string[]>;
    items: Ref<IData[]>;
    queryValue: Ref<string>;
    visible: Ref<boolean>;
    pickViewWidth: Ref<string>;
    context: Ref<IContext>;
    params: Ref<IData>;
    editorRef: Ref<any>;
    onInputChange: (e: IData) => void;
    triggerMenu: (show?: boolean) => void;
    onViewDataChange: (event: IData[]) => void;
    onClear: () => void;
    openLinkView: (e: MouseEvent) => Promise<void>;
    onSelectChange: (selects: string[]) => void;
    remoteMethod: (e: string) => void;
    onSelectionChange: (event: IModalData) => void;
    modal: Modal;
    onFocus: (e: IData) => void;
    onBlur: (e: IData) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
    valueText: import("vue").ComputedRef<string>;
    isEditable: Ref<boolean>;
    setEditable: (flag: boolean) => void;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
    onVisibleChange: (e: boolean) => void;
    showView: Ref<boolean>;
    selectedData: Ref<IData[]>;
    handleDropDownKeyDown: (e: KeyboardEvent) => void;
    arrow: () => JSX.Element;
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
