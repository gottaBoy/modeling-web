import { FileUploaderOptions } from '../../interface';

/**
 * 文件上传器
 *
 * @author tony001
 * @date 2025-02-28 10:02:14
 * @export
 * @class FileUploader
 * @template T
 */
export declare class FileUploader<T> {
    private options;
    /**
     * Creates an instance of FileUploader.
     * @author tony001
     * @date 2025-02-28 15:02:15
     * @param {FileUploaderOptions<T>} options
     */
    constructor(options: FileUploaderOptions<T>);
    /**
     * 打开文件选择对话框
     */
    openFilePicker(): void;
    /**
     * 处理选择的文件
     */
    private handleFiles;
    /**
     * 处理单个文件上传
     */
    private processFile;
    /**
     * 格式化文件大小
     */
    private formatSize;
}
