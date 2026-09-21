import { IHtml2canvasOption } from '../../interface';
export declare class Html2Canvas {
    /**
     * @description 导出canvas
     * @param {HTMLElement} dom
     * @param {IHtml2canvasOption} option
     * @return {*}  {Promise<void>}
     * @memberof Html2Canvas
     */
    exportCanvas(dom: HTMLElement, option?: IHtml2canvasOption): Promise<void>;
    /**
     * @description 获取canvas元素
     * @param {HTMLElement} dom
     * @param {IHtml2canvasOption} option
     * @return {*}  {Promise<HTMLCanvasElement>}
     * @memberof Html2Canvas
     */
    getCanvas(dom: HTMLElement, option?: IHtml2canvasOption): Promise<HTMLCanvasElement>;
}
//# sourceMappingURL=html2canvas.d.ts.map