import { Ref } from 'vue';
import './ibiz-cascader.scss';
import { CascaderEditorController } from '../cascader-editor.controller';
export declare const IBizCascader: import("vue").DefineComponent<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<CascaderEditorController>, undefined, undefined>;
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
    c: CascaderEditorController;
    valueItems: Ref<IData[]>;
    editorStyle: string;
    filterable: boolean;
    separator: string;
    onBlur: (e: IData) => void;
    onFocus: (e: IData) => void;
    treeData: Ref<IData[]>;
    items: Ref<IData[]>;
    selectValue: Ref<string | string[] | string[][] | null>;
    treeSelectData: Ref<IData[]>;
    valueItemData: Ref<IData[]>;
    defaultCheckedKeys: Ref<string[]>;
    searchValue: Ref<string>;
    isLoaded: Ref<boolean>;
    getSize: () => "small" | "default" | "large";
    getIsLeaf: (data: IData, _node: IData) => boolean;
    getDisabled: (_data: IData, node: IData) => boolean;
    loadData: (node: IData, resolve: (_n: IData[]) => void) => Promise<void>;
    treeRef: Ref<IData | null>;
    handleTreeClear: () => void;
    handleRemoveTag: () => void;
    multiple: boolean;
    handleCascaderValueChange: () => void;
    editorRef: Ref<any>;
    valueText: import("vue").ComputedRef<any>;
    isEditable: Ref<boolean>;
    setEditable: (flag: boolean) => void;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
    handleKeyUp: (e: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<CascaderEditorController>, undefined, undefined>;
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
