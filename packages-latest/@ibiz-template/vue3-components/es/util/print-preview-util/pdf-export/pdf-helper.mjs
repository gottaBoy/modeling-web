import { h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ElNotification, dayjs } from 'element-plus';
import { PdfPrintProcess } from './pdf-print-process.mjs';

"use strict";
const PAGE_SIZES = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  letter: { width: 215.9, height: 279.4 }
};
const DEFAULT_OPTIONS = {
  orientation: "portrait",
  pageSize: "a4",
  fontSize: 12,
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },
  lineHeight: 1.6,
  textAlign: "left",
  textColor: "#000000",
  backgroundColor: "#ffffff",
  isHtml: false,
  segmentHeight: 8e3
};
const HTML_BASE_STYLES = "\n  h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; line-height: 1.2; }\n  h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; line-height: 1.3; }\n  h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; line-height: 1.4; }\n  h4 { font-size: 1em; font-weight: bold; margin: 1em 0; }\n  h5 { font-size: 0.83em; font-weight: bold; margin: 1.17em 0; }\n  h6 { font-size: 0.67em; font-weight: bold; margin: 1.33em 0; }\n  p { margin: 1em 0; }\n  ul, ol { margin: 1em 0; padding-left: 2em; }\n  li { margin: 0.5em 0; }\n  table { border-collapse: collapse; width: 100%; margin: 1em 0; }\n  th, td { border: 1px solid #333; padding: 0.5em; text-align: left; }\n  th { background-color: #f5f5f5; font-weight: bold; }\n  blockquote { margin: 1em 0; padding-left: 1em; border-left: 3px solid #ccc; color: #666; }\n  hr { border: none; border-top: 1px solid #ccc; margin: 1em 0; }\n  strong, b { font-weight: bold; }\n  em, i { font-style: italic; }\n  code { font-family: monospace; background-color: #f5f5f5; padding: 0.2em 0.4em; }\n  pre { background-color: #f5f5f5; padding: 1em; overflow-x: auto; white-space: pre-wrap; }\n  a { color: #0066cc; text-decoration: underline; }\n  img { max-width: 100%; height: auto; }\n  div { margin: 0; padding: 0; }\n  br { display: block; margin: 0.5em 0; }\n";
function createTempContainer(content, options) {
  const container = document.createElement("div");
  const ns = useNamespace("print-pdf");
  const baseStyles = "\n    position: absolute;\n    left: -9999px;\n    top: 0;\n    width: ".concat(PAGE_SIZES[options.pageSize].width - options.margins.left - options.margins.right, "mm;\n    padding: 0;\n    font-size: ").concat(options.fontSize, "px;\n    line-height: ").concat(options.lineHeight, ";\n    text-align: ").concat(options.textAlign, ";\n    color: ").concat(options.textColor, ";\n    background-color: ").concat(options.backgroundColor, ";\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;\n    word-wrap: break-word;\n    box-sizing: border-box;\n  ");
  container.style.cssText = baseStyles;
  container.classList.add(ns.b());
  if (options.isHtml) {
    const styleElement = document.createElement("style");
    styleElement.textContent = ".".concat(ns.b(), " {").concat(HTML_BASE_STYLES);
    container.appendChild(styleElement);
    const contentWrapper = document.createElement("div");
    contentWrapper.innerHTML = content;
    container.appendChild(contentWrapper);
  } else {
    container.style.whiteSpace = "pre-wrap";
    container.textContent = content;
  }
  document.body.appendChild(container);
  return container;
}
function cleanupTempElements(container) {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}
function getPageSizeInPixels(pageSize, orientation) {
  const size = PAGE_SIZES[pageSize];
  const mmToPixel = 3.7795275591;
  let width = size.width;
  let height = size.height;
  if (orientation === "landscape") {
    [width, height] = [height, width];
  }
  return {
    width: Math.round(width * mmToPixel),
    height: Math.round(height * mmToPixel)
  };
}
function validateOptions(options) {
  if (!options.content || typeof options.content !== "string") {
    ibiz.message.error(ibiz.i18n.t("util.printPreviewUtil.pdfValid"));
    return false;
  }
  if (options.content.trim().length === 0) {
    ibiz.message.error(ibiz.i18n.t("util.printPreviewUtil.pdfEmpty"));
    return false;
  }
  if (options.fontSize && (options.fontSize < 8 || options.fontSize > 72)) {
    ibiz.message.error(ibiz.i18n.t("util.printPreviewUtil.pdfFontSize"));
    return false;
  }
  if (options.filename && !options.filename.endsWith(".pdf")) {
    ibiz.message.error(ibiz.i18n.t("util.printPreviewUtil.pdfFilename"));
    return false;
  }
  return true;
}
function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Chrome") > -1 && ua.indexOf("Edg") > -1) {
    return "edge";
  }
  if (ua.indexOf("Chrome") > -1) {
    return "chrome";
  }
  if (ua.indexOf("Firefox") > -1) {
    return "firefox";
  }
  if (ua.indexOf("Safari") > -1) {
    return "safari";
  }
  return "unknown";
}
function checkBrowserCompatibility() {
  const browser = detectBrowser();
  if (browser === "safari") {
    console.warn(
      "Safari\u6D4F\u89C8\u5668\u53EF\u80FD\u5B58\u5728\u90E8\u5206\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u5EFA\u8BAE\u4F7F\u7528Chrome\u6216Firefox\u83B7\u5F97\u6700\u4F73\u4F53\u9A8C"
    );
  }
}
const showAsyncNotice = (data) => {
  const ns = useNamespace("pdf-print-process");
  const ins = ElNotification({
    customClass: ns.e("wrapper"),
    message: h(PdfPrintProcess, {
      data,
      onClose: () => {
        ins.close();
      }
    }),
    position: "bottom-right",
    showClose: false,
    duration: 0
  });
  return ins;
};
function canvas2Base64(canvas, canvasY, height, width, backgroundColor) {
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = width;
  pageCanvas.height = height;
  const ctx = pageCanvas.getContext("2d");
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
      pageCanvas.height
    );
  }
  return pageCanvas.toDataURL("image/jpeg", 1);
}
function getCanvasImages(canvasList, options) {
  const {
    innerWidth,
    innerHeight,
    pageHeight,
    pageWidth,
    backgroundColor,
    noticeMessage
  } = options;
  noticeMessage.percentage = 90;
  noticeMessage.items.push({
    time: dayjs().format("HH:mm:ss"),
    title: ibiz.i18n.t("util.printPreviewUtil.startMergePdf"),
    noticeMessage: options.noticeMessage
  });
  const result = [];
  let currentPage = 0;
  let canvasY = 0;
  canvasList.forEach((canvas) => {
    let remainingHeight = canvas.height;
    while (remainingHeight > 0) {
      if (canvasY < 0) {
        const height = -canvasY;
        result[currentPage].base642 = canvas2Base64(
          canvas,
          0,
          height,
          pageWidth,
          backgroundColor
        );
        canvasY = height;
        result[currentPage].height2 = height * innerWidth / canvas.width;
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
            backgroundColor
          )
        });
        canvasY += pageHeight;
        remainingHeight -= pageHeight;
        currentPage++;
      } else {
        const actualHeight = canvas.height - canvasY;
        const height = actualHeight * innerWidth / canvas.width;
        result.push({
          page: currentPage,
          width: innerWidth,
          height,
          base64: canvas2Base64(
            canvas,
            canvasY,
            actualHeight,
            pageWidth,
            backgroundColor
          )
        });
        canvasY = actualHeight - pageHeight;
        remainingHeight = 0;
      }
    }
  });
  return result;
}
function processInIdleTime(callback) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
}
async function getCanvas(dom, options) {
  const { innerHeight, innerWidth, segmentHeight, noticeMessage } = options;
  const totalHeight = dom.scrollHeight;
  const count = Math.ceil(totalHeight / segmentHeight);
  const step = 80 / count;
  let startPage = 0;
  let endPage = 0;
  const pageHeight = innerHeight / innerWidth * options.width;
  const canvasList = [];
  let i = 0;
  noticeMessage.items.push({
    time: dayjs().format("HH:mm:ss"),
    title: ibiz.i18n.t("util.printPreviewUtil.startCalcPdf")
  });
  noticeMessage.percentage = 10;
  async function processSegment(y) {
    i++;
    const height = Math.min(segmentHeight, totalHeight - y);
    const canvas = await ibiz.util.html2canvas.getCanvas(dom, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: options.backgroundColor,
      y,
      height,
      width: options.width,
      windowWidth: options.windowWidth
    });
    canvasList.push(canvas);
    noticeMessage.percentage = Math.floor(step * i + 10);
    endPage += height / pageHeight;
    noticeMessage.items.push({
      time: dayjs().format("HH:mm:ss"),
      title: ibiz.i18n.t("util.printPreviewUtil.startCalcPdfPage", {
        startPage: Math.ceil(startPage),
        endPage: Math.ceil(endPage)
      })
    });
    startPage = endPage;
  }
  for (let y = 0; y < totalHeight; y += segmentHeight) {
    await new Promise((resolve) => {
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
    noticeMessage
  });
}
function exportPdf(pdf, images, options) {
  const { mergedOptions, noticeMessage } = options;
  noticeMessage.percentage = 100;
  noticeMessage.items.push({
    time: dayjs().format("HH:mm:ss"),
    title: ibiz.i18n.t("util.printPreviewUtil.startExportPdf")
  });
  images.forEach((item, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    pdf.addImage(
      item.base64,
      "PNG",
      mergedOptions.margins.left,
      mergedOptions.margins.top,
      item.width,
      item.height
    );
    if (item.base642) {
      pdf.addImage(
        item.base642,
        "PNG",
        mergedOptions.margins.left,
        mergedOptions.margins.top,
        item.width,
        item.height2
      );
    }
  });
  pdf.save(mergedOptions.filename);
  if (options.isAsync) {
    noticeMessage.status = "success";
    noticeMessage.items.push({
      time: dayjs().format("HH:mm:ss"),
      title: ibiz.i18n.t("util.printPreviewUtil.exportPdfSuccess")
    });
    noticeMessage.caption = ibiz.i18n.t(
      "util.printPreviewUtil.exportPdfSuccess"
    );
  }
}

export { DEFAULT_OPTIONS, PAGE_SIZES, canvas2Base64, checkBrowserCompatibility, cleanupTempElements, createTempContainer, detectBrowser, exportPdf, getCanvas, getCanvasImages, getPageSizeInPixels, processInIdleTime, showAsyncNotice, validateOptions };
