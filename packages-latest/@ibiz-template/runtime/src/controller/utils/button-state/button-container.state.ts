/* eslint-disable @typescript-eslint/no-explicit-any */

import { IButtonContainerState, IButtonState } from '../../../interface';

/**
 * 按钮容器状态
 * @author lxm
 * @date 2023-05-10 02:19:07
 * @export
 * @class ButtonContainerState
 * @implements {IButtonContainerState}
 */
export class ButtonContainerState implements IButtonContainerState {
  declare visible: boolean;

  declare disabled: boolean;

  declare children: Array<IButtonContainerState | IButtonState>;

  constructor() {
    Object.defineProperty(this, 'children', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: [],
    });

    // 有一个子的visible为true容器的visible就为true,反之false
    let visible = this.computeVisable();
    Object.defineProperty(this, 'visible', {
      enumerable: true,
      configurable: true,
      get: () => {
        return visible;
      },
      set: (value: boolean) => {
        visible = value;
      },
    });
    let disabled = this.computeDisabled();
    Object.defineProperty(this, 'disabled', {
      enumerable: true,
      configurable: true,
      get: () => {
        return disabled;
      },
      set: (value: boolean) => {
        disabled = value;
      },
    });
  }

  // 计算当前项是否显示
  computeVisable(): boolean {
    let visible: boolean = true;
    if (this.children.length === 0) {
      visible = false;
    }
    visible = !!this.children.find(child => child.visible);
    return visible;
  }

  // 计算是否显示
  computeDisabled(): boolean {
    return this.children.every(child => child.disabled);
  }

  addState(name: string, state: IButtonContainerState | IButtonState): void {
    // 设置子状态到本身和数组里
    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: state,
    });
    this.children.push(state);
  }

  setLoading(name: string): void {
    this.children.forEach(child => {
      if ((child as IButtonContainerState).setLoading) {
        (child as IButtonContainerState).setLoading(name);
      } else {
        child.loading = !name ? false : child.name === name;
      }
    });
  }

  async update(
    context: IContext,
    data?: IData,
    appDeId?: string,
    selections?: IData[],
  ): Promise<void> {
    await Promise.all(
      this.children.map(child => {
        return child.update(context, data, appDeId, selections);
      }),
    );
    this.visible = this.computeVisable();
    this.disabled = this.computeDisabled();
  }

  async init(): Promise<void> {
    await Promise.all(
      this.children.map(child => {
        return child.init();
      }),
    );
    this.visible = this.computeVisable();
    this.disabled = this.computeDisabled();
  }

  [p: string]: any;
}
