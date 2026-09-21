/**
 * 计算动态系统接口参数
 * @author lxm
 * @date 2024-01-25 03:30:18
 * @export
 * @param {string} appDataEntityId 实体id
 * @param {IContext} context 视图上下文
 * @param {{
 *     viewParams?: IParams; 视图参数
 *     appId?: string; 应用id
 *   }} [opts={}]
 */
export declare function calcDynaSysParams(appDataEntityId: string, context: IContext, opts?: {
    viewParams?: IParams;
    appId?: string;
}): Promise<{
    srfkey?: string | undefined;
    srfparentkey?: string | undefined;
    srfparentdename?: string | undefined;
}>;
//# sourceMappingURL=dyna-sys-params.d.ts.map