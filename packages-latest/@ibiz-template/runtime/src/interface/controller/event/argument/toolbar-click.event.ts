import { EventBase } from './base.event';

/**
 * 工具栏点击事件
 * @author lxm
 * @date 2023-06-19 06:52:13
 * @export
 * @interface ToolbarClickEvent
 * @extends {EventBase}
 */
export interface ToolbarClickEvent extends EventBase {
  eventArg: string;
  event: MouseEvent;
  buttonType: 'deuiaction' | 'extra';
}
