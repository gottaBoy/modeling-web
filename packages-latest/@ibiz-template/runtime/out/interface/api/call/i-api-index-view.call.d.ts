import { IApiViewCall } from './i-api-view.call';
/**
 * @description 应用首页视图能力
 * @export
 * @interface IApiIndexViewCall
 * @extends {IApiViewCall}
 */
export interface IApiIndexViewCall extends IApiViewCall {
    /**
     * @description 切换折叠
     * @type {{
     *     args: undefined;
     *   }}
     * @memberof IApiIndexViewCall
     */
    ToggleCollapse: {
        args: undefined;
    };
}
//# sourceMappingURL=i-api-index-view.call.d.ts.map