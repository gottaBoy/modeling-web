import { PanelItemController, ViewLayoutPanelController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelAppTitleState } from './panel-app-title.state';
/**
 * 面板应用标题控制器
 *
 * @export
 * @class PanelAppTitleController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class PanelAppTitleController extends PanelItemController<IPanelRawItem> {
    state: PanelAppTitleState;
    protected createState(): PanelAppTitleState;
    /**
     * 面板控制器
     *
     * @type {ViewLayoutPanelController}
     * @memberof PanelAppTitleController
     */
    panel: ViewLayoutPanelController;
    /**
     * 分隔符，用于分割收缩与未收缩的标题
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-18 18:24:06
     */
    private captionSplit;
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof PanelAppTitleController
     */
    rawItemParams: IData;
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof PanelAppTitleController
     */
    onInit(): Promise<void>;
    /**
     * 处理自定义补充参数 [{key:'name',value:'data'}] => {name:'data'}
     *
     * @author zk
     * @date 2023-09-27 03:09:55
     * @protected
     * @memberof NavPosController
     */
    protected handleRawItemParams(): void;
}
