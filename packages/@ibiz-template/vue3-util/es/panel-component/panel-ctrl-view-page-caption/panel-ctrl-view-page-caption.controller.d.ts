import { IPanelItemState, PanelItemController } from '@ibiz-template/runtime';
interface viewPagecaptionState extends IPanelItemState {
    /**
     * 标题
     *
     * @type {string}
     * @memberof viewPagecaptionState
     */
    caption: string;
}
export declare class PanelCtrlViewPageCaptionController extends PanelItemController {
    /**
     *状态
     *
     * @type {viewPagecaptionState}
     * @memberof PanelCtrlViewPageCaptionController
     */
    state: viewPagecaptionState;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PanelCtrlViewPageCaptionController
     */
    protected onInit(): Promise<void>;
}
export {};
//# sourceMappingURL=panel-ctrl-view-page-caption.controller.d.ts.map