import { EventBase } from './base.event';

export interface DataChangeEvent extends EventBase {
  /**
   * @description 变更行为类型
   * @type {('LOAD' | 'LOADDRAFT' | 'REMOVE' | 'SAVE' | 'NEW' | 'EDIT')}
   * @memberof DataChangeEvent
   */
  actionType: 'LOAD' | 'LOADDRAFT' | 'REMOVE' | 'SAVE' | 'NEW' | 'EDIT';
}
