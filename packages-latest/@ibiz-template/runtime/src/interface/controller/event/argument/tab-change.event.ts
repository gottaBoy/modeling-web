import { IDETabViewPanel } from '@ibiz/model-core';
import { EventBase } from './base.event';

export interface TabChangeEvent extends EventBase {
  /**
   * 分页导航项
   *
   * @author tony001
   * @date 2024-04-14 00:04:57
   * @type {IDETabViewPanel}
   */
  tab: IDETabViewPanel;
}
