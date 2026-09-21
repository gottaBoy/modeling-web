import { LogicTrigger } from './logic-trigger';

/**
 * 自定义触发
 * @author lxm
 * @date 2023-07-17 12:53:35
 * @export
 * @class CustomTrigger
 * @extends {LogicTrigger}
 */
export class CustomTrigger extends LogicTrigger {
  declare type: 'CUSTOM';
}
