/**
 * @description 文件List转数组
 * @export
 * @param {FileList} fileList
 * @returns {*}  {File[]}
 */
export declare function fileListToArr(fileList: FileList): File[];
/**
 * @description JS打开文件上传操作配置参数
 * @export
 * @interface SelectFileOpts
 */
export interface SelectFileOpts {
    /**
     * @description 接受的文件类型
     * @type {string}
     * @memberof SelectFileOpts
     */
    accept?: string;
    /**
     * @description 是否支持多选
     * @type {boolean}
     * @memberof SelectFileOpts
     */
    multiple?: boolean;
    /**
     * @description 选中文件后回调
     * @memberof SelectFileOpts
     */
    onSelected: (_fileList: File[]) => void;
    /**
     * @description 没有选中文件，点击了取消的场景
     * @memberof SelectFileOpts
     */
    onCancel?: () => void;
}
/**
 * @description JS打开文件上传操作
 * @export
 * @param {SelectFileOpts} _opts 配置参数
 */
export declare function selectFile(_opts: SelectFileOpts): void;
//# sourceMappingURL=select-file.d.ts.map