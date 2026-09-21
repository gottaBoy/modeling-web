import { ISysMap } from '@ibiz/model-core';
import { EChartsOption, EChartsType } from 'echarts';
import { MapService } from './map.service';
import { IMapController, IMapEvent, IMapState, MDCtrlLoadParams } from '../../../interface';
import { MDControlController } from '../../common';
export declare class MapController extends MDControlController<ISysMap, IMapState, IMapEvent> implements IMapController {
    service: MapService;
    /**
     * echarts对象
     * @author lxm
     * @date 2023-06-07 09:36:58
     * @type {EChartsType}
     */
    chart?: EChartsType;
    /**
     * @description 最终使用的echarts配置
     * @type {EChartsOption}
     * @memberof MapController
     */
    options?: EChartsOption;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    load(args?: MDCtrlLoadParams): Promise<IData[]>;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 计算默认选项
     * @author lxm
     * @date 2023-11-01 03:23:33
     */
    calcDefaultOptions(): void;
    /**
     * 地图变更事件处理
     * @author lxm
     * @date 2023-10-31 05:28:36
     * @param {(string | number)} areaCode
     */
    onMapChange(areaCode: string | number): Promise<void>;
    /**
     * 地图区域点击事件处理
     * @author lxm
     * @date 2023-10-31 05:30:54
     * @param {IData} mapData
     */
    onAreaClick(mapData: IData): void;
    /**
     * 地图散点点击事件处理
     * @author lxm
     * @date 2023-10-31 05:30:58
     * @param {IData} mapData
     */
    onPointClick(mapData: IData): void;
}
//# sourceMappingURL=map.controller.d.ts.map