/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBase } from '../argument';

export type CompEventType<T> = {
  [p in keyof T]: {
    event: IParams;
    emitArgs: undefined | IParams;
  };
};

/**
 * @primary
 * @description 组件通用生命周期事件
 * @export
 * @interface IComponentEvent
 */
export interface IComponentEvent {
  /**
   * 初始化完成
   * @description 自身的准备工作完成(如模型加载，各种初始化，init结束)
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IComponentEvent
   */
  onCreated: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * 挂载完成
   * @description 没有下级组件created之后的生命周期,有下级时需要等所有下级组件onMounted完成后触发
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IComponentEvent
   */
  onMounted: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 组件销毁前
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IComponentEvent
   */
  onBeforeDestroy: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * 组件销毁
   * @description 自身组件被销毁时触发
   *
   * @author lxm
   * @date 2022-09-21 16:09:26
   */
  onDestroyed: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * 组件激活
   * @description 自身组件重新激活
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IComponentEvent
   */
  onActivated: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * 组件失活
   * @description 自身组件暂时停用
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IComponentEvent
   */
  onDeactivated: {
    event: EventBase;
    emitArgs: undefined;
  };
}
