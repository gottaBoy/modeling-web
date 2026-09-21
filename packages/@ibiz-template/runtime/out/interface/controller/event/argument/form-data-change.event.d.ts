import { EventBase } from './base.event';
export interface FormDataChangeEvent extends EventBase {
    /**
     * 值变更名称
     *
     * @author tony001
     * @date 2024-11-27 13:11:09
     * @type {string}
     */
    name: string;
    /**
     * 新值
     *
     * @author tony001
     * @date 2024-11-27 13:11:32
     * @type {*}
     */
    value: any;
    /**
     * 老值
     *
     * @author tony001
     * @date 2024-11-30 11:11:27
     * @type {*}
     */
    oldValue: any;
}
//# sourceMappingURL=form-data-change.event.d.ts.map