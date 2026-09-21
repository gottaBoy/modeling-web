import { IAppDEMethod, IAppDataEntity } from '@ibiz/model-core';
import { Method } from '../../service';
import { IAppDEService } from '../service';

/**
 * 额外创建参数
 * @author lxm
 * @date 2023-11-28 03:31:58
 * @export
 * @interface CreateOptions
 */
export interface IDEMethodCreateOptions {
  /**
   * 是否是ac 模式
   * @author lxm
   * @date 2023-11-28 03:32:07
   * @type {boolean}
   */
  acMode: boolean;
  /**
   * 是否为本地模式
   *
   * @author chitanda
   * @date 2023-12-22 15:12:59
   * @type {boolean}
   */
  localMode?: boolean;
}

/**
 * 实体行为适配器的接口
 *
 * @author lxm
 * @date 2022-10-25 13:10:45
 * @export
 * @interface IDEMethodProvider
 */
export interface IDEMethodProvider {
  create(
    service: IAppDEService,
    entity: IAppDataEntity,
    method: IAppDEMethod,
    opts: IDEMethodCreateOptions,
  ): Method;
}
