import { IAppCounter } from './iapp-counter';
import { ISysCounterRef } from '../../control/counter/isys-counter-ref';
/**
 *
 * @export
 * @interface IAppCounterRef
 */
export interface IAppCounterRef extends ISysCounterRef {
    /**
     * 应用计数器
     *
     * @type {IAppCounter}
     * 来源  getPSAppCounter
     */
    appCounter?: IAppCounter;
}
