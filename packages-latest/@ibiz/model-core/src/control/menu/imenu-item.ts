import { IControlItem } from '../icontrol-item';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 菜单部件项模型对象基础接口
 * @export
 * @interface IMenuItem
 */
export interface IMenuItem extends IControlItem {
  /**
   * 访问用户模式
   * @description 值模式 [视图访问用户] {0：未指定、 1：未登录用户、 2：登录用户、 3：匿名用户及登录用户、 4：登录用户且拥有指定资源能力 }
   * @type {( number | 0 | 1 | 2 | 3 | 4)}
   * 来源  getAccUserMode
   */
  accUserMode?: number | 0 | 1 | 2 | 3 | 4;

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
   * 项类型
   * @description 值模式 [应用菜单项类型（静态）] {SEPERATOR：分隔项、 USERITEM：用户自定义项、 APPMENUREF：菜单引用、 MENUITEM：菜单项、 RAWITEM：直接内容项 }
   * @type {( string | 'SEPERATOR' | 'USERITEM' | 'APPMENUREF' | 'MENUITEM' | 'RAWITEM')}
   * 来源  getItemType
   */
  itemType?:
    | string
    | 'SEPERATOR'
    | 'USERITEM'
    | 'APPMENUREF'
    | 'MENUITEM'
    | 'RAWITEM';

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
   * 默认展开菜单
   * @type {boolean}
   * @default false
   * 来源  isExpanded
   */
  expanded?: boolean;

  /**
   * 是否隐藏
   * @type {boolean}
   * @default false
   * 来源  isHidden
   */
  hidden?: boolean;
}
