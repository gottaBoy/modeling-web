/* eslint-disable @typescript-eslint/no-explicit-any */

export type SetEventHandler<StoreType> = (
  key: keyof StoreType,
  newValue: any,
  oldValue: any,
) => void;
export type GetEventHandler<StoreType> = (key: keyof StoreType) => void;

export interface OnHandler<StoreType> {
  (eventName: 'set', callback: SetEventHandler<StoreType>): () => void;
  (eventName: 'get', callback: GetEventHandler<StoreType>): () => void;
}

export interface OnChangeHandler<StoreType> {
  <Key extends keyof StoreType>(
    propName: Key,
    cb: (newValue: StoreType[Key], oldValue: StoreType[Key]) => void,
  ): () => void;
}

export interface ObservableStore<T> {
  state: T;

  on: OnHandler<T>;

  onChange: OnChangeHandler<T>;
}

export interface IStoreUtil {
  createStore<T extends IData>(initialState: T): ObservableStore<T>;
}

// state可以响应式绘制界面
// state可以直接修改,
// 通过监听函数可以监听
// !可选功能
// state要不要非state属性不能添加
// 监听回调要不要可以阻止改值。
