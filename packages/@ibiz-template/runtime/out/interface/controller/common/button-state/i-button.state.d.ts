/**
 * 按钮UI状态
 *
 * @author lxm
 * @date 2022-10-13 19:10:30
 * @export
 * @interface IButtonState
 */
export interface IButtonState {
    /**
     * 是否禁用
     *
     * @author lxm
     * @date 2022-10-13 19:10:17
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * 显示与否
     *
     * @author lxm
     * @date 2022-09-28 10:09:58
     * @type {boolean}
     */
    visible: boolean;
    /**
     * 是否显示loading状态
     *
     * @author lxm
     * @date 2022-09-28 10:09:43
     * @type {boolean}
     */
    loading: boolean;
    /**
     * 按钮的唯一标识
     *
     * @author lxm
     * @date 2022-10-13 21:10:15
     * @type {string}
     */
    name: string;
    /**
     * 更新自身状态
     *
     * @param {IContext} context 上下文
     * @param {IData} [data] 后台数据，可能不存在
     * @param {string} [appDeId] 实体标识
     * @return {*}  {Promise<void>}
     * @memberof IButtonState
     */
    update(context: IContext, data?: IData, appDeId?: string): Promise<void>;
    /**
     * 初始化
     * @author lxm
     * @date 2024-02-05 06:37:06
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
}
//# sourceMappingURL=i-button.state.d.ts.map