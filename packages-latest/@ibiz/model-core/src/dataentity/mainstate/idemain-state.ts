import { IDEMainStateOPPriv } from './idemain-state-oppriv';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体主状态模型对象接口
 * @export
 * @interface IDEMainState
 */
export interface IDEMainState extends IModelObject {
  /**
   * 行为拒绝消息
   * @type {string}
   * 来源  getActionDenyMsg
   */
  actionDenyMsg?: string;

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 进入状态模式
   * @description 值模式 [进入状态模式] {ANY：任意、 SOME：指定 }
   * @type {( string | 'ANY' | 'SOME')}
   * 来源  getEnterStateMode
   */
  enterStateMode?: string | 'ANY' | 'SOME';

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 主状态标记
   * @type {string}
   * 来源  getMSTag
   */
  mstag?: string;

  /**
   * 主状态类型
   * @description 值模式 [实体主状态类型] {0：常规、 1：实体默认、 2：锁定控制、 3：关闭控制 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getMSType
   */
  mstype?: number | 0 | 1 | 2 | 3;

  /**
   * 操作标识拒绝消息
   * @type {string}
   * 来源  getOPPrivDenyMsg
   */
  opprivDenyMsg?: string;

  /**
   * 排序值
   * @type {number}
   * @default 99999
   * 来源  getOrderValue
   */
  orderValue?: number;

  /**
   * 主状态控制操作标识集合
   *
   * @type {IDEMainStateOPPriv[]}
   * 来源  getPSDEMainStateOPPrivs
   */
  demainStateOPPrivs?: IDEMainStateOPPriv[];

  /**
   * 前序状态集合
   *
   * @type {string[]}
   * 来源  getPrevPSDEMainStates
   */
  prevDEMainStateIds?: string[];

  /**
   * 状态2值
   * @type {string}
   * 来源  getState2Value
   */
  state2Value?: string;

  /**
   * 状态3值
   * @type {string}
   * 来源  getState3Value
   */
  state3Value?: string;

  /**
   * 状态值
   * @type {string}
   * 来源  getStateValue
   */
  stateValue?: string;

  /**
   * 视图操作控制
   * @description 值模式 [实体视图操作控制] {1：支持建立、 2：支持编辑、 4：支持查看、 8：支持删除、 16：支持拷贝、 32：支持行编辑、 64：支持导出、 1024：支持导入、 128：支持打印、 256：支持过滤、 512：支持帮助、 2048：支持启动流程 }
   * @type {( number | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024 | 128 | 256 | 512 | 2048)}
   * 来源  getViewActions
   */
  viewActions?:
    | number
    | 1
    | 2
    | 4
    | 8
    | 16
    | 32
    | 64
    | 1024
    | 128
    | 256
    | 512
    | 2048;

  /**
   * 流程状态模式
   * @description 值模式 [实体主状态流程状态] {0：无、 1：流程中、 2：流程正常结束、 3：流程异常退出 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * 来源  getWFStateMode
   */
  wfstateMode?: number | 0 | 1 | 2 | 3;

  /**
   * 行为允许模式
   * @type {boolean}
   * 来源  isActionAllowMode
   */
  actionAllowMode?: boolean;

  /**
   * 默认主状态
   * @type {boolean}
   * 来源  isDefault
   */
  default?: boolean;

  /**
   * 启用视图操作控制
   * @type {boolean}
   * 来源  isEnableViewActions
   */
  enableViewActions?: boolean;

  /**
   * 属性允许模式
   * @type {boolean}
   * 来源  isFieldAllowMode
   */
  fieldAllowMode?: boolean;

  /**
   * 操作标识允许模式
   * @type {boolean}
   * 来源  isOPPrivAllowMode
   */
  opprivAllowMode?: boolean;
}
