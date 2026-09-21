import html2canvas from 'html2canvas';
export class Html2Canvas {
    /**
     * @description 导出canvas
     * @param {HTMLElement} dom
     * @param {IHtml2canvasOption} option
     * @return {*}  {Promise<void>}
     * @memberof Html2Canvas
     */
    async exportCanvas(dom, option = {}) {
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
     * @param {IHtml2canvasOption} option
     * @return {*}  {Promise<HTMLCanvasElement>}
     * @memberof Html2Canvas
     */
    async getCanvas(dom, option = {}) {
        return html2canvas(dom, option);
    }
}
