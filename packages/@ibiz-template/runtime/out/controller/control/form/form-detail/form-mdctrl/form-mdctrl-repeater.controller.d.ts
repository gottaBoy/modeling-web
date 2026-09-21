import { IDEForm } from '@ibiz/model-core';
import { IEditFormController } from '../../../../../interface';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * 表单多数据部件(重复器)控制器
 * 类型是重复器
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export declare class FormMDCtrlRepeaterController extends FormMDCtrlController {
    /**
     * 多数据重复器对应的表单里的值
     *
     * @author lxm
     * @date 2022-08-24 22:08:25
     * @readonly
     * @type {unknown}
     */
    get value(): IData[] | IData | null;
    /**
     * 是否允许排序
     *
     * @author ljx
     * @date 2024-11-19 11:13:13
     * @readonly
     * @type {boolean}
     */
    get enableSort(): boolean;
    /**
     * 重复器样式
     * @author lxm
     * @date 2023-11-09 05:03:20
     * @type {('Grid' | 'MultiForm' | 'SingleForm')}
     */
    repeaterStyle: 'Grid' | 'MultiForm' | 'SingleForm';
    /**
     * 重复器的值是否是单项数据类型，true为数组格式，反之为对象格式
     * @author lxm
     * @date 2023-11-09 05:09:19
     * @type {boolean}
     */
    isSingleData: boolean;
    /**
     * 重复表单
     * @author lxm
     * @date 2023-11-22 02:28:13
     * @type {IDEForm}
     */
    repeatedForm: IDEForm;
    /**
     * 重复器map
     *
     * @memberof FormMDCtrlRepeaterController
     */
    repeaterMap: Map<string, IEditFormController>;
    protected onInit(): Promise<void>;
    /**
     * 准备重复器表单模型
     * @author lxm
     * @date 2023-11-22 02:56:00
     */
    prepareRepeatedForm(): void;
    /**
     * 设置重复器控制器
     *
     * @param {string} id
     * @param {IEditFormController} controller
     * @memberof FormMDCtrlRepeaterController
     */
    setRepeaterController(id: string, controller: IEditFormController): void;
    /**
     * 校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 设置重复器数据（修改主表单里重复器对应属性）
     * @author lxm
     * @date 2023-11-22 06:07:04
     * @param {(IData[] | IData | null)} value
     */
    setValue(value: IData[] | IData | null): void;
    /**
     * 添加或创建一条数据
     * @author lxm
     * @date 2023-11-22 04:50:19
     */
    create(index?: number): void;
    /**
     * 删除数据
     * @author lxm
     * @date 2023-11-22 08:53:42
     * @param {number} index
     */
    remove(index?: number): void;
    /**
     * 表单数据变更通知
     *
     * @author lxm
     * @date 2023-11-24 04:37:03
     * @param {string[]} names
     * @return {*}  {Promise<void>}
     */
    dataChangeNotify(names: string[]): Promise<void>;
}
//# sourceMappingURL=form-mdctrl-repeater.controller.d.ts.map