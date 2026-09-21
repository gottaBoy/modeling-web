/**
 * @description 根据文件名称计算Mime类型
 * @export
 * @param {string} fileName
 * @returns {*}  {string}
 */
export declare function calcMimeByFileName(fileName: string): string;
/**
 * @description 判断是否是图片格式
 * @export
 * @param {string} fileName
 * @returns {*}  {boolean}
 */
export declare function isImage(fileName: string): boolean;
/**
 * @description 纯JS触发下载文件
 * @export
 * @param {Blob} file
 * @param {string} fileName
 */
export declare function downloadFileFromBlob(file: Blob, fileName: string): void;
//# sourceMappingURL=download-file.d.ts.map