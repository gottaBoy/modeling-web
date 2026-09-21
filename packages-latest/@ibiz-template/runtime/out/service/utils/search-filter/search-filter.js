/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, isNil } from 'ramda';
/**
 * 搜索过滤
 *
 * @export
 * @class SearchFilter
 */
export class SearchFilter {
    /**
     * Creates an instance of SearchFilter.
     *
     * @param {*} context
     * @param {*} [data]
     * @memberof SearchFilter
     */
    constructor(context, data) {
        /**
         * 分页
         *
         * @type {number}
         * @memberof SearchFilter
         */
        this.page = 0;
        /**
         * 分页数据量
         *
         * @type {number}
         * @memberof SearchFilter
         */
        this.size = 1000;
        /**
         * 数据
         *
         * @author chitanda
         * @date 2022-08-17 22:08:00
         * @type {IData}
         */
        this.data = {};
        /**
         * 排序属性
         *
         * @type {string}
         * @memberof SearchFilter
         */
        this.sortField = 'srfordervalue';
        /**
         * 排序模式
         *
         * @type {('ASC' | 'DESC')}
         * @memberof SearchFilter
         */
        this.sortMode = 'ASC';
        /**
         * 默认条件
         *
         * @author tony001
         * @date 2024-09-05 17:09:06
         * @type {IData}
         */
        this.srfDefaultCond = {};
        this.context = context;
        if (data) {
            if (!isNil(data.page) && !isEmpty(data.page)) {
                this.page = data.page;
            }
            if (!isNil(data.size) && !isEmpty(data.size)) {
                this.size = data.size;
            }
            if (!isNil(data.query) && !isEmpty(data.query)) {
                this.query = data.query;
            }
            if (!isNil(data.sort) && !isEmpty(data.sort)) {
                const arr = data.sort.split(',');
                if (arr.length >= 1) {
                    [this.sortField] = arr;
                }
                if (arr.length >= 2) {
                    this.sortMode = arr[1].toUpperCase();
                }
            }
            if (!isNil(data.srfdefaultcond) && !isEmpty(data.srfdefaultcond)) {
                this.srfDefaultCond = data.srfdefaultcond;
            }
            this.data = Object.assign({}, data);
            delete this.data.page;
            delete this.data.size;
            delete this.data.query;
            delete this.data.sort;
            delete this.data.srfdefaultcond;
        }
    }
    /**
     * 获取条件值
     *
     * @author chitanda
     * @date 2022-08-17 22:08:11
     * @param {string} key
     * @return {*}  {unknown}
     */
    getValue(key) {
        if (this.data[key]) {
            return this.data[key];
        }
        return this.context[key];
    }
}
