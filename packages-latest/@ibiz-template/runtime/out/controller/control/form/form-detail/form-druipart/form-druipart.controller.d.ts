import { IDEFormDRUIPart } from '@ibiz/model-core';
import { IAppDEService, IViewController, IFormDruipartController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { FormDetailController } from '../form-detail';
import { FormDruipartState } from './form-druipart.state';
/**
 * @description 表单关系界面控制器
 * @export
 * @class FormDRUIPartController
 * @extends {FormDetailController<IDEFormDRUIPart>}
 */
export declare class FormDRUIPartController extends FormDetailController<IDEFormDRUIPart> implements IFormDruipartController {
    state: FormDruipartState;
    protected createState(): FormDruipartState;
    /**
     * @description 关系界面的上下文
     * @type {IContext}
     * @memberof FormDRUIPartController
     */
    navContext?: IContext;
    /**
     * @description 关系界面的视图参数
     * @type {IParams}
     * @memberof FormDRUIPartController
     */
    navParams?: IParams;
    /**
     * @description 关联刷新项
     * @type {string[]}
     * @memberof FormDRUIPartController
     */
    refreshItems: string[];
    /**
     * @description 参数项名称（这个模型暂不使用，相关场景可以通过配置导航参数实现）
     * @type {string}
     * @memberof FormDRUIPartController
     */
    paramItem: string;
    /**
     * @description 嵌入视图控制器
     * @type {(IViewController | undefined)}
     * @memberof FormDRUIPartController
     */
    embedView: IViewController | undefined;
    /**
     * @description  是否是新建数据（即无主键）
     * @type {boolean}
     * @memberof FormDRUIPartController
     */
    isNewData: boolean;
    /**
     * @description 是否同步子界面数据服务（处理子应用同实体表单合并关系界面）
     * @type {boolean}
     * @memberof FormDRUIPartController
     */
    isNeedSyncEmbed: boolean;
    /**
     * @description 子界面数据服务
     * @type {(IAppDEService | undefined)}
     * @memberof FormDRUIPartController
     */
    embedDataService: IAppDEService | undefined;
    /**
     * @description 初始化
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    protected onInit(): Promise<void>;
    /**
     * @description 表单数据变更通知(由表单控制器调用)
     * @param {string[]} names
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * @description 表单状态变更通知
     * @param {FormNotifyState} state
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 计算视图上下文和视图参数, 调用该方法一定会刷新视图
     * @returns {*}  {void}
     * @memberof FormDRUIPartController
     */
    calcViewParams(): void;
    /**
     * @description 设置嵌入视图的神经元
     * @param {IViewController} view
     * @memberof FormDRUIPartController
     */
    setEmbedView(view: IViewController): void;
    /**
     * @description 关系界面校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    validate(): Promise<boolean>;
    /**
     * @description  静默校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    silentValidate(): Promise<boolean>;
    /**
     * @description 同步当前表单数据至子界面数据服务
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    SyncDataToEmbedService(): Promise<void>;
    /**
     * @description 同步子界面数据至表单
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    SyncEmbedDataToForm(): Promise<void>;
    /**
     * @description 保存嵌入视图数据
     * @returns {*}  {Promise<void>}
     * @memberof FormDRUIPartController
     */
    saveEmbedViewData(): Promise<void>;
}
//# sourceMappingURL=form-druipart.controller.d.ts.map