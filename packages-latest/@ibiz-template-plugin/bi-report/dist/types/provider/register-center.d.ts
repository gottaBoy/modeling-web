import { IReportChartProvider } from '../interface';
type NewProvider = (...args: any[]) => IReportChartProvider;
/**
 * 适配器注册中心
 *
 * @author tony001
 * @date 2024-05-21 15:05:08
 * @export
 * @class RegisterCenter
 */
export declare class RegisterCenter {
    /**
     * 适配器存储Map
     *
     * @author tony001
     * @date 2024-05-21 15:05:30
     * @protected
     * @type {Map<string, NewProvider>}
     */
    protected providers: Map<string, NewProvider>;
    /**
     * 注册适配器
     *
     * @author tony001
     * @date 2024-05-21 15:05:47
     * @param {string} key
     * @param {NewProvider} newProvider
     */
    register(key: string, newProvider: NewProvider): void;
    /**
     * 注销适配器
     *
     * @author tony001
     * @date 2024-05-21 15:05:22
     * @param {string} key
     */
    unRegister(key: string): void;
    /**
     * 获取注册器
     *
     * @author tony001
     * @date 2024-05-21 15:05:53
     * @param {string} key
     * @param {...Parameters<NewProvider>} args
     * @return {*}  {(IReportChartProvider | undefined)}
     */
    get(key: string, ...args: Parameters<NewProvider>): IReportChartProvider | undefined;
}
export {};
