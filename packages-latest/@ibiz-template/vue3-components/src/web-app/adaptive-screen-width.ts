// 设计稿尺寸，按 1920×1080 等比缩放
const DESIGN_WIDTH = 1920;
// 当前缩放比例，用于反向修正 el-popper 的 inset
let currentScale = 1;

/**
 * 缩放popper的inset值，将 inset 字符串中的数值按 scale 反向缩放，auto 保持不变
 * @param inset
 * @param scale
 * @returns
 */
const scalePopperInset = (inset: string, scale: number): string => {
  return inset
    .split(/\s+/)
    .map(part => {
      if (!part || part === 'auto') return part;
      // 匹配数值(可带小数/负数) + 可选单位
      const match = part.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2] || 'px';
        return `${Math.round(value / scale)}${unit}`;
      }
      return part;
    })
    .join(' ');
};

/**
 * 修正单个 el-popper 的 inset 定位，抵消 body zoom 造成的偏移
 * @param el
 * @returns
 */
const fixPopperInset = (el: HTMLElement) => {
  if (currentScale === 1) return;
  const inset = el.style.inset;
  if (!inset) return;
  // 跳过已修正过的值，避免重复缩放导致位置越来越偏
  if (el.dataset.zoomFixedInset === inset) return;
  // 记录 popper.js 计算出的原始值，便于 scale 变化时重新计算
  el.dataset.zoomOriginalInset = inset;
  const fixed = scalePopperInset(inset, currentScale);
  el.style.inset = fixed;
  el.dataset.zoomFixedInset = fixed;
};

/**
 * 修正单个 mx-context-menu 的 left/top 定位，抵消 body zoom 造成的偏移。
 * 将 px 数值转为 calc(原值 / scale) 形式，已是 calc 表达式则跳过避免重复缩放。
 * @param el
 */
const fixContextMenuPosition = (el: HTMLElement) => {
  if (currentScale === 1) return;
  const fixValue = (value: string): string => {
    if (!value || value.startsWith('calc(')) return value;
    // 匹配数值(可带小数/负数) + 可选单位
    const match = value.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
    if (match) {
      const num = match[1];
      const unit = match[2] || 'px';
      return `calc(${num}${unit} / ${currentScale})`;
    }
    return value;
  };
  const { left, top } = el.style;
  const fixedLeft = fixValue(left);
  const fixedTop = fixValue(top);
  if (fixedLeft !== left) {
    el.style.left = fixedLeft;
  }
  if (fixedTop !== top) {
    el.style.top = fixedTop;
  }
};

/**
 * 修正 Popper 的 transform 定位，抵消 body zoom 造成的偏移。
 * 将 transform: translate(x, y) 或 translate3d(x, y, z) 中的数值按 scale 反向缩放，非 px 单位保持不变。
 * @param el
 * @returns
 */
const fixPopperTransform = (el: HTMLElement) => {
  if (currentScale === 1) return;
  const transform = el.style.transform;
  if (!transform) return;
  // 跳过已修正过的值，避免重复缩放导致位置越来越偏
  if (el.dataset.zoomFixedTransform === transform) return;
  // 记录 popper.js 计算出的原始值，便于 scale 变化时重新计算
  el.dataset.zoomOriginalTransform = transform;
  // 新的正则表达式，同时匹配 translate(x, y) 和 translate3d(x, y, z)
  const fixed = transform.replace(
    /translate3d\(\s*([^,)]+),\s*([^,)]+),\s*([^,)]+)\s*\)|translate\(\s*([^,)]+),\s*([^,)]+)\s*\)/g,
    (_, x3d, y3d, z3d, x2d, y2d) => {
      const fixAxis = (val: string): string => {
        const part = val.trim();
        const match = part.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
        if (match) {
          const num = parseFloat(match[1]);
          const unit = match[2] || 'px';
          return `${Math.round(num / currentScale)}${unit}`;
        }
        return part;
      };
      // 如果匹配到 translate3d，则 x3d, y3d, z3d 有值
      if (x3d !== undefined) {
        return `translate3d(${fixAxis(x3d)}, ${fixAxis(y3d)}, ${fixAxis(z3d)})`;
      }
      // 否则匹配到 translate，则 x2d, y2d 有值
      return `translate(${fixAxis(x2d)}, ${fixAxis(y2d)})`;
    },
  );
  el.style.transform = fixed;
  el.dataset.zoomFixedTransform = fixed;
};

// 监听 DOM 变化，动态修正新增或重新定位的 el-popper 和 mx-context-menu
let popperObserver: MutationObserver | null = null;
const startObservePoppers = () => {
  popperObserver = new MutationObserver(mutations => {
    if (currentScale === 1) return;
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          if (el.classList?.contains('el-popper')) {
            fixPopperInset(el);
            if (
              el.classList.contains('ibiz-form-item-container__popper') ||
              el.classList.contains('ibiz-form-mdctrl-popper')
            ) {
              fixPopperTransform(el);
            }
          } else if (el.classList?.contains('mx-context-menu')) {
            fixContextMenuPosition(el);
          }
        });
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'style'
      ) {
        const el = mutation.target as HTMLElement;
        if (el.classList?.contains('el-popper')) {
          fixPopperInset(el);
          if (
            el.classList.contains('ibiz-form-item-container__popper') ||
            el.classList.contains('ibiz-form-mdctrl-popper')
          ) {
            fixPopperTransform(el);
          }
        } else if (el.classList?.contains('mx-context-menu')) {
          fixContextMenuPosition(el);
        }
      }
    });
  });
  popperObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style'],
  });
};
/**
 * 设置缩放比例
 */
const setZoom = () => {
  const scale = window.innerWidth / DESIGN_WIDTH;
  currentScale = scale;
  // 缩放 body：让 #app 主内容与 el-dialog/水印等 overlay 一起等比跟随
  document.body.style.setProperty('zoom', String(scale));
  // #app 在 SCSS 中是 100vw/100vh，zoom 后视觉会缩小，需覆盖为设计稿固定尺寸
  const appEl = document.getElementById('app');
  if (appEl) {
    appEl.style.width = `${DESIGN_WIDTH}px`;
    appEl.style.height = `${window.innerHeight / scale}px`;
  }
};

/**
 * 启动屏幕自适应缩放：按设计稿宽度等比缩放 body，
 * 并持续修正 el-popper 的 inset 以抵消 zoom 偏移。
 * 返回销毁函数，调用后解绑事件、清理 zoom 样式、断开 observer。
 * 若未开启 ibiz.env.isAdaptiveScreenWidth，则返回 no-op。
 */
export function startAdaptiveScreenWidth(): () => void {
  if (!ibiz.env.isAdaptiveScreenWidth) {
    return () => {};
  }
  window.addEventListener('resize', setZoom);
  setZoom();
  startObservePoppers();
  return () => {
    window.removeEventListener('resize', setZoom);
    document.body.style.removeProperty('zoom');
    popperObserver?.disconnect();
    popperObserver = null;
  };
}
