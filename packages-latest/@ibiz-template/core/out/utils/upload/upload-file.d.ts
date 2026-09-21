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
     * @description 接受的文件类型
     * @type {string}
     * @memberof IUploadFileOpts
     */
    accept?: string;
    /**
     * @description 是否支持多选
     * @type {boolean}
     * @memberof IUploadFileOpts
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
 * @description 上传文件
 * @export
 * @param {IUploadFileOpts} _opts
 */
export declare function uploadFile(_opts: IUploadFileOpts): void;
//# sourceMappingURL=upload-file.d.ts.map