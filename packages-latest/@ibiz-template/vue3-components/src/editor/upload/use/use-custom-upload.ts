/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadProgressEvent } from 'element-plus';
import { RuntimeError } from '@ibiz-template/core';
import { isNil, isString } from 'lodash-es';
import { ref, Ref } from 'vue';
import { UploadEditorController } from '../upload-editor.controller';
import { getRelativePathWithoutRoot } from '../../../util';

/**
 *  自定义事件对象接口
 */
interface CustomActionEmits {
  customAction: [{ tag: string; data: IData[] }];
  [key: string]: any[];
}
/**
 *  自定义事件函数接口
 */
type EmitFn<T extends Record<string, any[]> = CustomActionEmits> = <
  K extends keyof T,
>(
  event: K,
  ...args: T[K]
) => void;

/**
 * 上传错误
 */
export class UploadAjaxError extends Error {
  name = 'UploadAjaxError';

  status: number;

  method: string;

  url: string;

  constructor(message: string, status: number, method: string, url: string) {
    super(message);
    this.status = status;
    this.method = method;
    this.url = url;
  }
}

/**
 * 上传文件
 */
export interface UploadRawFile extends File {
  uid: number;
  path: string;
}

/**
 * 上传参数
 */
export interface UploadRequestOptions {
  action: string;
  method: string;
  data: Record<string, string | Blob | [string | Blob, string]>;
  filename: string;
  file: UploadRawFile;
  headers: Headers | Record<string, string | number | null | undefined>;
  onError: (evt: UploadAjaxError) => void;
  onProgress: (evt: UploadProgressEvent) => void;
  onSuccess: (response: any) => void;
  withCredentials: boolean;
}

/**
 * 获取上传错误
 */
export function getError(
  action: string,
  option: UploadRequestOptions,
  xhr: XMLHttpRequest,
): UploadAjaxError {
  let msg: string;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${option.method} ${action} ${xhr.status}`;
  }

  return new UploadAjaxError(msg, xhr.status, option.method, action);
}

/**
 * 获取响应体内容
 */
export function getBody(xhr: XMLHttpRequest): XMLHttpRequestResponseType {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

let fileId = 1;
export const genFileId = (): number => Date.now() + 3600000 + fileId++;

/**
 * 自定义上传
 */
export function useCustomUpload(
  c: UploadEditorController,
  options: IData,
  emit?: EmitFn,
): {
  customUpload: (option: any) => XMLHttpRequest;
  folderInputRef: Ref<HTMLInputElement | null>;
  selectFolder: () => void;
  handleFolderSelect: (event: Event) => void;
} {
  // 自定义上传
  const customUpload = (option: any): XMLHttpRequest => {
    if (typeof XMLHttpRequest === 'undefined')
      throw new RuntimeError('XMLHttpRequest is undefined');

    const xhr = new XMLHttpRequest();
    const action = option.action;

    if (xhr.upload && option.onProgress) {
      xhr.upload.addEventListener('progress', evt => {
        const progressEvt = evt as UploadProgressEvent;
        progressEvt.percent =
          evt.total > 0 ? (evt.loaded / evt.total) * 100 : 0;
        option.onProgress(progressEvt);
      });
    }

    const formData = new FormData();
    if (option.data) {
      for (const [key, value] of Object.entries(option.data)) {
        if (Array.isArray(value)) {
          if (
            value.length === 2 &&
            value[0] instanceof Blob &&
            isString(value[1])
          ) {
            formData.append(key, value[0], value[1]);
          } else {
            value.forEach(item => {
              formData.append(key, item);
            });
          }
        } else formData.append(key, value as any);
      }
    }
    formData.append(option.filename, option.file, option.file.name);

    // 开启压缩文件类解压额外送参unzip为true
    if (c.unzip && c.unzipfileext) {
      const fileName = option.file.name;
      const fileExt = fileName.substring(fileName.lastIndexOf('.'));
      if (c.unzipfileext.indexOf(fileExt) !== -1) {
        formData.append('unzip', 'true');
      }
    }

    xhr.addEventListener('error', () => {
      if (option.onError) {
        option.onError(getError(action, option, xhr));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }
      // 文件夹上传时，将文件的原始目录路径注入响应对象，供下游onSuccess回调使用
      // 仅在非数组（压缩文件上传返回数组格式）响应且后端未返回path时注入，避免覆盖后端数据
      const result = getBody(xhr) as unknown as IData | Array<IData>;
      if (
        !Array.isArray(result) &&
        !result.path &&
        option.file &&
        option.file.path
      ) {
        result.path = option.file.path;
      }
      option.onSuccess(result);
    });

    xhr.open(option.method, action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    const tempheaders: IData = option.headers || {};
    if (tempheaders instanceof Headers) {
      tempheaders.forEach((value, key) => xhr.setRequestHeader(key, value));
    } else {
      for (const [key, value] of Object.entries(tempheaders)) {
        if (isNil(value)) continue;
        xhr.setRequestHeader(key, String(value));
      }
    }
    xhr.send(formData);
    return xhr;
  };

  // 文件输入框的引用
  const folderInputRef = ref<HTMLInputElement | null>(null);

  // 触发文件选择框
  const selectFolder = (): void => {
    folderInputRef.value?.click();
  };

  // 处理文件选择事件
  const handleFolderSelect = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    let files = Array.from(target.files);
    // 忽略隐藏文件，基于根目录相对路径和配置的正则进行匹配
    if (c.hiddenFileRegex) {
      let regex: RegExp | null = null;
      try {
        regex = new RegExp(c.hiddenFileRegex);
      } catch {
        ibiz.log.warn(`hiddenFileRegex invalid: ${c.hiddenFileRegex}`);
      }
      if (regex) {
        const filterRegex = regex;
        files = files.filter(file => {
          const rawFile = file as UploadRawFile;
          const relativePathWithoutRoot = getRelativePathWithoutRoot(
            rawFile.webkitRelativePath,
          );
          return !filterRegex.test(relativePathWithoutRoot);
        });
      }
    }

    const promises: Promise<{
      status: 'ok' | 'err';
      data: IData;
      rawFile?: UploadRawFile;
    }>[] = [];

    for (const file of files) {
      const rawFile = file as UploadRawFile;
      rawFile.uid = genFileId();
      rawFile.path = file.webkitRelativePath;

      // 文件夹上传绕过 beforeUpload 钩子，需要手动补偿缓存计数
      if (options.addCacheCount) {
        options.addCacheCount();
      }

      // 每个文件创建一个 Promise，XHR 完成时仅 resolve，不立即触发外部回调
      // 成功失败都用 resolve，避免 Promise.all 短路
      const promise = new Promise<{
        status: 'ok' | 'err';
        data: IData;
        rawFile?: UploadRawFile;
      }>(resolve => {
        const tempOption = {
          file: rawFile,
          filename: 'file',
          method: 'post',
          ...options,
          onSuccess: (response: IData): void =>
            resolve({ status: 'ok', data: response }),
          onError: (error: any): void =>
            resolve({ status: 'err', data: error, rawFile }),
        };
        customUpload(tempOption);
      });
      promises.push(promise);
    }
    emit?.('customAction', { tag: 'beforeUpload', data: [...files] });

    // 等所有文件上传完成后，按结果合并回调
    Promise.all(promises).then(results => {
      const successes: IData[] = [];
      const errors: IData[] = [];
      for (const result of results) {
        if (result.status === 'ok') {
          successes.push(result);
        } else {
          errors.push(result);
        }
      }

      const totalCount = files.length;
      // 补偿缓存计数：addCacheCount 加了 N 次，需要扣除 N-1 次，剩余1 次由onError/onSuccess 减掉
      if (options.drainCacheCount && totalCount > 1) {
        options.drainCacheCount(totalCount - 1);
      }

      if (errors.length > 0) {
        // 任意失败：只调一次 onError，传入第一个失败数据，不调 onSuccess
        const firstError = errors[0];
        options.onError?.(firstError.data, firstError.rawFile);
      } else {
        // 全部成功：只调一次 onSuccess，传入所有成功数据数组
        const successData = successes.map(item => item.data);
        options.onSuccess?.(successData);
      }
    });

    target.files = null;
  };

  return { customUpload, folderInputRef, selectFolder, handleFolderSelect };
}
