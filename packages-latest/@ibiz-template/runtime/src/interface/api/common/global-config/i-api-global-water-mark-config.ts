/**
 * @description 应用水印配置参数
 * @export
 * @interface IApiGlobalWaterMarkConfig
 */
export interface IApiGlobalWaterMarkConfig {
  /**
   * @description 是否启用水印
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default false
   */
  enable: boolean;

  /**
   * @description 水印文本内容（支持多行）
   * @type {(string | string[])}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   */
  text: string | string[];

  /**
   * @description 字体大小（px）
   * @type {number}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default 14
   */
  fontSize: number;

  /**
   * @description 字体族（遵循 CSS 规范）
   * @type {string}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default Microsoft YaHei
   */
  fontFamily: string;

  /**
   * @description 字体粗细（如：400 / bold）
   * @type {(string | number)}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default 400
   */
  fontWeight: string | number;

  /**
   * @description 字体样式（normal / italic / oblique）
   * @type {string}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default normal
   */
  fontStyle: string;
  /**
   * @description 字体颜色（支持 CSS 格式）
   * @type {string}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default rgba(0,0,0,0.5)
   */
  color: string;

  /**
   * @description 水印透明度（0~1）
   * @type {number}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default 0.15
   */
  opacity: number;

  /**
   * @description 旋转角度（单位：度，支持负值）
   * @type {number}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default -30
   */
  rotate: number;

  /**
   * @description 平铺间距（x / y）
   * @type {[number, number]}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default [90, 90]
   */
  gap: [number, number];

  /**
   * @description 偏移量（x / y）
   * @type {[number, number]}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default [0, 0]
   */
  offset: [number, number];

  /**
   * @description 单个水印块尺寸（0 表示自适应）
   * @type {{ width: number; height: number }}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default `{ width: 0, height: 0 }`
   */
  tileSize: { width: number; height: number };

  /**
   * @description 水印层级控制
   * @type {number}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default 9999
   */
  zIndex: number;

  /**
   * @description 是否使用 Shadow DOM 隔离水印样式：开启后可避免页面样式污染水印，增强样式稳定性
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default true
   */
  useShadowDom: boolean;

  /**
   * @description 是否启用防篡改保护：开启后通过 MutationObserver 监听，自动恢复被修改的水印节点和关键样式
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default true
   */
  protect: boolean;
  /**
   * @description 是否允许鼠标穿透选择文本
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default false
   */
  allowSelect: boolean;
  /**
   * @description 是否开启严格保护：开启后除 MutationObserver 监听外，将通过定时器（每 2000ms）做额外检查，进一步防止水印被篡改
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default false
   */
  strictProtect: boolean;

  /**
   * @description 当容器不是 body 时，是否自动将容器设置为 relative 定位（避免水印因容器定位缺失导致错位）
   * @type {boolean}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalWaterMarkConfig
   * @default true
   */
  ensureRelative: boolean;
}
