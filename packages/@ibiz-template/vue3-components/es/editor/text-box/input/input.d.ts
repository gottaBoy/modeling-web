import { TextBoxEditorController } from '../text-box-editor.controller';
import './input.scss';
export declare const IBizInput: import("vue").DefineComponent<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<TextBoxEditorController>, undefined, undefined>;
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
    c: TextBoxEditorController;
    ns: import("@ibiz-template/core").Namespace;
    rows: import("vue").Ref<number>;
    type: import("vue").ComputedRef<"textarea" | "string" | "text" | "password">;
    items: import("vue").Ref<readonly {
        value: string | number;
        text: string;
        id: string;
        color?: string | undefined;
        bkcolor?: string | undefined;
        children?: any[] | undefined;
        textCls?: string | undefined;
        cls?: string | undefined;
        disableSelect?: boolean | undefined;
        sysImage?: {
            codeName?: string | undefined;
            cssClass?: string | undefined;
            cssClassX?: string | undefined;
            glyph?: string | undefined;
            height?: number | undefined;
            imagePath?: string | undefined;
            imagePathX?: string | undefined;
            rawContent?: string | undefined;
            width?: number | undefined;
            appId: string;
            id?: string | undefined;
            name?: string | undefined;
            userParam?: Record<string, string> | undefined;
            modelId?: string | undefined;
            modelType?: string | undefined;
        } | undefined;
        data?: IData | undefined;
        tooltip?: string | undefined;
        userData?: string | undefined;
        beginValue?: number | undefined;
        endValue?: number | undefined;
        includeBeginValue?: boolean | undefined;
        includeEndValue?: boolean | undefined;
    }[]>;
    currentVal: import("vue").Ref<string>;
    readonlyText: import("vue").ComputedRef<string>;
    handleChange: (val: string | number) => void;
    handleInput: (val: string | number) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
    onBlur: (event: IData) => void;
    onFocus: (e: IData) => void;
    editorRef: import("vue").Ref<any>;
    onClick: () => Promise<void>;
    shouldAutoComplete: import("vue").ComputedRef<"on" | "new-password">;
    isEditable: import("vue").Ref<boolean>;
    setEditable: (flag: boolean) => void;
    showLimit: import("vue").Ref<boolean>;
    isAuto: import("vue").Ref<boolean>;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
    currentFormatVal: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<TextBoxEditorController>, undefined, undefined>;
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
