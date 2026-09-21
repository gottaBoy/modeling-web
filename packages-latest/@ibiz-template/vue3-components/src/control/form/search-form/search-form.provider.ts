import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 搜索表单适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class SearchFormProvider
 * @implements {IControlProvider}
 */
export class SearchFormProvider implements IControlProvider {
  component: string = 'IBizSearchFormControl';
}
