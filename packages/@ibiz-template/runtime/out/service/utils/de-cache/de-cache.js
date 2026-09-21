import { where, equals, clone, isNil, isEmpty } from 'ramda';
import { createUUID } from 'qx-util';
import { RuntimeError } from '@ibiz-template/core';
import { isExistSessionId, isExistSrfKey, } from '../service-exist-util/service-exist-util';
import { findModelChild } from '../../../model';
/**
 * 实体缓存工具类
 *
 * @author chitanda
 * @date 2022-08-17 23:08:56
 * @export
 * @class DECache
 */
export class DECache {
    /**
     * 是否是联合主键
     * @author lxm
     * @date 2023-12-12 02:47:18
     * @readonly
     * @protected
     * @type {boolean}
     */
    get isUnionKey() {
        var _a;
        return !!((_a = this.entity.unionKeyValueAppDEFieldIds) === null || _a === void 0 ? void 0 : _a.length);
    }
    /**
     * Creates an instance of DECache.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:40
     * @param {IAppDataEntity} entity 应用实体模型
     */
    constructor(entity) {
        this.entity = entity;
        /**
         * 数据缓存
         *
         * @author chitanda
         * @date 2022-08-17 23:08:08
         * @type {Map<string, IDataEntity>}
         */
        this.cacheMap = new Map();
    }
    /**
     * 强制设置数据，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:45
     * @param {IContext} context
     * @param {IDataEntity} entity
     */
    forceAdd(_context, entity) {
        const data = this.cacheMap.get(entity.srfkey);
        if (data) {
            data.assign(entity);
            ibiz.log.warn('forceAdd', entity.srfkey, entity);
        }
    }
    /**
     * 强制更新数据，非合并，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:27
     * @param {IContext} context
     * @param {IDataEntity} entity
     */
    forceUpdate(_context, entity) {
        this.cacheMap.set(entity.srfkey, clone(entity));
        ibiz.log.warn('forceUpdate', entity.srfkey, entity);
    }
    /**
     * 强制删除数据，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:08
     * @param {IContext} context
     * @param {string} srfKey
     */
    forceDelete(_context, srfKey) {
        this.cacheMap.delete(srfKey);
        ibiz.log.warn('forceDelete', srfKey);
    }
    /**
     * 新增数据
     *
     * @param {*} context
     * @param {IDataEntity} entity
     * @return {*}  {boolean}
     * @memberof EntityCache
     */
    add(context, entity) {
        // 联合主键相关数据处理
        if (this.isUnionKey) {
            this.calcUnionKey(entity);
            if (this.checkData(context, entity.srfkey)) {
                ibiz.log.error(new RuntimeError(ibiz.i18n.t('runtime.service.createPrimaryKeyData', {
                    srfkey: entity.srfkey,
                })));
                return null;
            }
        }
        try {
            isExistSessionId('add', context);
            if (isNil(entity.srfkey) || isEmpty(entity.srfkey)) {
                entity.srfkey = createUUID();
            }
            entity.srftempdate = new Date().getTime();
            // 提交回调
            const commit = () => {
                this.cacheMap.set(entity.srfkey, clone(entity));
                ibiz.log.warn('add', entity.srfkey, entity);
            };
            const t = this.getTransaction(context);
            if (t) {
                t.change(entity.srfkey, () => {
                    commit();
                });
            }
            else {
                commit();
            }
            return entity;
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 查找数据
     *
     * @param {*} context
     * @param {string} srfKey
     * @return {*}  {IDataEntity}
     * @memberof EntityCache
     */
    get(context, srfKey) {
        try {
            isExistSessionId('get', context);
            const data = this.cacheMap.get(srfKey);
            ibiz.log.warn('get', srfKey, data);
            return clone(data);
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 更新数据
     *
     * @param {IContext} context
     * @param {IDataEntity} entity
     * @return {*}  {IDataEntity}
     * @memberof EntityCache
     */
    update(context, entity) {
        const oldKey = entity.srfkey;
        // 联合主键相关数据处理
        if (this.isUnionKey) {
            this.calcUnionKey(entity);
            // 只在临时数据的新建更新时，主键改变的时候，检测变更之后的主键是否已经存在
            if (oldKey !== entity.srfkey && this.checkData(context, entity.srfkey)) {
                ibiz.log.error(new RuntimeError(ibiz.i18n.t('runtime.service.updatePrimaryKeyData', {
                    srfkey: entity.srfkey,
                })));
                return null;
            }
        }
        try {
            isExistSessionId('update', context);
            isExistSrfKey('update', entity);
            entity.srftempdate = new Date().getTime();
            const data = this.cacheMap.get(oldKey);
            if (data) {
                const _data = clone(data);
                _data.assign(entity);
                // 提交回调
                const commit = () => {
                    data.assign(entity);
                    if (oldKey !== entity.srfkey) {
                        this.cacheMap.delete(oldKey);
                    }
                    this.cacheMap.set(entity.srfkey, data);
                    ibiz.log.warn('update', entity.srfkey, entity);
                };
                const t = this.getTransaction(context);
                if (t) {
                    t.change(entity.srfkey, () => {
                        commit();
                    });
                }
                else {
                    commit();
                }
                return _data;
            }
            throw new Error(ibiz.i18n.t('runtime.service.noExistNoUpdated'));
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 删除数据
     *
     * @param {IContext} context
     * @param {string} srfKey
     * @return {*}  {(IDataEntity | null)}
     * @memberof EntityCache
     */
    delete(context, srfKey) {
        try {
            isExistSessionId('delete', context);
            const key = srfKey;
            if (this.cacheMap.has(key)) {
                const data = this.cacheMap.get(key);
                const commit = () => {
                    this.cacheMap.delete(key);
                    ibiz.log.warn('delete', key);
                };
                const t = this.getTransaction(context);
                if (t) {
                    t.change(key, () => {
                        commit();
                    });
                }
                else {
                    commit();
                }
                return data;
            }
            return null;
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 批量创建临时数据
     *
     * @author chitanda
     * @date 2022-03-23 11:03:52
     * @param {IContext} context
     * @param {IDataEntity[]} entities
     * @return {*}  {IDataEntity[]}
     */
    createBatch(context, entities) {
        try {
            isExistSessionId('add', context);
            const commit = (entity) => {
                this.cacheMap.set(entity.srfkey, entity);
                ibiz.log.warn('add', entity.srfkey, entity);
            };
            const t = this.getTransaction(context);
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                if (isNil(entity.srfkey) || isEmpty(entity.srfkey)) {
                    entity.srfkey = createUUID();
                }
                entity.srftempdate = new Date().getTime();
                const data = clone(entity);
                if (t) {
                    t.change(data.srfkey, () => {
                        commit(data);
                    });
                }
                else {
                    commit(data);
                }
            }
            return entities;
        }
        catch (err) {
            ibiz.log.error(err);
        }
        return [];
    }
    /**
     * 批量更新数据
     *
     * @author chitanda
     * @date 2022-03-23 10:03:17
     * @param {IContext} context
     * @param {IDataEntity[]} entities
     * @return {*}  {IDataEntity[]}
     */
    updateBatch(context, entities) {
        try {
            isExistSessionId('update', context);
            const commit = (entity, oldKey) => {
                // 如果主键改变，删除旧的数据再设置新数据
                if (oldKey !== entity.srfkey) {
                    this.cacheMap.delete(oldKey);
                }
                this.cacheMap.set(entity.srfkey, entity);
                ibiz.log.warn('update', entity.srfkey, entity);
            };
            const t = this.getTransaction(context);
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                isExistSrfKey('update', entity);
                const oldKey = entity.srfkey;
                // 联合主键相关数据处理
                if (this.isUnionKey) {
                    this.calcUnionKey(entity);
                    // 主键改变的时候，检测变更之后的主键是否已经存在
                    if (oldKey !== entity.srfkey &&
                        this.checkData(context, entity.srfkey)) {
                        ibiz.log.error(new RuntimeError(ibiz.i18n.t('runtime.service.updatePrimaryKeyData', {
                            srfkey: entity.srfkey,
                        })));
                        continue;
                    }
                }
                entity.srftempdate = new Date().getTime();
                const data = this.cacheMap.get(entity.srfkey);
                if (data) {
                    const _data = clone(data);
                    _data.assign(entity);
                    entities[i] = _data;
                    if (t) {
                        t.change(entity.srfkey, () => {
                            data.assign(entity);
                            commit(data, oldKey);
                        });
                    }
                    else {
                        data.assign(entity);
                        commit(data, oldKey);
                    }
                }
                else {
                    ibiz.log.error(new Error(ibiz.i18n.t('runtime.service.dataNoExistNoUpdated', {
                        srfdename: entity.srfdename,
                        srfmajortext: entity.srfmajortext,
                        srfkey: entity.srfkey,
                    })));
                }
            }
            return entities;
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 批量删除数据
     *
     * @author chitanda
     * @date 2022-03-23 10:03:40
     * @param {IContext} context 上下文
     * @param {string[]} srfKeys 需要删除的数据主键
     * @return {*}  {IDataEntity[]} 未能删除的数据主键
     */
    deleteBatch(context, srfKeys) {
        try {
            const entities = [];
            for (let i = 0; i < srfKeys.length; i++) {
                const srfKey = srfKeys[i];
                const removeData = this.delete(context, srfKey);
                if (removeData) {
                    entities.push(removeData);
                }
            }
            return entities;
        }
        catch (err) {
            ibiz.log.error(err);
            return null;
        }
    }
    /**
     * 检查数据是否已经存在
     *
     * @author chitanda
     * @date 2022-08-17 23:08:06
     * @param {IContext} context
     * @param {string} srfkey
     * @return {*}  {boolean}
     */
    checkData(_context, srfkey) {
        return !!this.cacheMap.get(srfkey);
    }
    /**
     * 获取当前已经缓存的数据
     *
     * @author chitanda
     * @date 2023-12-22 14:12:57
     * @return {*}  {IDataEntity[]}
     */
    getList() {
        const values = this.cacheMap.values();
        return Array.from(values);
    }
    /**
     * 根据条件生成查询
     *
     * @author chitanda
     * @date 2022-08-17 23:08:33
     * @param {IParams} [params={}]
     * @return {*}  {<U>(testObj: U) => boolean}
     */
    generatePred(params = {}) {
        // 查询数据条件集
        const data = {};
        if (params.srfkey) {
            data.srfkey = equals(params.srfkey);
        }
        delete params.srfkey;
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const val = params[key];
                data[key] = equals(val);
            }
        }
        return where(data);
    }
    /**
     * 清空缓存
     *
     * @author chitanda
     * @date 2023-12-22 13:12:17
     */
    clear() {
        // this.cacheMap.forEach(item => {
        //   item.destroy();
        // });
        this.cacheMap.clear();
    }
    /**
     * 根据联合键值计算主键并赋值
     * @author lxm
     * @date 2023-12-12 03:06:30
     * @param {(IDataEntity | IDataEntity[])} data 需要计算的数据或数据集合
     */
    calcUnionKey(data) {
        const unionKeys = this.entity.unionKeyValueAppDEFieldIds.map(id => {
            const appField = findModelChild(this.entity.appDEFields || [], id);
            return appField.codeName.toLowerCase();
        });
        const unionValues = unionKeys.map(key => {
            if (isNil(data[key])) {
                return `__empty__`;
            }
            return data[key];
        });
        data.srfkey = unionValues.join('||');
    }
    /**
     * 根据上下文，获取已经开启的事务
     *
     * @author chitanda
     * @date 2024-01-17 15:01:28
     * @protected
     * @param {IContext} context
     * @return {*}  {(ITransaction | null)}
     */
    getTransaction(context) {
        const uiDomain = ibiz.uiDomainManager.get(context.srfsessionid);
        if (uiDomain && uiDomain.transaction.state.isOpen === true) {
            return uiDomain.transaction;
        }
        return null;
    }
}
