import { IEditorContainer } from '../ieditor-container';
import { ISearchBarItem } from './isearch-bar-item';
import { IDEFSearchMode } from '../../dataentity/defield/idefsearch-mode';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
/**
 *
 * @export
 * @interface ISearchBarFilter
 */
export interface ISearchBarFilter extends ISearchBarItem, IEditorContainer {
    /**
     * 标题多语言资源对象
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
     * 建立默认值
     * @type {string}
     * 来源  getCreateDV
     */
    createDV?: string;
    /**
     * 建立默认值类型
     * @description 值模式 [实体属性界面项默认值类型] {SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 PARAM：数据对象属性、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据 }
     * @type {( string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA')}
     * 来源  getCreateDVT
     */
    createDVT?: string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA';
    /**
     * 标准数据类型
     * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
     * 来源  getDataType
     */
    dataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    /**
     * 表单项高度
     * @type {number}
     * @default 0.0
     * 来源  getItemHeight
     */
    itemHeight?: number;
    /**
     * 表单项宽度
     * @type {number}
     * @default 0.0
     * 来源  getItemWidth
     */
    itemWidth?: number;
    /**
     * 标签直接样式
     * @type {string}
     * 来源  getLabelCssStyle
     */
    labelCssStyle?: string;
    /**
     * 标签位置
     * @description 值模式 [云实体表单表单项标签位置] {LEFT：左边、 TOP：上方、 RIGHT：右边、 BOTTOM：下方、 NONE：不显示 }
     * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE')}
     * 来源  getLabelPos
     */
    labelPos?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE';
    /**
     * 标签宽度
     * @type {number}
     * 来源  getLabelWidth
     */
    labelWidth?: number;
    /**
     * 输出代码表配置模式
     * @description 值模式 [实体属性界面配置输出代码表配置] {0：无、 1：只输出选择项、 2：输出子项 }
     * @type {( number | 0 | 1 | 2)}
     * @default 0
     * 来源  getOutputCodeListConfigMode
     */
    outputCodeListConfigMode?: number | 0 | 1 | 2;
    /**
     * 输入提示语言资源
     *
     * @type {ILanguageRes}
     * 来源  getPHPSLanguageRes
     */
    phlanguageRes?: ILanguageRes;
    /**
     * 属性搜索模式
     *
     * @type {IDEFSearchMode}
     * 来源  getPSDEFSearchMode
     */
    defsearchMode?: IDEFSearchMode;
    /**
     * 过滤项界面样式表
     *
     * @type {ISysCss}
     * 来源  getPSSysCss
     */
    sysCss?: ISysCss;
    /**
     * 项图片对象
     *
     * @type {ISysImage}
     * 来源  getPSSysImage
     */
    sysImage?: ISysImage;
    /**
     * 重置项名称集合
     *
     * 来源 getResetItemNames
     */
    resetItemNames?: string[];
    /**
     * 单位名称
     * @type {string}
     * 来源  getUnitName
     */
    unitName?: string;
    /**
     * 单位宽度
     * @type {number}
     * @default 0
     * 来源  getUnitNameWidth
     */
    unitNameWidth?: number;
    /**
     * 宽度
     * @type {number}
     * @default 0.0
     * 来源  getWidth
     */
    width?: number;
    /**
     * 添加分隔栏
     * @type {boolean}
     * @default false
     * 来源  isAddSeparator
     */
    addSeparator?: boolean;
    /**
     * 允许空值输入
     * @type {boolean}
     * 来源  isAllowEmpty
     */
    allowEmpty?: boolean;
    /**
     * 转换为代码项文本
     * @type {boolean}
     * @default false
     * 来源  isConvertToCodeItemText
     */
    convertToCodeItemText?: boolean;
    /**
     * 是否空白标签
     * @type {boolean}
     * 来源  isEmptyCaption
     */
    emptyCaption?: boolean;
    /**
     * 启用项权限控制
     * @type {boolean}
     * @default false
     * 来源  isEnableItemPriv
     */
    enableItemPriv?: boolean;
    /**
     * 支持单位
     * @type {boolean}
     * @default false
     * 来源  isEnableUnitName
     */
    enableUnitName?: boolean;
    /**
     * 隐藏表单项
     * @type {boolean}
     * 来源  isHidden
     */
    hidden?: boolean;
    /**
     * 需要代码表配置
     * @type {boolean}
     * @default false
     * 来源  isNeedCodeListConfig
     */
    needCodeListConfig?: boolean;
    /**
     * 显示标题
     * @type {boolean}
     * 来源  isShowCaption
     */
    showCaption?: boolean;
}
