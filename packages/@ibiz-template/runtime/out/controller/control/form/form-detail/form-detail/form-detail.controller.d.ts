import { IDEFormDetail } from '@ibiz/model-core';
import { IFormDetailController, IFormDetailContainerController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { FormDetailState } from './form-detail.state';
import { FormController } from '../../form';
export declare class FormDetailController<T extends IDEFormDetail = IDEFormDetail> implements IFormDetailController {
    /**
     * 表单成员模型
     *
     * @author lxm
     * @date 2022-08-24 20:08:19
     * @type {T}
     */
    readonly model: T;
    /**
     * 表单项状态
     *
     * @author chitanda
     * @date 2023-01-04 09:01:04
     * @type {FormDetailState}
     */
    state: FormDetailState;
    /**
     * 表单控制器
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {FormController}
     */
    readonly form: FormController;
    /**
     * 父容器控制器(除了表单分页都存在)
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {IFormDetailContainerController}
     */
    readonly parent?: IFormDetailContainerController;
    /**
     * 表单数据
     *
     * @author lxm
     * @date 2022-09-01 22:09:48
     * @readonly
     */
    get data(): IData;
    /**
     * 上下文
     *
     * @author lxm
     * @date 2023-11-22 11:43:47
     * @readonly
     * @type {IContext}
     */
    get context(): IContext;
    /**
     *  视图参数
     * @author lxm
     * @date 2023-11-22 11:43:41
     * @readonly
     * @type {IParams}
     */
    get params(): IParams;
    /**
     * 获取容器类名集合
     * @author lxm
     * @date 2023-08-02 06:06:12
     * @readonly
     * @type {string[]}
     */
    get containerClass(): string[];
    /**
     * 获取标题类名集合
     * @author lxm
     * @date 2023-08-02 06:16:48
     * @readonly
     * @type {string[]}
     */
    get labelClass(): string[];
    /**
     * 动态逻辑结果
     * @author lxm
     * @date 2023-09-21 03:36:37
     * @protected
     */
    protected dynaLogicResult: {
        visible?: boolean;
        disabled?: boolean;
        required?: boolean;
    };
    /**
     * Creates an instance of FormDetailController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model: T, form: FormController, parent?: IFormDetailContainerController);
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
     * 创建表单状态对象
     *
     * @author chitanda
     * @date 2023-01-04 10:01:00
     * @protected
     * @return {*}  {FormDetailState}
     */
    protected createState(): FormDetailState;
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(_state: FormNotifyState): Promise<void>;
    /**
     * 计算动态逻辑
     *
     * @author lxm
     * @date 2022-09-20 19:09:20
     * @protected
     * @param {string[]} names 变更的属性集合
     * @param {boolean} [mustCalc=false] 是否强制计算一遍动态逻辑
     * @returns {*}  {void}
     */
    protected calcDynamicLogic(names: string[], mustCalc?: boolean): void;
    /**
     * 强制更新视图
     *
     * @author lxm
     * @date 2022-09-15 09:09:05
     * @param {() => void} [_callback] 更新之后，组件渲染完成后的回调
     */
    force(_callback?: () => void): void;
    /**
     * 计算动态样式表
     * @author lxm
     * @date 2023-08-02 06:15:08
     * @param {IData} data
     */
    protected calcDynaClass(data: IData): void;
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     */
    calcDetailDisabled(data: IData): void;
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     */
    calcDetailVisible(data: IData): void;
    /**
     * 计算项的必填状态
     *
     * @param {IData} data
     */
    calcDetailRequired(data: IData): void;
    /**
     * 执行脚本代码
     * - 表单项值变更，点击，获取焦点，失去焦点时触发
     * @protected
     * @param {('SCRIPTCODE_CHANGE'
     *       | 'SCRIPTCODE_CLICK'
     *       | 'SCRIPTCODE_FOCUS'
     *       | 'SCRIPTCODE_BLUR')} logicCat 逻辑类型 SCRIPTCODE_CHANGE：表单项值变更（脚本处理）、 SCRIPTCODE_CLICK：表单项点击（脚本处理）、 SCRIPTCODE_FOCUS：表单项获取焦点（脚本处理）、 SCRIPTCODE_BLUR：表单项失去焦点（脚本处理）
     * @memberof FormDetailController
     */
    protected executeScriptCode(logicCat: 'SCRIPTCODE_CHANGE' | 'SCRIPTCODE_CLICK' | 'SCRIPTCODE_FOCUS' | 'SCRIPTCODE_BLUR'): void;
    /**
     * 点击事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onClick(event?: MouseEvent): Promise<void>;
}
//# sourceMappingURL=form-detail.controller.d.ts.map