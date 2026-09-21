import { IDELogic } from './idelogic';

/**
 *
 * 实体属性处理逻辑模型对象接口
 * 继承父接口类型值[DEFIELD]
 * @export
 * @interface IDEFLogic
 */
export interface IDEFLogic extends IDELogic {
  /**
   * 属性逻辑模型
   * @description 值模式 [属性逻辑模式] {COMPUTE：计算值、 DEFAULT：默认值、 ONCHANGE：变更触发、 CHECK：检查值、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'COMPUTE' | 'DEFAULT' | 'ONCHANGE' | 'CHECK' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getDEFLogicMode
   */
  deflogicMode?:
    | string
    | 'COMPUTE'
    | 'DEFAULT'
    | 'ONCHANGE'
    | 'CHECK'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';
}
