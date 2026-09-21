import { IAlertParams, PanelItemState } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';

/**
 * @description 协同占位状态
 * @primary
 * @export
 * @class CoopPosState
 * @extends {PanelItemState}
 */
export class CoopPosState extends PanelItemState {
  /**
   * @description alert标识
   * @exposedoc
   * @type {string}
   * @memberof CoopPosState
   */
  key: string = createUUID();

  /**
   * @description 消息模式，显示操作人员模式下使用
   * @exposedoc
   * @type {string[]}
   * @memberof CoopPosState
   */
  messageModes: string[] | undefined = undefined;

  /**
   * @description 消息map
   * @exposedoc
   * @type {Map<string, IData>}
   * @memberof CoopPosState
   */
  messageMap: Map<string, IData> = new Map();

  /**
   * 提示参数
   *
   * @author zhanghengfeng
   * @date 2024-04-03 17:04:55
   * @type {IAlertParams}
   */
  alertParams: IAlertParams = {
    data: {
      action: 'VIEW',
      entity: '',
      key: '',
      time: 0,
      username: '',
    },
  };
}
