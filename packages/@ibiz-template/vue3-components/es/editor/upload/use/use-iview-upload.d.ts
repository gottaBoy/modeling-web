import { UploadRawFile } from 'element-plus';
import { ComputedRef, Ref } from 'vue';
import { UploadEditorController } from '../upload-editor.controller';
/**
 * iview的Upload适配逻辑
 *
 * @author lxm
 * @date 2022-11-17 16:11:12
 * @export
 * @param {IParams} props
 * @param {(_value: string | null) => {}} valueChange
 * @param {UploadEditorController} c
 * @returns {*}
 */
export declare function useIViewUpload(props: IParams, valueChange: (_value: string | null) => void, c: UploadEditorController): {
    uploadUrl: Ref<string>;
    downloadUrl: Ref<string>;
    headers: Ref<IData>;
    files: Ref<{
        id: string;
        name: string;
        url?: string | undefined;
        base64?: string | undefined;
    }[]>;
    limit: ComputedRef<1 | 9999>;
    onDownload: (file: IData) => void;
    onError: (...args: IData[]) => never;
    onRemove: (file: IData) => void;
    onSuccess: (response: IData) => void;
    beforeUpload: (rawFile: UploadRawFile) => boolean;
};
