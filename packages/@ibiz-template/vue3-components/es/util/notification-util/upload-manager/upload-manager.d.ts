import { Ref, PropType } from 'vue';
import { IUploadManagerParams } from '@ibiz-template/runtime';
import './upload-manager.scss';
interface IFile {
    /**
     * 文件
     *
     * @type {File}
     */
    file: File;
    /**
     * 状态
     *
     * (未上传 | 已上传 | 上传失败)
     * @type {(10 | 20 | 30)}
     */
    status: 10 | 20 | 30;
    /**
     * 进度
     *
     * @type {number}
     */
    progress: number;
    /**
     * 状态文本
     *
     * @type {string}
     */
    statusText?: string;
    /**
     * 响应数据
     *
     * @type {IData}
     * @memberof IFile
     */
    data?: IData;
}
export declare const IBizUploadManager: import("vue").DefineComponent<{
    params: {
        type: PropType<IUploadManagerParams>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    fileList: Ref<IFile[]>;
    uploading: import("vue").ComputedRef<boolean>;
    progress: import("vue").ComputedRef<number>;
    uploadStatus: import("vue").ComputedRef<boolean>;
    showFileList: Ref<boolean>;
    onClose: () => void;
    onChangeShowFileList: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
    uploadComplete: (_data: IData[]) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    params: {
        type: PropType<IUploadManagerParams>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
    onUploadComplete?: ((_data: IData[]) => any) | undefined;
}, {}, {}>;
export {};
