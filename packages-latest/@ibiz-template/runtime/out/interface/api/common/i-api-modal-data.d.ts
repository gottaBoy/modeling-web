import { IApiData, IApiParams } from '@ibiz-template/core';
/**
 * @description 关闭视图返回数据接口
 * @export
 * @interface IApiModalData
 */
export interface IApiModalData {
    /**
     * @description 关闭视图成功标记,ok=true表示操作成功，信任data数据，ok=false表示操作失败，不信任data数据
     * @type {boolean}
     * @memberof IApiModalData
     */
    ok: boolean;
    /**
     * @description 返回的数据
     * @type {IApiData[]}
     * @memberof IApiModalData
     */
    data?: IApiData[];
    /**
     * @description 额外参数
     * @type {IApiParams}
     * @memberof IApiModalData
     */
    params?: IApiParams;
}
//# sourceMappingURL=i-api-modal-data.d.ts.map