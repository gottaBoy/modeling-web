import { IAppDEMethodDTOField } from './iapp-demethod-dtofield';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体方法DTO对象接口
 * @export
 * @interface IAppDEMethodDTO
 */
export interface IAppDEMethodDTO extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * DTO对象属性集合
   *
   * @type {IAppDEMethodDTOField[]}
   * 来源  getPSAppDEMethodDTOFields
   */
  appDEMethodDTOFields?: IAppDEMethodDTOField[];

  /**
   * 引用应用实体DTO
   *
   * @type {string}
   * 来源  getRefPSAppDEMethodDTO
   */
  refAppDEMethodDTOId?: string;

  /**
   * 引用应用实体
   *
   * @type {string}
   * 来源  getRefPSAppDataEntity
   */
  refAppDataEntityId?: string;

  /**
   * 实体方法DTO对象来源类型
   * @description 值模式 [实体方法DTO来源类型] {DE：实体、 DYNAMODEL：动态模型、 DEACTIONINPUT：实体行为参数、 DEFILTER：实体过滤器、 REFDE：引用实体、 DEDATASETINPUT：实体数据集参数 }
   * @type {( string | 'DE' | 'DYNAMODEL' | 'DEACTIONINPUT' | 'DEFILTER' | 'REFDE' | 'DEDATASETINPUT')}
   * 来源  getSourceType
   */
  sourceType?:
    | string
    | 'DE'
    | 'DYNAMODEL'
    | 'DEACTIONINPUT'
    | 'DEFILTER'
    | 'REFDE'
    | 'DEDATASETINPUT';

  /**
   * 源应用DTO
   *
   * @type {string}
   * 来源  getSrcPSAppMethodDTO
   */
  srcAppMethodDTOId?: string;

  /**
   * 类型
   * @description 值模式 [实体方法DTO类型] {DEFAULT：实体默认、 DEACTIONINPUT：实体行为自定义参数、 DEFILTER：实体过滤器、 DEDATASETINPUT：实体数据集自定义参数 }
   * @type {( string | 'DEFAULT' | 'DEACTIONINPUT' | 'DEFILTER' | 'DEDATASETINPUT')}
   * 来源  getType
   */
  type?: string | 'DEFAULT' | 'DEACTIONINPUT' | 'DEFILTER' | 'DEDATASETINPUT';
}
