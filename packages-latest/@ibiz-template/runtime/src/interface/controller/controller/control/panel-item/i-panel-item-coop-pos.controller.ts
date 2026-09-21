import { IMarkOpenData } from '@ibiz-template/core';
import { IPanelItemController } from './i-panel-item.controller';

/**
 * Alert提示参数
 *
 * @author zhanghengfeng
 * @date 2024-04-03 16:04:42
 * @export
 * @interface IAlertParams
 */
export interface IAlertParams {
  /**
   * 标题
   *
   * @author zhanghengfeng
   * @date 2024-04-03 16:04:52
   * @type {string}
   */
  title?: string;

  /**
   * 类型
   *
   * @author zhanghengfeng
   * @date 2024-04-03 16:04:16
   * @type {('success' | 'warning' | 'info' | 'error')}
   */
  type?: 'success' | 'warning' | 'info' | 'error';

  /**
   * 是否可以关闭
   *
   * @author zhanghengfeng
   * @date 2024-04-03 16:04:27
   * @type {boolean}
   */
  closable?: boolean;

  /**
   * 是否显示类型图标
   *
   * @author zhanghengfeng
   * @date 2024-04-03 16:04:38
   * @type {boolean}
   */
  showIcon?: boolean;

  /**
   * 消息数据
   *
   * @type {IMarkOpenData}
   * @memberof IAlertParams
   */
  data: IMarkOpenData;
}

/**
 * 协同编辑消息占位控制器接口
 *
 * @author zhanghengfeng
 * @date 2024-04-03 16:04:00
 * @export
 * @interface IPanelItemCoopPosController
 * @extends {IPanelItemController}
 */
export interface IPanelItemCoopPosController extends IPanelItemController {
  /**
   * 更新消息
   *
   * @author zhanghengfeng
   * @date 2024-04-03 16:04:11
   * @param {IAlertParams} params
   */
  updateMessage(params: IAlertParams): void;

  /**
   * 初始化消息模式
   *
   * @param {string[]} modes
   * @memberof IPanelItemCoopPosController
   */
  initMessageModes(modes: string[]): void;
}
