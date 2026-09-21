import { IAppCounterRef } from '../app/control/iapp-counter-ref';
import { IAppViewEngine } from '../app/view/iapp-view-engine';
import { IAppViewLogic } from '../app/view/iapp-view-logic';
import { IAppViewRef } from '../app/view/iapp-view-ref';
import { IControl } from './icontrol';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件容器模型基础对象接口
 * @export
 * @interface IControlContainer
 */
export interface IControlContainer extends IModelObject {
  /**
   * 计数器引用集合
   *
   * @type {IAppCounterRef[]}
   * 来源  getPSAppCounterRefs
   */
  appCounterRefs?: IAppCounterRef[];

  /**
   * 视图界面引擎集合
   *
   * @type {IAppViewEngine[]}
   * 来源  getPSAppViewEngines
   */
  appViewEngines?: IAppViewEngine[];

  /**
   * 视图逻辑集合
   *
   * @type {IAppViewLogic[]}
   * 来源  getPSAppViewLogics
   */
  appViewLogics?: IAppViewLogic[];

  /**
   * 视图对象引用
   *
   * @type {IAppViewRef[]}
   * 来源  getPSAppViewRefs
   */
  appViewRefs?: IAppViewRef[];

  /**
   * 根部件集合
   *
   * @type {IControl[]}
   * 来源  getPSControls
   */
  controls?: IControl[];
}
