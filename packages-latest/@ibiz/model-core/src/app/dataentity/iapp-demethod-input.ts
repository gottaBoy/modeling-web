import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体方法输入模型对象接口
 * @export
 * @interface IAppDEMethodInput
 */
export interface IAppDEMethodInput extends IModelObject {
  /**
   * 输入主键属性
   *
   * @type {string}
   * 来源  getKeyPSAppDEField
   */
  keyAppDEFieldId?: string;

  /**
   * 输入DTO对象
   *
   * @type {string}
   * 来源  getPSAppDEMethodDTO
   */
  appDEMethodDTOId?: string;

  /**
   * 输入类型
   * @description 值模式 [实体方法输入类型] {NONE：没有输入、 KEYFIELD：主键属性、 KEYFIELDS：主键属性集合、 DTO：DTO对象、 DTOS：DTO对象集合、 FILTER：搜索过滤对象、 UNKNOWN：未知、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'NONE' | 'KEYFIELD' | 'KEYFIELDS' | 'DTO' | 'DTOS' | 'FILTER' | 'UNKNOWN' | 'USER' | 'USER2')}
   * 来源  getType
   */
  type?:
    | string
    | 'NONE'
    | 'KEYFIELD'
    | 'KEYFIELDS'
    | 'DTO'
    | 'DTOS'
    | 'FILTER'
    | 'UNKNOWN'
    | 'USER'
    | 'USER2';

  /**
   * 同时为结果输出
   * @type {boolean}
   * @default false
   * 来源  isOutput
   */
  output?: boolean;
}
