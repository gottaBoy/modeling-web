import { ComputedRef } from 'vue';
import { MapController } from '@ibiz-template/runtime';
import { MapOptions } from './map-chart-user.util';
/**
 * 使用echarts地图
 * @author lxm
 * @date 2023-04-06 12:00:07
 * @export
 * @param {(name: string) => IData} calcEchartsOpts 计算echarts的Options
 * @param {(name: string, e: IData) => void} emit 事件回调
 * @return {*}
 */
export declare function useMapManager(controller: MapController, opts: ComputedRef<MapOptions>, calcEchartsOpts: (name: string) => IData): {
    chartRef: import("vue").Ref<any>;
    historyNames: import("vue").Ref<string[]>;
    currentName: import("vue").Ref<string>;
    changeMap: (name: string | number, areaCode: string | number, isInit?: boolean) => Promise<void>;
    getCityInfo: () => IData | undefined;
    goBack: () => Promise<void>;
    refresh: () => void;
};
