import { IControlState } from './i-control.state';
export interface ICaptionBarState extends IControlState {
    /**
     * 标题栏最终展示的标题
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-22 17:28:04
     */
    caption: string;
    /**
     * 总条数
     *
     * @type {number}
     * @memberof ICaptionBarState
     */
    total: number;
    /**
     * 全部计数条数
     *
     * @type {number}
     * @memberof ICaptionBarState
     */
    totalx?: number;
}
//# sourceMappingURL=i-caption-bar.state.d.ts.map