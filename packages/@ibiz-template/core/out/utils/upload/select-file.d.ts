/**
 * 文件List转数组
 *
 * @author lxm
 * @date 2022-11-18 13:11:03
 * @export
 * @param {FileList} fileList
 * @returns {*}
 */
export declare function fileListToArr(fileList: FileList): File[];
/**
 * JS打开文件上传操作配置参数
 *
 * @author lxm
 * @date 2022-11-20 21:11:47
 * @export
 * @interface SelectFileOpts
 */
export interface SelectFileOpts {
    /**
     * 接受的文件类型
     *
     * @author lxm
     * @date 2022-11-20 21:11:52
     * @type {string}
     */
    accept?: string;
    /**
     * 是否支持多选
     *
     * @author lxm
     * @date 2022-11-20 21:11:52
     * @type {boolean}
     */
    multiple?: boolean;
    /**
     * 选中文件后回调
     *
     * @author lxm
     * @date 2022-11-20 21:11:50
     */
    onSelected: (_fileList: File[]) => void;
    /**
     * 没有选中文件，点击了取消的场景
     *
     * @author lxm
     * @date 2022-11-20 21:11:50
     */
    onCancel?: () => void;
}
/**
 * JS打开文件上传操作
 *
 * @author lxm
 * @date 2022-11-20 21:11:31
 * @export
 * @param {SelectFileOpts} _opts 配置参数
 */
export declare function selectFile(_opts: SelectFileOpts): void;
//# sourceMappingURL=select-file.d.ts.map