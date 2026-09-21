import { ViewController, IWFDynaEditViewState, IWFDynaEditViewEvent, WFLink, IAppDEService, IEditFormController } from '@ibiz-template/runtime';
import { IAppDEWFDynaEditView, IDEEditForm } from '@ibiz/model-core';
import { EditViewEngine } from './edit-view.engine';
export declare class WFDynaEditViewEngine extends EditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEWFDynaEditView, IWFDynaEditViewState, IWFDynaEditViewEvent>}
     * @memberof WFDynaEditViewEngine
     */
    protected view: ViewController<IAppDEWFDynaEditView, IWFDynaEditViewState, IWFDynaEditViewEvent>;
    /**
     * 流程表单是否可编辑
     *
     * @author lxm
     * @date 2022-09-29 15:09:16
     * @type {boolean}
     */
    isEditable: boolean;
    /**
     * 是否计算工作流工具栏
     * @author lxm
     * @date 2023-06-20 06:33:37
     * @type {boolean}
     */
    isCalcWFToolbar: boolean;
    /**
     * 实体服务
     * @author lxm
     * @date 2023-06-19 07:09:38
     * @type {IAppDEService}
     */
    entityService: IAppDEService;
    /**
     * 当前激活表单模型
     *
     * @author lxm
     * @date 2022-09-29 17:09:44
     * @type {IDEEditForm}
     */
    processForm: IDEEditForm;
    get form(): IEditFormController;
    /**
     * 工作流links
     *
     * @author lxm
     * @date 2022-10-08 16:10:53
     * @type {WFLink[]}
     */
    wfLinks: WFLink[];
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    load(): Promise<IData>;
    /**
     * 刷新页面
     *
     * @author lxm
     * @date 2022-09-29 15:09:03
     * @returns {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 计算流程步骤表单的名称
     * @author lxm
     * @date 2023-06-20 06:24:21
     * @return {*}  {Promise<string>}
     */
    calcProcessFormName(): Promise<string>;
    /**
     * 计算当前步骤的表单
     *
     * @author lxm
     * @date 2022-09-29 15:09:07
     * @returns {*}  {Promise<void>}
     */
    calcProcessForm(): Promise<void>;
    /**
     * 计算工作流工具栏，需要在表单加载回来之后执行
     *
     * @author lxm
     * @date 2022-09-30 19:09:44
     * @returns {*}  {Promise<void>}
     */
    calcWfToolbar(): Promise<void>;
    /**
     * 工作流工具栏点击回调处理
     *
     * @author lxm
     * @date 2022-10-08 17:10:29
     * @param {id} link 点击按钮对应的id
     * @returns {*}  {Promise<void>}
     */
    onLinkClick(id: string): Promise<void>;
    /**
     * 根据工作流link处理工作流提交
     *
     * @param {WFLink} link
     * @returns {*}
     * @memberof WFDynaEditViewController
     */
    wfSubmitByLink(link: WFLink): Promise<void>;
}
