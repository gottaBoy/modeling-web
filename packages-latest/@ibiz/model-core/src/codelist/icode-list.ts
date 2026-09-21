import { ICodeItem } from './icode-item';
import { ILanguageRes } from '../res/ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * 代码表模型对象接口
 * @export
 * @interface ICodeList
 */
export interface ICodeList extends IModelObject {
  /**
   * 全部显示文本
   * @type {string}
   * 来源  getAllText
   */
  allText?: string;

  /**
   * 全部显示文本语言资源
   *
   * @type {ILanguageRes}
   * 来源  getAllTextPSLanguageRes
   */
  allTextLanguageRes?: ILanguageRes;

  /**
   * 缓存超时时长
   * @type {number}
   * @default -1
   * 来源  getCacheTimeout
   */
  cacheTimeout?: number;

  /**
   * 代码表标记
   * @type {string}
   * 来源  getCodeListTag
   */
  codeListTag?: string;

  /**
   * 代码表类型
   * @description 值模式 [代码表类型] {STATIC：静态、 DYNAMIC：动态、 PREDEFINED：预定义 }
   * @type {( string | 'STATIC' | 'DYNAMIC' | 'PREDEFINED')}
   * 来源  getCodeListType
   */
  codeListType?: string | 'STATIC' | 'DYNAMIC' | 'PREDEFINED';

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 自定义条件
   * @type {string}
   * 来源  getCustomCond
   */
  customCond?: string;

  /**
   * 动态系统模式
   * @description 值模式 [动态系统模式] {0：不启用、 1：启用 }
   * @type {( number | 0 | 1)}
   * @default 0
   * 来源  getDynaSysMode
   */
  dynaSysMode?: number | 0 | 1;

  /**
   * 空白显示文本
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 空白显示文本语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * 包含开始值模式
   * @description 值模式 [阈值组包含值模式] {0：不包含、 1：包含、 2：首项包含、 3：尾项包含 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getIncBeginValueMode
   */
  incBeginValueMode?: number | 0 | 1 | 2 | 3;

  /**
   * 包含结束值模式
   * @description 值模式 [阈值组包含值模式] {0：不包含、 1：包含、 2：首项包含、 3：尾项包含 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getIncEndValueMode
   */
  incEndValueMode?: number | 0 | 1 | 2 | 3;

  /**
   * 默认排序方向
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getMinorSortDir
   */
  minorSortDir?: string | 'ASC' | 'DESC';

  /**
   * 多项代码表或模式
   * @description 值模式 [代码表或模式] {NUMBERORMODE：数字或处理、 STRINGORMODE：文本或模式 }
   * @type {( string | 'NUMBERORMODE' | 'STRINGORMODE')}
   * 来源  getOrMode
   */
  orMode?: string | 'NUMBERORMODE' | 'STRINGORMODE';

  /**
   * 代码项集合
   *
   * @type {ICodeItem[]}
   * 来源  getPSCodeItems
   */
  codeItems?: ICodeItem[];

  /**
   * 平台代码表标识
   * @type {string}
   * 来源  getPSCodeListTemplId
   */
  codeListTemplId?: string;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 预置代码表类型
   * @description 值模式 [代码表预置类型] {OPERATOR：系统操作者、 RUNTIME：运行时代码表、 MODULEINST：模块副本、 DEMAINSTATE：实体主状态、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'OPERATOR' | 'RUNTIME' | 'MODULEINST' | 'DEMAINSTATE' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getPredefinedType
   */
  predefinedType?:
    | string
    | 'OPERATOR'
    | 'RUNTIME'
    | 'MODULEINST'
    | 'DEMAINSTATE'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 是否被引用
   * @type {boolean}
   * 来源  getRefFlag
   */
  refFlag?: boolean;

  /**
   * 所属系统标识
   * @type {string}
   * 来源  getSystemTag
   */
  systemTag?: string;

  /**
   * 文本分隔符
   * @type {string}
   * 来源  getTextSeparator
   */
  textSeparator?: string;

  /**
   * 值分隔符
   * @type {string}
   * 来源  getValueSeparator
   */
  valueSeparator?: string;

  /**
   * 代码项值为数值
   * @type {boolean}
   * @default false
   * 来源  isCodeItemValueNumber
   */
  codeItemValueNumber?: boolean;

  /**
   * 启用缓存
   * @type {boolean}
   * @default false
   * 来源  isEnableCache
   */
  enableCache?: boolean;

  /**
   * 子系统以云服务方式提供
   * @type {boolean}
   * @default false
   * 来源  isSubSysAsCloud
   */
  subSysAsCloud?: boolean;

  /**
   * 阈值组
   * @type {boolean}
   * @default false
   * 来源  isThresholdGroup
   */
  thresholdGroup?: boolean;
}
