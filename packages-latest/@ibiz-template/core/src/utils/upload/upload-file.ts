/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { cloneDeep, isFunction, merge, round, uniqueId } from 'lodash-es';
import { RuntimeError } from '../../error';
import { HttpResponse } from '../net/http-response';
import { selectFile } from './select-file';

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
export function uploadFile(_opts: IUploadFileOpts): void {
  const opts: Required<IUploadFileOpts> = merge(
    {
      multiple: true,
      accept: '',
      separate: true,
      beforeUpload: (_fileData: File[], _files: IUploadFile[]) => true,
      finish: (_resultFiles: IUploadFile[]) => {},
      success: (_resultFiles: IUploadFile[], _res: HttpResponse) => {},
      error: (_resultFiles: IUploadFile[], _error: unknown) => {},
      progress: (_files: IUploadFile[]) => {},
    },
    _opts,
  );

  /**
   * @description 进度条回调
   * @param {IParams} event
   * @param {IUploadFile[]} files
   */
  const onUploadProgress = (event: IParams, files: IUploadFile[]): void => {
    files.forEach(file => {
      file.percentage = round(event.progress * 100);
    });
    opts.progress(cloneDeep(files));
  };

  /**
   * @description 上传请求方法，返回响应对象
   * @param {File[]} files
   * @param {(_event: IParams) => void} _onProgress
   * @returns {*}  {Promise<HttpResponse>}
   */
  const uploadRequest = async (
    files: File[],
    _onProgress: (_event: IParams) => void,
  ): Promise<HttpResponse> => {
    // 自定义上传请求
    if (opts.request && isFunction(opts.request)) {
      return opts.request(files);
    }

    // 默认每次单个文件上传，可能存在接口一次上传多个文件,
    const data = new FormData();
    files.forEach(file => {
      data.append('file', file);
    });
    // const res = await ibiz.net.request(opts.uploadUrl, {
    //   method: 'post',
    //   baseURL: '',
    //   data,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   onUploadProgress: onProgress,
    // });
    // return res;
    throw new RuntimeError(ibiz.i18n.t('core.utils.multiApplicationMode'));
  };

  /**
   * @description 执行一次上传，可能是一个文件也可能是多个文件
   * @param {File[]} files
   * @returns {*}  {Promise<IUploadFile[]>}
   */
  const executeSingleUpload = async (files: File[]): Promise<IUploadFile[]> => {
    const resultFiles: IUploadFile[] = files.map(file => {
      return {
        status: 'uploading',
        name: file.name,
        uid: uniqueId(),
        percentage: 0,
      };
    });

    // 上传前回调，可以取消此次下载
    const pass = opts.beforeUpload(files, resultFiles);
    if (!pass) {
      resultFiles.forEach(file => {
        file.status = 'cancel';
      });
      ibiz.log.debug('取消上传', resultFiles);
      return resultFiles;
    }

    try {
      const res = await uploadRequest(files, event => {
        onUploadProgress(event, resultFiles);
      });
      resultFiles.forEach(file => {
        file.status = 'finished';
      });
      // 上传成功事件
      opts.success(resultFiles, res);
      resultFiles.forEach(file => {
        file.response = res;
      });
    } catch (error) {
      resultFiles.forEach(file => {
        file.status = 'fail';
      });
      // 上传失败事件
      opts.error(resultFiles, error);
      resultFiles.forEach(file => {
        file.error = error;
      });
      ibiz.log.error(error);
      ibiz.log.error(
        ibiz.i18n.t('core.utils.uploadFailed', {
          file: files.map(file => file.name).join(','),
        }),
      );
    }
    return resultFiles;
  };

  /**
   * @description 执行上传文件逻辑
   * @param {File[]} files
   * @returns {*}  {Promise<void>}
   */
  const uploadFiles = async (files: File[]): Promise<void> => {
    const uploadSequence = opts.separate ? files.map(file => [file]) : [files];
    const res = await Promise.allSettled(
      uploadSequence.map(async sequence => {
        return executeSingleUpload(sequence);
      }),
    );

    // 整合所有的返回文件
    const resultFiles: IUploadFile[] = [];
    res.forEach(result => {
      if (result.status === 'fulfilled') {
        resultFiles.push(...result.value);
      }
    });

    opts.finish(resultFiles);
  };

  const select = (): void => {
    selectFile({
      accept: opts.accept,
      multiple: opts.multiple,
      onSelected: files => {
        uploadFiles(files);
      },
    });
  };

  select();
}
