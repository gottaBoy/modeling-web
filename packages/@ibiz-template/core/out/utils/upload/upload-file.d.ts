import { HttpResponse } from '../net/http-response';
export interface IUploadFile {
    name: string;
    uid: string;
    status: 'uploading' | 'finished' | 'fail' | 'cancel';
    percentage: number;
    response?: HttpResponse;
    error?: unknown;
}
export interface IUploadFileOpts {
    uploadUrl: string;
    /**
     * 接受的文件类型
     *
     * @author lxm
     * @date 2022-11-20 21:11:52
     * @type {string}
     */
    accept?: string;
    /**
     * 是否支持多选
     *
     * @author lxm
     * @date 2022-11-20 21:11:52
     * @type {Boolean}
     */
    multiple?: boolean;
    separate?: string;
    request?: (_files: File[]) => Promise<HttpResponse>;
    beforeUpload?: (_fileData: File[], _files: IUploadFile[]) => boolean;
    finish?: (_resultFiles: IUploadFile[]) => void;
    success?: (_resultFiles: IUploadFile[], _res: HttpResponse) => void;
    error?: (_resultFiles: IUploadFile[], _error: unknown) => void;
    progress?: (_files: IUploadFile[]) => void;
}
/**
 * 使用上传文件逻辑
 *
 * @author lxm
 * @date 2022-11-20 21:11:52
 * @export
 * @param {IUploadFileOpts} _opts
 * @returns {*}
 */
export declare function uploadFile(_opts: IUploadFileOpts): void;
//# sourceMappingURL=upload-file.d.ts.map