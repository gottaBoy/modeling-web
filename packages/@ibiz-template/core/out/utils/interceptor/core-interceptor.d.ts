import { InternalAxiosRequestConfig } from 'axios';
import { Interceptor } from './interceptor';
/**
 * 核心包拦截器
 *
 * @author lxm
 * @date 2022-10-27 17:10:48
 * @export
 * @class CoreInterceptor
 * @extends {Interceptor}
 */
export declare class CoreInterceptor extends Interceptor {
    protected onBeforeRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
}
//# sourceMappingURL=core-interceptor.d.ts.map