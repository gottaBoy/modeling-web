import { IDEFormDRUIPart } from '@ibiz/model-core';
import { IViewController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { FormDetailController } from '../form-detail';
import { FormDruipartState } from './form-druipart.state';
/**
 * 表单关系界面控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormDRUIPartController
 * @extends {FormDetailController}
 */
export declare class FormDRUIPartController extends FormDetailController<IDEFormDRUIPart> {
    state: FormDruipartState;
    protected createState(): FormDruipartState;
    /**
     * 关系界面的上下文
     *
     * @author lxm
     * @date 2022-09-14 18:09:32
     * @type {IContext}
     */
    navContext?: IContext;
    /**
     * 关系界面的视图参数
     *
     * @author lxm
     * @date 2022-09-14 18:09:42
     * @type {IParams}
     */
    navParams?: IParams;
    /**
     * 关联刷新项
     *
     * @author lxm
     * @date 2022-09-15 10:09:41
     * @type {string[]}
     */
    refreshItems: string[];
    /**
     * 参数项名称（这个模型暂不使用，相关场景可以通过配置导航参数实现）
     *
     * @author lxm
     * @date 2022-09-15 19:09:36
     * @type {string}
     */
    paramItem: string;
    /**
     * 嵌入视图控制器
     *
     * @author lxm
     * @date 2023-05-16 11:03:24
     * @type {IViewController}
     */
    embedView: IViewController | undefined;
    /**
     * 是否是新建数据（即无主键）
     * @author lxm
     * @date 2023-07-28 04:09:21
     * @type {boolean}
     */
    isNewData: boolean;
    protected onInit(): Promise<void>;
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-01 20:09:54
     * @param {String[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * 计算视图上下文和视图参数,
     * *调用该方法一定会刷新视图。
     *
     * @author lxm
     * @date 2022-09-14 18:09:35
     */
    calcViewParams(): void;
    /**
     * 设置嵌入视图的神经元
     *
     * @author lxm
     * @date 2022-09-15 10:09:22
     * @param {ViewNeuron} neuron
     */
    setEmbedView(view: IViewController): void;
    /**
     * @description 关系界面校验
     * @return {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    silentValidate(): Promise<boolean>;
}
//# sourceMappingURL=form-druipart.controller.d.ts.map