import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
export declare class ViewMsgPosController extends PanelItemController<IPanelRawItem> {
    /**
     * 直接内容项参数
     *
     * @author zhanghengfeng
     * @date 2024-04-08 19:04:15
     * @type {IData}
     */
    rawItemParams: IData;
    protected onInit(): Promise<void>;
    /**
     * 处理直接内容项参数
     *
     * @author zhanghengfeng
     * @date 2024-04-08 19:04:59
     * @protected
     */
    protected handleRawItemParams(): void;
}
