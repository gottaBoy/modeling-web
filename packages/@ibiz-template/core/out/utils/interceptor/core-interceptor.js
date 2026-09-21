import { getToken } from '../util/util';
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
export class CoreInterceptor extends Interceptor {
    async onBeforeRequest(config) {
        config = await super.onBeforeRequest(config);
        const { headers } = config;
        // Set the access token.
        const token = getToken();
        if (token) {
            headers.set(`${ibiz.env.tokenHeader}Authorization`, `${ibiz.env.tokenPrefix}Bearer ${token}`);
        }
        // Set the system ID.
        let systemId = ibiz.env.dcSystem;
        const { orgData } = ibiz;
        if (orgData) {
            if (orgData.systemid) {
                systemId = orgData.systemid;
            }
            if (orgData.orgid) {
                headers.set('srforgid', orgData.orgid);
            }
        }
        headers.set('srfsystemid', systemId);
        return config;
    }
}
