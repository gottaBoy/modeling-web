import { IEditor } from '@ibiz/model-core';
import { IEditorContainerController, IEditorController, IViewController } from '../../../interface/controller';
/**
 * 编辑器控制器基类
 *
 * @author lxm
 * @date 2022-08-24 20:08:15
 * @export
 * @class EditorController
 */
export declare class EditorController<T extends IEditor = IEditor> implements IEditorController {
    /**
     * 编辑器模型
     *
     * @author lxm
     * @date 2022-08-24 20:08:12
     * @type {T}
     */
    readonly model: T;
    /**
     * 编辑器样式
     *
     * @author chitanda
     * @date 2023-09-12 16:09:40
     * @type {IData}
     */
    readonly style: IData;
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-08-24 20:08:55
     * @type {IContext}
     */
    readonly context: IContext;
    /**
     * 视图参数
     *
     * @author lxm
     * @date 2022-08-24 20:08:52
     * @type {IParams}
     */
    readonly params: IParams;
    /**
     * 父控制器，可以使表单项控制器，也可以是表格编辑项控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:52
     */
    readonly parent: IEditorContainerController;
    /**
     * 占位
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    placeHolder: string;
    /**
     * 占位
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    editorParams: IData;
    /**
     * 额外参数
     *
     * @type {IData}
     * @memberof EditorController
     */
    extraParams: IData;
    /**
     * 是否只读
     *
     * @author lxm
     * @date 2022-12-12 21:12:51
     * @readonly
     */
    get readonly(): boolean;
    /**
     * 值格式化
     * @author lxm
     * @date 2024-01-11 10:18:33
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat(): string | undefined;
    /**
     * 数据类型
     * @author lxm
     * @date 2024-01-11 10:18:55
     * @readonly
     * @type {(number  | undefined)}
     */
    get dataType(): number | undefined;
    /**
     * 触发值变更模式
     *
     * @readonly
     * @type {string}
     * @memberof EditorController
     */
    get triggerMode(): string;
    /**
     * @description 当前视图
     * @readonly
     * @type {IViewController}
     * @memberof EditorController
     */
    get view(): IViewController;
    /**
     * Creates an instance of EditorController.
     * @author lxm
     * @date 2022-08-24 20:08:19
     * @param {T} model
     */
    constructor(model: T, parent: IEditorContainerController);
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    init(): Promise<void>;
    protected onInit(): Promise<void>;
    /**
     * 公共参数处理，计算上下文和视图参数
     *
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:44:14
     */
    handlePublicParams(data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 字符串转对象、数组对象
     *
     * @author chitanda
     * @date 2023-08-02 17:08:03
     * @param {string} value
     * @return {*}  {(IData | IData[] | undefined)}
     */
    toObj(value: string): IData | IData[] | undefined;
    /**
     * 字符串布尔转布尔类型
     *
     * @author chitanda
     * @date 2023-08-02 17:08:34
     * @param {string} value
     * @return {*}  {boolean}
     */
    toBoolean(value: string): boolean;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:18:11
     * @param {unknown} value
     * @return {*}  {string}
     */
    formatValue(value?: unknown): string;
}
//# sourceMappingURL=editor.controller.d.ts.map