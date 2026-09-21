import { IAppBIReport } from '@ibiz/model-core';
import { IBIReportChartController } from '../controller';
import { ChartType, IAppBICubeData, IAppBICubeDimensionData, IAppBICubeMeasureData, IAppBISchemeData } from '../common';
import { ISchemaField } from '../data';
/**
 * 报表设计状态
 *
 * @author tony001
 * @date 2024-05-21 15:05:26
 * @export
 * @interface IBIReportDesignState
 */
export interface IBIReportDesignState {
    /**
     * 是否构建完成
     *
     * @author tony001
     * @date 2024-05-21 16:05:23
     * @type {boolean}
     */
    isCreated: boolean;
    /**
     * 报表体系数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:56
     * @type {IAppBISchemeData[]}
     */
    scheme: IAppBISchemeData[];
    /**
     * 选中报表体系
     *
     * @author tony001
     * @date 2024-06-04 17:06:21
     * @type {IAppBISchemeData | undefined}
     */
    selectedScheme: IAppBISchemeData | undefined;
    /**
     * 立方体数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:34
     * @type {IAppBICubeData[]}
     */
    cube: IAppBICubeData[];
    /**
     * 选中立方体数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:54
     * @type {IAppBICubeData}
     */
    selectCube: IAppBICubeData | undefined;
    /**
     * 指标数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:55
     * @type {IAppBICubeMeasureData[]}
     */
    measure: IAppBICubeMeasureData[];
    /**
     * 维度数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:10
     * @type {IAppBICubeDimensionData[]}
     */
    dimension: IAppBICubeDimensionData[];
    /**
     * 报表图表
     *
     * @author tony001
     * @date 2024-06-04 23:06:21
     * @type {(IBIReportChartController | undefined)}
     */
    reportChart: IBIReportChartController | undefined;
    /**
     * 选中类型
     *
     * @author tony001
     * @date 2024-06-06 00:06:46
     * @type {ChartType}
     */
    selectChartType: ChartType;
    /**
     * schema属性
     *
     * @type {ISchemaField[]}
     * @memberof IBIReportDesignState
     */
    schemaFields: ISchemaField[];
    /**
     * 值是否变更
     *
     * @type {boolean}
     * @memberof IBIReportDesignState
     */
    dataChangeState: boolean;
    /**
     * 报表图表属性数据
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    propertyData: IData;
    /**
     * 错误对象
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    error: IData;
    /**
     * 报表模型
     *
     * @type {IAppBIReport | undefined}
     * @memberof IBIReportDesignState
     */
    reportModel: IAppBIReport | undefined;
}
