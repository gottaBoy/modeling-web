import { EditorController } from '@ibiz-template/runtime';
import { IFileUploader } from '@ibiz/model-core';
/**
 * 文件上传编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class UploadEditorController extends EditorController<IFileUploader> {
    /**
     * 是否支持拖拽
     */
    isDrag: boolean;
    /**
     * 是否多选
     */
    multiple: boolean;
    /**
     * 接受上传的文件类型
     */
    accept: string;
    /**
     * 上传的文件大小
     *
     * @type {number}
     * @memberof UploadEditorController
     */
    size: number;
    /**
     * 上传参数
     */
    uploadParams?: IParams;
    /**
     * 下载参数
     */
    exportParams?: IParams;
    /**
     * 自适应预览
     * 只读状态下且配置了编辑器参数autoPreview ，加载完图片后自动调整大小达到预览态，且禁用图片hover工具栏
     *
     * @type {boolean}
     * @memberof UploadEditorController
     */
    autoPreview: boolean;
    protected onInit(): Promise<void>;
}
