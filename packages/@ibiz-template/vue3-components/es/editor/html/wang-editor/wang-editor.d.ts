import { Ref } from 'vue';
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import type { IDomEditor } from '@wangeditor/editor';
import { HtmlEditorController } from '../html-editor.controller';
import './wang-editor.scss';
declare const IBizHtml: import("vue").DefineComponent<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<HtmlEditorController>, undefined, undefined>;
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
    editorRef: import("vue").ShallowRef<any>;
    mode: string;
    valueHtml: Ref<string>;
    toolbarConfig: Partial<IToolbarConfig>;
    editorConfig: Partial<IEditorConfig>;
    handleCreated: (editor: IDomEditor) => void;
    handleChange: (editor: IDomEditor) => void;
    handleDestroyed: (_editor: IDomEditor) => void;
    handleFocus: (_editor: IDomEditor) => void;
    handleBlur: (_editor: IDomEditor) => void;
    customAlert: (info: string, type: string) => void;
    customPaste: (editor: IDomEditor, event: ClipboardEvent, callback: (_n: boolean) => void) => void;
    insertText: (str: string) => void;
    printHtml: () => void;
    disable: () => void;
    enable: () => void;
    renderHeaserToolbar: () => JSX.Element | null;
    renderEditorContent: () => JSX.Element;
    renderFooter: () => JSX.Element | null;
    htmlContent: Ref<any>;
    hasEnableEdit: Ref<boolean>;
    cssVars: Ref<{}>;
    toolbarRef: Ref<any>;
    isFullScreen: Ref<boolean>;
    readonlyState: Ref<boolean>;
    changeFullScreenState: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<HtmlEditorController>, undefined, undefined>;
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
export default IBizHtml;
