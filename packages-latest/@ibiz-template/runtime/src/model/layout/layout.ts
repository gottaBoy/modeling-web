import { IGridLayoutPos, ILayoutPos } from '@ibiz/model-core';
import { isArray, isObject, isString } from 'lodash-es';
import type { GridLayoutAttrs, ScreenSize } from '../../interface';
import { ScriptFactory } from '../../utils';

/**
 * 计算布局高宽
 *
 * @author lxm
 * @date 2023-02-15 11:37:49
 * @export
 * @param {ILayoutPos} layoutPos
 */
export function calcLayoutHeightWidth(layoutPos: ILayoutPos): {
  width: string;
  height: string;
} {
  const { width, height, widthMode, heightMode } = layoutPos;
  const result = { width: '', height: '' };
  if (widthMode === 'FULL') {
    result.width = '100%';
  } else if (width && width > 0) {
    if (width > 0 && width <= 1) {
      result.width = `${width * 100}%`;
    } else if (widthMode === 'PERCENTAGE') {
      result.width = `${width}%`;
    } else {
      result.width = `${width}px`;
    }
  }
  if (heightMode === 'FULL') {
    result.height = '100%';
  } else if (height && height > 0) {
    if (height > 0 && height <= 1) {
      result.height = `${height * 100}%`;
    } else if (heightMode === 'PERCENTAGE') {
      result.height = `${height}%`;
    } else {
      result.height = `${height}px`;
    }
  }
  return result;
}

/**
 * 计算内容对齐的样式
 *
 * @author lxm
 * @date 2023-02-15 11:49:06
 * @export
 * @param {ILayoutPos} layoutPos
 */
export function calcContentAlignStyle(
  layoutPos: ILayoutPos,
): IData | undefined {
  const { valignSelf, halignSelf } = layoutPos;
  let result;
  // 自身对齐方式
  if (valignSelf || halignSelf) {
    result = { display: 'flex' };
    // 自身垂直对齐模式
    switch (valignSelf) {
      case 'TOP':
        Object.assign(result, { 'align-items': 'flex-start' });
        break;
      case 'MIDDLE':
        Object.assign(result, { 'align-items': 'center' });
        break;
      case 'BOTTOM':
        Object.assign(result, { 'align-items': 'flex-end' });
        break;
      default:
        break;
    }
    // 自身水平对齐模式
    switch (halignSelf) {
      case 'LEFT':
        Object.assign(result, { 'justify-content': 'flex-start' });
        break;
      case 'CENTER':
        Object.assign(result, { 'justify-content': 'center' });
        break;
      case 'RIGHT':
        Object.assign(result, { 'justify-content': 'flex-end' });
        break;
      case 'JUSTIFY':
        Object.assign(result, { 'justify-content': 'space-between' });
        break;
      default:
        break;
    }
  }
  return result;
}

/**
 * 计算栅格布局参数
 * @author lxm
 * @date 2023-06-30 10:49:04
 * @export
 * @param {IGridLayoutPos} layoutPos
 * @return {*}  {Record<ScreenSize, GridLayoutAttrs>}
 */
export function calcGridLayoutPos(
  layoutPos: IGridLayoutPos,
): Record<ScreenSize, GridLayoutAttrs> {
  const {
    layout,
    colXS,
    colXSOffset,
    colSM,
    colSMOffset,
    colMD,
    colMDOffset,
    colLG,
    colLGOffset,
  } = layoutPos;
  const calcActualValues = (
    span: number | undefined,
    offset: number | undefined,
  ): { span: number; offset?: number } => {
    const multiplier = layout === 'TABLE_24COL' ? 1 : 2;
    const spanDefault = layout === 'TABLE_24COL' ? 24 : 12;
    const _span = (!span || span === -1 ? spanDefault : span) * multiplier;
    const _offset = !offset || offset === -1 ? undefined : offset;
    return {
      span: _span,
      offset: _offset,
    };
  };
  return {
    xs: calcActualValues(colXS, colXSOffset),
    sm: calcActualValues(colSM, colSMOffset),
    md: calcActualValues(colMD, colMDOffset),
    lg: calcActualValues(colLG, colLGOffset),
  };
}

/**
 * 计算动态样式表类名集合
 * @author lxm
 * @date 2023-08-01 04:15:48
 * @export
 * @param {string} expression 脚本
 * @param {IData} data 数据对象
 * @return {*}  {string[]}
 */
export function calcDynaClass(expression: string, data: IData): string[] {
  const classArr: string[] = [];
  const result = ScriptFactory.execScriptFn({ data }, expression, {
    singleRowReturn: true,
    isAsync: false,
  });
  if (isString(result)) {
    classArr.push(result);
  } else if (isArray(result)) {
    classArr.push(...result);
  } else if (isObject(result)) {
    Object.keys(result).forEach(key => {
      if ((result as IData)[key]) {
        classArr.push(key);
      }
    });
  }
  return classArr;
}
