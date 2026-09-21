import { IAppView } from '@ibiz/model-core';
import { QXEvent } from 'qx-util';
import {
  IViewController,
  IViewEvent,
  IViewStack,
  IViewStackEvent,
  IViewState,
} from '../../interface';

/**
 * 视图堆栈
 *
 * @author chitanda
 * @date 2024-01-18 10:01:47
 * @export
 * @class ViewStack
 */
export class ViewStack implements IViewStack {
  private stackMap: Map<string, IViewController> = new Map();

  private stack: IViewController[] = [];

  private activeStack: IViewController[] = [];

  evt: QXEvent<IViewStackEvent> = new QXEvent();

  add(
    id: string,
    view: IViewController<IAppView, IViewState, IViewEvent>,
  ): void {
    this.stack.push(view);
    this.stackMap.set(id, view);
    this.recalculateActiveStack();
    this.evt.emit('add', view);
    this.evt.emit('change', { type: 'add', view });
  }

  remove(id: string): void {
    const view = this.stackMap.get(id);
    if (view) {
      this.stack.splice(this.stack.indexOf(view), 1);
      this.stackMap.delete(id);
      this.recalculateActiveStack();
      this.evt.emit('remove', view);
      this.evt.emit('change', { type: 'remove', view });
    }
  }

  getActives(): IViewController[] {
    return this.activeStack;
  }

  active(id: string): void {
    const view = this.stackMap.get(id);
    if (view) {
      this.recalculateActiveStack();
      this.evt.emit('active', view);
      this.evt.emit('change', { type: 'active', view });
    }
  }

  deactivate(id: string): void {
    const view = this.stackMap.get(id);
    if (view) {
      this.recalculateActiveStack();
      this.evt.emit('deactivate', view);
      this.evt.emit('change', { type: 'deactivate', view });
    }
  }

  /**
   * 获取视图堆栈里的视图控制器
   * @author lxm
   * @date 2024-04-01 01:15:52
   * @param {string} id
   * @return {*}  {(IViewController | undefined)}
   */
  getView(id: string): IViewController | undefined {
    return this.stackMap.get(id);
  }

  /**
   * @description 根据视图codeName获取视图信息
   * @param {string} codeName
   * @return {*}  {(IViewController | undefined)}
   * @memberof ViewStack
   */
  getViewByCodeName(codeName: string): IViewController | undefined {
    return this.stack.find(
      x => x.model.codeName?.toLowerCase() === codeName.toLowerCase(),
    );
  }

  /**
   * 重新计算激活视图堆栈
   *
   * @author chitanda
   * @date 2024-01-18 14:01:23
   * @protected
   */
  protected recalculateActiveStack(): void {
    this.activeStack = this.stack.filter(item => item.isActive === true);
  }
}
