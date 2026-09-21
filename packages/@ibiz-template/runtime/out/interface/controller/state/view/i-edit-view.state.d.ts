import { IViewState } from './i-view.state';
/**
 * 编辑视图UI状态
 *
 * @export
 * @interface IEditViewState
 * @extends {IViewState}
 */
export interface IEditViewState extends IViewState {
    /**
     * 是否为复制模式
     *
     * @author chitanda
     * @date 2023-09-26 17:09:21
     * @type {boolean}
     */
    copyMode?: boolean;
}
//# sourceMappingURL=i-edit-view.state.d.ts.map