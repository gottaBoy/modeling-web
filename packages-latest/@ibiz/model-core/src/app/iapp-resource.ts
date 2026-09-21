import { IModelObject } from '../imodel-object';

/**
 *
 * 应用预置资源模型对象接口
 * @export
 * @interface IAppResource
 */
export interface IAppResource extends IModelObject {
  /**
   * 资源内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;

  /**
   * 资源标记
   * @type {string}
   * 来源  getResTag
   */
  resTag?: string;

  /**
   * 资源类型
   * @description 值模式 [应用资源类型] {IMAGE：图片、 STRING：字符串、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4、 USER5：用户自定义5、 USER6：用户自定义6、 USER7：用户自定义7、 USER8：用户自定义8、 USER9：用户自定义9 }
   * @type {( string | 'IMAGE' | 'STRING' | 'USER' | 'USER2' | 'USER3' | 'USER4' | 'USER5' | 'USER6' | 'USER7' | 'USER8' | 'USER9')}
   * 来源  getResourceType
   */
  resourceType?:
    | string
    | 'IMAGE'
    | 'STRING'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4'
    | 'USER5'
    | 'USER6'
    | 'USER7'
    | 'USER8'
    | 'USER9';
}
