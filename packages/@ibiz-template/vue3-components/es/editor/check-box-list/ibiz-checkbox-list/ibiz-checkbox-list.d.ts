import { CheckBoxListEditorController } from '../checkbox-list-editor.controller';
import './ibiz-checkbox-list.scss';
export declare const IBizCheckboxList: import("vue").DefineComponent<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<CheckBoxListEditorController>, undefined, undefined>;
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
    selectArray: import("vue").WritableComputedRef<(string | number)[]>;
    valueText: import("vue").ComputedRef<string>;
    editorRef: import("vue").Ref<any>;
    onSelectArrayChange: (value: Array<string | number>) => void;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: (StringConstructor | NumberConstructor)[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<CheckBoxListEditorController>, undefined, undefined>;
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
