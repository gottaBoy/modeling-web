/* eslint-disable no-constructor-return */

import { IPanelField } from '@ibiz/model-core';
import { QXEvent } from 'qx-util';

// 更新属性，缺的补充定义
function updateKeyDefine(target: IParams, keys: string[]): void {
  keys.forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined,
      });
    }
  });
}

type ChangeCallBack = (field: string) => void;

/**
 * 面板数据
 * @author lxm
 * @date 2023-11-01 05:13:53
 * @export
 * @class PanelData
 */
export class PanelData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;

  /**
   * 事件
   * @author lxm
   * @date 2023-11-02 02:35:33
   * @protected
   */
  declare _evt: QXEvent<{ change: ChangeCallBack }>;

  constructor(fields: IPanelField[], origin: IParams) {
    const _evt = new QXEvent<{ change: ChangeCallBack }>();

    // 面板属性映射绑定项
    const keyMap: Record<string, string | undefined> = {};
    // 绑定项映射面板属性
    const reverseKeyMap: Record<string, string> = {};

    fields.forEach(field => {
      keyMap[field.id!] = field.viewFieldName?.toLowerCase();
      if (field.viewFieldName) {
        reverseKeyMap[field.viewFieldName.toLowerCase()] = field.id!;
      }
    });

    return new Proxy(this, {
      set(target: PanelData, p: string, value: unknown): boolean {
        if (Object.prototype.hasOwnProperty.call(keyMap, p)) {
          if (keyMap[p]) {
            // 有面板属性有绑定数据项修改原始对象
            origin[keyMap[p]!] = value;
          } else {
            // 有面板属性没有绑定数据项的改自身
            target[p] = value;
          }
        } else {
          // 没有面板属性的直接修改原始对象，视图面板对象一开始就是空的，没有任何属性
          origin[p] = value;
        }
        _evt.emit('change', p);
        // 修改面板属性，同步抛原值变更
        if (keyMap[p] && keyMap[p] !== p) {
          _evt.emit('change', keyMap[p]!);
        }
        // 修改原值变更，同时抛面板属性变更
        if (reverseKeyMap[p] && reverseKeyMap[p] !== p) {
          _evt.emit('change', reverseKeyMap[p]!);
        }
        return true;
      },

      get(target: PanelData, p: string, _receiver: unknown): unknown {
        if (p === '_evt') {
          return _evt;
        }
        // 有映射拿原始对象
        if (keyMap[p]) {
          return origin[keyMap[p]!];
        }

        // 源对象的属性可以直接拿
        if (Object.prototype.hasOwnProperty.call(origin, p)) {
          return origin[p];
        }

        // 最后拿自身
        return target[p];
      },

      ownKeys(target: PanelData): ArrayLike<string | symbol> {
        // 只返回原始数据的键，自身的只是前端映射使用不需要在复制和后台传递时使用
        const allKeys = Object.keys(origin);
        updateKeyDefine(target, allKeys);
        return allKeys;
      },
    });
  }

  destroy(): void {
    this._evt.reset();
  }
}
