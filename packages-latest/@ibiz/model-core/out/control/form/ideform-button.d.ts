import { INavigateParamContainer } from '../inavigate-param-container';
import { IDEFormDetail } from './ideform-detail';
import { ILanguageRes } from '../../res/ilanguage-res';
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
     * @description 值模式 [表单按钮行为类型] {NONE：无默认处理、 UIACTION：界面行为、 FIUPDATE：表单项更新 }
     * @type {( string | 'NONE' | 'UIACTION' | 'FIUPDATE')}
     * 来源  getActionType
     */
    actionType?: string | 'NONE' | 'UIACTION' | 'FIUPDATE';
    /**
     * 边框样式
     * @description 值模式 [边框样式] {NONE：无边框、 SOLID：实线边框、 DOTTED：点状边框、 DASHED：虚线边框、 DOUBLE：双线边框 }
     * @type {( string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE')}
     * 来源  getBorderStyle
     */
    borderStyle?: string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE';
    /**
     * 按钮样式
     * @description 值模式 [按钮样式] {DEFAULT：默认、 INVERSE：反向、 PRIMARY：主要、 INFO：信息、 SUCCESS：成功、 WARNING：警告、 DANGER：危险、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
     * @type {( string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
     * @default DEFAULT
     * 来源  getButtonStyle
     */
    buttonStyle?: string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4';
    /**
     * 动态标题绑定值项
     * @type {string}
     * 来源  getCaptionItemName
     */
    captionItemName?: string;
    /**
     * 图标对齐
     * @description 值模式 [按钮图标方向] {LEFT：左侧、 TOP：上方、 RIGHT：右侧、 BOTTOM：下方 }
     * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM')}
     * 来源  getIconAlign
     */
    iconAlign?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM';
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
     * 操作提示语言资源
     *
     * @type {ILanguageRes}
     * 来源  getTooltipPSLanguageRes
     */
    tooltipLanguageRes?: ILanguageRes;
    /**
     * 界面行为操作目标
     * @description 值模式 [界面行为操作目标] {SINGLEDATA：单项数据、 SINGLEKEY：单项数据（主键）、 MULTIDATA：多项数据、 MULTIKEY：多项数据（主键）、 NONE：无数据 }
     * @type {( string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE')}
     * 来源  getUIActionTarget
     */
    uiactionTarget?: string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE';
}
