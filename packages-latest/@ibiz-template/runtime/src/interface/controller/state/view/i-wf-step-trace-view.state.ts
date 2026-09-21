import { IApiWFStepTraceViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 应用流程跟踪视图UI状态
 * @export
 * @interface IWFStepTraceViewState
 * @extends {IViewState}
 * @extends {IApiWFStepTraceViewState}
 */
export interface IWFStepTraceViewState
  extends IViewState,
    IApiWFStepTraceViewState {
  /**
   * 工作流历史数据
   * @return {*}
   * @author: zhujiamin
   */
  historyData: IData | null;
}
