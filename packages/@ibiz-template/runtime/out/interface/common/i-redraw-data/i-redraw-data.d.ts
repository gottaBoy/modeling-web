/**
 * 重绘数据
 *
 * @export
 * @interface IRedrawData
 */
export interface IRedrawData {
    /**
     * 上下文
     *
     * @type {IParams}
     * @memberof IRedrawData
     */
    context: IParams;
    /**
     * 视图参数
     *
     * @type {IParams}
     * @memberof IRedrawData
     */
    params: IParams;
    /**
     * 重绘数据
     *
     * @type {IData[]}
     * @memberof IRedrawData
     */
    data?: IData[];
    /**
     * 是否重载模型
     *
     * @type {boolean}
     * @memberof IRedrawData
     */
    isReloadModel?: boolean;
}
//# sourceMappingURL=i-redraw-data.d.ts.map