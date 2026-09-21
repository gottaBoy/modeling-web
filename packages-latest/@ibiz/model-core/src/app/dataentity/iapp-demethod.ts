import { IAppDEMethodInput } from './iapp-demethod-input';
import { IAppDEMethodReturn } from './iapp-demethod-return';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体方法模型对象接口
 * @export
 * @interface IAppDEMethod
 */
export interface IAppDEMethod extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 代码名称2
   * @type {string}
   * 来源  getCodeName2
   */
  codeName2?: string;

  /**
   * 方法类型
   * @description 值模式 [实体服务接口成员类型（应用实体方法类型）] {DEACTION：实体行为、 FETCH：实体数据集合、 SELECT：实体数据查询（SELECT）、 FETCHTEMP：实体数据集合（临时）、 SELECTTEMP：实体数据查询（SELECT）（临时）、 WFACTION：流程行为、 FILTERACTION：过滤器行为、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'DEACTION' | 'FETCH' | 'SELECT' | 'FETCHTEMP' | 'SELECTTEMP' | 'WFACTION' | 'FILTERACTION' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getMethodType
   */
  methodType?:
    | string
    | 'DEACTION'
    | 'FETCH'
    | 'SELECT'
    | 'FETCHTEMP'
    | 'SELECTTEMP'
    | 'WFACTION'
    | 'FILTERACTION'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 方法输入对象
   *
   * @type {IAppDEMethodInput}
   * 来源  getPSAppDEMethodInput
   */
  appDEMethodInput?: IAppDEMethodInput;

  /**
   * 方法返回对象
   *
   * @type {IAppDEMethodReturn}
   * 来源  getPSAppDEMethodReturn
   */
  appDEMethodReturn?: IAppDEMethodReturn;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 请求属性
   * @type {string}
   * 来源  getRequestField
   */
  requestField?: string;

  /**
   * 完整请求路径集合
   *
   * 来源 getRequestFullPaths
   */
  requestFullPaths?: string[];

  /**
   * 请求方式
   * @description 值模式 [REST请求方式] {GET：GET、 HEAD：HEAD、 POST：POST、 PUT：PUT、 PATCH：PATCH、 DELETE：DELETE、 OPTIONS：OPTIONS、 TRACE：TRACE }
   * @type {( string | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE')}
   * 来源  getRequestMethod
   */
  requestMethod?:
    | string
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS'
    | 'TRACE';

  /**
   * 参数类型
   * @description 值模式 [服务请求参数类型] {NONE：无参数、 FIELD：指定属性、 FIELDS：指定属性数组、 ENTITY：数据对象、 ENTITIES：数据对象数组、 OBJECT：其它对象、 OBJECTS：其它对象数组 }
   * @type {( string | 'NONE' | 'FIELD' | 'FIELDS' | 'ENTITY' | 'ENTITIES' | 'OBJECT' | 'OBJECTS')}
   * 来源  getRequestParamType
   */
  requestParamType?:
    | string
    | 'NONE'
    | 'FIELD'
    | 'FIELDS'
    | 'ENTITY'
    | 'ENTITIES'
    | 'OBJECT'
    | 'OBJECTS';

  /**
   * 请求路径
   * @type {string}
   * 来源  getRequestPath
   */
  requestPath?: string;

  /**
   * 临时数据模式
   * @description 值模式 [平台部件处理器临时数据模式] {0：无临时数据模式、 1：主数据模式、 2：从数据模式 }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getTempDataMode
   */
  tempDataMode?: number | 0 | 1 | 2;

  /**
   * 预置方法
   * @type {boolean}
   * 来源  isBuiltinMethod
   */
  builtinMethod?: boolean;

  /**
   * 需要提供资源键值
   * @type {boolean}
   * @default false
   * 来源  isNeedResourceKey
   */
  needResourceKey?: boolean;

  /**
   * 无服务代码标识
   * @type {boolean}
   * @default false
   * 来源  isNoServiceCodeName
   */
  noServiceCodeName?: boolean;
}
