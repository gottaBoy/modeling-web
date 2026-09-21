/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { cloneDeep, isFunction, merge, round, uniqueId } from 'lodash-es';
import { RuntimeError } from '../../error';
import { selectFile } from './select-file';
/**
 * 使用上传文件逻辑
 *
 * @author lxm
 * @date 2022-11-20 21:11:52
 * @export
 * @param {IUploadFileOpts} _opts
 * @returns {*}
 */
export function uploadFile(_opts) {
    const opts = merge({
        multiple: true,
        accept: '',
        separate: true,
        beforeUpload: (_fileData, _files) => true,
        finish: (_resultFiles) => { },
        success: (_resultFiles, _res) => { },
        error: (_resultFiles, _error) => { },
        progress: (_files) => { },
    }, _opts);
    /**
     * 进度条回调
     *
     * @author lxm
     * @date 2022-11-20 21:11:47
     * @param {IParams} event
     * @param {IUploadFile[]} files
     */
    const onUploadProgress = (event, files) => {
        files.forEach(file => {
            file.percentage = round(event.progress * 100);
        });
        opts.progress(cloneDeep(files));
    };
    /**
     * 上传请求方法，返回响应对象
     *
     * @author lxm
     * @date 2022-11-18 13:11:57
     * @param {File[]} files
     * @returns {*}  {Promise<HttpResponse>}
     */
    const uploadRequest = async (files, _onProgress) => {
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
     * 执行一次上传，可能是一个文件也可能是多个文件
     *
     * @author lxm
     * @date 2022-11-18 14:11:54
     * @param {File[]} files 此次上传文件的集合
     * @returns {*}  {Promise<IUploadFile[]>}
     */
    const executeSingleUpload = async (files) => {
        const resultFiles = files.map(file => {
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
        }
        catch (error) {
            resultFiles.forEach(file => {
                file.status = 'fail';
            });
            // 上传失败事件
            opts.error(resultFiles, error);
            resultFiles.forEach(file => {
                file.error = error;
            });
            ibiz.log.error(error);
            ibiz.log.error(ibiz.i18n.t('core.utils.uploadFailed', {
                file: files.map(file => file.name).join(','),
            }));
        }
        return resultFiles;
    };
    /**
     * 执行上传文件逻辑
     *
     * @author lxm
     * @date 2022-11-18 13:11:21
     * @param {files} File[] 文件集合
     */
    const uploadFiles = async (files) => {
        const uploadSequence = opts.separate ? files.map(file => [file]) : [files];
        const res = await Promise.allSettled(uploadSequence.map(async (sequence) => {
            return executeSingleUpload(sequence);
        }));
        // 整合所有的返回文件
        const resultFiles = [];
        res.forEach(result => {
            if (result.status === 'fulfilled') {
                resultFiles.push(...result.value);
            }
        });
        opts.finish(resultFiles);
    };
    const select = () => {
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
