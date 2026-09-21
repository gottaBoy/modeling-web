'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodashEs = require('lodash-es');
var bezier = require('./bezier.cjs');
var point = require('./point.cjs');

"use strict";
class SignaturePad {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    /**
     * @description 是否正在绘制中（笔触未抬起）
     * @private
     * @memberof SignaturePad
     */
    this._drawingStroke = false;
    /**
     * @description 签名是否为空（未绘制任何内容）
     * @private
     * @memberof SignaturePad
     */
    this._isEmpty = true;
    /**
     * @description 是否重新绘制过签名（用于判断是否从数据恢复过签名）
     * @private
     * @memberof SignaturePad
     */
    this._isRedrawn = false;
    /**
     * @description 上一次从DataURL加载的签名图片地址，用于撤销操作时恢复
     * @private
     * @memberof SignaturePad
     */
    this._oldFromDataURL = "";
    /**
     * @description 存储最近的点（最多4个），用于生成新的贝塞尔曲线
     * @private
     * @type {Point[]}
     * @memberof SignaturePad
     */
    this._lastPoints = [];
    /**
     * @description 存储所有签名数据（按轨迹分组，每组包含一段连续绘制的点及样式配置）
     * @private
     * @type {IPointGroup[]}
     * @memberof SignaturePad
     */
    this._data = [];
    /**
     * @description 上一次计算的绘制速度（用于平滑线条宽度变化）
     * @private
     * @memberof SignaturePad
     */
    this._lastVelocity = 0;
    /**
     * @description 上一次绘制的线条宽度（用于平滑过渡到当前宽度）
     * @private
     * @memberof SignaturePad
     */
    this._lastWidth = 0;
    var _a, _b, _c;
    this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
    this.minWidth = options.minWidth || 2;
    this.maxWidth = options.maxWidth || 2;
    this.throttle = (_a = options.throttle) != null ? _a : 16;
    this.minDistance = (_b = options.minDistance) != null ? _b : 5;
    this.dotSize = options.dotSize || 0;
    this.penColor = options.penColor || "black";
    this.backgroundColor = options.backgroundColor || "rgba(0,0,0,0)";
    this.compositeOperation = options.compositeOperation || "source-over";
    this.canvasContextOptions = (_c = options.canvasContextOptions) != null ? _c : {};
    this._strokeMoveUpdate = this.throttle ? lodashEs.throttle(SignaturePad.prototype._strokeUpdate, this.throttle) : SignaturePad.prototype._strokeUpdate;
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handlePointerMove = this._handlePointerMove.bind(this);
    this._handlePointerUp = this._handlePointerUp.bind(this);
    this._ctx = canvas.getContext(
      "2d",
      this.canvasContextOptions
    );
    this.clear();
    this.on();
  }
  clear() {
    const { _ctx: ctx, canvas } = this;
    ctx.fillStyle = this.backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._data = [];
    this._reset(this._getPointGroupOptions());
    this._isEmpty = true;
    this._strokePointerId = void 0;
    this._oldFromDataURL = "";
  }
  /**
   * 从数据URL加载图像并绘制到签名画布上
   * 支持对图像进行旋转、缩放和偏移等处理，适用于恢复保存的签名图像
   * @param {string} dataUrl - 图像的DataURL（如base64编码的图片数据）
   * @param {Object} [options={}] - 加载配置选项
   * @returns {Promise<void>} - 加载完成的Promise（成功时resolve，失败时reject）
   */
  async fromDataURL(dataUrl, options = {}) {
    let _tempDataUrl = dataUrl;
    if (lodashEs.isNumber(options.rotation) && options.rotation !== 0) {
      _tempDataUrl = await this.rotateDataURL(
        _tempDataUrl,
        options.rotation,
        // 顺时针旋转指定角度
        "image/png"
      );
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ratio = options.ratio || window.devicePixelRatio || 1;
      const width = options.width || this.canvas.width / ratio;
      const height = options.height || this.canvas.height / ratio;
      const xOffset = options.xOffset || 0;
      const yOffset = options.yOffset || 0;
      this._reset(this._getPointGroupOptions());
      image.onload = () => {
        this._ctx.drawImage(image, xOffset, yOffset, width, height);
        resolve();
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.crossOrigin = "anonymous";
      image.src = _tempDataUrl;
      this._oldFromDataURL = _tempDataUrl;
      this._isEmpty = false;
    });
  }
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
  rotateDataURL(dataUrl, rotation = 0, type = "image/png", encoderOptions) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const radians = rotation * Math.PI / 180;
        const width = image.width;
        const height = image.height;
        const tmpCanvas = document.createElement("canvas");
        const ctx = tmpCanvas.getContext("2d");
        if (rotation % 180 === 0) {
          tmpCanvas.width = width;
          tmpCanvas.height = height;
        } else {
          tmpCanvas.width = height;
          tmpCanvas.height = width;
        }
        ctx.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
        ctx.rotate(radians);
        ctx.drawImage(image, -width / 2, -height / 2);
        resolve(tmpCanvas.toDataURL(type, encoderOptions));
      };
      image.onerror = reject;
      image.crossOrigin = "anonymous";
      image.src = dataUrl;
    });
  }
  /**
   * @description 撤销上一步
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  undoLastStep() {
    const tempData = [...this._data];
    const tempFromDataURL = this._oldFromDataURL;
    this.clear();
    this._isRedrawn = true;
    if (tempData.length === 0) {
      this._oldFromDataURL = "";
      return;
    }
    tempData.pop();
    this.fromDataURL(tempFromDataURL);
    this.fromData(tempData, { clear: false });
    this._isEmpty = tempData.length <= 0;
  }
  /**
   * @description 封装获取当前旋转方位的方法
   * @returns {*}  {IData} 包含屏幕状态、旋转角度和方向的对象
   * @memberof SignaturePad
   */
  getCurrentOrientation() {
    const { screen } = window;
    const screenOrientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    let angle = 0;
    if (screenOrientation) {
      angle = screenOrientation.angle;
    }
    const orientationText = {
      "0": "DEFAULT",
      "90": "Rotated right",
      "-90": "Rotated left",
      "180": "Upside down"
    };
    const isLandscape = window.innerWidth > window.innerHeight;
    const status = isLandscape ? "\u6A2A\u5C4F" : "\u7AD6\u5C4F";
    const orientation = orientationText["".concat(angle)] || "\u672A\u77E5 (".concat(angle, "\xB0)");
    return {
      isLandscape,
      status,
      angle,
      orientation
    };
  }
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
  toDataURL(type = "image/png", options = {}) {
    switch (type) {
      case "image/svg+xml":
        if (lodashEs.isObject(options == null ? void 0 : options.encoderOptions)) {
          options.encoderOptions = void 0;
        }
        return "data:image/svg+xml;base64,".concat(btoa(
          this.toSVG(options == null ? void 0 : options.encoderOptions)
        ));
      default:
        return this.toCanvasDataURL(
          type,
          options.encoderOptions,
          options.rotation
        );
    }
  }
  /**
   * @description 导出为 Canvas DataURL（支持旋转）
   * @private
   * @param {string} [type='image/png'] 图片格式
   * @param {number} [encoderOptions] 图片质量（0-1）
   * @param {number} [rotation] 旋转角度（度数）
   * @returns {*}  {string}
   * @memberof SignaturePad
   */
  toCanvasDataURL(type = "image/png", encoderOptions, rotation) {
    if (typeof encoderOptions !== "number") {
      encoderOptions = void 0;
    }
    if (lodashEs.isNumber(rotation) && rotation !== 0) {
      const radians = rotation * Math.PI / 180;
      const tmpCanvas = document.createElement("canvas");
      const ctx = tmpCanvas.getContext("2d");
      const width = this.canvas.width;
      const height = this.canvas.height;
      if (rotation % 180 === 0) {
        tmpCanvas.width = width;
        tmpCanvas.height = height;
      } else {
        tmpCanvas.width = height;
        tmpCanvas.height = width;
      }
      ctx.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(this.canvas, -width / 2, -height / 2);
      return tmpCanvas.toDataURL(type, encoderOptions);
    }
    return this.canvas.toDataURL(type, encoderOptions);
  }
  /**
   * @description 启用签名功能的事件监听，配置画布样式以禁用默认的触摸行为（如平移、缩放），并根据设备类型绑定相应的事件处理器
   * @memberof SignaturePad
   */
  on() {
    this.canvas.style.touchAction = "none";
    this.canvas.style.msTouchAction = "none";
    this.canvas.style.userSelect = "none";
    const isIOS = /Macintosh/.test(navigator.userAgent) && "ontouchstart" in document;
    if (window.PointerEvent && !isIOS) {
      this._handlePointerEvents();
    } else {
      this._handleMouseEvents();
      if ("ontouchstart" in window) {
        this._handleTouchEvents();
      }
    }
  }
  /**
   * @description 禁用签名功能的事件监听，恢复画布默认样式（允许平移、缩放等），并移除所有已绑定的事件处理器
   * @memberof SignaturePad
   */
  off() {
    this.canvas.style.touchAction = "auto";
    this.canvas.style.msTouchAction = "auto";
    this.canvas.style.userSelect = "auto";
    this.canvas.removeEventListener("pointerdown", this._handlePointerDown);
    this.canvas.removeEventListener("mousedown", this._handleMouseDown);
    this.canvas.removeEventListener("touchstart", this._handleTouchStart);
    this._removeMoveUpEventListeners();
  }
  /**
   * @description 获取事件监听器的工具函数（适配不同文档上下文的窗口）
   * @private
   * @returns {*} 包含addEventListener和removeEventListener的对象
   * @memberof SignaturePad
   */
  _getListenerFunctions() {
    var _a;
    const canvasWindow = window.document === this.canvas.ownerDocument ? window : (_a = this.canvas.ownerDocument.defaultView) != null ? _a : this.canvas.ownerDocument;
    return {
      addEventListener: canvasWindow.addEventListener.bind(
        canvasWindow
      ),
      removeEventListener: canvasWindow.removeEventListener.bind(
        canvasWindow
      )
    };
  }
  /**
   * @description 移除所有移动和抬起事件的监听器（清理事件绑定）
   * @private
   * @memberof SignaturePad
   */
  _removeMoveUpEventListeners() {
    const { removeEventListener } = this._getListenerFunctions();
    removeEventListener("pointermove", this._handlePointerMove);
    removeEventListener("pointerup", this._handlePointerUp);
    removeEventListener("mousemove", this._handleMouseMove);
    removeEventListener("mouseup", this._handleMouseUp);
    removeEventListener("touchmove", this._handleTouchMove);
    removeEventListener("touchend", this._handleTouchEnd);
  }
  /**
   * @description 判断签名画布是否为空（未绘制任何内容）
   * @returns {*}  {boolean}
   * @memberof SignaturePad
   */
  isEmpty() {
    return this._isEmpty;
  }
  /**
   * @description 判断签名是否经过重新绘制（如从数据恢复签名、执行撤销后重新渲染等场景）
   * @returns {*}  {boolean}
   * @memberof SignaturePad
   */
  isRedrawn() {
    return this._isRedrawn;
  }
  /**
   * @description 从点组数据加载并渲染签名，可根据配置决定是否先清空现有签名，再基于传入的点组数据重新绘制曲线和点
   * @param {IPointGroup[]} pointGroups - 签名点组数据数组，每个点组包含一段签名的点集合及对应的样式配置
   * @param {IFromDataOptions} [options={ clear: true }] - 加载配置项，默认清空现有签名
   * @memberof SignaturePad
   */
  fromData(pointGroups, { clear = true } = {}) {
    if (clear) {
      this.clear();
    }
    this._fromData(
      pointGroups,
      this._drawCurve.bind(this),
      // 绑定当前实例上下文的曲线绘制方法
      this._drawDot.bind(this)
      // 绑定当前实例上下文的点绘制方法
    );
    this._data = this._data.concat(pointGroups);
  }
  /**
   * @description 导出当前签名的点组数据，用于保存签名原始数据，后续可通过fromData方法恢复签名
   * @returns {*}  {IPointGroup[]}
   * @memberof SignaturePad
   */
  toData() {
    return this._data;
  }
  /**
   * @description 判断鼠标左键是否按下（支持判断是否仅左键按下）
   * @private
   * @param {MouseEvent} event - 鼠标事件对象
   * @param {boolean} [only] - 是否要求仅左键按下
   * @returns {*}  {boolean}
   * @memberof SignaturePad
   */
  _isLeftButtonPressed(event, only) {
    if (only) {
      return event.buttons === 1;
    }
    return (event.buttons & 1) === 1;
  }
  /**
   * @description 将鼠标/指针事件转换为签名事件对象
   * @private
   * @param {(MouseEvent | PointerEvent)} event - 原始事件对象
   * @returns {*}  {ISignatureEvent}
   * @memberof SignaturePad
   */
  _pointerEventToSignatureEvent(event) {
    return {
      event,
      type: event.type,
      x: event.clientX,
      y: event.clientY,
      pressure: "pressure" in event ? event.pressure : 0
    };
  }
  /**
   * @description 将触摸事件转换为签名事件对象
   * @private
   * @param {TouchEvent} event - 原始触摸事件
   * @returns {*}  {ISignatureEvent}
   * @memberof SignaturePad
   */
  _touchEventToSignatureEvent(event) {
    const touch = event.changedTouches[0];
    return {
      event,
      type: event.type,
      x: touch.clientX,
      y: touch.clientY,
      pressure: touch.force
    };
  }
  /**
   * @description 处理鼠标按下事件，当左键按下且未正在绘制时，开始新的笔触
   * @private
   * @param {MouseEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleMouseDown(event) {
    if (!this._isLeftButtonPressed(event, true) || this._drawingStroke) {
      return;
    }
    this._strokeBegin(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 处理鼠标移动事件，当左键持续按下且正在绘制时，更新笔触；否则结束笔触
   * @private
   * @param {MouseEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleMouseMove(event) {
    if (!this._isLeftButtonPressed(event, true) || !this._drawingStroke) {
      this._strokeEnd(this._pointerEventToSignatureEvent(event), false);
      return;
    }
    this._strokeMoveUpdate(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 处理鼠标抬起事件，当左键抬起时，结束当前笔触
   * @private
   * @param {MouseEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleMouseUp(event) {
    if (this._isLeftButtonPressed(event)) {
      return;
    }
    this._strokeEnd(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 处理触摸开始事件，当单点触摸且不在绘制状态时，开始新的笔触，并阻止页面滚动
   * @private
   * @param {TouchEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleTouchStart(event) {
    if (event.targetTouches.length !== 1 || this._drawingStroke) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    this._strokeBegin(this._touchEventToSignatureEvent(event));
  }
  /**
   * @description 处理触摸移动事件，当单点触摸且正在绘制时，更新笔触；否则结束笔触，并阻止页面滚动
   * @private
   * @param {TouchEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleTouchMove(event) {
    if (event.targetTouches.length !== 1) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    if (!this._drawingStroke) {
      this._strokeEnd(this._touchEventToSignatureEvent(event), false);
      return;
    }
    this._strokeMoveUpdate(this._touchEventToSignatureEvent(event));
  }
  /**
   * @description 处理触摸结束事件，当所有触摸点离开时，结束当前笔触，并阻止默认行为
   * @private
   * @param {TouchEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handleTouchEnd(event) {
    if (event.targetTouches.length !== 0) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    this._strokeEnd(this._touchEventToSignatureEvent(event));
  }
  /**
   * @description 获取指针事件的唯一ID（优先使用persistentDeviceId，兼容旧设备用pointerId）
   * @private
   * @param {PointerEvent} event
   * @returns {*} {number}
   * @memberof SignaturePad
   */
  _getPointerId(event) {
    return (event == null ? void 0 : event.persistentDeviceId) || event.pointerId;
  }
  /**
   * @description 判断当前指针事件的ID是否为当前活跃的笔触ID
   * @private
   * @param {PointerEvent} event - 指针事件对象
   * @param {boolean} [allowUndefined] - 是否允许当前无活跃ID（初始状态）
   * @returns {*}  {boolean}
   * @memberof SignaturePad
   */
  _allowPointerId(event, allowUndefined = false) {
    if (typeof this._strokePointerId === "undefined") {
      return allowUndefined;
    }
    return this._getPointerId(event) === this._strokePointerId;
  }
  /**
   * @description 处理指针按下事件（兼容鼠标、触摸等多种输入设备）
   * @private
   * @param {PointerEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handlePointerDown(event) {
    if (this._drawingStroke || !this._isLeftButtonPressed(event) || !this._allowPointerId(event, true)) {
      return;
    }
    this._strokePointerId = this._getPointerId(event);
    event.preventDefault();
    this._strokeBegin(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 处理指针移动事件，当指针ID有效、左键持续按下且正在绘制时，更新笔触；否则结束笔触
   * @private
   * @param {PointerEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handlePointerMove(event) {
    if (!this._allowPointerId(event)) {
      return;
    }
    if (!this._isLeftButtonPressed(event, true) || !this._drawingStroke) {
      this._strokeEnd(this._pointerEventToSignatureEvent(event), false);
      return;
    }
    event.preventDefault();
    this._strokeMoveUpdate(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 处理指针抬起事件，当左键抬起且指针ID有效时，结束当前笔触
   * @private
   * @param {PointerEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _handlePointerUp(event) {
    if (this._isLeftButtonPressed(event) || !this._allowPointerId(event)) {
      return;
    }
    event.preventDefault();
    this._strokeEnd(this._pointerEventToSignatureEvent(event));
  }
  /**
   * @description 获取点组的样式配置（优先使用点组自身配置，否则用全局配置）
   * @private
   * @param {IPointGroup} [group] - 点组对象（可选）
   * @returns {*}  {IPointGroupOptions}
   * @memberof SignaturePad
   */
  _getPointGroupOptions(group) {
    return {
      penColor: group && "penColor" in group ? group.penColor : this.penColor,
      dotSize: group && "dotSize" in group ? group.dotSize : this.dotSize,
      minWidth: group && "minWidth" in group ? group.minWidth : this.minWidth,
      maxWidth: group && "maxWidth" in group ? group.maxWidth : this.maxWidth,
      velocityFilterWeight: group && "velocityFilterWeight" in group ? group.velocityFilterWeight : this.velocityFilterWeight,
      compositeOperation: group && "compositeOperation" in group ? group.compositeOperation : this.compositeOperation
    };
  }
  /**
   * @description 开始绘制笔触（初始化事件监听和绘制状态）
   * @private
   * @param {ISignatureEvent} event - 签名事件对象
   * @memberof SignaturePad
   */
  _strokeBegin(event) {
    const { addEventListener } = this._getListenerFunctions();
    switch (event.event.type) {
      case "mousedown":
        addEventListener("mousemove", this._handleMouseMove, {
          passive: false
        });
        addEventListener("mouseup", this._handleMouseUp, { passive: false });
        break;
      case "touchstart":
        addEventListener("touchmove", this._handleTouchMove, {
          passive: false
        });
        addEventListener("touchend", this._handleTouchEnd, { passive: false });
        break;
      case "pointerdown":
        addEventListener("pointermove", this._handlePointerMove, {
          passive: false
        });
        addEventListener("pointerup", this._handlePointerUp, {
          passive: false
        });
        break;
      default:
    }
    this._drawingStroke = true;
    const pointGroupOptions = this._getPointGroupOptions();
    const newPointGroup = {
      ...pointGroupOptions,
      points: []
    };
    this._data.push(newPointGroup);
    this._reset(pointGroupOptions);
    this._strokeUpdate(event);
  }
  /**
   * @description 更新绘制（处理新点并绘制曲线/点）
   * @private
   * @param {ISignatureEvent} event
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _strokeUpdate(event) {
    if (!this._drawingStroke) {
      return;
    }
    if (this._data.length === 0) {
      this._strokeBegin(event);
      return;
    }
    const point = this._createPoint(event.x, event.y, event.pressure);
    const lastPointGroup = this._data[this._data.length - 1];
    const lastPoints = lastPointGroup.points;
    const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
    const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
    const pointGroupOptions = this._getPointGroupOptions(lastPointGroup);
    if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
      const curve = this._addPoint(point, pointGroupOptions);
      if (!lastPoint) {
        this._drawDot(point, pointGroupOptions);
      } else if (curve) {
        this._drawCurve(curve, pointGroupOptions);
      }
      lastPoints.push({
        time: point.time,
        x: point.x,
        y: point.y,
        pressure: point.pressure
      });
    }
  }
  /**
   * @description 结束绘制笔触（清理事件监听和绘制状态）
   * @private
   * @param {ISignatureEvent} event - 签名事件对象
   * @param {boolean} [shouldUpdate=true] - 是否在结束前更新绘制
   * @returns {*}  {void}
   * @memberof SignaturePad
   */
  _strokeEnd(event, shouldUpdate = true) {
    this._removeMoveUpEventListeners();
    if (!this._drawingStroke) {
      return;
    }
    if (shouldUpdate) {
      this._strokeUpdate(event);
    }
    this._drawingStroke = false;
    this._strokePointerId = void 0;
  }
  /**
   * @description 初始化指针事件处理（绑定指针按下事件）
   * @private
   * @memberof SignaturePad
   */
  _handlePointerEvents() {
    this._drawingStroke = false;
    this.canvas.addEventListener("pointerdown", this._handlePointerDown, {
      passive: false
    });
  }
  /**
   * @description 初始化鼠标事件处理（绑定鼠标按下事件）
   * @private
   * @memberof SignaturePad
   */
  _handleMouseEvents() {
    this._drawingStroke = false;
    this.canvas.addEventListener("mousedown", this._handleMouseDown, {
      passive: false
    });
  }
  /**
   * @description 初始化触摸事件处理（绑定触摸开始事件）
   * @private
   * @memberof SignaturePad
   */
  _handleTouchEvents() {
    this.canvas.addEventListener("touchstart", this._handleTouchStart, {
      passive: false
    });
  }
  /**
   * @description 重置绘制状态（清空最近点、重置速度和宽度等）
   * @private
   * @param {IPointGroupOptions} options - 点组样式配置
   * @memberof SignaturePad
   */
  _reset(options) {
    this._lastPoints = [];
    this._lastVelocity = 0;
    this._lastWidth = (options.minWidth + options.maxWidth) / 2;
    this._ctx.fillStyle = options.penColor;
    this._ctx.globalCompositeOperation = options.compositeOperation;
  }
  /**
   * @description 创建点对象（转换坐标为画布相对坐标）
   * @private
   * @param {number} x - 原始X坐标（相对于视口）
   * @param {number} y - 原始Y坐标（相对于视口）
   * @param {number} pressure - 压力值
   * @returns {*}  {Point}
   * @memberof SignaturePad
   */
  _createPoint(x, y, pressure) {
    const rect = this.canvas.getBoundingClientRect();
    return new point.Point(
      x - rect.left,
      y - rect.top,
      pressure,
      (/* @__PURE__ */ new Date()).getTime()
    );
  }
  /**
   * @description 添加点到最近点列表，并在点足够时生成贝塞尔曲线
   * @private
   * @param {Point} point - 新点
   * @param {IPointGroupOptions} options - 样式配置
   * @returns {*}  {(Bezier | null)}
   * @memberof SignaturePad
   */
  _addPoint(point, options) {
    const { _lastPoints } = this;
    _lastPoints.push(point);
    if (_lastPoints.length > 2) {
      if (_lastPoints.length === 3) {
        _lastPoints.unshift(_lastPoints[0]);
      }
      const widths = this._calculateCurveWidths(
        _lastPoints[1],
        _lastPoints[2],
        options
      );
      const curve = bezier.Bezier.fromPoints(_lastPoints, widths);
      _lastPoints.shift();
      return curve;
    }
    return null;
  }
  /**
   * @description 计算曲线的起始和结束宽度（基于速度动态调整）
   * @private
   * @param {Point} startPoint - 曲线起点
   * @param {Point} endPoint - 曲线终点
   * @param {IPointGroupOptions} options - 样式配置
   * @returns {*}  {{ start: number; end: number }}
   * @memberof SignaturePad
   */
  _calculateCurveWidths(startPoint, endPoint, options) {
    const velocity = options.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - options.velocityFilterWeight) * this._lastVelocity;
    const newWidth = this._strokeWidth(velocity, options);
    const widths = {
      end: newWidth,
      start: this._lastWidth
    };
    this._lastVelocity = velocity;
    this._lastWidth = newWidth;
    return widths;
  }
  /**
   * @description 根据速度计算线条宽度（速度越快，宽度越接近最小宽度）
   * @private
   * @param {number} velocity - 绘制速度
   * @param {IPointGroupOptions} options - 样式配置
   * @returns {*}  {number}
   * @memberof SignaturePad
   */
  _strokeWidth(velocity, options) {
    return Math.max(options.maxWidth / (velocity + 1), options.minWidth);
  }
  /**
   * @description 绘制曲线片段（以点为中心的圆，用于模拟线条）
   * @private
   * @param {number} x - 片段X坐标
   * @param {number} y - 片段Y坐标
   * @param {number} width - 片段宽度（圆的半径）
   * @memberof SignaturePad
   */
  _drawCurveSegment(x, y, width) {
    const ctx = this._ctx;
    ctx.moveTo(x, y);
    ctx.arc(x, y, width, 0, 2 * Math.PI, false);
    this._isEmpty = false;
    this._isRedrawn = true;
  }
  /**
   * @description 绘制贝塞尔曲线（通过分段绘制多个圆模拟平滑线条）
   * @private
   * @param {Bezier} curve - 贝塞尔曲线对象
   * @param {IPointGroupOptions} options - 样式配置
   * @memberof SignaturePad
   */
  _drawCurve(curve, options) {
    const ctx = this._ctx;
    const widthDelta = curve.endWidth - curve.startWidth;
    const drawSteps = Math.ceil(curve.length()) * 2;
    ctx.beginPath();
    ctx.fillStyle = options.penColor;
    for (let i = 0; i < drawSteps; i += 1) {
      const t = i / drawSteps;
      const tt = t * t;
      const ttt = tt * t;
      const u = 1 - t;
      const uu = u * u;
      const uuu = uu * u;
      let x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;
      let y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;
      const width = Math.min(
        curve.startWidth + ttt * widthDelta,
        options.maxWidth
      );
      this._drawCurveSegment(x, y, width);
    }
    ctx.closePath();
    ctx.fill();
  }
  /**
   * @description 绘制点（用于笔触起始或单点点击）
   * @private
   * @param {IBasicPoint} point - 点对象
   * @param {IPointGroupOptions} options - 样式配置
   * @memberof SignaturePad
   */
  _drawDot(point, options) {
    const ctx = this._ctx;
    const width = options.dotSize > 0 ? options.dotSize : (options.minWidth + options.maxWidth) / 2;
    ctx.beginPath();
    this._drawCurveSegment(point.x, point.y, width);
    ctx.closePath();
    ctx.fillStyle = options.penColor;
    ctx.fill();
  }
  /**
   * @description 从点组数据绘制签名（用于从保存的数据恢复签名）
   * @private
   * @param {IPointGroup[]} pointGroups - 点组数据数组
   * @param {Function} drawCurve - 绘制曲线的函数
   * @param {Function} drawDot - 绘制点的函数
   * @memberof SignaturePad
   */
  _fromData(pointGroups, drawCurve, drawDot) {
    for (const group of pointGroups) {
      const { points } = group;
      const pointGroupOptions = this._getPointGroupOptions(group);
      if (points.length > 1) {
        for (let j = 0; j < points.length; j += 1) {
          const basicPoint = points[j];
          const point$1 = new point.Point(
            basicPoint.x,
            basicPoint.y,
            basicPoint.pressure,
            basicPoint.time
          );
          if (j === 0) {
            this._reset(pointGroupOptions);
          }
          const curve = this._addPoint(point$1, pointGroupOptions);
          if (curve) {
            drawCurve(curve, pointGroupOptions);
          }
        }
      } else {
        this._reset(pointGroupOptions);
        drawDot(points[0], pointGroupOptions);
      }
    }
  }
  /**
   * @description 返回 svg 字符串而不转换为 base64
   * @param {IToSVGOptions} [{ includeBackgroundColor = false }={}] includeBackgroundColor值为true时将背景颜色添加到 SVG 输出
   * @returns {*}  {string}
   * @memberof SignaturePad
   */
  toSVG({ includeBackgroundColor = false } = {}) {
    const pointGroups = this._data;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const minX = 0;
    const minY = 0;
    const maxX = this.canvas.width / ratio;
    const maxY = this.canvas.height / ratio;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", "".concat(minX, " ").concat(minY, " ").concat(maxX, " ").concat(maxY));
    svg.setAttribute("width", maxX.toString());
    svg.setAttribute("height", maxY.toString());
    if (includeBackgroundColor && this.backgroundColor) {
      const rect = document.createElement("rect");
      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("fill", this.backgroundColor);
      svg.appendChild(rect);
    }
    this._fromData(
      pointGroups,
      (curve, { penColor }) => {
        const path = document.createElement("path");
        if (!Number.isNaN(curve.control1.x) && !Number.isNaN(curve.control1.y) && !Number.isNaN(curve.control2.x) && !Number.isNaN(curve.control2.y)) {
          const attr = "M ".concat(curve.startPoint.x.toFixed(3), ",").concat(curve.startPoint.y.toFixed(
            3
          ), " ") + "C ".concat(curve.control1.x.toFixed(3), ",").concat(curve.control1.y.toFixed(3), " ") + "".concat(curve.control2.x.toFixed(3), ",").concat(curve.control2.y.toFixed(3), " ") + "".concat(curve.endPoint.x.toFixed(3), ",").concat(curve.endPoint.y.toFixed(3));
          path.setAttribute("d", attr);
          path.setAttribute("stroke-width", (curve.endWidth * 2.25).toFixed(3));
          path.setAttribute("stroke", penColor);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-linecap", "round");
          svg.appendChild(path);
        }
      },
      (point, { penColor, dotSize, minWidth, maxWidth }) => {
        const circle = document.createElement("circle");
        const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;
        circle.setAttribute("r", size.toString());
        circle.setAttribute("cx", point.x.toString());
        circle.setAttribute("cy", point.y.toString());
        circle.setAttribute("fill", penColor);
        svg.appendChild(circle);
      }
    );
    return svg.outerHTML;
  }
  /**
   * @description 将Blob对象转换为DataURL
   * @param {Blob} blob - 要转换的Blob对象
   * @returns {*}  {Promise<string>}
   * @memberof SignaturePad
   */
  blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error("\u65E0\u6CD5\u8F6C\u6362Blob\u4E3ADataURL"));
      };
      reader.readAsDataURL(blob);
    });
  }
  /**
   * @description 处理图片加载并计算加载时间（通过回调通知完成状态）
   * @param {string} imageUrl
   * @param {() => void} _callBack
   * @memberof SignaturePad
   */
  loadImage(imageUrl, _callBack) {
    const img = new Image();
    img.onload = () => _callBack();
    img.onerror = () => _callBack;
    img.src = imageUrl;
  }
}

exports.default = SignaturePad;
