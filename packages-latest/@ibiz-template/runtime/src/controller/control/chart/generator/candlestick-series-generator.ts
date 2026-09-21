import { isNil } from 'ramda';
import { isArray, isNumber } from 'qx-util';
import {
  IChartSeriesCandlestick,
  IChartSeriesCSCartesian2DEncode,
  IDEChartSeries,
} from '@ibiz/model-core';
import { plus, RuntimeModelError, toNumberOrNil } from '@ibiz-template/core';
import {
  BaseSeriesGenerator,
  CatalogData,
  DEFAULT_GROUP,
  GroupData,
} from './base-series-generator';
import {
  ChartOptionsGenerator,
  parseUserParams,
} from './chart-options-generator';
import { IChartData } from '../../../../interface';

/** 序列的单条数据 */
export type CandlestickSingleData = {
  /**
   * 值属性的值
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {number[]}
   */
  value: number[];

  /**
   * 图表数据
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {IChartData}
   */
  chartData?: IChartData;
};

/** 分类数据，key是分类属性的值 */
export type CandlestickCatalogData = Map<string, CandlestickSingleData>;

/** 分组数据，key是分组属性的值 */
export type CandlestickGroupData = Record<string, CandlestickCatalogData>;

/**
 * k线图序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class CandlestickSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesCandlestick>}
 */
export class CandlestickSeriesGenerator extends BaseSeriesGenerator<IChartSeriesCandlestick> {
  /**
   * 开盘值属性
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {string}
   */
  openField!: string;

  /**
   * 收盘值属性
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {string}
   */
  closeField!: string;

  /**
   * 最低值属性
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {string}
   */
  lowestField!: string;

  /**
   * 最高值属性
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @type {string}
   */
  highestField!: string;

  /**
   * 初始化参数
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @param {T} model 序列模型
   * @param {ChartOptionsGenerator} chartGenerator 图表生成器
   */
  initParams(
    model: IDEChartSeries,
    chartGenerator: ChartOptionsGenerator,
  ): void {
    const { chartSeriesEncode, caption, id, userParam, navViewParamJO } = model;

    if (!model.catalogField) {
      throw new RuntimeModelError(
        model,
        ibiz.i18n.t('runtime.controller.control.chart.missingClassification'),
      );
    }
    if (
      chartGenerator.model.controlParam &&
      chartGenerator.model.controlParam.ctrlParams?.CATALOGFIELDS
    ) {
      try {
        // 获取分类分层配置
        const tempCatalogFields = JSON.parse(
          chartGenerator.model.controlParam.ctrlParams.CATALOGFIELDS,
        );
        if (Array.isArray(tempCatalogFields)) {
          this.catalogFields = tempCatalogFields;
        }
      } catch {
        throw new Error(ibiz.i18n.t('runtime.control.chart.errorJson'));
      }
    }
    this.catalogField = chartGenerator.getFieldKey(model.catalogField);
    this.groupField = model.seriesField
      ? chartGenerator.getFieldKey(model.seriesField)
      : undefined;

    const { chartXAxisId, chartYAxisId } = (chartSeriesEncode ||
      {}) as IChartSeriesCSCartesian2DEncode;
    this.xAxisIndex = toNumberOrNil(chartXAxisId);
    this.yAxisIndex = toNumberOrNil(chartYAxisId);
    this.seriesName = caption || id!;

    if (navViewParamJO) {
      const { closefield, highestfield, lowestfield, openfield } =
        navViewParamJO;

      if (openfield) this.openField = openfield;
      if (closefield) this.closeField = closefield;
      if (lowestfield) this.lowestField = lowestfield;
      if (highestfield) this.highestField = highestfield;
    }

    this.staticOptions = this.calcStaticOptions();

    if (userParam) {
      this.seriesUserParam = parseUserParams(userParam);
    }
  }

  /**
   * 计算分组数据
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @param {IData[]} data
   * @return {*}  {GroupData}
   */
  protected calcGroupData(data: IData[]): GroupData {
    // 默认值
    const defaultValues = [0, 0, 0, 0];
    // 清空分组数据
    this.groupData = {};
    // 清空图表数据数组
    this.chartDataArr = [];
    const groupData = this.groupData! as unknown as CandlestickGroupData;
    // 分组属性代码表和分类属性代码表
    const { seriesCodeListId, catalogCodeListId } = this.model;

    const getOrigin = (origin: IData): IData => {
      if (origin && origin.$origin) {
        return getOrigin(origin.$origin);
      }
      return origin;
    };

    data.forEach(item => {
      // 计算分组名称标识
      let group = DEFAULT_GROUP;
      if (this.groupField) {
        const groupVal = this.translateVal(
          seriesCodeListId,
          item[this.groupField],
        );

        // 存在分组属性，但是分组属性没值的数据排除在外
        if (isNil(groupVal)) {
          return;
        }
        const tempOrigin = getOrigin(item.$origin);
        if (seriesCodeListId) {
          this.catalogMap.set(groupVal, tempOrigin[this.groupField]);
        } else {
          this.catalogMap.set(
            item[this.groupField],
            tempOrigin[this.groupField],
          );
        }
        group = groupVal;
      }

      // 分组对应的分类数据不存在时新建一个
      if (!groupData[group]) {
        groupData[group] = new Map();
        if (this.catalogFields.length > 0) {
          // 多个分类，构建分层结构
          let tempCodes: IData[] = [];
          const tempCodeLists: IData[] = [];
          // 遍历分类数据，即多个维度
          this.catalogFields.forEach((catalog: IData) => {
            const { codelistId, codename, mode, name, sort } = catalog;
            if (codelistId && this.autoCompleteCategory) {
              // 如果分类有代码表，保存起来，最终要计算分层情况下最后一层有多少数据，以及每一项数据对应了各个分层的值
              const codeListItems =
                this.chartGenerator.codeListMap.get(codelistId)!;
              tempCodeLists.push({
                codename,
                name,
                codelist: this.computeCodelistSort(
                  sort,
                  data,
                  codename,
                  codeListItems,
                ),
              });
            } else if (mode === 'field') {
              // 如果不是代码表，那就是属性项，根据data手动构建一个数组
              const tempdata = data.map((_data: IData) => {
                let tempValue;
                const tempOrigin = getOrigin(_data.$origin);
                if (tempOrigin) {
                  tempValue = tempOrigin[codename];
                }
                return {
                  text: _data[codename],
                  value: tempValue,
                };
              });
              tempCodeLists.push({ codename, name, codelist: tempdata });
            }
          });
          for (let i = 0; i < tempCodeLists.length; i++) {
            tempCodes = this.handleMultiCatalogGroup(
              tempCodes,
              tempCodeLists[i],
            );
          }
          tempCodes.forEach(x => {
            groupData[group].set(x.text, { value: defaultValues.slice() });
            // 分组数据默认封装chartData，此时值定死为0
            this.prepareChartData(
              groupData as unknown as GroupData,
              {
                [this.valueField!]: defaultValues.slice(),
                [this.catalogField]: x.value,
              },
              x.text,
              group,
              x.chartData,
            );
          });
        } else if (catalogCodeListId && this.autoCompleteCategory) {
          // // 有代码表的时候补全代码表项个数的数据条数
          const codeListItems =
            this.chartGenerator.codeListMap.get(catalogCodeListId)!;
          codeListItems.forEach(x => {
            groupData[group].set(x.text, { value: defaultValues.slice() });
            // 没有分层数据，但是有代码表的情况就直接记录分类属性与代码表项的值
            this.catalogMap.set(x.text, { [this.catalogField]: x.value });
            // 分组数据默认封装chartData，此时值定死为 defaultValues
            this.prepareChartData(
              groupData as unknown as GroupData,
              {
                [this.valueField!]: defaultValues.slice(),
                [this.catalogField]: x.value,
              },
              x.text,
              group,
              [
                {
                  codename: this.catalogField,
                  name: this.catalogField,
                  value: x.value,
                  valueText: x.text,
                },
              ],
            );
          });
        }
      }
      let catalog: string = '';
      let catalogLevelData: IData[] = [];
      if (this.catalogFields.length > 0) {
        const tempCatalog: IData[] = [];
        this.catalogFields.forEach((_catalog: IData) => {
          const mergeCatalog = this.translateVal(
            _catalog.codelistId,
            item[_catalog.codename],
            true,
          );
          if (!mergeCatalog) {
            return;
          }
          tempCatalog.push({
            codename: _catalog.codename, // 标识
            name: _catalog.name, // 分类名称
            value: item[_catalog.codename], // 当前数据项对应值
            valueText: mergeCatalog, // 当前数据项对应文本值
          });
        });
        if (tempCatalog.length !== this.catalogFields.length) {
          // 表明上面计算的时候有分类没有得到值
          return;
        }
        catalog = tempCatalog.map(_data => _data.valueText).join('_');
        catalogLevelData = tempCatalog;
      } else {
        // 分类属性值计算和转换
        catalog =
          this.translateVal(catalogCodeListId, item[this.catalogField], true) ||
          '';
      }
      // 分类属性没值的数据排除
      if (!catalog) {
        return;
      }
      if (!catalogCodeListId) {
        // 类似雷达图，有维度项，却不是横纵坐标轴,没有分类数组，但是当前数据有分类属性，这里直接记录当前分类属性值对应的数据
        let tempValue;
        const tempOrigin = getOrigin(item.$origin);
        if (tempOrigin) {
          tempValue = tempOrigin[this.catalogField];
        }
        this.catalogMap.set(item[this.catalogField], {
          [this.catalogField]: tempValue,
        });
      }

      // 该分类属性对应的单条数据不存在时新建一个
      if (!groupData[group].get(catalog)) {
        groupData[group].set(catalog, { value: defaultValues.slice() });
      }
      // 相同分类属性的值属性数据累加 k线图累加应累加数组
      const values = [
        item[this.openField],
        item[this.closeField],
        item[this.lowestField],
        item[this.highestField],
      ];
      defaultValues.forEach((value: number, index: number) => {
        groupData[group].get(catalog)!.value[index] = plus(
          groupData[group].get(catalog)!.value[index],
          values[index] || value,
        );
      });

      // 没有chartData说明是第一条，有chartData说明是累加数据，自己封装里面的deData
      if (!groupData[group].get(catalog)!.chartData) {
        this.prepareChartData(
          groupData as unknown as GroupData,
          item,
          catalog,
          group,
          catalogLevelData,
        );
      } else {
        this.prepareChartData(
          groupData as unknown as GroupData,
          Object.assign(item, {
            [this.valueField!]: groupData[group].get(catalog)!.value,
          }),
          catalog,
          group,
          catalogLevelData,
        );
      }
    });

    return groupData as unknown as GroupData;
  }

  /**
   * 生成每条序列的data,由于不同图表类型格式不同所以为any
   * 默认提供的是二维数组，按[x轴, y轴, 图表数据]格式
   * @author ljx
   * @date 2024-12-31 10:03:53
   * @param {CatalogData} catalogData
   * @return {*}  {*}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected calcSeriesData(catalogData: CatalogData): any {
    const temData: IData[] = [];
    const xAxisData: string[] = [];
    catalogData.forEach((catalog, key) => {
      xAxisData.push(key);
      temData.push({ name: key, value: catalog.value });
    });
    if (
      this.chartGenerator &&
      isArray(this.chartGenerator.staticOptions.xAxis) &&
      isNumber(this.xAxisIndex)
    ) {
      (this.chartGenerator.staticOptions.xAxis as IData[])[
        this.xAxisIndex!
      ].data = xAxisData;
    }

    return temData;
  }
}
