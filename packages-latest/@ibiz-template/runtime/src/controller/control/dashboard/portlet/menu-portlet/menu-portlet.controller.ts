import { IDBAppMenuPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiMenuPortletController } from '../../../../../interface';
/**
 * @description 门户部件控制器（菜单）
 * @export
 * @class MenuPortletController
 * @extends {PortletPartController<IDBAppMenuPortletPart>}
 * @implements {IApiMenuPortletController}
 */
export class MenuPortletController
  extends PortletPartController<IDBAppMenuPortletPart>
  implements IApiMenuPortletController {}
