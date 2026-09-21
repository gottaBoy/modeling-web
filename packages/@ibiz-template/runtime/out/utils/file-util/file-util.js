import { CoreConst, RuntimeError, downloadFileFromBlob, getAppCookie, } from '@ibiz-template/core';
import qs from 'qs';
import { convertNavData } from '../nav-params/nav-params';
export class FileUtil {
    /**
     * 计算OSSCat参数
     *
     * @author zk
     * @date 2024-01-26 02:01:52
     * @param {string} url
     * @param {IContext} context
     * @return {*}  {string}
     * @memberof FileUtil
     */
    calcOSSCatUrl(url, context, OSSCatName) {
        var _a;
        let uploadUrl = `${ibiz.env.baseUrl}/${ibiz.env.appId}${url}`;
        const app = ibiz.hub.getApp(context.srfappid);
        const OSSCat = OSSCatName ||
            app.model.defaultOSSCat ||
            ((_a = app.model.userParam) === null || _a === void 0 ? void 0 : _a.DefaultOSSCat);
        uploadUrl = uploadUrl.replace('/{cat}', OSSCat ? `/${OSSCat}` : '');
        return uploadUrl;
    }
    /**
     * 计算文件的上传路径和下载路径
     * 下载路径文件id用%fileId%占位，替换即可
     * 配置编辑器参数uploadParams和exportParams时，会像导航参数一样动态添加对应的参数到url上
     *
     * @author zk
     * @date 2024-01-26 02:01:15
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @param {IParams} uploadParams
     * @param {IParams} exportParams
     * @return {*}  {{
     *     uploadUrl: string;
     *     downloadUrl: string;
     *   }}
     * @memberof FileUtil
     */
    calcFileUpDownUrl(context, params, data = {}, extraParams = {}) {
        const { uploadParams, exportParams, osscat: OSSCatName } = extraParams;
        // 计算文件上传路径
        let uploadUrl = this.calcOSSCatUrl(ibiz.env.uploadFileUrl, context, OSSCatName);
        let downloadUrl = this.calcOSSCatUrl(`${ibiz.env.downloadFileUrl}/%fileId%`, context, OSSCatName);
        let _uploadParams = {};
        let _exportParams = {};
        if (uploadParams) {
            _uploadParams = convertNavData(uploadParams, data, params, context);
        }
        if (exportParams) {
            _exportParams = convertNavData(exportParams, data, params, context);
        }
        uploadUrl += qs.stringify(_uploadParams, { addQueryPrefix: true });
        downloadUrl += qs.stringify(_exportParams, { addQueryPrefix: true });
        return { uploadUrl, downloadUrl };
    }
    /**
     * 请求url获取文件流，并用JS触发文件下载
     *
     * @author zk
     * @date 2024-01-26 02:01:29
     * @param {{ url: string; name: string }} file
     * @memberof FileUtil
     */
    async fileDownload(url, name) {
        // 发送get请求
        const response = await ibiz.net.request(url, {
            method: 'get',
            responseType: 'blob',
            baseURL: '', // 已经有baseURL了，这里无需再写
        });
        if (response.status !== 200) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.failedDownload'));
        }
        // 请求成功，后台返回的是一个文件流
        if (!response.data) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.fileStreamData'));
        }
        else {
            // 获取文件名
            let fileName = ibiz.util.file.getFileName(response);
            // 外部传名称以外部为准，需要带文件后缀名
            if (name)
                fileName = name;
            downloadFileFromBlob(response.data, fileName);
        }
    }
    /**
     * 文件上传
     *
     * @author zk
     * @date 2024-01-26 05:01:35
     * @param {string} uploadUrl
     * @param {Blob} file
     * @param {IData} headers
     * @return {*}  {Promise<IData>}
     * @memberof FileUtil
     */
    async fileUpload(uploadUrl, file, headers) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await ibiz.net.axios({
            url: uploadUrl,
            method: 'post',
            headers,
            data: formData,
        });
        if (res.status !== 200) {
            throw new RuntimeError(ibiz.i18n.t('runtime.utils.fileUtil.fileUploadFailed'));
        }
        return res.data;
    }
    /**
     * 获取文件名
     *
     * @param {IHttpResponse<IData>} response
     * @return {*}  {string}
     * @memberof FileUtil
     */
    getFileName(response) {
        let fileName = '';
        const contentDisposition = response.headers['content-disposition'];
        if (!contentDisposition) {
            return fileName;
        }
        const disposition = qs.parse(contentDisposition, {
            delimiter: ';',
        });
        if (disposition && disposition.filename) {
            fileName = disposition.filename;
        }
        // 特殊处理返回的文件名带有双引号
        if (fileName.startsWith('"') && fileName.endsWith('"')) {
            fileName = fileName.substring(1, fileName.length - 1);
        }
        return fileName;
    }
    /**
     * 选择文件并上传
     *
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @param {IData} [option={}]
     * @return {*}  {Promise<IData[]>}
     * @memberof FileUtil
     */
    async chooseFileAndUpload(context, params, data, option = {}) {
        const { accept, multiple, showUploadManager } = option;
        const urls = ibiz.util.file.calcFileUpDownUrl(context, params, data);
        const files = await ibiz.util.file.chooseFile(accept, multiple);
        let promises = [];
        const headers = {};
        const token = getAppCookie(CoreConst.TOKEN);
        if (token) {
            Object.assign(headers, {
                [`${ibiz.env.tokenHeader}Authorization`]: `${ibiz.env.tokenPrefix}Bearer ${token}`,
            });
        }
        if (showUploadManager) {
            promises = await ibiz.notification.uploadManager({
                uploadUrl: urls.uploadUrl,
                files,
                headers,
            });
            return promises;
        }
        for (let i = 0; i < files.length; i++) {
            const promise = await ibiz.util.file.fileUpload(urls.uploadUrl, files[i], headers);
            promises.push(promise);
        }
        return Promise.all(promises);
    }
    /**
     * 选择文件
     *
     * @param {string} [accept='']
     * @param {boolean} [multiple=false]
     * @return {*}  {Promise<FileList>}
     * @memberof FileUtil
     */
    chooseFile(accept = '', multiple = false) {
        return new Promise(resolve => {
            // 创建 input 元素
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = accept;
            inputElement.multiple = multiple;
            inputElement.webkitdirectory = false;
            // 添加事件监听器，处理文件上传逻辑
            inputElement.addEventListener('change', (e) => {
                resolve(e.target.files);
            });
            // 将 input 元素添加到页面中
            document.body.appendChild(inputElement);
            // 执行文件上传操作
            inputElement.click();
            // 方法结束后销毁 input 元素
            document.body.removeChild(inputElement);
        });
    }
}
