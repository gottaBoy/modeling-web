import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 甘特图适配器
 *
 * @author zhanghengfeng
 * @date 2023-12-08 15:12:11
 * @export
 * @class GanttProvider
 * @implements {IControlProvider}
 */
export class GanttProvider implements IControlProvider {
  component: string = 'IBizGanttControl';
}
