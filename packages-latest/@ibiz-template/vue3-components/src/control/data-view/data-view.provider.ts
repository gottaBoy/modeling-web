import { IControlProvider } from '@ibiz-template/runtime';
/**
 * 数据视图（卡片）部件适配器
 *
 * @export
 * @class DataViewControlProvider
 * @implements {IControlProvider}
 */
export class DataViewControlProvider implements IControlProvider {
  component: string = 'IBizDataViewControl';
}
