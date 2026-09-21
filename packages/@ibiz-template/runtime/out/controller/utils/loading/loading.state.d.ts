/**
 * loading状态控制类
 *
 * @author lxm
 * @date 2022-09-19 11:09:35
 * @export
 * @class LoadingState
 */
export declare class LoadingState {
    /**
     * 当前的loading状态，多次loading叠加时，只有所有loading都结束才会变回false。
     *
     * @author lxm
     * @date 2022-09-19 11:09:43
     * @readonly
     * @type {boolean}
     */
    isLoading: boolean;
    /**
     * loading计数器
     *
     * @author lxm
     * @date 2022-09-19 11:09:08
     * @private
     */
    private counter;
    /**
     * 开始loading
     *
     * @author lxm
     * @date 2022-09-19 11:09:55
     */
    begin(): void;
    /**
     * 结束loading
     *
     * @author lxm
     * @date 2022-09-19 11:09:34
     */
    end(): void;
}
//# sourceMappingURL=loading.state.d.ts.map