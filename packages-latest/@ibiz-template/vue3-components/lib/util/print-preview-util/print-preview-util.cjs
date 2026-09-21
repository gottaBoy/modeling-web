'use strict';

var vue = require('vue');
var jspdf_es_min = require('../../node_modules/.pnpm/jspdf@2.5.2/node_modules/jspdf/dist/jspdf.es.min.cjs');
var dayjs = require('dayjs');
var printPreviewMarkdown = require('./print-preview-markdown/print-preview-markdown.cjs');
var pdfHelper = require('./pdf-export/pdf-helper.cjs');
var htmlHelper = require('./html-export/html-helper.cjs');

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
      (modal) => vue.h(printPreviewMarkdown.PrintPreviewMarkdown, {
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
      const html = htmlHelper.generateHTML(content, style);
      htmlHelper.downloadHtmlFile(filename, html);
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
    const validation = pdfHelper.validateOptions(data);
    if (!validation) {
      return false;
    }
    pdfHelper.checkBrowserCompatibility();
    let container = null;
    let isAsync = false;
    const noticeMessage = vue.reactive({
      items: [],
      status: "processing",
      percentage: 0,
      caption: ibiz.i18n.t("util.printPreviewUtil.startPrintPdf", { filename })
    });
    try {
      const mergedOptions = {
        ...pdfHelper.DEFAULT_OPTIONS,
        ...data,
        margins: {
          ...pdfHelper.DEFAULT_OPTIONS.margins,
          ...data.margins || {}
        }
      };
      container = pdfHelper.createTempContainer(data.content, mergedOptions);
      const pageSizePixels = pdfHelper.getPageSizeInPixels(
        mergedOptions.pageSize,
        mergedOptions.orientation
      );
      const orientation = mergedOptions.orientation === "portrait" ? "p" : "l";
      const pdf = new jspdf_es_min.default({
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
        pdfHelper.showAsyncNotice(noticeMessage);
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
        pdfHelper.getCanvas(container, mergedOptions).then((images) => {
          pdfHelper.exportPdf(pdf, images, {
            innerWidth,
            innerHeight,
            mergedOptions,
            isAsync,
            noticeMessage
          });
        }).finally(() => {
          pdfHelper.cleanupTempElements(container);
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
        const images = pdfHelper.getCanvasImages([canvas], {
          pageHeight,
          pageWidth: width * 2,
          innerHeight,
          innerWidth,
          noticeMessage,
          backgroundColor: mergedOptions.backgroundColor
        });
        pdfHelper.exportPdf(pdf, images, {
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
        pdfHelper.cleanupTempElements(container);
      }
    }
  }
}

exports.PrintPreviewUtil = PrintPreviewUtil;
