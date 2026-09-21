import { RuntimeError } from '@ibiz-template/core';
import { isNil, mergeLeft } from 'ramda';
export class ValueExUtil {
    /**
     * 合并默认值
     * @author lxm
     * @date 2023-08-30 02:06:58
     * @static
     * @param {ValueExOptions} options
     * @return {*}  {ValueExOptions}
     */
    static mergeDefault(options) {
        return mergeLeft(options, {
            textSeparator: ',',
            valueSeparator: ',',
        });
    }
    /**
     * 转成显示用的文本
     * @author lxm
     * @date 2023-08-30 01:55:38
     * @param {ValueExOptions} options
     * @param {unknown} value
     * @return {*}  {string}
     */
    static toText(options, value) {
        if (isNil(value) || value === '') {
            return '';
        }
        const { valueType, objectNameField, textSeparator } = this.mergeDefault(options);
        if (['OBJECTS', 'OBJECT'].includes(valueType)) {
            if (!objectNameField) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.utils.valueEx.objectNameField'));
            }
            const textKey = objectNameField.toLowerCase();
            if (valueType === 'OBJECTS') {
                return value
                    .map(item => item[textKey] || '---')
                    .join(textSeparator);
            }
            return value[textKey];
        }
        if (valueType === 'SIMPLES') {
            return value.join(textSeparator);
        }
        return `${value}`;
    }
}
