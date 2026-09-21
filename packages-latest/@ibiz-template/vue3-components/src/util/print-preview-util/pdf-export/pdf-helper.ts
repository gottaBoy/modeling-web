/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable object-shorthand */
import { h } from 'vue';
import { IPdfExportOptions } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { dayjs, ElNotification, NotificationHandle } from 'element-plus';
import { PdfPrintProcess } from './pdf-print-process';

// pdf导出分页大小
export const PAGE_SIZES: IData = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  letter: { width: 215.9, height: 279.4 },
};

// pdf导出默认参数
export const DEFAULT_OPTIONS: IPdfExportOptions = {
  orientation: 'portrait',
  pageSize: 'a4',
  fontSize: 12,
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  lineHeight: 1.6,
  textAlign: 'left',
  textColor: '#000000',
  backgroundColor: '#ffffff',
  isHtml: false,
  segmentHeight: 8000,
};

// pdf导出基础样式
const HTML_BASE_STYLES = `
  h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; line-height: 1.2; }
  h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; line-height: 1.3; }
  h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; line-height: 1.4; }
  h4 { font-size: 1em; font-weight: bold; margin: 1em 0; }
  h5 { font-size: 0.83em; font-weight: bold; margin: 1.17em 0; }
  h6 { font-size: 0.67em; font-weight: bold; margin: 1.33em 0; }
  p { margin: 1em 0; }
  ul, ol { margin: 1em 0; padding-left: 2em; }
  li { margin: 0.5em 0; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #333; padding: 0.5em; text-align: left; }
  th { background-color: #f5f5f5; font-weight: bold; }
  blockquote { margin: 1em 0; padding-left: 1em; border-left: 3px solid #ccc; color: #666; }
  hr { border: none; border-top: 1px solid #ccc; margin: 1em 0; }
  strong, b { font-weight: bold; }
  em, i { font-style: italic; }
  code { font-family: monospace; background-color: #f5f5f5; padding: 0.2em 0.4em; }
  pre { background-color: #f5f5f5; padding: 1em; overflow-x: auto; white-space: pre-wrap; }
  a { color: #0066cc; text-decoration: underline; }
  img { max-width: 100%; height: auto; }
  div { margin: 0; padding: 0; }
  br { display: block; margin: 0.5em 0; }
`;

/**
 * @description 创建临时容器
 * @export
 * @param {string} content
 * @param {IData} options
 * @returns {*}  {HTMLDivElement}
 */
export function createTempContainer(
  content: string,
  options: IData,
): HTMLDivElement {
  const container = document.createElement('div');
  const ns = useNamespace('print-pdf');

  const baseStyles = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: ${PAGE_SIZES[options.pageSize].width - options.margins.left - options.margins.right}mm;
    padding: 0;
    font-size: ${options.fontSize}px;
    line-height: ${options.lineHeight};
    text-align: ${options.textAlign};
    color: ${options.textColor};
    background-color: ${options.backgroundColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
    word-wrap: break-word;
    box-sizing: border-box;
  `;

  container.style.cssText = baseStyles;

  container.classList.add(ns.b());

  if (options.isHtml) {
    const styleElement = document.createElement('style');
    styleElement.textContent = `.${ns.b()} {${HTML_BASE_STYLES}`;
    container.appendChild(styleElement);
    const contentWrapper = document.createElement('div');
    contentWrapper.innerHTML = content;
    container.appendChild(contentWrapper);
  } else {
    container.style.whiteSpace = 'pre-wrap';
    container.textContent = content;
  }

  document.body.appendChild(container);
  return container;
}

/**
 * @description 删除临时容器
 * @export
 * @param {(HTMLDivElement | null)} container
 */
export function cleanupTempElements(container: HTMLDivElement | null): void {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

/**
 * @description 获取分页大小像素
 * @export
 * @param {('a4' | 'a3' | 'letter')} pageSize
 * @param {('portrait' | 'landscape')} orientation
 * @returns {*}  {{ width: number; height: number }}
 */
export function getPageSizeInPixels(
  pageSize: 'a4' | 'a3' | 'letter',
  orientation: 'portrait' | 'landscape',
): { width: number; height: number } {
  const size = PAGE_SIZES[pageSize];
  const mmToPixel = 3.7795275591;

  let width = size.width;
  let height = size.height;

  if (orientation === 'landscape') {
    [width, height] = [height, width];
  }

  return {
    width: Math.round(width * mmToPixel),
    height: Math.round(height * mmToPixel),
  };
}

/**
 * @description 校验pdf导出参数
 * @export
 * @param {IData} options
 * @returns {*}  {boolean}
 */
export function validateOptions(options: IData): boolean {
  if (!options.content || typeof options.content !== 'string') {
    ibiz.message.error(ibiz.i18n.t('util.printPreviewUtil.pdfValid'));
    return false;
  }

  if (options.content.trim().length === 0) {
    ibiz.message.error(ibiz.i18n.t('util.printPreviewUtil.pdfEmpty'));
    return false;
  }

  if (options.fontSize && (options.fontSize < 8 || options.fontSize > 72)) {
    ibiz.message.error(ibiz.i18n.t('util.printPreviewUtil.pdfFontSize'));
    return false;
  }

  if (options.filename && !options.filename.endsWith('.pdf')) {
    ibiz.message.error(ibiz.i18n.t('util.printPreviewUtil.pdfFilename'));
    return false;
  }

  return true;
}

/**
 * @description 计算浏览器型号
 * @export
 * @returns {*}  {string}
 */
export function detectBrowser(): string {
  const ua = navigator.userAgent;

  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') > -1) {
    return 'edge';
  }
  if (ua.indexOf('Chrome') > -1) {
    return 'chrome';
  }
  if (ua.indexOf('Firefox') > -1) {
    return 'firefox';
  }
  if (ua.indexOf('Safari') > -1) {
    return 'safari';
  }

  return 'unknown';
}

/**
 * @description 检查浏览器兼容性
 * @export
 */
export function checkBrowserCompatibility(): void {
  const browser = detectBrowser();

  if (browser === 'safari') {
    console.warn(
      'Safari浏览器可能存在部分兼容性问题，建议使用Chrome或Firefox获得最佳体验',
    );
  }
}

/**
 * @description 显示通知
 * @param {IData} data
 * @returns {*}  {NotificationHandle}
 */
export const showAsyncNotice = (data: IData): NotificationHandle => {
  const ns = useNamespace('pdf-print-process');
  const ins = ElNotification({
    customClass: ns.e('wrapper'),
    message: h(PdfPrintProcess, {
      data,
      onClose: () => {
        ins.close();
      },
    }),
    position: 'bottom-right',
    showClose: false,
    duration: 0,
  });
  return ins;
};

/**
 * @description canvas转base64
 * @export
 * @param {HTMLCanvasElement} canvas
 * @param {number} canvasY
 * @param {number} height
 * @param {number} width
 * @param {string} backgroundColor
 * @returns {*}  {string}
 */
export function canvas2Base64(
  canvas: HTMLCanvasElement,
  canvasY: number,
  height: number,
  width: number,
  backgroundColor: string,
): string {
  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = width;
  pageCanvas.height = height;

  const ctx = pageCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(
      canvas,
      0,
      canvasY,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      canvas.width,
      pageCanvas.height,
    );
  }
  return pageCanvas.toDataURL('image/jpeg', 1);
}

/**
 * @description 获取canvas的图片数据（按pdf分页尺寸计算）
 * @export
 * @param {HTMLCanvasElement[]} canvasList
 * @param {IData} options
 * @returns {*}  {IData[]}
 */
export function getCanvasImages(
  canvasList: HTMLCanvasElement[],
  options: IData,
): IData[] {
  const {
    innerWidth,
    innerHeight,
    pageHeight,
    pageWidth,
    backgroundColor,
    noticeMessage,
  } = options;
  noticeMessage.percentage = 90;
  noticeMessage.items.push({
    time: dayjs().format('HH:mm:ss'),
    title: ibiz.i18n.t('util.printPreviewUtil.startMergePdf'),
    noticeMessage: options.noticeMessage,
  });
  const result: IData[] = [];
  let currentPage = 0;
  let canvasY = 0;
  canvasList.forEach(canvas => {
    let remainingHeight = canvas.height;
    while (remainingHeight > 0) {
      // 填充上一页内容
      if (canvasY < 0) {
        const height = -canvasY;
        result[currentPage].base642 = canvas2Base64(
          canvas,
          0,
          height,
          pageWidth,
          backgroundColor,
        );
        canvasY = height;
        result[currentPage].height2 = (height * innerWidth) / canvas.width;
        remainingHeight -= height;
      } else if (canvas.height - canvasY > pageHeight) {
        result.push({
          page: currentPage,
          width: innerWidth,
          height: innerHeight,
          base64: canvas2Base64(
            canvas,
            canvasY,
            pageHeight,
            pageWidth,
            backgroundColor,
          ),
        });
        canvasY += pageHeight;
        remainingHeight -= pageHeight;
        currentPage++;
      } else {
        const actualHeight = canvas.height - canvasY;
        const height = (actualHeight * innerWidth) / canvas.width;
        result.push({
          page: currentPage,
          width: innerWidth,
          height,
          base64: canvas2Base64(
            canvas,
            canvasY,
            actualHeight,
            pageWidth,
            backgroundColor,
          ),
        });
        // 最后一页按缺少的高度计算下一页需要填充的高度
        canvasY = actualHeight - pageHeight;
        remainingHeight = 0;
      }
    }
  });
  return result;
}

/**
 * @description 使用 requestIdleCallback 优化任务执行,如果浏览器不支持 requestIdleCallback，使用 setTimeout 作为降级方案
 */
export function processInIdleTime(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * @description 分段canvas截图
 * @export
 * @param {HTMLElement} dom
 * @param {IData} options
 * @returns {*}  {Promise<HTMLCanvasElement[]>}
 */
export async function getCanvas(
  dom: HTMLElement,
  options: IData,
): Promise<IData[]> {
  // canvas截屏分段高度
  const { innerHeight, innerWidth, segmentHeight, noticeMessage } = options;
  const totalHeight = dom.scrollHeight;
  const count = Math.ceil(totalHeight / segmentHeight);
  const step = 80 / count;
  let startPage = 0;
  let endPage = 0;
  // 每一页图片高度
  const pageHeight = (innerHeight / innerWidth) * options.width;
  const canvasList: HTMLCanvasElement[] = [];
  let i = 0;
  noticeMessage.items.push({
    time: dayjs().format('HH:mm:ss'),
    title: ibiz.i18n.t('util.printPreviewUtil.startCalcPdf'),
  });
  noticeMessage.percentage = 10;
  // 包装任务为浏览器空闲时执行
  async function processSegment(y: number): Promise<void> {
    i++;
    const height = Math.min(segmentHeight, totalHeight - y);
    const canvas = await ibiz.util.html2canvas.getCanvas(dom, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: options.backgroundColor,
      y: y,
      height,
      width: options.width,
      windowWidth: options.windowWidth,
    });
    canvasList.push(canvas);
    noticeMessage.percentage = Math.floor(step * i + 10);
    endPage += height / pageHeight;
    noticeMessage.items.push({
      time: dayjs().format('HH:mm:ss'),
      title: ibiz.i18n.t('util.printPreviewUtil.startCalcPdfPage', {
        startPage: Math.ceil(startPage),
        endPage: Math.ceil(endPage),
      }),
    });
    startPage = endPage;
  }
  for (let y = 0; y < totalHeight; y += segmentHeight) {
    await new Promise<void>(resolve => {
      processInIdleTime(() => {
        processSegment(y).then(resolve);
      });
    });
  }

  return getCanvasImages(canvasList, {
    pageHeight,
    pageWidth: options.width,
    innerHeight,
    innerWidth,
    noticeMessage,
  });
}

/**
 * @description 导出pdf
 * @export
 * @param {IData} pdf
 * @param {HTMLCanvasElement} canvas
 * @param {IData} options
 */
export function exportPdf(pdf: IData, images: IData[], options: IData): void {
  const { mergedOptions, noticeMessage } = options;
  noticeMessage.percentage = 100;
  noticeMessage.items.push({
    time: dayjs().format('HH:mm:ss'),
    title: ibiz.i18n.t('util.printPreviewUtil.startExportPdf'),
  });
  images.forEach((item: IData, index: number) => {
    if (index > 0) {
      pdf.addPage();
    }
    pdf.addImage(
      item.base64,
      'PNG',
      mergedOptions.margins.left,
      mergedOptions.margins.top,
      item.width,
      item.height,
    );
    if (item.base642) {
      pdf.addImage(
        item.base642,
        'PNG',
        mergedOptions.margins.left,
        mergedOptions.margins.top,
        item.width,
        item.height2,
      );
    }
  });

  pdf.save(mergedOptions.filename);
  if (options.isAsync) {
    noticeMessage.status = 'success';
    noticeMessage.items.push({
      time: dayjs().format('HH:mm:ss'),
      title: ibiz.i18n.t('util.printPreviewUtil.exportPdfSuccess'),
    });
    noticeMessage.caption = ibiz.i18n.t(
      'util.printPreviewUtil.exportPdfSuccess',
    );
  }
}
