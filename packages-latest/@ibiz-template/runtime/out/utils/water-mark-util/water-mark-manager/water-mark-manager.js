/**
 * @description 具备防篡改功能的 Canvas 水印工具
 * 功能:
 *  - 可配置文本、字体、颜色、旋转角度、间距、偏移量、zIndex
 *  - 使用 canvas 渲染 -> dataURL 图块，并作为背景平铺
 *  - 支持指定容器元素（默认为 document.body）
 *  - 支持 HiDPI (devicePixelRatio) 适配
 *  - 自动处理窗口大小变化 & DPR 变化
 *  - 防篡改保护：MutationObserver 监听并恢复关键样式
 *  - 可选 Shadow DOM 隔离，增强样式保护
 *  - 提供命令式 API: destroy
 * @export
 * @class WaterMarkManager
 */
export class WaterMarkManager {
    constructor(opts, container) {
        /**
         * @description 标记当前实例是否已被销毁
         * @private
         * @memberof WaterMarkManager
         */
        this.disposed = false;
        const defaults = {
            enable: true,
            text: '',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            fontStyle: 'normal',
            color: 'rgba(0,0,0,0.5)',
            opacity: 0.3,
            rotate: -30,
            gap: [90, 90],
            offset: [0, 0],
            zIndex: 9999, // 几乎在所有元素之上
            tileSize: { width: 0, height: 0 }, // 0 表示自适应
            useShadowDom: true,
            protect: true,
            allowSelect: false,
            strictProtect: false,
            ensureRelative: true,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.options = Object.assign(Object.assign({}, defaults), opts);
        this.container = container !== null && container !== void 0 ? container : document.body;
        this.init();
    }
    /**
     * @description 销毁水印实例，移除DOM元素并清理所有资源和事件监听
     * @returns {void}
     * @memberof WaterMarkManager
     */
    destroy() {
        var _a, _b, _c;
        if (this.disposed)
            return;
        this.teardownObservers();
        (_b = (_a = this.overlay) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this.hostContainer) === null || _c === void 0 ? void 0 : _c.remove();
        // shadowRoot 会随着宿主节点的删除自动被回收
        // 清理引用
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.overlay = undefined;
        this.hostContainer = undefined;
        this.disposed = true;
    }
    /**
     * @description 水印层初始化，创建DOM结构并应用初始配置
     * @returns {WaterMarkManager} 当前实例，支持链式调用
     * @memberof WaterMarkManager
     */
    init() {
        if (!this.container)
            return;
        // 确认容器
        this.setContainer(this.container);
        // 创建宿主元素（可选用 Shadow DOM）
        const host = document.createElement('div');
        host.setAttribute('data-watermark-host', '');
        if (this.options.useShadowDom && host.attachShadow) {
            this.shadowRoot = host.attachShadow({ mode: 'open' });
        }
        // 在 shadow 或普通节点中创建水印层
        const overlay = document.createElement('div');
        overlay.setAttribute('data-watermark', '');
        Object.assign(overlay.style, this.getOverlayStyles());
        // 插入 DOM
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(overlay);
        }
        else {
            // 确保容器不会因为定位缺失导致错位
            const containerStyle = getComputedStyle(this.container);
            if (!this.isRootContainer(this.container) &&
                this.options.ensureRelative &&
                containerStyle.position === 'static') {
                this.container.style.position = 'relative';
            }
            host.appendChild(overlay);
        }
        // 将宿主元素挂载到容器
        Object.assign(host.style, this.getHostStyles());
        this.container.appendChild(host);
        this.overlay = overlay;
        // 绘制并应用水印
        this.applyTile();
        // 设置防篡改监听
        this.setupObservers(host);
        this.hostContainer = host;
    }
    // 获取宿主元素样式对象
    getHostStyles() {
        return {
            position: this.isRootContainer(this.container) ? 'fixed' : 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: String(this.options.zIndex),
            display: 'block',
            visibility: 'visible',
            transform: 'none',
            inset: '0',
            opacity: '1',
        };
    }
    // 获取水印层样式对象
    getOverlayStyles() {
        return {
            position: this.isRootContainer(this.container) ? 'fixed' : 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
            zIndex: String(this.options.zIndex),
            pointerEvents: 'none',
            userSelect: this.options.allowSelect ? 'auto' : 'none',
            backgroundRepeat: 'repeat',
            backgroundOrigin: 'content-box',
            backgroundClip: 'content-box',
            backgroundPosition: `${this.options.offset[0]}px ${this.options.offset[1]}px`,
            backgroundSize: 'auto',
            contain: 'strict',
            webkitUserSelect: this.options.allowSelect ? 'auto' : 'none',
            display: 'block',
            visibility: 'visible',
            transform: 'none',
            inset: '0',
            opacity: '1',
        };
    }
    /**
     * @description 切换水印的挂载容器并重新初始化水印位置
     * @param {HTMLElement} container 新的容器元素
     * @returns {WaterMarkManager} 当前实例，支持链式调用
     * @memberof WaterMarkManager
     */
    setContainer(container) {
        // 默认将容器元素设置为想对定位
        container.style.position = 'relative';
        this.container = container;
        return this;
    }
    /**
     * @description 判断容器是否为根容器（body或html元素）
     * @private
     * @param {HTMLElement} el 要判断的容器元素
     * @returns {boolean} 如果是根容器则返回true，否则返回false
     * @memberof WaterMarkManager
     */
    isRootContainer(el) {
        return el === document.body || el === document.documentElement;
    }
    /**
     * @description 应用水印瓦片到覆盖层，设置背景图片和大小
     * @private
     * @memberof WaterMarkManager
     */
    applyTile() {
        const { url, cssSize } = this.renderTile();
        this.overlay.style.backgroundImage = `url('${url}')`;
        this.overlay.style.backgroundSize = `${cssSize[0]}px ${cssSize[1]}px`;
    }
    /**
     * @description 渲染水印瓦片，生成包含水印文本的图片URL和样式尺寸
     * @private
     * @returns {{ url: string; cssSize: [number, number] }} 包含图片URL和CSS尺寸的对象
     * @memberof WaterMarkManager
     */
    renderTile() {
        const { text, fontSize, fontFamily, fontWeight, fontStyle, color, opacity, rotate, gap, tileSize, } = this.options;
        const lines = Array.isArray(text) ? text : [text];
        const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
        // 先测量文本宽度，用于自动计算图块大小
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        const maxLineWidth = Math.max(...lines.map(l => ctx.measureText(l).width), 1);
        const lineHeight = fontSize * 1.4; // 预估行高
        const textBlockHeight = lineHeight * lines.length;
        // 原始文本块宽高（未旋转时）
        const contentW = Math.ceil(maxLineWidth);
        const contentH = Math.ceil(textBlockHeight);
        // 旋转后边界框尺寸（近似计算）
        const rad = (rotate * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        const rotatedW = Math.ceil(contentW * cos + contentH * sin);
        const rotatedH = Math.ceil(contentW * sin + contentH * cos);
        const cssTileW = tileSize.width > 0 ? tileSize.width : rotatedW + gap[0];
        const cssTileH = tileSize.height > 0 ? tileSize.height : rotatedH + gap[1];
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.floor(cssTileW * dpr));
        canvas.height = Math.max(1, Math.floor(cssTileH * dpr));
        const c = canvas.getContext('2d');
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.scale(dpr, dpr);
        c.globalAlpha = Math.min(Math.max(opacity, 0), 1);
        c.fillStyle = color;
        c.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        // 将文本绘制在图块中心并旋转
        const centerX = cssTileW / 2;
        const centerY = cssTileH / 2;
        c.translate(centerX, centerY);
        c.rotate(rad);
        // 多行文本垂直居中
        const startY = -((lines.length - 1) * lineHeight) / 2;
        lines.forEach((line, i) => {
            c.fillText(line, 0, startY + i * lineHeight);
        });
        const url = canvas.toDataURL('image/png');
        return { url, cssSize: [cssTileW, cssTileH] };
    }
    /**
     * @description 设置水印防篡改的各种观察者，监控DOM变化和尺寸变化
     * @private
     * @param {Element} [host] 水印宿主元素
     * @returns {void}
     * @memberof WaterMarkManager
     */
    setupObservers(host) {
        if (!this.options.protect || !this.overlay)
            return;
        const targetHost = host !== null && host !== void 0 ? host : this.overlay.parentElement;
        if (!targetHost)
            return;
        // 恢复 水印 样式和位置
        const recoverOverlay = () => {
            if (!this.overlay)
                return;
            // 恢复样式
            Object.assign(targetHost.style, this.getHostStyles());
            Object.assign(this.overlay.style, this.getOverlayStyles());
            // Shadow DOM 模式
            if (this.shadowRoot) {
                if (!this.overlay.isConnected)
                    this.shadowRoot.appendChild(this.overlay);
                if (!this.shadowRoot.isConnected)
                    targetHost.appendChild(this.shadowRoot);
            }
            else {
                // 普通模式
                if (!this.overlay.isConnected)
                    targetHost.appendChild(this.overlay);
                const containerStyle = getComputedStyle(this.container);
                if (!this.isRootContainer(this.container) &&
                    this.options.ensureRelative &&
                    containerStyle.position === 'static') {
                    this.container.style.position = 'relative';
                }
            }
            // 保证 host 在 container 内
            if (!targetHost.isConnected)
                this.container.appendChild(targetHost);
            this.applyTile();
        };
        // 宿主元素被移除时恢复
        this.mutationObserver = new MutationObserver(() => {
            if (!targetHost.isConnected)
                this.container.appendChild(targetHost);
        });
        this.mutationObserver.observe(this.container, {
            childList: true,
            subtree: false,
        });
        // 监控 overlay 样式被修改或删除
        this.hostObserver = new MutationObserver(recoverOverlay);
        this.hostObserver.observe(targetHost, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            subtree: true,
            childList: true,
        });
        if (this.shadowRoot) {
            // 仅 open 模式可访问 shadowRoot
            this.shadowRootObserver = new MutationObserver(() => {
                var _a, _b;
                // 1. 先断开观察者，避免后续操作触发新的回调
                (_a = this.shadowRootObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
                // 2. 执行可能引起变化的操作
                recoverOverlay();
                // 3. 操作完成后重新开启监听（如果需要持续观察）
                (_b = this.shadowRootObserver) === null || _b === void 0 ? void 0 : _b.observe(this.shadowRoot, {
                    attributes: true,
                    attributeFilter: ['style', 'class'],
                    childList: true,
                    subtree: true,
                });
            });
            // 配置监听 shadow-root 内部的属性、子元素变化
            this.shadowRootObserver.observe(this.shadowRoot, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                childList: true,
                subtree: true,
            });
        }
        // 窗口大小与方向变化时重新铺满
        const onResize = () => this.applyTile();
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
        if (!this.isRootContainer(this.container) && 'ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver(() => this.applyTile());
            this.resizeObserver.observe(this.container);
        }
        // 严格模式定时恢复
        if (this.options.strictProtect) {
            this.strictTimer = window.setInterval(recoverOverlay, 2000);
        }
        // 清理函数
        this._cleanupResize = () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
        };
    }
    /**
     * @description 销毁所有观察者和定时器，清理事件监听
     * @private
     * @memberof WaterMarkManager
     */
    teardownObservers() {
        var _a, _b, _c, _d, _e;
        (_a = this._cleanupResize) === null || _a === void 0 ? void 0 : _a.call(this);
        this._cleanupResize = undefined;
        (_b = this.mutationObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        this.mutationObserver = undefined;
        (_c = this.hostObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
        this.hostObserver = undefined;
        (_d = this.shadowRootObserver) === null || _d === void 0 ? void 0 : _d.disconnect();
        this.shadowRootObserver = undefined;
        (_e = this.resizeObserver) === null || _e === void 0 ? void 0 : _e.disconnect();
        this.resizeObserver = undefined;
        if (this.strictTimer) {
            clearInterval(this.strictTimer);
            this.strictTimer = undefined;
        }
    }
}
