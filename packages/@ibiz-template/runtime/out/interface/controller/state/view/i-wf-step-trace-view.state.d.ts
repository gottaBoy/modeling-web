import { IViewState } from './i-view.state';
/**
 * 应用流程跟踪视图UI状态
 *
 * @export
 * @class IWFDynaActionViewState
 * @extends {IViewState}
 */
export interface IWFStepTraceViewState extends IViewState {
    /**
     * 工作流历史数据
     * @return {*}
     * @author: zhujiamin
     */
    historyData: IData | null;
}
//# sourceMappingURL=i-wf-step-trace-view.state.d.ts.map