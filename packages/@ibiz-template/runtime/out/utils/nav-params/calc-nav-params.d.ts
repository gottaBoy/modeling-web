import { INavigateParam } from '@ibiz/model-core';
/**
 * 计算导航关系相关模型，得到额外附加的上下文和视图参数
 * @author lxm
 * @date 2023-05-26 11:00:04
 * @export
 * @param {({
 *     deName?: string; 父实体codeName小写
 *     navFilter?: string | undefined; 导航过滤项
 *     pickupDEFName?: string | undefined; 本实体的父实体外键属性小写
 *     navContexts?: INavigateParam[] | null | undefined; 导航上下文参数
 *     navParams?: INavigateParam[] | null | undefined; 导航视图参数
 *   })} model
 * @param {{
 *     derValue?: string; 关系父实体的主键值
 *     context: IContext; 上下文
 *     params: IParams; 视图参数
 *     data: IData; 关系父的数据
 *   }} originParams
 * @return {*}
 */
export declare function calcNavParams(model: {
    /**
     * 实体名称
     */
    deName?: string;
    navFilter?: string | undefined;
    pickupDEFName?: string | undefined;
    navContexts?: INavigateParam[] | null | undefined;
    navParams?: INavigateParam[] | null | undefined;
}, originParams: {
    /**
     * 关系父主键值
     */
    derValue?: string;
    context: IContext;
    params: IParams;
    data: IData;
}): {
    resultContext: IParams;
    resultParams: IParams;
};
//# sourceMappingURL=calc-nav-params.d.ts.map