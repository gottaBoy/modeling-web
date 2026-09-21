import { IControlItem } from '../icontrol-item';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
/**
 *
 * 工具栏项模型对象接口
 * 子接口类型识别属性[itemType]
 * @export
 * @interface IDEToolbarItem
 */
export interface IDEToolbarItem extends IControlItem {
    /**
     * 访问标识
     * @type {string}
     * 来源  getAccessKey
     */
    accessKey?: string;
    /**
     * 标题语言资源
     *
     * @type {ILanguageRes}
     * 来源  getCapPSLanguageRes
     */
    capLanguageRes?: ILanguageRes;
    /**
     * 标题
     * @type {string}
     * 来源  getCaption
     */
    caption?: string;
    /**
     * 计数器标识
     * @type {string}
     * 来源  getCounterId
     */
    counterId?: string;
    /**
     * 计数器模式
     * @description 值模式 [计数器显示模式] {0：默认、 1：0 值时隐藏 }
     * @type {( number | 0 | 1)}
     * @default 0
     * 来源  getCounterMode
     */
    counterMode?: number | 0 | 1;
    /**
     * 项直接样式
     * @type {string}
     * 来源  getCssStyle
     */
    cssStyle?: string;
    /**
     * 项数据
     * @type {string}
     * 来源  getData
     */
    data?: string;
    /**
     * 动态样式表
     * @type {string}
     * 来源  getDynaClass
     */
    dynaClass?: string;
    /**
     * 工具栏项高度
     * @type {number}
     * @default 0.0
     * 来源  getHeight
     */
    height?: number;
    /**
     * 项类型
     * @description 值模式 [平台工具栏项类型] {DEUIACTION：界面行为项、 SEPERATOR：分隔项、 ITEMS：分组项、 RAWITEM：直接项 }
     * @type {( string | 'DEUIACTION' | 'SEPERATOR' | 'ITEMS' | 'RAWITEM')}
     * 来源  getItemType
     */
    itemType?: string | 'DEUIACTION' | 'SEPERATOR' | 'ITEMS' | 'RAWITEM';
    /**
     * 系统样式表
     *
     * @type {ISysCss}
     * 来源  getPSSysCss
     */
    sysCss?: ISysCss;
    /**
     * 图标资源对象
     *
     * @type {ISysImage}
     * 来源  getPSSysImage
     */
    sysImage?: ISysImage;
    /**
     * 前端应用插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 工具提示
     * @type {string}
     * 来源  getTooltip
     */
    tooltip?: string;
    /**
     * 提示语言资源
     *
     * @type {ILanguageRes}
     * 来源  getTooltipPSLanguageRes
     */
    tooltipLanguageRes?: ILanguageRes;
    /**
     * 用户标记
     * @type {string}
     * 来源  getUserTag
     */
    userTag?: string;
    /**
     * 用户标记2
     * @type {string}
     * 来源  getUserTag2
     */
    userTag2?: string;
    /**
     * 工具栏项宽度
     * @type {number}
     * @default 0.0
     * 来源  getWidth
     */
    width?: number;
    /**
     * 显示标题
     * @type {boolean}
     * 来源  isShowCaption
     */
    showCaption?: boolean;
    /**
     * 显示图标
     * @type {boolean}
     * 来源  isShowIcon
     */
    showIcon?: boolean;
    /**
     * 启用
     * @type {boolean}
     * @default true
     * 来源  isValid
     */
    valid?: boolean;
}
