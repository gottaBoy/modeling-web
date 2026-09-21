import { IApiData } from '../../../../global-param';

// 协同消息类型
export type MarkOpenDataAction = 'VIEW' | 'EDIT' | 'UPDATE' | 'CLOSE';
/**
 * @description 协同消息
 * @export
 * @interface IMarkOpenData
 */
export interface IMarkOpenData {
  /**
   * @description 行为类型
   * @type {MarkOpenDataAction}
   * @memberof IMarkOpenData
   */
  action: MarkOpenDataAction;
  /**
   * @description 实体名称
   * @type {string}
   * @memberof IMarkOpenData
   */
  entity: string;
  /**
   * @description 实体主键
   * @type {string}
   * @memberof IMarkOpenData
   */
  key: string;
  /**
   * @description 时间戳
   * @type {number}
   * @memberof IMarkOpenData
   */
  time: number;
  /**
   * @description 消息数据
   * @type {IApiData}
   * @memberof IMarkOpenData
   */
  data?: IApiData;
  /**
   * @description 用户名
   * @type {string}
   * @memberof IMarkOpenData
   */
  username: string;
}
