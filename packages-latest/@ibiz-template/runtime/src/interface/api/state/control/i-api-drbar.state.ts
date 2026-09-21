import { ISysImage } from '@ibiz/model-core';
import { IApiControlState } from './i-api-control.state';

/**
 * @description 关系栏项状态接口
 * @export
 * @interface IApiDRBarItemsState
 */
export interface IApiDRBarItemsState {
  /**
   * @description 项标识
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  tag: string;

  /**
   * @description 项标题
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  caption?: string;

  /**
   * @description 是否禁用
   * @type {boolean}
   * @default false
   * @memberof IApiDRBarItemsState
   */
  disabled?: boolean;

  /**
   * @description 是否展示
   * @type {boolean}
   * @default true
   * @memberof IApiDRBarItemsState
   */
  visible?: boolean;

  /**
   * @description 标识
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  dataAccessAction?: string;

  /**
   * @description 图片资源
   * @type {ISysImage}
   * @default {}
   * @memberof IApiDRBarItemsState
   */
  sysImage?: ISysImage;

  /**
   *
   * @description 子成员
   * @type {IDRBarItemsState[]}
   * @default []
   * @memberof IApiDRBarItemsState
   */
  children?: IApiDRBarItemsState[];

  /**
   * @description 全路径
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  fullPath?: string;

  /**
   * @description 计数器标识
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  counterId?: string;

  /**
   * @description 启用模式
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  enableMode?: string;

  /**
   * @description 实体逻辑
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  testAppDELogicId?: string;

  /**
   * @description 脚本代码
   * @type {string}
   * @default ''
   * @memberof IApiDRBarItemsState
   */
  testScriptCode?: string;

  /**
   * @description 计数器模式
   * @type {number}
   * @default undefined
   * @memberof IApiDRBarItemsState
   */
  counterMode?: number;
}

/**
 * @description 关系栏状态接口
 * @primary
 * @export
 * @interface IApiDrBarState
 * @extends {IApiControlState}
 */
export interface IApiDRBarState extends IApiControlState {
  /**
   * @description 默认显示的项的id
   * @type {string}
   * @memberof IApiDrBarState
   */
  defaultItem: string;

  /**
   * @description 当前选中项的 tag 标识（与 IApiDRBarItemsState.tag 对应）
   * @type {string}
   * @memberof IApiDrBarState
   */
  selectedItem: string;

  /**
   * @description 隐藏编辑项
   * @type {boolean}
   * @memberof IApiDrBarState
   */
  hideEditItem?: boolean;

  /**
   * @description 导航数据
   * @type {string}
   * @memberof IApiDrBarState
   */
  srfnav: string;

  /**
   * @description 关系项集合
   * @type {IApiDRBarItemsState[]}
   * @memberof IApiDrBarState
   */
  drBarItems: IApiDRBarItemsState[];

  /**
   * @description 是否已计算项权限
   * @type {boolean}
   * @memberof IApiDrBarState
   */
  isCalculatedPermission?: boolean;
}
