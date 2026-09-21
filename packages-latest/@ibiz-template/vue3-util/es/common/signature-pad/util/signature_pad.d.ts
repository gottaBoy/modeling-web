import { IBasicPoint } from './point';
/**
 * @description 签名事件对象接口，封装签名相关的事件信息
 * @export
 * @interface ISignatureEvent
 */
export interface ISignatureEvent {
    /** 原始事件对象（鼠标、触摸或指针事件） */
    event: MouseEvent | TouchEvent | PointerEvent;
    /** 事件类型（如'mousedown'、'touchmove'等） */
    type: string;
    /** 事件发生时的X坐标 */
    x: number;
    /** 事件发生时的Y坐标 */
    y: number;
    /** 压力值（如触摸或绘图设备的压力感应值） */
    pressure: number;
}
/**
 * @description 从数据加载签名时的配置选项接口
 * @export
 * @interface IFromDataOptions
 */
export interface IFromDataOptions {
    /** 是否在加载前清除现有签名，默认true */
    clear?: boolean;
}
/**
 * @description 导出为SVG格式时的配置选项接口
 * @export
 * @interface IToSVGOptions
 */
export interface IToSVGOptions {
    /** 是否在SVG中包含背景色，默认false */
    includeBackgroundColor?: boolean;
}
/**
 * @description 点组的样式配置选项接口，用于定义签名线条/点的绘制样式
 * @export
 * @interface IPointGroupOptions
 */
export interface IPointGroupOptions {
    /** 点的大小（像素） */
    dotSize: number;
    /** 线条最小宽度（像素） */
    minWidth: number;
    /** 线条最大宽度（像素） */
    maxWidth: number;
    /** 画笔颜色（CSS颜色格式） */
    penColor: string;
    /** 速度过滤权重（用于平滑线条粗细变化） */
    velocityFilterWeight: number;
    /** 合成操作（遵循Canvas的globalCompositeOperation规范） */
    compositeOperation: GlobalCompositeOperation;
}
/**
 * @description SignaturePad的初始化配置选项接口，继承点组样式配置并支持部分可选扩展
 * @export
 * @interface ISignaturePadOptions
 * @extends {Partial<IPointGroupOptions>}
 */
export interface ISignaturePadOptions extends Partial<IPointGroupOptions> {
    /** 连续点之间的最小距离（像素），小于此值则不记录新点 */
    minDistance?: number;
    /** 画布背景色（CSS颜色格式） */
    backgroundColor?: string;
    /** 事件节流时间（毫秒），限制绘制事件触发频率 */
    throttle?: number;
    /** Canvas 2D上下文的初始化配置 */
    canvasContextOptions?: CanvasRenderingContext2DSettings;
}
/**
 * @description 点组接口，包含一组点及对应的绘制样式配置，用于记录签名的一段轨迹
 * @export
 * @interface IPointGroup
 * @extends {IPointGroupOptions}
 */
export interface IPointGroup extends IPointGroupOptions {
    /** 该组包含的点集合（基础点信息） */
    points: IBasicPoint[];
}
export default class SignaturePad {
    private canvas;
    /**
     * @description 点的大小，默认值为0（单位：像素）。控制点击画布时生成的点的尺寸。0表示根据线条宽度自动计算点的大小
     * @type {number}
     * @memberof SignaturePad
     */
    dotSize: number;
    /**
     * @description 画笔最小宽度，默认值为0.5（单位：像素）。控制签名线条的最细宽度，绘制速度越快，线条越接近此值
     * @type {number}
     * @memberof SignaturePad
     */
    minWidth: number;
    /**
     * @description 画笔最大宽度，默认值为2.5（单位：像素）。控制签名线条的最粗宽度，绘制速度越慢，线条越接近此值。
     * @type {number}
     * @memberof SignaturePad
     */
    maxWidth: number;
    /**
     * @description 画笔颜色，默认值为'black'。签名轨迹的颜色，可接受 CSS 颜色格式（如#ff0000、rgb(255,0,0)等）。
     * @type {string}
     * @memberof SignaturePad
     */
    penColor: string;
    /**
     * @description 最小绘制距离，默认值为5（单位：像素）。当连续两个绘制点的距离小于此值时，不会记录新点，用于减少冗余数据并优化绘制流畅度。
     * @type {number}
     * @memberof SignaturePad
     */
    minDistance: number;
    /**
     * @description 速度过滤权重，默认值为0.7。用于平滑处理绘制速度的计算，影响线条粗细随速度的变化幅度。值越接近 1，当前速度对线条粗细的影响越大；值越小，线条过渡越平滑
     * @type {number}
     * @memberof SignaturePad
     */
    velocityFilterWeight: number;
    /**
     * @description 合成操作，默认值为'source-over'。控制新绘制的线条与已有内容的混合方式，遵循 Canvas 的globalCompositeOperation属性规范
     * @type {GlobalCompositeOperation}
     * @memberof SignaturePad
     */
    compositeOperation: GlobalCompositeOperation;
    /**
     * @description 画布背景色，默认值为'rgba(0,0,0,0)'（透明）。签名画布的背景颜色，导出图片时会包含此背景。
     * @type {string}
     * @memberof SignaturePad
     */
    backgroundColor: string;
    /**
     * @description 节流时间，默认值为16（单位：毫秒）。限制绘制事件的触发频率，避免高频操作导致性能问题。??运算符确保0值会被正常应用（而||会忽略0）
     * @type {number}
     * @memberof SignaturePad
     */
    throttle: number;
    /**
     * @description Canvas 上下文配置，默认值为{}。用于初始化 Canvas 2D 上下文的额外配置项（如alpha、willReadFrequently等）
     * @type {CanvasRenderingContext2DSettings}
     * @memberof SignaturePad
     */
    canvasContextOptions: CanvasRenderingContext2DSettings;
    /**
     * @description  Canvas 2D 渲染上下文，用于实际绘制签名轨迹
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberof SignaturePad
     */
    private _ctx;
    /**
     * @description 是否正在绘制中（笔触未抬起）
     * @private
     * @memberof SignaturePad
     */
    private _drawingStroke;
    /**
     * @description 签名是否为空（未绘制任何内容）
     * @private
     * @memberof SignaturePad
     */
    private _isEmpty;
    /**
     * @description 是否重新绘制过签名（用于判断是否从数据恢复过签名）
     * @private
     * @memberof SignaturePad
     */
    private _isRedrawn;
    /**
     * @description 上一次从DataURL加载的签名图片地址，用于撤销操作时恢复
     * @private
     * @memberof SignaturePad
     */
    private _oldFromDataURL;
    /**
     * @description 存储最近的点（最多4个），用于生成新的贝塞尔曲线
     * @private
     * @type {Point[]}
     * @memberof SignaturePad
     */
    private _lastPoints;
    /**
     * @description 存储所有签名数据（按轨迹分组，每组包含一段连续绘制的点及样式配置）
     * @private
     * @type {IPointGroup[]}
     * @memberof SignaturePad
     */
    private _data;
    /**
     * @description 上一次计算的绘制速度（用于平滑线条宽度变化）
     * @private
     * @memberof SignaturePad
     */
    private _lastVelocity;
    /**
     * @description 上一次绘制的线条宽度（用于平滑过渡到当前宽度）
     * @private
     * @memberof SignaturePad
     */
    private _lastWidth;
    /**
     * @description 节流处理后的笔触移动更新函数（根据配置的throttle值决定是否节流）
     * @private
     * @memberof SignaturePad
     */
    private _strokeMoveUpdate;
    /**
     * @description 当前活跃的指针事件ID（用于区分多指针设备的不同笔触）
     * @private
     * @type {(number | undefined)}
     * @memberof SignaturePad
     */
    private _strokePointerId;
    constructor(canvas: HTMLCanvasElement, options?: ISignaturePadOptions);
    clear(): void;
    /**
     * 从数据URL加载图像并绘制到签名画布上
     * 支持对图像进行旋转、缩放和偏移等处理，适用于恢复保存的签名图像
     * @param {string} dataUrl - 图像的DataURL（如base64编码的图片数据）
     * @param {Object} [options={}] - 加载配置选项
     * @returns {Promise<void>} - 加载完成的Promise（成功时resolve，失败时reject）
     */
    fromDataURL(dataUrl: string, options?: {
        ratio?: number;
        width?: number;
        height?: number;
        xOffset?: number;
        yOffset?: number;
        rotation?: number;
    }): Promise<void>;
    /**
     * @description 将已有的 DataURL 旋转指定角度后，返回新的 DataURL
     * @private
     * @param {string} dataUrl - 原始图片的DataURL
     * @param {number} rotation - 旋转角度（度数，顺时针），默认0
     * @param {string} type - 图片格式，默认'image/png'
     * @param {number} [encoderOptions] - 图片质量（0-1），仅适用于jpeg等格式
     * @returns {*}  {Promise<string>}
     * @memberof SignaturePad
     */
    private rotateDataURL;
    /**
     * @description 撤销上一步
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    undoLastStep(): void;
    /**
     * @description 封装获取当前旋转方位的方法
     * @returns {*}  {IData} 包含屏幕状态、旋转角度和方向的对象
     * @memberof SignaturePad
     */
    getCurrentOrientation(): IData;
    /**
     * @description 将签名图像作为数据 URL 返回
     * @param {string} [type='image/png']
     * @param {{
     *       rotation?: number;
     *       quality?: number;
     *       encoderOptions?: IToSVGOptions;
     *     }} [options={}]
     * @returns {*}  {string}
     * @memberof SignaturePad
     */
    toDataURL(type?: string, options?: {
        rotation?: number;
        quality?: number;
        encoderOptions?: IToSVGOptions;
    }): string;
    /**
     * @description 导出为 Canvas DataURL（支持旋转）
     * @private
     * @param {string} [type='image/png'] 图片格式
     * @param {number} [encoderOptions] 图片质量（0-1）
     * @param {number} [rotation] 旋转角度（度数）
     * @returns {*}  {string}
     * @memberof SignaturePad
     */
    private toCanvasDataURL;
    /**
     * @description 启用签名功能的事件监听，配置画布样式以禁用默认的触摸行为（如平移、缩放），并根据设备类型绑定相应的事件处理器
     * @memberof SignaturePad
     */
    on(): void;
    /**
     * @description 禁用签名功能的事件监听，恢复画布默认样式（允许平移、缩放等），并移除所有已绑定的事件处理器
     * @memberof SignaturePad
     */
    off(): void;
    /**
     * @description 获取事件监听器的工具函数（适配不同文档上下文的窗口）
     * @private
     * @returns {*} 包含addEventListener和removeEventListener的对象
     * @memberof SignaturePad
     */
    private _getListenerFunctions;
    /**
     * @description 移除所有移动和抬起事件的监听器（清理事件绑定）
     * @private
     * @memberof SignaturePad
     */
    private _removeMoveUpEventListeners;
    /**
     * @description 判断签名画布是否为空（未绘制任何内容）
     * @returns {*}  {boolean}
     * @memberof SignaturePad
     */
    isEmpty(): boolean;
    /**
     * @description 判断签名是否经过重新绘制（如从数据恢复签名、执行撤销后重新渲染等场景）
     * @returns {*}  {boolean}
     * @memberof SignaturePad
     */
    isRedrawn(): boolean;
    /**
     * @description 从点组数据加载并渲染签名，可根据配置决定是否先清空现有签名，再基于传入的点组数据重新绘制曲线和点
     * @param {IPointGroup[]} pointGroups - 签名点组数据数组，每个点组包含一段签名的点集合及对应的样式配置
     * @param {IFromDataOptions} [options={ clear: true }] - 加载配置项，默认清空现有签名
     * @memberof SignaturePad
     */
    fromData(pointGroups: IPointGroup[], { clear }?: IFromDataOptions): void;
    /**
     * @description 导出当前签名的点组数据，用于保存签名原始数据，后续可通过fromData方法恢复签名
     * @returns {*}  {IPointGroup[]}
     * @memberof SignaturePad
     */
    toData(): IPointGroup[];
    /**
     * @description 判断鼠标左键是否按下（支持判断是否仅左键按下）
     * @private
     * @param {MouseEvent} event - 鼠标事件对象
     * @param {boolean} [only] - 是否要求仅左键按下
     * @returns {*}  {boolean}
     * @memberof SignaturePad
     */
    private _isLeftButtonPressed;
    /**
     * @description 将鼠标/指针事件转换为签名事件对象
     * @private
     * @param {(MouseEvent | PointerEvent)} event - 原始事件对象
     * @returns {*}  {ISignatureEvent}
     * @memberof SignaturePad
     */
    private _pointerEventToSignatureEvent;
    /**
     * @description 将触摸事件转换为签名事件对象
     * @private
     * @param {TouchEvent} event - 原始触摸事件
     * @returns {*}  {ISignatureEvent}
     * @memberof SignaturePad
     */
    private _touchEventToSignatureEvent;
    /**
     * @description 处理鼠标按下事件，当左键按下且未正在绘制时，开始新的笔触
     * @private
     * @param {MouseEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleMouseDown;
    /**
     * @description 处理鼠标移动事件，当左键持续按下且正在绘制时，更新笔触；否则结束笔触
     * @private
     * @param {MouseEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleMouseMove;
    /**
     * @description 处理鼠标抬起事件，当左键抬起时，结束当前笔触
     * @private
     * @param {MouseEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleMouseUp;
    /**
     * @description 处理触摸开始事件，当单点触摸且不在绘制状态时，开始新的笔触，并阻止页面滚动
     * @private
     * @param {TouchEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleTouchStart;
    /**
     * @description 处理触摸移动事件，当单点触摸且正在绘制时，更新笔触；否则结束笔触，并阻止页面滚动
     * @private
     * @param {TouchEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleTouchMove;
    /**
     * @description 处理触摸结束事件，当所有触摸点离开时，结束当前笔触，并阻止默认行为
     * @private
     * @param {TouchEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handleTouchEnd;
    /**
     * @description 获取指针事件的唯一ID（优先使用persistentDeviceId，兼容旧设备用pointerId）
     * @private
     * @param {PointerEvent} event
     * @returns {*} {number}
     * @memberof SignaturePad
     */
    private _getPointerId;
    /**
     * @description 判断当前指针事件的ID是否为当前活跃的笔触ID
     * @private
     * @param {PointerEvent} event - 指针事件对象
     * @param {boolean} [allowUndefined] - 是否允许当前无活跃ID（初始状态）
     * @returns {*}  {boolean}
     * @memberof SignaturePad
     */
    private _allowPointerId;
    /**
     * @description 处理指针按下事件（兼容鼠标、触摸等多种输入设备）
     * @private
     * @param {PointerEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handlePointerDown;
    /**
     * @description 处理指针移动事件，当指针ID有效、左键持续按下且正在绘制时，更新笔触；否则结束笔触
     * @private
     * @param {PointerEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handlePointerMove;
    /**
     * @description 处理指针抬起事件，当左键抬起且指针ID有效时，结束当前笔触
     * @private
     * @param {PointerEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _handlePointerUp;
    /**
     * @description 获取点组的样式配置（优先使用点组自身配置，否则用全局配置）
     * @private
     * @param {IPointGroup} [group] - 点组对象（可选）
     * @returns {*}  {IPointGroupOptions}
     * @memberof SignaturePad
     */
    private _getPointGroupOptions;
    /**
     * @description 开始绘制笔触（初始化事件监听和绘制状态）
     * @private
     * @param {ISignatureEvent} event - 签名事件对象
     * @memberof SignaturePad
     */
    private _strokeBegin;
    /**
     * @description 更新绘制（处理新点并绘制曲线/点）
     * @private
     * @param {ISignatureEvent} event
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _strokeUpdate;
    /**
     * @description 结束绘制笔触（清理事件监听和绘制状态）
     * @private
     * @param {ISignatureEvent} event - 签名事件对象
     * @param {boolean} [shouldUpdate=true] - 是否在结束前更新绘制
     * @returns {*}  {void}
     * @memberof SignaturePad
     */
    private _strokeEnd;
    /**
     * @description 初始化指针事件处理（绑定指针按下事件）
     * @private
     * @memberof SignaturePad
     */
    private _handlePointerEvents;
    /**
     * @description 初始化鼠标事件处理（绑定鼠标按下事件）
     * @private
     * @memberof SignaturePad
     */
    private _handleMouseEvents;
    /**
     * @description 初始化触摸事件处理（绑定触摸开始事件）
     * @private
     * @memberof SignaturePad
     */
    private _handleTouchEvents;
    /**
     * @description 重置绘制状态（清空最近点、重置速度和宽度等）
     * @private
     * @param {IPointGroupOptions} options - 点组样式配置
     * @memberof SignaturePad
     */
    private _reset;
    /**
     * @description 创建点对象（转换坐标为画布相对坐标）
     * @private
     * @param {number} x - 原始X坐标（相对于视口）
     * @param {number} y - 原始Y坐标（相对于视口）
     * @param {number} pressure - 压力值
     * @returns {*}  {Point}
     * @memberof SignaturePad
     */
    private _createPoint;
    /**
     * @description 添加点到最近点列表，并在点足够时生成贝塞尔曲线
     * @private
     * @param {Point} point - 新点
     * @param {IPointGroupOptions} options - 样式配置
     * @returns {*}  {(Bezier | null)}
     * @memberof SignaturePad
     */
    private _addPoint;
    /**
     * @description 计算曲线的起始和结束宽度（基于速度动态调整）
     * @private
     * @param {Point} startPoint - 曲线起点
     * @param {Point} endPoint - 曲线终点
     * @param {IPointGroupOptions} options - 样式配置
     * @returns {*}  {{ start: number; end: number }}
     * @memberof SignaturePad
     */
    private _calculateCurveWidths;
    /**
     * @description 根据速度计算线条宽度（速度越快，宽度越接近最小宽度）
     * @private
     * @param {number} velocity - 绘制速度
     * @param {IPointGroupOptions} options - 样式配置
     * @returns {*}  {number}
     * @memberof SignaturePad
     */
    private _strokeWidth;
    /**
     * @description 绘制曲线片段（以点为中心的圆，用于模拟线条）
     * @private
     * @param {number} x - 片段X坐标
     * @param {number} y - 片段Y坐标
     * @param {number} width - 片段宽度（圆的半径）
     * @memberof SignaturePad
     */
    private _drawCurveSegment;
    /**
     * @description 绘制贝塞尔曲线（通过分段绘制多个圆模拟平滑线条）
     * @private
     * @param {Bezier} curve - 贝塞尔曲线对象
     * @param {IPointGroupOptions} options - 样式配置
     * @memberof SignaturePad
     */
    private _drawCurve;
    /**
     * @description 绘制点（用于笔触起始或单点点击）
     * @private
     * @param {IBasicPoint} point - 点对象
     * @param {IPointGroupOptions} options - 样式配置
     * @memberof SignaturePad
     */
    private _drawDot;
    /**
     * @description 从点组数据绘制签名（用于从保存的数据恢复签名）
     * @private
     * @param {IPointGroup[]} pointGroups - 点组数据数组
     * @param {Function} drawCurve - 绘制曲线的函数
     * @param {Function} drawDot - 绘制点的函数
     * @memberof SignaturePad
     */
    private _fromData;
    /**
     * @description 返回 svg 字符串而不转换为 base64
     * @param {IToSVGOptions} [{ includeBackgroundColor = false }={}] includeBackgroundColor值为true时将背景颜色添加到 SVG 输出
     * @returns {*}  {string}
     * @memberof SignaturePad
     */
    toSVG({ includeBackgroundColor }?: IToSVGOptions): string;
    /**
     * @description 将Blob对象转换为DataURL
     * @param {Blob} blob - 要转换的Blob对象
     * @returns {*}  {Promise<string>}
     * @memberof SignaturePad
     */
    blobToDataURL(blob: Blob): Promise<string>;
    /**
     * @description 处理图片加载并计算加载时间（通过回调通知完成状态）
     * @param {string} imageUrl
     * @param {() => void} _callBack
     * @memberof SignaturePad
     */
    loadImage(imageUrl: string, _callBack: () => void): void;
}
//# sourceMappingURL=signature_pad.d.ts.map