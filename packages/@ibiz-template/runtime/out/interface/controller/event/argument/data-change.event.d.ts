import { EventBase } from './base.event';
export interface DataChangeEvent extends EventBase {
    /**
     * 变更行为类型
     * @author lxm
     * @date 2023-03-26 01:24:06
     * @type {('LOAD' | 'LOADDRAFT' | 'REMOVE' | 'SAVE' | string)}
     */
    actionType: 'LOAD' | 'LOADDRAFT' | 'REMOVE' | 'SAVE';
}
//# sourceMappingURL=data-change.event.d.ts.map