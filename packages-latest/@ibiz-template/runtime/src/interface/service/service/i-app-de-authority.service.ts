/**
 * 应用实体权限服务接口
 * @author lxm
 * @date 2023-05-15 08:00:08
 * @export
 * @interface IAppDeAuthorityService
 */
export interface IAppDeAuthorityService {
  /**
   * 通过操作标识和数据计算实体权限
   * @author lxm
   * @date 2023-05-10 12:33:10
   * @param {string} dataAccessAction 操作标识
   * @param {IData | undefined} data 实体数据
   * @param {IContext} context 上下文
   * @param {boolean} enablePermission 是否启用权限
   * @return {*}  {Promise<boolean>}
   */
  calcByDataAccessAction(
    dataAccessAction: string,
    data: IData | undefined,
    context: IContext,
    enablePermission: boolean,
  ): Promise<boolean>;

  /**
   * 设置实体数据权限标识
   *
   * @param {IParams} params
   * @param {string} dataAccAction
   * @memberof IAppDeAuthorityService
   */
  setDataAccAction(params: IParams, dataAccAction: string): void;

  /**
   * 获取实体数据权限标识
   *
   * @param {string} key
   * @return {*}  {(string | undefined)}
   * @memberof IAppDeAuthorityService
   */
  getDataAccAction(key: string): string | undefined;

  /**
   * 计算实体附属主实体控制操作标识
   *
   * @author tony001
   * @date 2024-05-30 10:05:24
   * @param {IContext} context
   * @return {*}  {(Promise<string | undefined>)}
   */
  calcMajorDataAccAction(context: IContext): Promise<string | undefined>;

  /**
   * 计算实体数据权限，根据实体数据访问控制方式计算权限
   *
   * @author tony001
   * @date 2024-05-30 10:05:13
   * @param {string} dataAccessAction
   * @param {(IData | undefined)} data
   * @param {IContext} context
   * @return {*}  {Promise<boolean>}
   */
  calcDeDataAccAction(
    dataAccessAction: string,
    data: IData | undefined,
    context: IContext,
  ): Promise<boolean>;

  /**
   * 通过实体主状态计算权限
   *
   * @author tony001
   * @date 2024-05-30 10:05:56
   * @param {string} dataAccessAction
   * @param {IData} data
   * @return {*}  {Promise<boolean>}
   */
  calcByDeMainState(dataAccessAction: string, data: IData): Promise<boolean>;
}
