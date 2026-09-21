import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 表格导航栏适配器
 *
 * @author zk
 * @date 2023-05-29 02:05:26
 * @export
 * @class GridExpBarProvider
 * @implements {IControlProvider}
 */
export class GridExpBarProvider implements IControlProvider {
  component: string = 'IBizGridExpBarControl';
}
