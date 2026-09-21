import { IApiOpenViewUtil } from '../../api';
import { IOpenViewOptions } from '../../common';
import { IViewController } from '../../controller';

/**
 * @description 打开视图工具类
 * @export
 * @interface IOpenViewUtil
 * @extends {IApiOpenViewUtil}
 */
export interface IOpenViewUtil extends IApiOpenViewUtil {
  /**
   * @description 校验是否可以打开视图
   * @param {IViewController} topView
   * @param {string} appViewId
   * @param {IContext} context
   * @param {IParams} [params]
   * @param {IOpenViewOptions} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IOpenViewUtil
   */
  verify(
    topView: IViewController,
    appViewId: string,
    context: IContext,
    params?: IParams,
    opts?: IOpenViewOptions,
  ): Promise<boolean>;
}
