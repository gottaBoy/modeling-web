import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import {
  IAppDEService,
  IDEMethodCreateOptions,
  IDEMethodProvider,
} from '../../../../../interface';
import { Method } from '../method';
import { AcFetchMethod } from '../ac-fetch';
import { FetchMethod } from '../fetch';

/**
 * 集合适配器
 * @author lxm
 * @date 2023-11-28 03:27:25
 * @export
 * @class FetchDeMethodProvider
 * @implements {IDEMethodProvider}
 */
export class FetchDeMethodProvider implements IDEMethodProvider {
  create(
    service: IAppDEService,
    entity: IAppDataEntity,
    method: IAppDEMethod,
    opts: IDEMethodCreateOptions,
  ): Method {
    if (opts.acMode) {
      return new AcFetchMethod(service, entity, method, opts.localMode);
    }
    return new FetchMethod(service, entity, method, opts.localMode);
  }
}
