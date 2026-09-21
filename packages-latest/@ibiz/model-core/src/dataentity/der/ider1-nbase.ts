import { IDERBase } from './iderbase';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 1对多关系接口基类
 * @export
 * @interface IDER1NBase
 */
export interface IDER1NBase extends IDERBase {
  /**
   * 克隆次序
   * @type {number}
   * @default -1
   * 来源  getCloneOrder
   */
  cloneOrder?: number;

  /**
   * 自定义导出次序
   * @type {number}
   * @default -1
   * 来源  getCustomExportOrder
   */
  customExportOrder?: number;

  /**
   * 自定义导出次序2
   * @type {number}
   * @default -1
   * 来源  getCustomExportOrder2
   */
  customExportOrder2?: number;

  /**
   * 主控次序
   * @type {number}
   * @default -1
   * 来源  getMasterOrder
   */
  masterOrder?: number;

  /**
   * 主从关系类型
   * @description 值模式 [实体1：N关系主从关系类型] {1：附属关系、 2：附属关系(N:N连接)、 4：数据访问控制、 8：嵌套操作、 16：递归关系、 32：关联通知、 64：附属扩展、 128：限定版本、 256：引用检查、 1024：继承模式、 1048576：自定义、 2097152：自定义2、 4194304：自定义3、 8388608：自定义4 }
   * @type {( number | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1024 | 1048576 | 2097152 | 4194304 | 8388608)}
   * 来源  getMasterRS
   */
  masterRS?:
    | number
    | 1
    | 2
    | 4
    | 8
    | 16
    | 32
    | 64
    | 128
    | 256
    | 1024
    | 1048576
    | 2097152
    | 4194304
    | 8388608;

  /**
   * 删除拒绝消息语言标记
   * @type {string}
   * 来源  getRRMLanResTag
   */
  rrmlanResTag?: string;

  /**
   * 删除拒绝消息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getRRMPSLanguageRes
   */
  rrmlanguageRes?: ILanguageRes;

  /**
   * 删除方式
   * @description 值模式 [实体1：N关系主实体删除关系实体操作] {0：无操作、 1：同时删除、 2：置空、 3：限制删除 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * 来源  getRemoveActionType
   */
  removeActionType?: number | 0 | 1 | 2 | 3;

  /**
   * 删除次序
   * @type {number}
   * 来源  getRemoveOrder
   */
  removeOrder?: number;

  /**
   * 删除拒绝消息
   * @type {string}
   * 来源  getRemoveRejectMsg
   */
  removeRejectMsg?: string;
}
