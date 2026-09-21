/**
 * 数据能力方法的通用入参
 * @author lxm
 * @date 2023-05-23 02:52:26
 * @export
 * @interface IDataAbilityParams
 */
export interface IDataAbilityParams {
    /**
     * 当前这次操作附加的上下文参数
     * @author lxm
     * @date 2023-03-21 05:53:33
     * @type {IParams}
     */
    context?: IContext;
    /**
     * 当前这次操作附加的视图参数
     * @author lxm
     * @date 2023-03-21 05:54:23
     * @type {IParams}
     */
    viewParam?: IParams;
    /**
     * 执行能力使用的数据集合
     * 没有则使用数据部件自身的数据或选中数据
     * @author lxm
     * @date 2023-03-21 05:54:33
     * @type {IData[]}
     */
    data?: IData[] | IData;
    /**
     * 是否静默执行，不出loading效果，不弹成功提示
     * @author lxm
     * @date 2023-11-10 06:35:27
     * @type {boolean}
     */
    silent?: boolean;
}
//# sourceMappingURL=i-data-ability-params.d.ts.map