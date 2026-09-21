import { IApiHtml2canvasUtil, IHtml2canvasOption } from '../../interface';
/**
 * @description Html2Canvas工具类
 * @export
 * @class Html2Canvas
 */
export declare class Html2Canvas implements IApiHtml2canvasUtil {
    /**
     * @description 导出canvas
     * @param {HTMLElement} dom
     * @param {IHtml2canvasOption} [option={}]
     * @returns {*}  {Promise<void>}
     * @memberof Html2Canvas
     */
    exportCanvas(dom: HTMLElement, option?: IHtml2canvasOption): Promise<void>;
    /**
     * @description 获取canvas元素
     * @param {HTMLElement} dom
     * @param {IHtml2canvasOption} [option={}]
     * @returns {*}  {Promise<HTMLCanvasElement>}
     * @memberof Html2Canvas
     */
    getCanvas(dom: HTMLElement, option?: IHtml2canvasOption): Promise<HTMLCanvasElement>;
}
//# sourceMappingURL=html2canvas.d.ts.map