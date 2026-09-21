/* eslint-disable no-constructor-return */
/**
 * @description 视图参数处理类
 * @export
 * @class IBizParams
 * @implements {IParams}
 */
export class IBizParams {
    /**
     * Creates an instance of IBizParams.
     * @param {IParams} [params] 自身的参数
     * @param {IParams} [parent] 父视图参数
     * @memberof IBizParams
     */
    constructor(params, parent) {
        // 定义私有变量，存放父视图参数源对象
        Object.defineProperty(this, '_parent', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: parent,
        });
        // 定义私有变量，用于存储对父已有视图参数的修改。
        Object.defineProperty(this, '_params', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: params || {},
        });
        return this.createProxy();
    }
    /**
     * @description 创建代理对象
     * @protected
     * @returns {*}  {IBizParams}
     * @memberof IBizParams
     */
    createProxy() {
        // 更新属性，缺的补充定义
        function updateKeyDefine(target, keys) {
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
        return new Proxy(this, {
            set(target, p, value) {
                if (['_params', '_parent'].includes(p)) {
                    target[p] = value;
                }
                else {
                    target._params[p] = value;
                }
                return true;
            },
            get(target, p, _receiver) {
                if (target[p] !== undefined) {
                    return target[p];
                }
                if (target._params[p] !== undefined) {
                    return target._params[p];
                }
                if (target._parent && target._parent[p] !== undefined) {
                    return target._parent[p];
                }
            },
            ownKeys(target) {
                // 整合所有并排重
                const allKeys = [
                    ...new Set([
                        ...Object.keys(target._params),
                        ...Object.keys(target._parent || {}),
                    ]),
                ];
                updateKeyDefine(target, allKeys);
                return allKeys;
            },
        });
    }
    /**
     * @description 在不改变对象引用的情况下，重置视图参数，等效于重新实例化，但是引用不变
     * @param {IParams} [params] 视图参数
     * @param {IParams} [parent] 父视图参数
     * @memberof IBizParams
     */
    reset(params, parent) {
        this._params = params || {};
        this._parent = parent;
    }
    /**
     * @description 销毁视图参数，避免内存泄漏
     * @memberof IBizParams
     */
    destroy() {
        this._params = {};
        this._parent = undefined;
    }
}
