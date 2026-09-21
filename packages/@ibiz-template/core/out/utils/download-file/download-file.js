/**
 * 根据文件名称计算Mime类型
 *
 * @author lxm
 * @date 2022-11-16 22:11:02
 * @export
 * @param {string} fileName
 * @returns {*}
 */
export function calcMimeByFileName(fileName) {
    const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
    let mime = '';
    switch (ext) {
        case 'wps':
            mime = 'application/kswps';
            break;
        case 'doc':
            mime = 'application/msword';
            break;
        case 'docx':
            mime =
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case 'txt':
            mime = 'text/plain';
            break;
        case 'zip':
            mime = 'application/zip';
            break;
        case 'png':
            mime = 'image/png';
            break;
        case 'gif':
            mime = 'image/gif';
            break;
        case 'jpeg':
            mime = 'image/jpeg';
            break;
        case 'jpg':
            mime = 'image/jpeg';
            break;
        case 'rtf':
            mime = 'application/rtf';
            break;
        case 'avi':
            mime = 'video/x-msvideo';
            break;
        case 'gz':
            mime = 'application/x-gzip';
            break;
        case 'tar':
            mime = 'application/x-tar';
            break;
        case 'xlsx':
            mime = 'application/vnd.ms-excel';
            break;
        default:
            mime = '';
    }
    return mime;
}
/**
 * 判断是否是图片格式
 *
 * @author lxm
 * @date 2022-11-21 13:11:23
 * @export
 * @param {string} fileName
 * @returns {*}  {boolean}
 */
export function isImage(fileName) {
    const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
    if (!ext) {
        return false;
    }
    const imageTypes = ['jpeg', 'jpg', 'gif', 'png', 'bmp', 'svg'];
    return imageTypes.includes(ext);
}
/**
 * 纯JS触发下载文件
 *
 * @author lxm
 * @date 2022-11-16 22:11:24
 * @export
 * @param {Blob} file 文件流Blob
 * @param {string} fileName 文件名称
 */
export function downloadFileFromBlob(file, fileName) {
    // 获取文件名
    const filetype = calcMimeByFileName(fileName);
    // 用blob对象获取文件流
    const blob = new Blob([file], { type: filetype });
    // 通过文件流创建下载链接
    const href = URL.createObjectURL(blob);
    // 创建一个a元素并设置相关属性
    const a = document.createElement('a');
    a.href = href;
    a.download = fileName;
    // 添加a元素到当前网页
    document.body.appendChild(a);
    // 触发a元素的点击事件，实现下载
    a.click();
    // 从当前网页移除a元素
    document.body.removeChild(a);
    // 释放blob对象
    URL.revokeObjectURL(href);
}
