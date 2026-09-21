/* eslint-disable @typescript-eslint/no-explicit-any */
import { clone } from 'ramda';
import { ISysImage, IAppCodeList } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
import { fieldValueToBoolean } from '../../utils';
import { ScriptFactory } from '../../../utils';
import { AppDataEntity } from '../..';

export class CodeListDataItem implements CodeListItem {
  id!: string;

  value!: string | number;

  text!: string;

  color?: string;

  bkcolor?: string;

  children?: CodeListItem[];

  textCls?: string;

  cls?: string;

  disableSelect?: boolean;

  sysImage?: ISysImage;

  data?: IData;

  tooltip?: string;

  userData?: string;

  beginValue?: number;

  endValue?: number;

  includeBeginValue?: boolean;

  includeEndValue?: boolean;

  /**
   * @description 原始后台数据
   * @type {IData}
   * @memberof CodeListDataItem
   */
  declare $origin: IData;

  /**
   * Creates an instance of CodeListDataItem.
   * @param {IAppCodeList} model
   * @param {(ITreeNodeData | undefined)} data
   * @param {{
   *       index: number;
   *       total: number;
   *     }} opts
   * @memberof CodeListDataItem
   */
  constructor(
    model: IAppCodeList,
    data: IData,
    opts: {
      index: number;
      total: number;
    },
  ) {
    Object.defineProperty(this, '$origin', {
      enumerable: false,
      configurable: true,
      value: data,
    });

    const {
      appId,
      valueAppDEFieldId,
      textAppDEFieldId,
      iconClsAppDEFieldId,
      iconClsXAppDEFieldId,
      iconPathAppDEFieldId,
      iconPathXAppDEFieldId,
      disableAppDEFieldId,
      dataAppDEFieldId,
      clsAppDEFieldId,
      colorAppDEFieldId,
      thresholdGroup,
      beginValueAppDEFieldId,
      endValueAppDEFieldId,
      incBeginValueMode,
      incEndValueMode,
      bkcolorAppDEFieldId,
    } = model;

    const { index, total } = opts;

    // 标识属性
    Object.defineProperty(this, 'id', {
      get() {
        return valueAppDEFieldId
          ? this.$origin[valueAppDEFieldId]
          : this.$origin.srfkey;
      },
      enumerable: true,
      configurable: true,
    });

    // 值属性
    Object.defineProperty(this, 'value', {
      get() {
        return valueAppDEFieldId
          ? this.$origin[valueAppDEFieldId]
          : this.$origin.srfkey;
      },
      enumerable: true,
      configurable: true,
    });

    // 文本属性
    Object.defineProperty(this, 'text', {
      get() {
        return textAppDEFieldId
          ? this.$origin[textAppDEFieldId]
          : this.$origin.srfmajortext;
      },
      enumerable: true,
      configurable: true,
    });

    // 图标样式属性
    Object.defineProperty(this, 'sysImage', {
      get() {
        if (
          iconClsAppDEFieldId ||
          iconClsXAppDEFieldId ||
          iconPathAppDEFieldId ||
          iconPathXAppDEFieldId
        ) {
          const sysImage: ISysImage = { appId };
          if (iconClsAppDEFieldId)
            sysImage.cssClass = this.$origin[iconClsAppDEFieldId];
          if (iconClsXAppDEFieldId)
            sysImage.cssClassX = this.$origin[iconClsXAppDEFieldId];
          if (iconPathAppDEFieldId)
            sysImage.imagePath = this.$origin[iconPathAppDEFieldId];
          if (iconPathXAppDEFieldId)
            sysImage.imagePathX = this.$origin[iconPathXAppDEFieldId];
          return sysImage;
        }
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 禁止选择属性
    Object.defineProperty(this, 'disableSelect', {
      get() {
        if (disableAppDEFieldId)
          return fieldValueToBoolean(this.$origin[disableAppDEFieldId]);
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 样式表属性
    Object.defineProperty(this, 'textCls', {
      get() {
        if (clsAppDEFieldId) return this.$origin[clsAppDEFieldId];
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 颜色值属性
    Object.defineProperty(this, 'color', {
      get() {
        if (colorAppDEFieldId) return this.$origin[colorAppDEFieldId];
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 背景颜色属性
    Object.defineProperty(this, 'bkcolor', {
      get() {
        if (bkcolorAppDEFieldId) return this.$origin[bkcolorAppDEFieldId];
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 数据属性
    if (dataAppDEFieldId && this.$origin[dataAppDEFieldId]) {
      try {
        this.data = ScriptFactory.execSingleLine(
          dataAppDEFieldId,
          this.$origin instanceof AppDataEntity
            ? clone((this.$origin as any)._data)
            : clone(this.$origin),
        ) as IData;
      } catch (error) {
        ibiz.log.error(ibiz.i18n.t('runtime.service.dynamicCodeTable'));
      }
    }

    // 阈值起始值
    Object.defineProperty(this, 'beginValue', {
      get() {
        if (thresholdGroup && beginValueAppDEFieldId)
          return this.$origin[beginValueAppDEFieldId];
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 阈值结束值
    Object.defineProperty(this, 'endValue', {
      get() {
        if (thresholdGroup && endValueAppDEFieldId)
          return this.$origin[endValueAppDEFieldId];
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 包含阈值起始值
    Object.defineProperty(this, 'includeBeginValue', {
      get() {
        if (thresholdGroup && incBeginValueMode) {
          return (
            incBeginValueMode === 1 ||
            (incBeginValueMode === 2 && index === 0) ||
            (incBeginValueMode === 3 && index === total - 1)
          );
        }
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 包含阈值结束值
    Object.defineProperty(this, 'includeEndValue', {
      get() {
        if (thresholdGroup && incEndValueMode) {
          return (
            incEndValueMode === 1 ||
            (incEndValueMode === 2 && index === 0) ||
            (incEndValueMode === 3 && index === total - 1)
          );
        }
        return undefined;
      },
      enumerable: true,
      configurable: true,
    });

    // 其它未处理字段
    this.children = undefined;
    this.cls = undefined;
    this.tooltip = undefined;
    this.userData = undefined;

    // 关联其它属性，用于使用实体属性也要取到值的场景。
    Object.keys(
      data instanceof AppDataEntity ? clone((data as any)._data) : clone(data),
    ).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(this, key))
        Object.defineProperty(this, key, {
          get() {
            return this.$origin[key];
          },
          enumerable: true,
          configurable: true,
        });
    });
  }
}
