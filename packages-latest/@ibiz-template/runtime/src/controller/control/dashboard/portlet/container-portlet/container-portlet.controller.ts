import { IDBContainerPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiPortletContainerController } from '../../../../../interface';
/**
 * @description 门户部件控制器（容器）
 * @export
 * @class ContainerPortletController
 * @extends {PortletPartController<IDBContainerPortletPart>}
 * @implements {IApiPortletContainerController}
 */
export class ContainerPortletController
  extends PortletPartController<IDBContainerPortletPart>
  implements IApiPortletContainerController {}
