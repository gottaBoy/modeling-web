import { IFilterNodeGroup, PanelItemState } from '@ibiz-template/runtime';
import { IAppBIReport } from '@ibiz/model-core';
import { IAppBICubeDimensionData, IAppBICubeMeasureData, ISchemaField } from '../../interface';
export declare class BIReportPanelContentState extends PanelItemState {
    /**
     * 图表报表属性数据
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    propertyData: IData;
    /**
     * 图表报表模型
     *
     * @type {IAppBIReport | undefined}
     * @memberof IBIReportDesignState
     */
    reportModel: IAppBIReport | undefined;
    /**
     * 表格报表属性数据
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    gridPropertyData: IData;
    /**
     * 表格报表模型
     *
     * @type {IAppBIReport | undefined}
     * @memberof IBIReportDesignState
     */
    gridReportModel: IAppBIReport | undefined;
    /**
     * 默认图表报表属性数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:39
     * @type {IData}
     */
    defaultPropertyData: IData;
    /**
     * 默认表格报表属性数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:48
     * @type {IData}
     */
    defaultGridPropertyData: IData;
    /**
     * 默认图表报表模型
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:02
     * @type {(IAppBIReport | undefined)}
     */
    defaultReportModel: IAppBIReport | undefined;
    /**
     * 默认表格报表模型
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:15
     * @type {(IAppBIReport | undefined)}
     */
    defaultGridReportModel: IAppBIReport | undefined;
    /**
     * 是否已加载schema
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:17
     * @type {boolean}
     */
    isLoadedSchema: boolean;
    /**
     * schema字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:32
     * @type {ISchemaField[]}
     */
    schemaFields: ISchemaField[];
    /**
     * 条件字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:43
     * @type {ISchemaField[]}
     */
    conditionFields: ISchemaField[];
    /**
     * 条件字段映射
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:56
     * @type {Map<string, IAppBICubeDimensionData>}
     */
    conditionFieldMap: Map<string, IAppBICubeDimensionData>;
    /**
     * 字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:07
     * @type {ISchemaField[]}
     */
    fields: ISchemaField[];
    /**
     * 字段图标映射
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:13
     * @type {Map<string, string>}
     */
    fieldIconMap: Map<string, string>;
    /**
     * 指标
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:27
     * @type {IAppBICubeMeasureData[]}
     */
    measure: IAppBICubeMeasureData[];
    /**
     * 维度
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:36
     * @type {IAppBICubeDimensionData[]}
     */
    dimension: IAppBICubeDimensionData[];
    /**
     * 过滤条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:46
     * @type {IFilterNodeGroup}
     */
    cond?: IFilterNodeGroup;
    /**
     * 过滤项
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:02
     * @type {IData[]}
     */
    filter: IData[];
    /**
     * 过滤模式
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:40
     * @type {string}
     */
    filterMode: string;
    /**
     * 自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:50
     * @type {string}
     */
    customCond: string;
    /**
     * 条件数量
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:22
     * @type {number}
     */
    condNum: number;
}
