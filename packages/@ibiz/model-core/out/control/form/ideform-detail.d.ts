import { IControlItem } from '../icontrol-item';
import { IDEFDCatGroupLogic } from './idefdcat-group-logic';
import { ILayout } from '../layout/ilayout';
import { ILayoutPos } from '../layout/ilayout-pos';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
/**
 *
 * 子接口类型识别属性[detailType]
 * @export
 * @interface IDEFormDetail
 */
export interface IDEFormDetail extends IControlItem {
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
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 列水平对齐
     * @description 值模式 [云实体属性界面模式表格列对齐] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐 }
     * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT')}
     * 来源  getColumnAlign
     */
    columnAlign?: string | 'LEFT' | 'CENTER' | 'RIGHT';
    /**
     * 内容高度
     * @type {number}
     * @default 0.0
     * 来源  getContentHeight
     */
    contentHeight?: number;
    /**
     * 内容宽度
     * @type {number}
     * @default 0.0
     * 来源  getContentWidth
     */
    contentWidth?: number;
    /**
     * 计数器标识
     * @type {string}
     * 来源  getCounterId
     */
    counterId?: string;
    /**
     * 计数器模式
     * @description 值模式 [树节点计数器类型] {0：默认、 1：0 值时隐藏 }
     * @type {( number | 0 | 1)}
     * @default 0
     * 来源  getCounterMode
     */
    counterMode?: number | 0 | 1;
    /**
     * 成员直接样式
     * @type {string}
     * 来源  getCssStyle
     */
    cssStyle?: string;
    /**
     * 成员样式
     * @description 值模式 [部件成员样式] {DEFAULT：默认样式、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
     * @type {( string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
     * 来源  getDetailStyle
     */
    detailStyle?: string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4';
    /**
     * 成员类型
     * @description 值模式 [云平台表单成员类型2（静态）] {FORMPAGE：表单分页、 TABPANEL：分页部件、 TABPAGE：分页面板、 FORMITEM：表单项、 USERCONTROL：用户控件、 FORMPART：表单部件、 GROUPPANEL：分组面板、 DRUIPART：数据关系界面、 RAWITEM：直接内容、 BUTTON：表单按钮、 IFRAME：直接页面嵌入、 FORMITEMEX：复合表单项、 MDCTRL：多数据部件 }
     * @type {( string | 'FORMPAGE' | 'TABPANEL' | 'TABPAGE' | 'FORMITEM' | 'USERCONTROL' | 'FORMPART' | 'GROUPPANEL' | 'DRUIPART' | 'RAWITEM' | 'BUTTON' | 'IFRAME' | 'FORMITEMEX' | 'MDCTRL')}
     * 来源  getDetailType
     */
    detailType?: string | 'FORMPAGE' | 'TABPANEL' | 'TABPAGE' | 'FORMITEM' | 'USERCONTROL' | 'FORMPART' | 'GROUPPANEL' | 'DRUIPART' | 'RAWITEM' | 'BUTTON' | 'IFRAME' | 'FORMITEMEX' | 'MDCTRL';
    /**
     * 动态样式表
     * @type {string}
     * 来源  getDynaClass
     */
    dynaClass?: string;
    /**
     * 高度
     * @type {number}
     * @default 0.0
     * 来源  getHeight
     */
    height?: number;
    /**
     * 标签直接样式
     * @type {string}
     * 来源  getLabelCssStyle
     */
    labelCssStyle?: string;
    /**
     * 标签动态样式表
     * @type {string}
     * 来源  getLabelDynaClass
     */
    labelDynaClass?: string;
    /**
     * 成员标签样式表
     *
     * @type {ISysCss}
     * 来源  getLabelPSSysCss
     */
    labelSysCss?: ISysCss;
    /**
     * 应用计数器引用
     *
     * @type {string}
     * 来源  getPSAppCounterRef
     */
    appCounterRefId?: string;
    /**
     * 表单成员动态逻辑
     *
     * @type {IDEFDCatGroupLogic[]}
     * 来源  getPSDEFDGroupLogics
     */
    defdgroupLogics?: IDEFDCatGroupLogic[];
    /**
     * 布局设置
     *
     * @type {ILayout}
     * 来源  getPSLayout
     */
    layout?: ILayout;
    /**
     * 布局位置
     *
     * @type {ILayoutPos}
     * 来源  getPSLayoutPos
     */
    layoutPos?: ILayoutPos;
    /**
     * 成员样式表
     *
     * @type {ISysCss}
     * 来源  getPSSysCss
     */
    sysCss?: ISysCss;
    /**
     * 成员图标
     *
     * @type {ISysImage}
     * 来源  getPSSysImage
     */
    sysImage?: ISysImage;
    /**
     * 前端扩展插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 显示更多管理者
     *
     * @type {string}
     * 来源  getShowMoreMgrPSDEFormDetail
     */
    showMoreMgrDEFormDetailId?: string;
    /**
     * 显示更多模式
     * @description 值模式 [显示更多模式] {0：无、 1：受控内容、 2：管理容器 }
     * @type {( number | 0 | 1 | 2)}
     * @default 0
     * 来源  getShowMoreMode
     */
    showMoreMode?: number | 0 | 1 | 2;
    /**
     * 宽度
     * @type {number}
     * @default 0.0
     * 来源  getWidth
     */
    width?: number;
    /**
     * 重复输出内容
     * @type {boolean}
     * @default false
     * 来源  isRepeatContent
     */
    repeatContent?: boolean;
    /**
     * 显示标题
     * @type {boolean}
     * 来源  isShowCaption
     */
    showCaption?: boolean;
}
