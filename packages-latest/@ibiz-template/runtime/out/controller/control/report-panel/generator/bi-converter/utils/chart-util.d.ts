export declare class ChartUtil {
    /**
     * @description x轴标签标题
     * @static
     * @returns {*}
     * @memberof ChartUtil
     */
    static xAxisLabel(): import("@ibiz-template/core").IApiData;
    /**
     * @description 使用间隔的时候加上省略限制
     * @static
     * @param {number} [labelInterval=1]
     * @returns {*}
     * @memberof ChartUtil
     */
    static computeLabelEllipsis(labelInterval?: number): {
        width: number;
        overflow: string;
        ellipsis: string;
    };
    /**
     * @description 获取图例位置
     * @static
     * @param {string} position
     * @returns {*}  {IData}
     * @memberof ChartUtil
     */
    static getLegendPosition(position: string): IData;
}
//# sourceMappingURL=chart-util.d.ts.map