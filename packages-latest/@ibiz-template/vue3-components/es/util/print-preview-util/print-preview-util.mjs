import { h, reactive } from 'vue';
import E from '../../node_modules/.pnpm/jspdf@2.5.2/node_modules/jspdf/dist/jspdf.es.min.mjs';
import dayjs from 'dayjs';
import { PrintPreviewMarkdown } from './print-preview-markdown/print-preview-markdown.mjs';
import { validateOptions, checkBrowserCompatibility, DEFAULT_OPTIONS, createTempContainer, getPageSizeInPixels, showAsyncNotice, getCanvas, exportPdf, cleanupTempElements, getCanvasImages } from './pdf-export/pdf-helper.mjs';
import { generateHTML, downloadHtmlFile } from './html-export/html-helper.mjs';

"use strict";
class PrintPreviewUtil {
  /**
   * 执行打印
   * @param context
   * @param params
   * @param data
   * @returns boolean 是否成功执行打印
   */
  async execPrint(context, params, data) {
    const srfcontenttype = params.srfcontenttype;
    if (srfcontenttype === "MARKDOWN") {
      return this.printMarkDown(data, params);
    }
    if (srfcontenttype === "HTML") {
      return this.printHtml(data);
    }
    return false;
  }
  /**
   * 打印MarkDown（窗口可以由视图参数srfprintheight和srfprintwidth指定，默认居中50%，绘制时为md预览模式绘制，提供全屏按钮，和关闭按钮。）
   * @param data
   * @returns
   */
  async printMarkDown(data, params) {
    const text = await data.text();
    const overlay = ibiz.overlay.createModal(
      (modal) => h(PrintPreviewMarkdown, {
        value: text,
        modal
      }),
      void 0,
      {
        width: params.srfprintwidth || "50%",
        height: params.srfprintheight || "50%"
      }
    );
    overlay.present();
    await overlay.onWillDismiss();
    return true;
  }
  /**
   * 打印HTML(原生浏览器预览)
   * @param data
   * @returns
   */
  async printHtml(data) {
    const link = window.URL.createObjectURL(data);
    window.open(link, "_blank");
    return true;
  }
  /**
   * @description 导出HTML文件
   * @param {string} filename 导出html文件名，需以.html结尾
   * @param {string} content 导出html内容，为body标签中的html字符串
   * @param {IData} [style={}] 导出html样式，会添加到style标签中
   * @returns {*}  {Promise<boolean>}
   * @memberof PrintPreviewUtil
   */
  async printHtml2(filename, content, style = {}) {
    try {
      const html = generateHTML(content, style);
      downloadHtmlFile(filename, html);
      return true;
    } catch (e) {
      ibiz.message.error(ibiz.i18n.t("util.printPreviewUtil.exportHtmlFailed"));
      return false;
    }
  }
  /**
   * @description 导出pdf
   * @param {string} filename 导出文件名，必须以.pdf结尾
   * @param {string} content 导出内容
   * @param {IApiPdfExportOptions} [options={}]
   * @returns {*}  {Promise<boolean>}
   * @memberof PrintPreviewUtil
   */
  async printPdf(filename, content, options = {}) {
    const data = {
      content,
      filename,
      ...options
    };
    const validation = validateOptions(data);
    if (!validation) {
      return false;
    }
    checkBrowserCompatibility();
    let container = null;
    let isAsync = false;
    const noticeMessage = reactive({
      items: [],
      status: "processing",
      percentage: 0,
      caption: ibiz.i18n.t("util.printPreviewUtil.startPrintPdf", { filename })
    });
    try {
      const mergedOptions = {
        ...DEFAULT_OPTIONS,
        ...data,
        margins: {
          ...DEFAULT_OPTIONS.margins,
          ...data.margins || {}
        }
      };
      container = createTempContainer(data.content, mergedOptions);
      const pageSizePixels = getPageSizeInPixels(
        mergedOptions.pageSize,
        mergedOptions.orientation
      );
      const orientation = mergedOptions.orientation === "portrait" ? "p" : "l";
      const pdf = new E({
        orientation,
        unit: "mm",
        format: mergedOptions.pageSize
      });
      const width = pageSizePixels.width - (mergedOptions.margins.left + mergedOptions.margins.right) * 3.7795275591;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const innerWidth = pdfWidth - mergedOptions.margins.left - mergedOptions.margins.right;
      const innerHeight = pdfHeight - mergedOptions.margins.top - mergedOptions.margins.bottom;
      const containerHeight = container.scrollHeight;
      if (containerHeight > mergedOptions.segmentHeight) {
        isAsync = true;
        showAsyncNotice(noticeMessage);
        const windowWidth = pageSizePixels.width;
        const segmentHeight = mergedOptions.segmentHeight;
        Object.assign(mergedOptions, {
          width,
          windowWidth,
          segmentHeight,
          noticeMessage,
          innerWidth,
          innerHeight
        });
        getCanvas(container, mergedOptions).then((images) => {
          exportPdf(pdf, images, {
            innerWidth,
            innerHeight,
            mergedOptions,
            isAsync,
            noticeMessage
          });
        }).finally(() => {
          cleanupTempElements(container);
        });
      } else {
        const canvas = await ibiz.util.html2canvas.getCanvas(container, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: mergedOptions.backgroundColor,
          width,
          windowWidth: pageSizePixels.width,
          scrollY: 0,
          scrollX: 0
        });
        const pageHeight = innerHeight / innerWidth * width * 2;
        const images = getCanvasImages([canvas], {
          pageHeight,
          pageWidth: width * 2,
          innerHeight,
          innerWidth,
          noticeMessage,
          backgroundColor: mergedOptions.backgroundColor
        });
        exportPdf(pdf, images, {
          innerWidth,
          innerHeight,
          mergedOptions,
          noticeMessage,
          isAsync
        });
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ibiz.i18n.t("util.printPreviewUtil.exportPdfFailed");
      if (isAsync) {
        noticeMessage.status = "failed";
        noticeMessage.items.push({
          time: dayjs().format("HH:mm:ss"),
          title: ibiz.i18n.t("util.printPreviewUtil.exportPdfFailed")
        });
        noticeMessage.caption = ibiz.i18n.t(
          "util.printPreviewUtil.exportPdfFailed"
        );
      } else {
        ibiz.message.error(errorMessage);
      }
      return false;
    } finally {
      if (!isAsync) {
        cleanupTempElements(container);
      }
    }
  }
}

export { PrintPreviewUtil };
