import { INavigateParamContainer } from '../inavigate-param-container';
import { IDEFormDetail } from './ideform-detail';
import { IUIAction } from '../../view/iuiaction';
/**
 *
 * 继承父接口类型值[BUTTON]
 * @export
 * @interface IDEFormButton
 */
export interface IDEFormButton extends IDEFormDetail, INavigateParamContainer {
    /**
     * 按钮行为类型
     * @description 值模式 [实体表单按钮行为类型] {UIACTION：界面行为、 FIUPDATE：表单项更新 }
     * @type {( string | 'UIACTION' | 'FIUPDATE')}
     * 来源  getActionType
     */
    actionType?: string | 'UIACTION' | 'FIUPDATE';
    /**
     * 动态标题绑定值项
     * @type {string}
     * 来源  getCaptionItemName
     */
    captionItemName?: string;
    /**
     * 界面行为（运行时内联）
     *
     * @type {IUIAction}
     * 来源  getInlinePSUIAction
     */
    inlineUIAction?: IUIAction;
    /**
     * 调用表单项更新
     *
     * @type {string}
     * 来源  getPSDEFormItemUpdate
     */
    deformItemUpdateId?: string;
    /**
     * 调用界面行为
     *
     * @type {string}
     * 来源  getPSUIAction
     */
    uiactionId?: string;
    /**
     * 参数选择视图
     *
     * @type {string}
     * 来源  getParamPickupPSAppView
     */
    paramPickupAppViewId?: string;
    /**
     * 参数选择视图参数
     * @type {IModel}
     * 来源  getParamViewParamJO
     */
    paramViewParamJO?: IModel;
    /**
     * 操作提示信息
     * @type {string}
     * 来源  getTooltip
     */
    tooltip?: string;
    /**
     * 界面行为操作目标
     * @description 值模式 [云实体界面行为_操作数据范围] {SINGLEDATA：单项数据、 SINGLEKEY：单项数据（主键）、 MULTIDATA：多项数据、 MULTIKEY：多项数据（主键）、 NONE：无数据 }
     * @type {( string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE')}
     * 来源  getUIActionTarget
     */
    uiactionTarget?: string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE';
}
