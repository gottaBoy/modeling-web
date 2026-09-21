import { EditorController, IAppDEService } from '@ibiz-template/runtime';
import { IAppDEACMode, IDEACModeDataItem, IMarkdown } from '@ibiz/model-core';
/**
 * MarkDown编辑器控制器
 *
 * @export
 * @class MarkDownEditorController
 * @extends {EditorController}
 */
export declare class MarkDownEditorController extends EditorController<IMarkdown> {
    /**
     * 上传参数
     */
    uploadParams?: IParams;
    /**
     * 下载参数
     */
    exportParams?: IParams;
    /**
     * 应用实体服务
     *
     * @author chitanda
     * @date 2023-10-12 14:10:41
     * @type {IAppDEService}
     */
    deService?: IAppDEService;
    /**
     * 自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:52
     * @type {IAppDEACMode}
     */
    deACMode?: IAppDEACMode;
    /**
     * 自填模式对应主键属性名称
     *
     * @author chitanda
     * @date 2023-10-12 10:10:58
     * @type {string}
     */
    keyName: string;
    /**
     * 自填模式对应主文本属性名称
     *
     * @author chitanda
     * @date 2023-10-12 10:10:02
     * @type {string}
     */
    textName: string;
    /**
     * 自填模式排序模式，默认升序
     *
     * @author chitanda
     * @date 2023-10-12 10:10:29
     * @type {string}
     */
    sort: string;
    /**
     * 自填数据项集合（已排除了value和text)
     *
     * @author chitanda
     * @date 2023-10-12 10:10:23
     * @type {IDEACModeDataItem[]}
     */
    dataItems: IDEACModeDataItem[];
    /**
     * AI 聊天自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:37
     * @type {boolean}
     */
    chatCompletion: boolean;
    protected onInit(): Promise<void>;
}
