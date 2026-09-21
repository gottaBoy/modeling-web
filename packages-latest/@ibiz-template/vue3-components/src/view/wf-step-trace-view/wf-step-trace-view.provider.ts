import { IViewProvider } from '@ibiz-template/runtime';

/**
 * 应用流程跟踪视图
 *
 * @export
 * @class WFStepTraceViewProvider
 * @implements {IViewProvider}
 */
export class WFStepTraceViewProvider implements IViewProvider {
  component: string = 'IBizWFStepTraceView';
}
