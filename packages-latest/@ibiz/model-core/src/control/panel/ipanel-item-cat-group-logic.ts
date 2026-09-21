import { IPanelItemGroupLogic } from './ipanel-item-group-logic';

/**
 *
 * 面板项分类组合逻辑模型对象接口
 * @export
 * @interface IPanelItemCatGroupLogic
 */
export interface IPanelItemCatGroupLogic extends IPanelItemGroupLogic {
  /**
   * 逻辑类别
   * @description 值模式 [表单成员逻辑类型] {PANELVISIBLE：面板显示、 ITEMENABLE：表单项启用、 ITEMBLANK：表单项空输入、 SCRIPTCODE_CHANGE：表单项值变更（脚本处理）、 SCRIPTCODE_CLICK：表单项点击（脚本处理）、 SCRIPTCODE_FOCUS：表单项获取焦点（脚本处理）、 SCRIPTCODE_BLUR：表单项失去焦点（脚本处理） }
   * @type {( string | 'PANELVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK' | 'SCRIPTCODE_CHANGE' | 'SCRIPTCODE_CLICK' | 'SCRIPTCODE_FOCUS' | 'SCRIPTCODE_BLUR')}
   * 来源  getLogicCat
   */
  logicCat?:
    | string
    | 'PANELVISIBLE'
    | 'ITEMENABLE'
    | 'ITEMBLANK'
    | 'SCRIPTCODE_CHANGE'
    | 'SCRIPTCODE_CLICK'
    | 'SCRIPTCODE_FOCUS'
    | 'SCRIPTCODE_BLUR';

  /**
   * 关联成员名称集合
   *
   * 来源 getRelatedItemNames
   */
  relatedItemNames?: string[];
}
