import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';
/**
 * @description 逻辑通用参数接口
 * @export
 * @interface IApiLogicParams
 */
export interface IApiLogicParams {
    /**
     * @description 上下文参数
     * @type {IApiContext}
     * @memberof IApiLogicParams
     */
    context: IApiContext;
    /**
     * @description 视图参数
     * @type {IApiParams}
     * @memberof IApiLogicParams
     */
    params: IApiParams;
    /**
     * @description 数据集合
     * @type {IApiData[]}
     * @memberof IApiLogicParams
     */
    data: IApiData[];
}
//# sourceMappingURL=i-api-logic-params.d.ts.map