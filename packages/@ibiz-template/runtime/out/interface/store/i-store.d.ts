export type SetEventHandler<StoreType> = (key: keyof StoreType, newValue: any, oldValue: any) => void;
export type GetEventHandler<StoreType> = (key: keyof StoreType) => void;
export interface OnHandler<StoreType> {
    (eventName: 'set', callback: SetEventHandler<StoreType>): () => void;
    (eventName: 'get', callback: GetEventHandler<StoreType>): () => void;
}
export interface OnChangeHandler<StoreType> {
    <Key extends keyof StoreType>(propName: Key, cb: (newValue: StoreType[Key], oldValue: StoreType[Key]) => void): () => void;
}
export interface ObservableStore<T> {
    state: T;
    on: OnHandler<T>;
    onChange: OnChangeHandler<T>;
}
export interface IStoreUtil {
    createStore<T extends IData>(initialState: T): ObservableStore<T>;
}
//# sourceMappingURL=i-store.d.ts.map