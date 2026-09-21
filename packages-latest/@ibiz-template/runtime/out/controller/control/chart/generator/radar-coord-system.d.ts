import type { RadarComponentOption } from 'echarts';
/**
 * 雷达坐标系对象
 * @author lxm
 * @date 2023-06-11 06:27:22
 * @export
 * @class RadarCoordSystem
 */
export declare class RadarCoordSystem {
    /**
     * 坐标系的序号
     * @author lxm
     * @date 2023-06-11 06:28:04
     * @type {number}
     */
    index: number;
    /**
     * 指示器映射
     * @author lxm
     * @date 2023-06-11 06:34:26
     * @type {{ [p: string]: { max: number } }}
     */
    indicator: {
        [p: string]: {
            max: number;
        };
    };
    private _indicatorKeys?;
    /**
     * 获取指示器的字段集合
     * @author lxm
     * @date 2023-06-11 06:41:13
     * @readonly
     */
    get indicatorKeys(): string[];
    constructor(index: number);
    /**
     * 更新或创建指示器
     * @author lxm
     * @date 2023-06-11 06:46:02
     * @param {string} name
     * @param {number} max
     */
    updateIndicator(name: string, max: number): void;
    /**
     * 转换成雷达坐标系的options
     * @author lxm
     * @date 2023-06-11 06:42:04
     * @return {*}  {RadarComponentOption}
     */
    toOptions(): RadarComponentOption;
}
//# sourceMappingURL=radar-coord-system.d.ts.map