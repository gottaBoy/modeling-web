import { Application } from '../../../application';
import { AppCounter } from './app-counter';
/**
 * 应用实体计数器
 *
 * @author chitanda
 * @date 2022-10-26 18:10:51
 * @export
 * @class AppCounter
 */
export declare class AppDECounter extends AppCounter {
    protected app: Application;
    protected appDataEntityId: string;
    protected action: string;
    /**
     * 计数器初始化
     *
     * @author chitanda
     * @date 2022-10-26 19:10:24
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    init(context?: IContext, params?: IParams): Promise<void>;
    /**
     * 加载计数器
     *
     * @author chitanda
     * @date 2022-10-26 19:10:38
     * @protected
     * @return {*}  {Promise<IData>}
     */
    protected load(): Promise<IData>;
}
//# sourceMappingURL=app-de-counter.d.ts.map