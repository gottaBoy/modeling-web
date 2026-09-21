import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';
/**
 * @description 数据能力方法的通用入参
 * @export
 * @interface IApiDataAbilityParams
 */
export interface IApiDataAbilityParams {
    /**
     * @description 额外传入的上下文参数（会与当前上下文合并）
     * @type {IApiContext}
     * @memberof IApiDataAbilityParams
     */
    context?: IApiContext;
    /**
     * @description 额外传入的视图参数（会覆盖默认视图参数）
     * @type {IApiParams}
     * @memberof IApiDataAbilityParams
     */
    viewParam?: IApiParams;
    /**
     * @description 指定执行的数据集合,若不传，则默认使用控件当前数据或选中数据
     * @type {(IApiData[] | IApiData)}
     * @memberof IApiDataAbilityParams
     */
    data?: IApiData[] | IApiData;
    /**
     * @description 是否静默执行(默认为false,当为true时不显示loading，不弹出成功提示)
     * @type {boolean}
     * @memberof IApiDataAbilityParams
     */
    silent?: boolean;
}
//# sourceMappingURL=i-api-data-ability-params.d.ts.map