import { IButtonState } from './i-button.state';
/**
 * 按钮容器的状态
 *
 * @author lxm
 * @date 2022-10-13 19:10:44
 * @export
 * @interface IButtonContainerState
 */
export interface IButtonContainerState {
    /**
     * 是否显示
     *
     * @author lxm
     * @date 2022-10-13 19:10:38
     * @type {boolean}
     */
    visible: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof IButtonContainerState
     */
    disabled: boolean;
    /**
     * 设置当前执行的按钮
     *
     * @author lxm
     * @date 2022-10-13 21:10:45
     * @param {string} name
     */
    setLoading(name: string): void;
    /**
     * 添加子的状态
     *
     * @author lxm
     * @date 2022-10-13 21:10:44
     * @param {string} name 名称标识，会把state绑定到自身的name属性上
     * @param {(IButtonContainerState | IButtonState)} state
     */
    addState(name: string, state: IButtonContainerState | IButtonState): void;
    /**
     * 更新子的状态
     *
     * @param {IContext} context 上下文
     * @param {IData} [data] 后台数据，可能不存在
     * @param {string} [appDeId] 实体标识
     * @return {*}  {Promise<void>}
     * @memberof IButtonContainerState
     */
    update(context: IContext, data?: IData, appDeId?: string): Promise<void>;
    /**
     * 初始化
     * @author lxm
     * @date 2024-02-05 06:36:18
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    [p: string]: any;
}
//# sourceMappingURL=i-button-container.state.d.ts.map