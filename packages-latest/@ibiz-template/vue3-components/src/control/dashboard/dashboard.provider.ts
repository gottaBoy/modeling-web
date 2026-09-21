import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 数据看板适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class DashboardProvider
 * @implements {IControlProvider}
 */
export class DashboardProvider implements IControlProvider {
  component: string = 'IBizDashboardControl';
}
