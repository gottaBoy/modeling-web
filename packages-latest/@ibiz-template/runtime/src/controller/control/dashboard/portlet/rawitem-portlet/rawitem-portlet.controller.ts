import { IDBRawItemPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiRawItemPortletController } from '../../../../../interface';
/**
 * @description 门户部件控制器（直接内容）
 * @export
 * @class RawItemPortletController
 * @extends {PortletPartController<IDBRawItemPortletPart>}
 * @implements {IApiRawItemPortletController}
 */
export class RawItemPortletController
  extends PortletPartController<IDBRawItemPortletPart>
  implements IApiRawItemPortletController {}
