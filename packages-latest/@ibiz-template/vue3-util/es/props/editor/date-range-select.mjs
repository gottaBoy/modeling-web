import { getEditorProps, getEditorEmits, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDateRangeSelectProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值，该值用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    value: { type: Object }
  };
}
function getDateRangeSelectEmits() {
  return {
    ...getEditorEmits(),
    /**
     * 值变更事件
     * @description 值变更事件。_value用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    change: (_value, _name, _ignore) => true
  };
}
function getGridDateRangeSelectProps() {
  return { ...getGridEditorCommonProps(), ...getDateRangeSelectProps() };
}

export { getDateRangeSelectEmits, getDateRangeSelectProps, getGridDateRangeSelectProps };
