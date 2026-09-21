import { DataTypes } from '@ibiz-template/core';
import { isNil } from 'ramda';
/**
 * 界面映射字段信息
 *
 * @author lxm
 * @date 2022-10-18 14:10:24
 * @export
 * @class UIMapField
 */
export class UIMapField {
    constructor(uiKey, dataKey, opts = {}) {
        /**
         * 是否存储到origin里面(默认false)
         *
         * @author lxm
         * @date 2022-10-18 14:10:24
         * @type {boolean}
         */
        this.isOriginField = false;
        /**
         * 当前项数据属性是否对应多个表单项
         *
         * @author tony001
         * @date 2025-01-14 14:01:29
         * @type {boolean}
         */
        this.isOneToMultiField = false;
        /**
         * 是否是请求需要的字段(默认true)
         *
         * @author lxm
         * @date 2022-10-18 14:10:44
         * @type {boolean}
         */
        this.isRequestNeed = true;
        this.uiKey = uiKey;
        this.dataKey = dataKey;
        if (!isNil(opts.isOriginField)) {
            this.isOriginField = opts.isOriginField;
        }
        if (!isNil(opts.dataType)) {
            this.dataType = opts.dataType;
        }
        if (!isNil(opts.isOneToMultiField)) {
            this.isOneToMultiField = opts.isOneToMultiField;
        }
    }
    /**
     * 值转换
     * @author lxm
     * @date 2023-09-14 06:45:44
     * @param {unknown} value 原值
     */
    convertVal(value) {
        // 没有数据类型的给原值
        if (!this.dataType) {
            return value;
        }
        // 数值转换
        if (DataTypes.isNumber(this.dataType)) {
            const numVal = !isNil(value) && value !== '' ? Number(value) : value;
            if (Number.isNaN(numVal)) {
                // 不能转换的给原值
                ibiz.log.debug(ibiz.i18n.t('runtime.service.convertedNumber', {
                    value,
                }));
                return value;
            }
            return numVal;
        }
        return value;
    }
}
