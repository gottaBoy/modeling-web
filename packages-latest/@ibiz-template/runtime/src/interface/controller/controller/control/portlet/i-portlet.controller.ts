import { IApiPortletController } from '../../../../api';

/**
 * @description 门户部件接口
 * @export
 * @interface IPortletController
 * @extends {IApiPortletController}
 */
export interface IPortletController extends IApiPortletController {
  /**
   * @description 数据变更通知
   * @param {IData} data
   * @returns {*}  {Promise<void>}
   * @memberof IPortletController
   */
  dataChangeNotify(data: IData): Promise<void>;

  /**
   * @description 销毁方法
   * @returns {*}  {Promise<void>}
   * @memberof IPortletController
   */
  destroyed(): Promise<void>;

  /**
   * @description 设置自定义配置
   * @param {IData} config
   * @memberof IPortletController
   */
  setConfig(config: IData): void;
}
