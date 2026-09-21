import { domToCanvas } from '../../../../node_modules/.pnpm/modern-screenshot@4.6.7/node_modules/modern-screenshot/dist/index.mjs';
import { ScreenShotStore } from './screen-shot.store.mjs';
import { ToolbarItemType } from '../type/index.mjs';
import '../module/index.mjs';
import { getMousePosition } from '../util/index.mjs';
import { DrawArrow } from '../module/draw-arrow.mjs';
import { drawText } from '../module/draw-text.mjs';
import { initPencil, drawPencil } from '../module/draw-pencil.mjs';
import { drawMosaic } from '../module/draw-mosaic.mjs';
import { drawCircle } from '../module/draw-circle.mjs';
import { drawRectangle } from '../module/draw-rectangle.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ScreenShotController {
  /**
   * Creates an instance of ScreenShotController.
   * @memberof ScreenShotController
   */
  constructor() {
    /**
     * @description 状态对象
     * @type {ScreenShotState}
     * @memberof ScreenShotController
     */
    __publicField(this, "store");
    /**
     * @description 画笔配置
     * @private
     * @type {IBrushOption}
     * @memberof ScreenShotController
     */
    __publicField(this, "brushOption");
    /**
     * @description 画布上下文
     * @private
     * @type {(CanvasRenderingContext2D | undefined)}
     * @memberof ScreenShotController
     */
    __publicField(this, "canvasCtx");
    /**
     * @description 绘制状态
     * @private
     * @type {boolean}
     * @memberof ScreenShotController
     */
    __publicField(this, "drawing", false);
    /**
     * @description 最大可撤销次数
     * @private
     * @type {number}
     * @memberof ScreenShotController
     */
    __publicField(this, "maxUndoNum", 15);
    /**
     * @description 文本输入框位置
     * @private
     * @type {IMousePosition}
     * @memberof ScreenShotController
     */
    __publicField(this, "textInputInfo", {
      mouseX: 0,
      mouseY: 0,
      size: 14,
      color: "#F53340"
    });
    /**
     * @description 图形位置参数
     * @private
     * @type {IMousePosition}
     * @memberof ScreenShotController
     */
    __publicField(this, "drawGraphPosition", {
      mouseX: 0,
      mouseY: 0
    });
    /**
     * @description 递增变粗箭头的实现
     * @private
     * @memberof ScreenShotController
     */
    __publicField(this, "drawArrow", new DrawArrow());
    /**
     * @description 前进历史栈 - 存储被撤销的操作
     * @private
     * @type {Array<{ data: ImageData }>}
     * @memberof ScreenShotController
     */
    __publicField(this, "redoHistory", []);
    this.store = new ScreenShotStore();
  }
  /**
   * @description 显示最新的画布状态
   * @private
   * @memberof ScreenShotController
   */
  showLastHistory() {
    if (!this.canvasCtx)
      return;
    if (this.store.history.value.length <= 0)
      this.addHistory();
    const data = this.store.history.value[this.store.history.value.length - 1].data;
    this.canvasCtx.putImageData(data, 0, 0);
  }
  /**
   * @description 添加历史
   * @private
   * @memberof ScreenShotController
   */
  addHistory() {
    if (!this.store.canvasElement.value || !this.canvasCtx)
      return;
    if (this.store.history.value.length > this.maxUndoNum)
      this.store.history.value.shift();
    const controller = this.store.canvasElement.value;
    this.store.history.value.push({
      data: this.canvasCtx.getImageData(
        0,
        0,
        controller.width,
        controller.height
      )
    });
    this.redoHistory = [];
  }
  /**
   * @description 回退历史
   * @private
   * @memberof ScreenShotController
   */
  goBackToHistory() {
    var _a;
    if (this.store.history.value.length <= 1)
      return;
    this.endTextEditing();
    const poppedHistory = this.store.history.value.pop();
    if (poppedHistory) {
      this.redoHistory.push(poppedHistory);
    }
    const data = (_a = this.store.history.value[this.store.history.value.length - 1]) == null ? void 0 : _a.data;
    if (this.canvasCtx && data)
      this.canvasCtx.putImageData(data, 0, 0);
  }
  /**
   * @description 前进历史（重做）
   * @memberof ScreenShotController
   */
  goForwardToHistory() {
    if (!this.redoHistory.length)
      return;
    this.endTextEditing();
    const forwardHistory = this.redoHistory.pop();
    if (!forwardHistory || !this.canvasCtx)
      return;
    this.store.history.value.push(forwardHistory);
    this.canvasCtx.putImageData(forwardHistory.data, 0, 0);
  }
  /**
   * @description 启用文本编辑
   * @private
   * @param {number} X
   * @param {number} Y
   * @returns {*}  {void}
   * @memberof ScreenShotController
   */
  enableTextEditing(event) {
    const element = this.store.textInputElement.value;
    if (!this.canvasCtx || !element || !this.brushOption)
      return;
    this.showLastHistory();
    this.store.textStatus.value = true;
    const { clientX, clientY } = event;
    const { mouseX, mouseY, size, color } = this.textInputInfo;
    const position = getMousePosition(event);
    if (element.innerText && mouseX !== 0 && mouseY !== 0 && mouseX !== position.mouseX && mouseY !== position.mouseY) {
      drawText(
        element.innerText,
        this.textInputInfo.mouseX,
        this.textInputInfo.mouseY,
        color,
        size,
        this.canvasCtx
      );
      element.innerText = "";
      this.addHistory();
    }
    element.style.fontFamily = "none";
    element.style.left = "".concat(clientX, "px");
    element.style.fontSize = "".concat(this.brushOption.size, "px");
    element.style.color = this.brushOption.color;
    setTimeout(() => {
      const containerHeight = element.offsetHeight;
      element.style.top = "".concat(clientY - Math.floor(containerHeight / 2), "px");
      element.focus();
      this.textInputInfo = {
        mouseX: position.mouseX,
        mouseY: position.mouseY,
        size: this.brushOption.size,
        color: this.brushOption.color
      };
    });
  }
  /**
   * @description 结束文本编辑
   * @private
   * @returns {*}  {void}
   * @memberof ScreenShotController
   */
  endTextEditing() {
    const element = this.store.textInputElement.value;
    if (!element || !this.canvasCtx)
      return;
    if (element.innerText) {
      const { mouseX, mouseY, size, color } = this.textInputInfo;
      drawText(element.innerText, mouseX, mouseY, color, size, this.canvasCtx);
      this.addHistory();
    }
    element.innerHTML = "";
    this.store.textStatus.value = false;
  }
  /**
   * @description DOM生成Canvas
   * @param {HTMLElement} el DOM元素
   * @param {{ container?: HTMLElement; itemClassName?: string }} opts 如果需针对dom内部滚动容器截图，则需配置：滚动容器，滚动容器项类名，用以排除非可视区元素
   * @returns {*}  {Promise<void>}
   * @memberof ScreenShotController
   */
  async domToCanvas(el, opts) {
    var _a;
    this.store.isLoading.value = true;
    const { container, itemClassName } = opts;
    const containerRect = container == null ? void 0 : container.getBoundingClientRect();
    const canvas = await domToCanvas(el, {
      scale: window.devicePixelRatio || 1,
      quality: 1,
      filter: (node) => {
        var _a2, _b;
        if (containerRect && itemClassName) {
          const element = node;
          if ((container == null ? void 0 : container.contains(element)) && ((_a2 = element.classList) == null ? void 0 : _a2.contains(itemClassName))) {
            const elementRect = (_b = element.getBoundingClientRect) == null ? void 0 : _b.call(element);
            if (elementRect)
              return elementRect.bottom > containerRect.top && elementRect.top < containerRect.bottom && elementRect.right > containerRect.left && elementRect.left < containerRect.right;
          }
        }
        return true;
      }
    });
    this.canvasCtx = (_a = this.store.canvasElement.value) == null ? void 0 : _a.getContext("2d");
    if (this.canvasCtx) {
      this.store.canvasElement.value.width = canvas.width;
      this.store.canvasElement.value.height = canvas.height;
      this.store.canvasElement.value.style.top = "".concat(el.offsetTop, "px");
      this.store.canvasElement.value.style.left = "".concat(el.offsetLeft, "px");
      this.canvasCtx.drawImage(canvas, 0, 0);
    }
    this.store.isLoading.value = false;
    this.store.toolbarStatus.value = true;
  }
  /**
   * @description 工具点击
   * @param {ToolbarItemType} toolName
   * @param {IBrushOption} opt
   * @memberof ScreenShotController
   */
  onToolClick(toolName, opt) {
    if (toolName === ToolbarItemType.DRAWDOWN)
      this.goBackToHistory();
    this.brushOption = opt;
    this.store.toolbarName.value = toolName;
    this.endTextEditing();
  }
  /**
   * @description 鼠标按下
   * @param {MouseEvent} event
   * @memberof ScreenShotController
   */
  mouseDownEvent(event) {
    if (event.button !== 0 || !this.store.toolbarName.value || this.store.toolbarName.value === ToolbarItemType.DRAWDOWN || !this.canvasCtx)
      return;
    this.drawing = true;
    const { mouseX, mouseY } = getMousePosition(event);
    Object.assign(this.drawGraphPosition, {
      mouseX,
      mouseY
    });
    switch (this.store.toolbarName.value) {
      case ToolbarItemType.BRUSH:
        initPencil(this.canvasCtx, mouseX, mouseY);
        break;
      case ToolbarItemType.TEXT:
        this.enableTextEditing(event);
        break;
      default:
        break;
    }
  }
  /**
   * @description 鼠标移动
   * @param {MouseEvent} event
   * @returns {*}  {void}
   * @memberof ScreenShotController
   */
  mouseMoveEvent(event) {
    if (!this.store.toolbarName.value || !this.drawing || !this.canvasCtx || !this.brushOption)
      return;
    const { mouseX, mouseY } = getMousePosition(event);
    const { mouseX: startX, mouseY: startY } = this.drawGraphPosition;
    if (this.store.toolbarName.value !== ToolbarItemType.MOSAIC)
      this.showLastHistory();
    switch (this.store.toolbarName.value) {
      case ToolbarItemType.BRUSH:
        drawPencil(
          this.canvasCtx,
          mouseX,
          mouseY,
          this.brushOption.size,
          this.brushOption.color
        );
        break;
      case ToolbarItemType.RECT:
        drawRectangle(
          startX,
          startY,
          mouseX - startX,
          mouseY - startY,
          this.brushOption.color,
          this.brushOption.size,
          this.canvasCtx
        );
        break;
      case ToolbarItemType.CIRCLE:
        drawCircle(
          this.canvasCtx,
          mouseX,
          mouseY,
          startX,
          startY,
          this.brushOption.size,
          this.brushOption.color
        );
        break;
      case ToolbarItemType.ARROW:
        this.drawArrow.draw(
          this.canvasCtx,
          startX,
          startY,
          mouseX,
          mouseY,
          this.brushOption.color
        );
        break;
      case ToolbarItemType.MOSAIC:
        drawMosaic(
          mouseX - 10,
          mouseY - 10,
          this.brushOption.size,
          5,
          this.canvasCtx
        );
        break;
      default:
        break;
    }
  }
  /**
   * @description 鼠标抬起
   * @returns {*}  {void}
   * @memberof ScreenShotController
   */
  mouseUpEvent() {
    this.drawing = false;
    if (!this.store.toolbarName.value || this.store.toolbarName.value === ToolbarItemType.DRAWDOWN || this.store.toolbarName.value === ToolbarItemType.TEXT || !this.canvasCtx)
      return;
    this.addHistory();
  }
}

export { ScreenShotController };
