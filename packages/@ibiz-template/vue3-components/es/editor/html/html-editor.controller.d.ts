import { EditorController, IAppDEService } from '@ibiz-template/runtime';
import { IAppDEACMode, IHtml } from '@ibiz/model-core';
import { IDomEditor } from '@wangeditor/editor';
/**
 * html框编辑器控制器
 *
 * @export
 * @class HtmlEditorController
 * @extends {EditorController}
 */
export declare class HtmlEditorController extends EditorController<IHtml> {
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
     * @type {IAppDEService}
     * @memberof HtmlEditorController
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
     * AI 聊天自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:37
     * @type {boolean}
     */
    chatCompletion: boolean;
    /**
     * wangEditor 实例
     *
     * @private
     * @type {IDomEditor}
     * @memberof HtmlEditorController
     */
    private wangEditor;
    /**
     * 气泡容器
     *
     * @type {(IOverlayPopoverContainer | null)}
     * @memberof HtmlEditorController
     */
    private overlay;
    /**
     * 清除回调
     *
     * @private
     * @memberof HtmlEditorController
     */
    private cleanup;
    /**
     * 预定义阻止捕获事件code
     *
     * @private
     * @type {number[]}
     * @memberof HtmlEditorController
     */
    private presetPreventEvents;
    /**
     * 预定义阻止冒泡事件code
     *
     * @private
     * @type {number[]}
     * @memberof HtmlEditorController
     */
    private presetPreventPropEvents;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof HtmlEditorController
     */
    protected onInit(): Promise<void>;
    /**
     * 自定义注册
     *
     * @private
     * @memberof HtmlEditorController
     */
    private customRegister;
    /**
     * wangEditor 创建完成
     *
     * @private
     * @param {IDomEditor} editor
     * @memberof HtmlEditorController
     */
    onCreated(editor: IDomEditor): void;
    /**
     * 监听事件
     *
     * @private
     * @memberof HtmlEditorController
     */
    private listenEvent;
    /**
     * 打开表情选择
     *
     * @memberof HtmlEditorController
     */
    private openEmojiSelect;
    /**
     * 添加表情
     *
     * @param {string} data
     * @memberof HtmlEditorController
     */
    private addEmojiNode;
    /**
     * 销毁
     *
     * @private
     * @memberof HtmlEditorController
     */
    onDestroyed(): void;
}
