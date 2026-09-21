/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpResponse, RuntimeModelError } from '@ibiz-template/core';
import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { calcResPath } from '../../../utils';
import { MethodInput } from './method-input';
import { MethodReturn } from './method-renturn';
import { IAppDEService, IAppService, IDataEntity } from '../../../../interface';

/**
 * 应用实体方法
 *
 * @author chitanda
 * @date 2022-10-10 11:10:43
 * @export
 * @class Method
 */
export abstract class Method {
  protected app!: IAppService;

  /**
   * 输入 DTO
   *
   * @author chitanda
   * @date 2022-10-10 19:10:35
   * @public
   * @type {MethodInput}
   */
  public input!: MethodInput;

  /**
   * 输出 DTO
   *
   * @author chitanda
   * @date 2022-10-10 19:10:42
   * @public
   * @type {MethodReturn}
   */
  public result!: MethodReturn;

  /**
   * Creates an instance of Method.
   *
   * @author chitanda
   * @date 2023-12-22 12:12:06
   * @param {IAppDEService} service 当前服务实例
   * @param {IAppDataEntity} entity
   * @param {IAppDEMethod} method
   */
  constructor(
    protected service: IAppDEService,
    protected entity: IAppDataEntity,
    protected method: IAppDEMethod,
    protected isLocalMode: boolean = false,
  ) {
    this.app = ibiz.hub.getApp(entity.appId);
    this.input = new MethodInput(service, entity, method);
    this.result = new MethodReturn(service, entity, method);
  }

  /**
   * 执行行为
   *
   * @author lxm
   * @date 2023-10-19 02:42:49
   * @abstract
   * @param {IContext} context 上下文
   * @param {(IData | IData[])} [params] 请求参数
   * @param {IParams} [params2] 查询参数
   * @return {*}  {Promise<HttpResponse>}
   */
  abstract exec(
    context: IContext,
    params?: IData | IData[],
    params2?: IParams,
    header?: IData,
  ): Promise<HttpResponse>;

  /**
   * 发送请求
   *
   * @author chitanda
   * @date 2022-10-10 17:10:44
   * @protected
   * @param {string} path
   * @param {IContext} context
   * @param {IData} data
   * @param {IParams} params
   * @return {*}  {Promise<HttpResponse<any>>}
   */
  protected async request(
    path: string,
    context: IContext,
    data?: IData | IData[],
    params?: IParams,
    header?: IData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<HttpResponse<any>> {
    const { actionType, requestMethod } = this.method as IModel;
    if (actionType === 'REMOTE') {
      const methodName = this.method.requestPath;
      let res: HttpResponse | null = null;
      switch (requestMethod) {
        case 'POST':
          res = await this.app.net.post(
            this.mergeRequestPath(path, methodName),
            data || params || {},
            {},
            header,
          );
          break;
        case 'GET':
          res = await this.app.net.get(
            this.mergeRequestPath(path, methodName),
            data || params,
            header,
          );
          break;
        case 'PUT': {
          res = await this.app.net.put(
            this.mergeRequestPath(path, methodName),
            data || params || {},
            header,
          );
          break;
        }
        case 'DELETE':
          res = await this.app.net.delete(
            this.mergeRequestPath(path, methodName),
            data || params,
          );
          break;
        default:
          if (requestMethod) {
            throw new RuntimeModelError(
              this.method,
              ibiz.i18n.t('runtime.service.requestMethods', { requestMethod }),
            );
          } else {
            throw new RuntimeModelError(
              this.method,
              ibiz.i18n.t('runtime.service.noConfiguredRequestMethod'),
            );
          }
      }
      return res;
    }
    // 脚本代码不做处理（预防脚本写法混乱，走前附加和后附加）
    if (actionType === 'SCRIPT') {
      return new HttpResponse(data);
    }
    throw new RuntimeModelError(
      this.method,
      ibiz.i18n.t('runtime.service.unsupportedBehaviorTypes', { actionType }),
    );
  }

  /**
   * 合并请求路径
   * @author lionlau
   * @param path
   * @param methodName 方法名，以 / 开始
   * @returns
   */
  protected mergeRequestPath(path: string, methodName?: string): string {
    return methodName ? `${path}${methodName}` : `${path}`;
  }

  /**
   * 根据上下文计算当前请求路径
   *
   * @author chitanda
   * @date 2022-08-24 18:08:46
   * @protected
   * @param {IContext} context
   * @return {*}  {string} 拼接结果说明: /祖父实体/祖父实体主键/爷爷实体/爷爷实体主键/父实体/父实体主键/当前实体
   */
  protected calcPath(context: IContext): string {
    const curPath = `/${this.entity.deapicodeName2}`;
    const resPath = calcResPath(context, this.entity);
    return resPath + curPath;
  }

  /**
   * 创建实体
   * @author lxm
   * @date 2023-10-19 03:22:00
   * @protected
   * @param {(IData[] | IDataEntity[] | IData | IDataEntity)} data
   * @return {*}  {(IDataEntity | IDataEntity[])}
   */
  protected createEntity(
    data: IData[] | IDataEntity[] | IData | IDataEntity,
  ): IDataEntity | IDataEntity[] {
    return this.service.createEntity(data);
  }

  /**
   * 计算多数据主键，根据；分隔
   *
   * @protected
   * @param {IContext} context
   * @param {IParams} [params]
   * @return {*}  {string[]}
   * @memberof Method
   */
  protected calcMultiData(context: IContext, params?: IParams): string[] {
    let key = '';
    if (params) {
      key = params[this.entity.keyAppDEFieldId!.toLowerCase()];
    }
    if (!key && context) {
      key = context[this.entity.codeName!.toLowerCase()];
    }
    return key.split(';');
  }
}
