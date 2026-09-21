import { EditorController } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { default as Wave } from './wave';

/**
 * 水位图控制器
 *
 * @export
 * @class WaterLevelPondController
 * @extends {EditorController}
 */
export declare class WaterLevelPondController extends EditorController<ISlider> {
    /**
     * @description canvas对象
     * @type {HTMLCanvasElement}
     * @memberof WaterLevelPondController
     */
    canvas: HTMLCanvasElement;
    /**
     * @description canvas宽度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    canvasWidth: number;
    /**
     * @description canvas高度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    canvasHeight: number;
    /**
     * @description 当前范围
     * @type {number}
     * @memberof WaterLevelPondController
     */
    nowRange: number;
    /**
     * @description 当前范围值
     * @type {number}
     * @memberof WaterLevelPondController
     */
    rangeValue: number;
    /**
     * @description 波浪对象
     * @type {(Wave | null)}
     * @memberof WaterLevelPondController
     */
    wave: Wave | null;
    /**
     * @description 动画id
     * @type {number}
     * @memberof WaterLevelPondController
     */
    requestID: number;
    /**
     * @description 形状
     * @type {string}
     * @memberof WaterLevelPondController
     */
    shape: string;
    /**
     * @description 波浪数量
     * @type {number}
     * @memberof WaterLevelPondController
     */
    waveNum: number;
    /**
     * @description 波浪宽度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    waveWidth: number;
    /**
     * @description 波浪高度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    waveHeight: number;
    /**
     * @description 波浪透明度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    waveOpacity: number;
    /**
     * @description 动画速度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    speed: number;
    /**
     * @description 最大值项名称
     * @type {string}
     * @memberof WaterLevelPondController
     */
    maxItem: string;
    protected onInit(): Promise<void>;
    /**
     * @description 绘制canvas
     * @param {HTMLCanvasElement} canvas
     * @memberof WaterLevelPondController
     */
    drawCanvas(canvas: HTMLCanvasElement): void;
    /**
     * @description 开始绘制
     * @param {HTMLCanvasElement} canvas
     * @memberof WaterLevelPondController
     */
    startDraw(canvas: HTMLCanvasElement): void;
    /**
     * @description 取消动画
     * @memberof WaterLevelPondController
     */
    cancelAnimation(): void;
    /**
     * @description 刷新
     * @memberof WaterLevelPondController
     */
    refresh(): void;
    /**
     * @description 绘制容器
     * @param {CanvasRenderingContext2D} ctx
     * @memberof WaterLevelPondController
     */
    drawContainer(ctx: CanvasRenderingContext2D): void;
    /**
     * @description 绘制圆
     * @param {CanvasRenderingContext2D} ctx
     * @memberof WaterLevelPondController
     */
    drawCircle(ctx: CanvasRenderingContext2D): void;
    /**
     * @description 绘制矩形
     * @param {CanvasRenderingContext2D} ctx
     * @memberof WaterLevelPondController
     */
    drawRect(ctx: CanvasRenderingContext2D): void;
    /**
     * @description 计算缩放
     * @param {IData} canvas
     * @memberof WaterLevelPondController
     */
    calcScale(canvas: IData): void;
    /**
     * @description 获取主题色
     * @param {string} name
     * @memberof WaterLevelPondController
     */
    getThemeVar: (name: string) => string;
    /**
     * @description 设置值
     * @param {number} value
     * @memberof WaterLevelPondController
     */
    setDate(value: number): void;
}
