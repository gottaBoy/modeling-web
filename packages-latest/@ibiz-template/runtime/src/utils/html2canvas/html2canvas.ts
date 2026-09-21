import html2canvas from 'html2canvas';
import { IApiHtml2canvasUtil, IHtml2canvasOption } from '../../interface';

/**
 * @description Html2Canvas工具类
 * @export
 * @class Html2Canvas
 */
export class Html2Canvas implements IApiHtml2canvasUtil {
  /**
   * @description 导出canvas
   * @param {HTMLElement} dom
   * @param {IHtml2canvasOption} [option={}]
   * @returns {*}  {Promise<void>}
   * @memberof Html2Canvas
   */
  async exportCanvas(
    dom: HTMLElement,
    option: IHtml2canvasOption = {},
  ): Promise<void> {
    const canvas = await html2canvas(dom, option);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    const fileName = option.fileName || '导出图片';
    link.download = `${fileName}.png`;
    link.click();
  }

  /**
   * @description 获取canvas元素
   * @param {HTMLElement} dom
   * @param {IHtml2canvasOption} [option={}]
   * @returns {*}  {Promise<HTMLCanvasElement>}
   * @memberof Html2Canvas
   */
  async getCanvas(
    dom: HTMLElement,
    option: IHtml2canvasOption = {},
  ): Promise<HTMLCanvasElement> {
    return html2canvas(dom, option);
  }
}
