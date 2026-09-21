import { IViewProvider } from '@ibiz-template/runtime';

/**
 * 实体html视图适配器
 *
 * @author fzh
 * @date 2024-08-21 18:00:57
 * @export
 * @class HtmlViewProvider
 * @implements {IViewProvider}
 */
export class HtmlViewProvider implements IViewProvider {
  component: string = 'IBizHtmlView';
}
