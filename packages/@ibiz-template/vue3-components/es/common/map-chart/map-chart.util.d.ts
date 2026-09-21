/** 渐变颜色集合 */
export declare const GradientColors: string[];
export declare const defaultOpts: {
    /** true地图code标识使用字符串，false使用数字 */
    strAreaCode: boolean;
    /** 热力图配置 */
    visualMap: {
        /** 两端的文本，如 ['高', '低'] */
        text: string[];
        /** 底部代表的值 */
        min: number;
        /** 顶部代表的值 */
        max: number;
        /** 热力图渐变颜色数组 */
        rangeColor: string[];
    };
    /** 区块颜色 */
    areaColor: string;
    /** 区块边界颜色 */
    areaBorderColor: string;
    /** 悬浮时区块颜色 */
    hoverAreaColor: string;
    /** 点图标 */
    pointSymbol: string;
    /** 地图json数据基础路径 */
    jsonBaseUrl: string;
    /** 默认打开的区域编码 */
    defaultAreaCode: string | number;
};
export type MapOptions = typeof defaultOpts;
