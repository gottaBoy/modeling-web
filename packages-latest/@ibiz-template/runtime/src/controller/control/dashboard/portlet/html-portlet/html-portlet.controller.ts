import { IDBHtmlPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiHtmlPortletController } from '../../../../../interface';
/**
 * @description 门户部件控制器（网页）
 * @export
 * @class HtmlPortletController
 * @extends {PortletPartController<IDBHtmlPortletPart>}
 * @implements {IApiHtmlPortletController}
 */
export class HtmlPortletController
  extends PortletPartController<IDBHtmlPortletPart>
  implements IApiHtmlPortletController {}
