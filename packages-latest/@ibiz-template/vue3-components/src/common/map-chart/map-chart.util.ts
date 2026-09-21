/** 渐变颜色集合 */
export const GradientColors = ['#90d1e7', '#fff600', '#ff5200'];

export const defaultOpts = {
  /** true地图code标识使用字符串，false使用数字 */
  strAreaCode: false,
  /** 热力图配置 */
  visualMap: {
    /** 两端的文本，如 ['高', '低'] */
    text: [
      ibiz.i18n.t('component.mapChart.high'),
      ibiz.i18n.t('component.mapChart.low'),
    ],
    /** 底部代表的值 */
    min: 0,
    /** 顶部代表的值 */
    max: 100,
    /** 热力图渐变颜色数组 */
    rangeColor: GradientColors,
  },
  /** 区块颜色 */
  areaColor: '#87cefa',
  /** 区块边界颜色 */
  areaBorderColor: '#FFF',
  /** 悬浮时区块颜色 */
  hoverAreaColor: '#fbdb2f',
  /** 点图标 */
  pointSymbol: 'pin',
  /** 地图json数据基础路径 */
  jsonBaseUrl: `${ibiz.env.assetsUrl}/json/map`,
  /** 默认打开的区域编码 */
  defaultAreaCode: 100000 as string | number,
};

export type MapOptions = typeof defaultOpts;
