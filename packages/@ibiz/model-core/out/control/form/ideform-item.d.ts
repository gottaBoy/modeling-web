import { IEditorContainer } from '../ieditor-container';
import { IDEFormDetail } from './ideform-detail';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';
/**
 *
 * 继承父接口类型值[FORMITEM]
 * @export
 * @interface IDEFormItem
 */
export interface IDEFormItem extends IDEFormDetail, IEditorContainer {
    /**
     * 标题
     * @type {string}
     * 来源  getCaption
     */
    caption?: string;
    /**
     * 动态标题绑定值项
     * @type {string}
     * 来源  getCaptionItemName
     */
    captionItemName?: string;
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
     * 启用条件
     * @description 值模式 [实体表单表单项启用条件] {0：无、 1：建立、 2：更新、 3：全部 }
     * @type {( number | 0 | 1 | 2 | 3)}
     * 来源  getEnableCond
     */
    enableCond?: number | 0 | 1 | 2 | 3;
    /**
     * 绑定属性
     * @type {string}
     * 来源  getFieldName
     */
    fieldName?: string;
    /**
     * 忽略输入模式
     * @type {number}
     * 来源  getIgnoreInput
     */
    ignoreInput?: number;
    /**
     * 输入提示信息
     * @type {string}
     * 来源  getInputTip
     */
    inputTip?: string;
    /**
     * 输入提示链接
     * @type {string}
     * 来源  getInputTipUrl
     */
    inputTipUrl?: string;
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
     * 标签动态样式表
     * @type {string}
     * 来源  getLabelDynaClass
     */
    labelDynaClass?: string;
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
     * 无权限显示模式
     * @description 值模式 [应用无权限内容显示模式] {1：显示空或*内容、 2：隐藏 }
     * @type {( number | 1 | 2)}
     * 来源  getNoPrivDisplayMode
     */
    noPrivDisplayMode?: number | 1 | 2;
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
     * 应用实体属性
     *
     * @type {string}
     * 来源  getPSAppDEField
     */
    appDEFieldId?: string;
    /**
     * 表单项更新
     *
     * @type {string}
     * 来源  getPSDEFormItemUpdate
     */
    deformItemUpdateId?: string;
    /**
     * 表单项图片对象
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
     * 更新默认值
     * @type {string}
     * 来源  getUpdateDV
     */
    updateDV?: string;
    /**
     * 更新默认值类型
     * @description 值模式 [实体属性界面项默认值类型] {SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 PARAM：数据对象属性、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据 }
     * @type {( string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA')}
     * 来源  getUpdateDVT
     */
    updateDVT?: string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA';
    /**
     * 值格式化
     * @type {string}
     * 来源  getValueFormat
     */
    valueFormat?: string;
    /**
     * 允许空值输入
     * @type {boolean}
     * 来源  isAllowEmpty
     */
    allowEmpty?: boolean;
    /**
     * 复合表单项
     * @type {boolean}
     * @default false
     * 来源  isCompositeItem
     */
    compositeItem?: boolean;
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
     * @default false
     * 来源  isEmptyCaption
     */
    emptyCaption?: boolean;
    /**
     * 提供锚点
     * @type {boolean}
     * @default false
     * 来源  isEnableAnchor
     */
    enableAnchor?: boolean;
    /**
     * 支持输入提示
     * @type {boolean}
     * @default false
     * 来源  isEnableInputTip
     */
    enableInputTip?: boolean;
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
     * @default false
     * 来源  isHidden
     */
    hidden?: boolean;
    /**
     * 输入提示支持关闭
     * @type {boolean}
     * @default false
     * 来源  isInputTipClosable
     */
    inputTipClosable?: boolean;
    /**
     * 需要代码表配置
     * @type {boolean}
     * @default false
     * 来源  isNeedCodeListConfig
     */
    needCodeListConfig?: boolean;
}
