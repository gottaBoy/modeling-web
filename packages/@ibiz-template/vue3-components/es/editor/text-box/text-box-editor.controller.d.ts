import { CodeListEditorController, IAppDEService } from '@ibiz-template/runtime';
import { IAppCodeList, IAppDEACMode, IDEACModeDataItem, ITextBox } from '@ibiz/model-core';
/**
 * 输入框编辑器控制器
 *
 * @author lxm
 * @date 2022-08-24 20:08:25
 * @export
 * @class TextBoxEditorController
 * @extends {EditorController}
 */
export declare class TextBoxEditorController extends CodeListEditorController<ITextBox> {
    /**
     * 精度
     * @author lxm
     * @date 2023-09-26 10:22:47
     * @type {number}
     */
    precision?: number;
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
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    codeList: IAppCodeList | undefined;
    /**
     * 无值隐藏单位
     *
     * @type {boolean}
     * @memberof TextBoxEditorController
     */
    emptyHiddenUnit: boolean;
    protected onInit(): Promise<void>;
}
