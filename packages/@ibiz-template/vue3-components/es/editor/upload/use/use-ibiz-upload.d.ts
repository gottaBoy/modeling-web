import { Ref } from 'vue';
import { UploadEditorController } from '../upload-editor.controller';
export type FileInfo = {
    name: string;
    id: string;
    status?: 'uploading' | 'finished' | 'fail' | 'cancel';
    percentage?: number;
    url?: string;
    /**
     * 文件名（不带后缀）
     */
    fileName?: string;
    /**
     * 文件类型（拓展名）
     */
    fileExt?: string;
    /**
     * 是否是图片
     */
    isImage?: boolean;
};
/**
 * 格式化文件信息
 *
 * @author lxm
 * @date 2022-11-18 15:11:38
 * @param {FileInfo} file
 */
export declare function formatFileInfo(file: FileInfo, downloadUrl: string): FileInfo;
/**
 * 文件上传组件初始化，解析props并得到downloadUrl、uploadUrl、fileList
 *
 * @author lxm
 * @date 2022-11-21 10:11:01
 * @export
 * @param {{
 *   data: Ref<IData>;
 *   value: Ref<string>;
 *   controller: Ref<UploadEditorController>;
 * }} props
 * @returns {*}
 */
export declare function useIBizUploadInit(props: {
    data: Ref<IData>;
    value: Ref<string | undefined>;
    controller: Ref<UploadEditorController>;
}): {
    downloadUrl: Ref<string>;
    uploadUrl: Ref<string>;
    valueList: Ref<FileInfo[]>;
};
/**
 * 使用文件上传功能，传递外部已存在的文件集合，上传下载基础路径
 *
 * @author lxm
 * @date 2022-11-21 10:11:01
 * @export
 * @param {{
 *   downloadUrl: Ref<string>;
 *   uploadUrl: Ref<string>;
 *   value: Ref<
 *     {
 *       name: string;
 *       id: string;
 *       url?: string;
 *     }[]
 *   >;
 * }} opts
 * @returns {*}
 */
export declare function useIBizUpload(opts: {
    downloadUrl: Ref<string>;
    uploadUrl: Ref<string>;
    value: Ref<{
        name: string;
        id: string;
        url?: string;
    }[]>;
    multiple?: boolean;
    accept?: string;
}): {
    selectFile: () => void;
    fileList: Ref<{
        name: string;
        id: string;
        status?: 'uploading' | 'finished' | 'fail' | 'cancel' | undefined;
        percentage?: number | undefined;
        url?: string | undefined;
        fileName?: string | undefined;
        fileExt?: string | undefined;
        isImage?: boolean | undefined;
    }[]>;
    uploadState: Ref<'loading' | 'undo' | 'done'>;
};
export declare function openImagePreview(file: FileInfo): Promise<void>;
