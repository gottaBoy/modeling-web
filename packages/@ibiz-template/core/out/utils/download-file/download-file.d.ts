/**
 * 根据文件名称计算Mime类型
 *
 * @author lxm
 * @date 2022-11-16 22:11:02
 * @export
 * @param {string} fileName
 * @returns {*}
 */
export declare function calcMimeByFileName(fileName: string): string;
/**
 * 判断是否是图片格式
 *
 * @author lxm
 * @date 2022-11-21 13:11:23
 * @export
 * @param {string} fileName
 * @returns {*}  {boolean}
 */
export declare function isImage(fileName: string): boolean;
/**
 * 纯JS触发下载文件
 *
 * @author lxm
 * @date 2022-11-16 22:11:24
 * @export
 * @param {Blob} file 文件流Blob
 * @param {string} fileName 文件名称
 */
export declare function downloadFileFromBlob(file: Blob, fileName: string): void;
//# sourceMappingURL=download-file.d.ts.map