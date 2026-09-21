import { IDEFormGroupPanel } from './ideform-group-panel';

/**
 *
 * @export
 * @interface IDEFormFormPart
 */
export interface IDEFormFormPart extends IDEFormGroupPanel {
  /**
   * 表单部件类型
   * @description 值模式 [表单部件类型] {FORMRF：表单引用、 DYNASYS：动态系统 }
   * @type {( string | 'FORMRF' | 'DYNASYS')}
   * 来源  getFormPartType
   */
  formPartType?: string | 'FORMRF' | 'DYNASYS';
}
