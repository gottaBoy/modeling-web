import { CTX } from '../../../controller';
import { IApiOverlayContainerOptions } from '../../api';

/**
 * @description 覆盖容器配置参数
 * @export
 * @interface IOverlayContainerOptions
 * @extends {IApiOverlayContainerOptions}
 */
export interface IOverlayContainerOptions extends IApiOverlayContainerOptions {
  /**
   * @description 上下文环境对象
   * @type {CTX}
   * @memberof IOverlayContainerOptions
   */
  ctx?: CTX;
}
