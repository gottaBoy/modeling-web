/* eslint-disable default-param-last */
import { clone } from 'ramda';
/**
 * @description 上下文处理类
 * @export
 * @class IBizContext
 * @implements {IIBizContext}
 */
export class IBizContext {
    /**
     * Creates an instance of IBizContext.
     * @param {IData} [context={}] 自身的上下文
     * @param {IContext} [parent] 父的上下文源对象
     * @memberof IBizContext
     */
    constructor(context = {}, parent) {
        Object.defineProperty(this, '_associationContext', {
            enumerable: false,
            configurable: true,
            value: [],
        });
        if (parent) {
            this.initWithParent(parent);
        }
        // 合并给入上下文
        Object.assign(this, context);
    }
    /**
     * @description 初始化上下文，并关联父上下文
     * @private
     * @param {IContext} parent
     * @memberof IBizContext
     */
    initWithParent(parent) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        // 定义私有变量，存放父上下文源对象
        Object.defineProperty(this, '_parent', {
            enumerable: false,
            writable: true,
            value: parent,
        });
        // 定义私有变量，用于存储对父已有上下文的修改。
        Object.defineProperty(this, '_context', {
            enumerable: false,
            writable: true,
            value: {},
        });
        // 监控父上下文参数，自身不存在时从父取
        const properties = {};
        const keys = Object.keys(parent);
        keys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                // !已经定义的不重复定义，会报错
                return;
            }
            properties[key] = {
                enumerable: true,
                configurable: true,
                set(val) {
                    if (val == null) {
                        self._context[key] = null;
                    }
                    else {
                        self._context[key] = val;
                    }
                },
                get() {
                    if (self._context[key] !== undefined) {
                        return self._context[key];
                    }
                    if (self._parent) {
                        return self._parent[key];
                    }
                    return '';
                },
            };
        });
        Object.defineProperties(this, properties);
    }
    /**
     * @description 返回自身独有的上下文，和父有差异的
     * @returns {*}  {IData}
     * @memberof IBizContext
     */
    getOwnContext() {
        const result = {};
        Object.keys(this).forEach(key => {
            // 父没有的，或者修改了父的上下文
            // 父不存在则返回所有自身的属性
            if (!this._parent ||
                !Object.prototype.hasOwnProperty.call(this._parent, key) ||
                Object.prototype.hasOwnProperty.call(this._context, key)) {
                result[key] = this[key];
            }
        });
        return result;
    }
    /**
     * @description 销毁当前上下文对象
     * @memberof IBizContext
     */
    destroy() {
        this._parent = undefined;
        this._context = {};
        this._associationContext.forEach(item => {
            item.destroy();
        });
    }
    /**
     * @description 在非视图中，需要断开视图上下文联系时。只能使用 clone 创建新的局部上下文
     * @returns {*}  {IBizContext}
     * @memberof IBizContext
     */
    clone() {
        const newContext = new IBizContext(clone(this.getOwnContext()), this._parent);
        this._associationContext.push(newContext);
        return newContext;
    }
    /**
     * @description 深度克隆，只返回现有数据
     * @returns {*}  {IData}
     * @memberof IBizContext
     */
    deepClone() {
        const result = {};
        Object.keys(this).forEach(key => {
            result[key] = this[key];
        });
        return result;
    }
    /**
     * @description 在不改变对象引用的情况下，重置上下文,等效于重新实例化，但是引用不变
     * @param {IData} [context={}]
     * @param {IContext} [parent]
     * @memberof IBizContext
     */
    reset(context = {}, parent) {
        // 清空_associationContext
        this._associationContext.forEach(item => {
            item.destroy();
        });
        // 置空parent相关属性
        if (this._parent) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._parent = {};
            this._context = {};
        }
        // 删除自身的属性，define的删不掉，上面置空了就不管了
        Object.keys(this).forEach(key => {
            try {
                delete this[key];
            }
            catch (error) {
                // 删不掉的不管了，上面已经变成uneducated了
            }
        });
        if (parent) {
            this.initWithParent(parent);
        }
        // 合并默认值
        Object.assign(this, context);
    }
    /**
     * @description 上下文只有在视图初始化时，调用 create 方法
     * @static
     * @param {IData} [context]
     * @param {IContext} [parent]
     * @returns {*}  {IBizContext}
     * @memberof IBizContext
     */
    static create(context, parent) {
        return new IBizContext(context, parent);
    }
}
