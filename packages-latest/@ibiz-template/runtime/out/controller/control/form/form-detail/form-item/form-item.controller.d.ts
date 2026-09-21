import { IDEFormItem, IEditor } from '@ibiz/model-core';
import Schema from 'async-validator';
import { FormController } from '../../form/form.controller';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormItemState } from './form-item.state';
import { IApiFormItemController, IEditorContainerController, IEditorController, IEditorProvider, IFormDetailContainerController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
export declare class FormItemController extends FormDetailController<IDEFormItem> implements IEditorContainerController, IApiFormItemController {
    state: FormItemState;
    protected createState(): FormItemState;
    /**
     * 编辑器控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {IEditorController}
     */
    editor?: IEditorController;
    /**
     * 编辑器适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     */
    editorProvider?: IEditorProvider;
    /**
     * 表单项校验器实例
     *
     * @author lxm
     * @date 2022-09-04 18:09:56
     * @protected
     * @type {Schema}
     */
    protected validator?: Schema;
    /**
     * 值规则
     *
     * @author lxm
     * @date 2023-10-18 03:39:23
     * @type {IData[]}
     */
    rules: IData[];
    /**
     * 表单项名称
     *
     * @author lxm
     * @date 2022-09-04 18:09:32
     * @readonly
     */
    get name(): string;
    /**
     * 表单项值
     *
     * @author lxm
     * @date 2022-08-24 22:08:25
     * @readonly
     * @type {unknown}
     */
    get value(): unknown;
    /**
     * 值项
     * @author lxm
     * @date 2023-05-31 02:31:27
     * @readonly
     * @type {(string | undefined)}
     */
    get valueItemName(): string | undefined;
    /**
     * 标签标题
     * @author lxm
     * @date 2023-12-12 09:48:21
     * @readonly
     * @type {(string | undefined)}
     */
    get labelCaption(): string | undefined;
    /**
     * Creates an instance of FormItemController.
     *
     * @author chitanda
     * @date 2023-06-14 10:06:23
     * @param {IDEFormItem} model 表单模型
     * @param {FormController} form 表单控制器
     * @param {IFormDetailContainerController} [parent] 父容器控制器
     */
    constructor(model: IDEFormItem, form: FormController, parent?: IFormDetailContainerController);
    /**
     * 单位
     * @author lxm
     * @date 2023-05-24 05:46:52
     * @readonly
     * @type {(string | undefined)}
     */
    get unitName(): string | undefined;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-05-24 05:46:56
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat(): string | undefined;
    /**
     * 数据类型
     *
     * @author zhanghengfeng
     * @date 2023-09-01 11:09:00
     * @readonly
     * @type {(number | undefined)}
     */
    get dataType(): number | undefined;
    /**
     * @description 隐藏无值的单位
     * @readonly
     * @type {boolean}
     * @memberof FormItemController
     */
    get emptyHiddenUnit(): boolean;
    /**
     * tips缓存标识
     *
     * @private
     * @memberof FormItemController
     */
    private TIPS_CACHE;
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * @description 获取 enumOptions
     * @returns {*}  {(IParams | undefined)}
     * @memberof FormItemController
     */
    getEnumOptions(): IParams | undefined;
    /**
     * @description 创建编辑器模型
     * @returns {*}  {IEditor}
     * @memberof FormItemController
     */
    createEditorModel(): IEditor;
    /**
     * 初始化tips
     *
     * @protected
     * @memberof FormItemController
     */
    protected initTips(): void;
    /**
     * 初始化值规则
     *
     * @author lxm
     * @date 2022-09-02 09:09:27
     * @protected
     * @returns {*}
     */
    protected initRules(): Promise<void>;
    /**
     * 计算启用条件的禁用
     *
     * @author lxm
     * @date 2022-09-20 00:09:57
     * @param {(string | FormNotifyState)} name
     * @returns {*}
     */
    calcEnableCond(): void;
    dataChangeNotify(name: string[]): Promise<void>;
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * 表单项值规则校验(如果表单项不显示则不校验直接返回true)
     *
     * @author lxm
     * @date 2022-09-01 22:09:29
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormItemController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 设置表单数据的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {unknown} value 要设置的值
     * @param {string} name 要设置的表单数据的属性名称
     * @param {boolean} ignore 忽略脏值检查
     */
    setDataValue(value: unknown, name?: string, ignore?: boolean): Promise<void>;
    /**
     * 聚焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onFocus(event: MouseEvent): void;
    /**
     * 失焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onBlur(event: MouseEvent): void;
    /**
     * 回车事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onEnter(event: MouseEvent): void;
    /**
     * 点击事件
     * @author ljx
     * @date 2024-08-06 10:03:26
     */
    onClick(event?: MouseEvent, params?: IParams): Promise<void>;
    /**
     * 自定义行为
     * @param value
     */
    onCustomAction(value: IData): Promise<void>;
    /**
     * 加载输入提示信息
     *
     * @return {*}  {Promise<void>}
     * @memberof FormItemController
     */
    loadInputTip(): Promise<void>;
    /**
     * 清除tis缓存
     *
     * @memberof FormItemController
     */
    clearTipsCache(): void;
    /**
     * @description 计算动态样式表
     * @param {IData} data
     * @memberof FormItemController
     */
    protected calcDynaClass(data: IData): void;
}
//# sourceMappingURL=form-item.controller.d.ts.map