import { RuntimeError } from '@ibiz-template/core';
import { isNil, mergeLeft } from 'ramda';

export type ValueExOptions = {
  /**
   * 值类型
   */
  valueType?: string | 'SIMPLE' | 'SIMPLES' | 'OBJECT' | 'OBJECTS';

  /**
   * 对象标识属性
   */
  objectIdField?: string;

  /**
   * 对象名称属性(显示文本)
   */
  objectNameField?: string;

  /**
   * 对象值属性
   */
  objectValueField?: string;

  /**
   * 多项值分隔符
   */
  valueSeparator?: string;

  /**
   * 多项文本分隔符
   */
  textSeparator?: string;
};

export class ValueExUtil {
  /**
   * 合并默认值
   * @author lxm
   * @date 2023-08-30 02:06:58
   * @static
   * @param {ValueExOptions} options
   * @return {*}  {ValueExOptions}
   */
  static mergeDefault(options: ValueExOptions): ValueExOptions {
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
  static toText(options: ValueExOptions, value: unknown): string {
    if (isNil(value) || value === '') {
      return '';
    }
    const { valueType, objectNameField, textSeparator } =
      this.mergeDefault(options);
    if (['OBJECTS', 'OBJECT'].includes(valueType!)) {
      if (!objectNameField) {
        throw new RuntimeError(
          ibiz.i18n.t('runtime.controller.utils.valueEx.objectNameField'),
        );
      }
      const textKey = objectNameField.toLowerCase();
      if (valueType === 'OBJECTS') {
        return (value as IData[])
          .map(item => item[textKey] || '---')
          .join(textSeparator);
      }
      return (value as IData)[textKey];
    }
    if (valueType === 'SIMPLES') {
      return (value as string[]).join(textSeparator);
    }
    return `${value}`;
  }
}
