import { IDEForm } from '@ibiz/model-core';
import { IEditFormController, IFormMDCtrlRepeaterController } from '../../../../../interface';
import { FormMDCtrlController } from './form-mdctrl.controller';
import { EditFormController } from '../../edit-form';
import { FormNotifyState } from '../../../../constant';
/**
 * @description 表单多数据部件(重复器)控制器
 * @export
 * @class FormMDCtrlRepeaterController
 * @extends {FormMDCtrlController}
 * @implements {IFormMDCtrlRepeaterController}
 */
export declare class FormMDCtrlRepeaterController extends FormMDCtrlController implements IFormMDCtrlRepeaterController {
    form: EditFormController;
    /**
     * @description 多数据重复器对应的表单里的值
     * @readonly
     * @type {(IData[] | IData | null)}
     * @memberof FormMDCtrlRepeaterController
     */
    get value(): IData[] | IData | null;
    /**
     * @description 是否允许排序
     * @readonly
     * @type {boolean}
     * @memberof FormMDCtrlRepeaterController
     */
    get enableSort(): boolean;
    /**
     * @description 重复器样式
     * @type {('Grid' | 'MultiForm' | 'SingleForm')}
     * @memberof FormMDCtrlRepeaterController
     */
    repeaterStyle: 'Grid' | 'MultiForm' | 'SingleForm';
    /**
     * @description 重复器的值是否是单项数据类型，true为对象格式，false为数组格式
     * @type {boolean}
     * @memberof FormMDCtrlRepeaterController
     */
    isSingleData: boolean;
    /**
     * @description 重复表单
     * @type {IDEForm}
     * @memberof FormMDCtrlRepeaterController
     */
    repeatedForm: IDEForm;
    /**
     * @description 重复器map
     * @memberof FormMDCtrlRepeaterController
     */
    repeaterMap: Map<string, IEditFormController>;
    /**
     * @description 初始化
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlRepeaterController
     */
    protected onInit(): Promise<void>;
    /**
     * @description 准备重复器表单模型
     * @memberof FormMDCtrlRepeaterController
     */
    prepareRepeatedForm(): void;
    /**
     * @description 转化多语言
     * @protected
     * @memberof FormMDCtrlRepeaterController
     */
    protected convertMultipleLanguages(): void;
    /**
     * @description 设置重复器控制器
     * @param {string} id
     * @param {IEditFormController} controller
     * @memberof FormMDCtrlRepeaterController
     */
    setRepeaterController(id: string, controller: IEditFormController): void;
    /**
     * @description 校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    validate(): Promise<boolean>;
    /**
     * @description 静默校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    silentValidate(): Promise<boolean>;
    /**
     * @description 设置重复器数据（修改主表单里重复器对应属性）
     * @param {(IData[] | IData | null)} value
     * @memberof FormMDCtrlRepeaterController
     */
    setValue(value: IData[] | IData | null): void;
    /**
     * @description 自定义事件
     * @private
     * @param {{
     *     eventName: string;
     *     index?: number;
     *     eventArg: IData;
     *   }} args
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlRepeaterController
     */
    private onCustomAction;
    /**
     * @description 添加或创建一条数据
     * @param {number} [index]
     * @memberof FormMDCtrlRepeaterController
     */
    create(index?: number): Promise<void>;
    /**
     * @description 删除数据
     * @param {number} [index]
     * @returns {*}  {void}
     * @memberof FormMDCtrlRepeaterController
     */
    remove(index?: number): Promise<void>;
    /**
     * @description 拖拽变更
     * @param {number} _draggedIndex 当前拖拽元素的下标
     * @param {number} _targetIndex 拖拽元素放入位置的下标
     * @memberof FormMDCtrlRepeaterController
     */
    dragChange(_draggedIndex: number, _targetIndex: number): void;
    /**
     * @description 表单数据变更通知
     * @param {string[]} names
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlRepeaterController
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * @description 表单状态变更通知
     * @param {FormNotifyState} state
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlRepeaterController
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 设置默认值
     * @param {IData} data
     * @param {('create' | 'update')} type
     * @memberof FormMDCtrlRepeaterController
     */
    setDefaultValue(data: IData, type: 'create' | 'update'): void;
}
//# sourceMappingURL=form-mdctrl-repeater.controller.d.ts.map