import { ComputedRef } from 'vue';
import { MapOptions } from './map-chart.util';
/**
 * 使用echarts地图
 * @author lxm
 * @date 2023-04-06 12:00:07
 * @export
 * @param {(name: string) => IData} calcEchartsOpts 计算echarts的Options
 * @param {(name: string, e: IData) => void} emit 事件回调
 * @return {*}
 */
export declare function useMapManager(opts: ComputedRef<MapOptions>, calcEchartsOpts: (name: string) => IData, emit: (name: string, e: IData) => void): {
    chartRef: import("vue").Ref<any>;
    historyNames: import("vue").Ref<string[]>;
    currentName: import("vue").Ref<string>;
    changeMap: (name: string | number, isInit?: boolean) => Promise<void>;
    getCityName: (mapName: string | number) => any;
    goBack: () => void;
    refresh: () => void;
};
