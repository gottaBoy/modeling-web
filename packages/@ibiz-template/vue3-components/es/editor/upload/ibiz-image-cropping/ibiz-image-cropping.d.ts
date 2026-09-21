import { Ref } from 'vue';
import './ibiz-image-cropping.scss';
import { UploadEditorController } from '../upload-editor.controller';
export declare const IBizImageCropping: import("vue").DefineComponent<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<UploadEditorController>, undefined, undefined>;
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
    c: UploadEditorController;
    files: Ref<{
        id: string;
        name: string;
        url?: string | undefined;
        base64?: string | undefined;
    }[]>;
    limit: import("vue").ComputedRef<1 | 9999>;
    headers: Ref<IData>;
    uploadUrl: Ref<string>;
    dialogImageUrl: Ref<string[]>;
    dialogVisible: Ref<boolean>;
    noUploadIcon: import("vue").ComputedRef<boolean>;
    beforeUpload: (rawFile: import("element-plus").UploadRawFile) => boolean;
    onSuccess: (response: IData) => void;
    onError: (...args: IData[]) => never;
    onRemove: (file: IData) => void;
    onDownload: (file: IData) => void;
    onDialogVisibleChange: (value: boolean) => void;
    onPreview: (file: IData) => void;
    componentRef: Ref<any>;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
    dialogImageUrlIndex: Ref<number>;
    cropVisible: Ref<boolean>;
    tempFileList: Ref<IData | undefined>;
    imageUpload: Ref<any>;
    cropRect: IData;
    onChange: (file: IData) => void;
    cropDialogClose: () => void;
    cropChange: (url: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<UploadEditorController>, undefined, undefined>;
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
