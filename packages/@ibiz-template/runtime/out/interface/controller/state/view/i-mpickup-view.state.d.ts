import { IViewState } from './i-view.state';
/**
 * 数据多项选择视图UI状态
 *
 * @author zk
 * @date 2023-05-25 03:05:39
 * @export
 * @interface IMPickUpViewState
 * @extends {IViewState}
 */
export interface IMPickupViewState extends IViewState {
    /**
     * 选中数据
     *
     * @author zk
     * @date 2023-05-25 05:05:10
     * @type {IData[]}
     * @memberof IMPickupViewState
     */
    selectData: IData[];
}
//# sourceMappingURL=i-mpickup-view.state.d.ts.map