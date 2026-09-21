/* eslint-disable prettier/prettier */
import { PropType } from 'vue';
import {
  getEditorEmits,
  getEditorProps,
  getGridEditorCommonProps,
} from './common';

/**
 * @description 获取时间范围（可选单位）props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getDateRangeSelectProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值，该值用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    value: {type: Object as PropType<{unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';type: 'DYNAMIC' | 'STATIC';start: string | number;end: string | number;}>},
  };
}

/**
 * @description 获取时间范围（可选单位）emits
 * @export
 * @template V
 * @returns {*}
 * @editoremits
 */
export function getDateRangeSelectEmits() {
  return {
    ...getEditorEmits(),
    /**
     * 值变更事件
     * @description 值变更事件。_value用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    change: (_value: {unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';type: 'DYNAMIC' | 'STATIC';start: string | number;end: string | number;},_name?: string,_ignore?: boolean,) => true,
  };
}

/**
 * @description 获取表格时间范围（可选单位）的props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridDateRangeSelectProps<C>() {
  return { ...getGridEditorCommonProps(), ...getDateRangeSelectProps<C>() };
}
