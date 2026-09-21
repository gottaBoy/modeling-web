import { IDETabViewPanel, ITabExpPanel } from '@ibiz/model-core';
import { ITabExpPanelState, ITabExpPanelEvent, ITabExpPanelController, INavViewMsg } from '../../../interface';
import { ControlController } from '../../common';
/**
 * 分页导航面板
 *
 * @export
 * @class TabExpPanelController
 * @extends {ControlController<IDETabExpPanel, ITabExpPanelState, ITabExpPanelEvent>}
 * @implements {ITabExpPanelController}
 */
export declare class TabExpPanelController extends ControlController<ITabExpPanel, ITabExpPanelState, ITabExpPanelEvent> implements ITabExpPanelController {
    /**
     * 是否显示文本
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-20 10:36:35
     */
    isShowCaption: boolean;
    /**
     * 是否显示图标
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-20 10:36:46
     */
    isShowIcon: boolean;
    /**
     * 是否缓存
     *
     * @author zk
     * @date 2023-09-27 09:09:59
     * @readonly
     * @type {boolean}
     * @memberof ExpBarControlController
     */
    get isCache(): boolean;
    /**
     * 当前路由视图的层级
     *
     * @author zk
     * @date 2023-07-11 10:07:20
     * @readonly
     * @type {(number | undefined)}
     * @memberof ExpBarControlController
     */
    get routeDepth(): number | undefined;
    /**
     * 初始化state的属性
     *
     * @protected
     * @memberof TabExpPanelController
     */
    protected initState(): void;
    /**
     * 创建完成
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof TabExpPanelController
     */
    onCreated(): Promise<void>;
    /**
     * 初始化分页数据
     *
     * @memberof TabExpPanelController
     */
    initTabPages(): void;
    /**
     * 初始化图标和文本显示
     *
     * @memberof TabExpPanelController
     */
    initIconCaption(): void;
    /**
     * 初始化默认分页
     *
     * @author zk
     * @date 2023-06-19 09:06:33
     * @memberof TabExpPanelController
     */
    initDefaultPage(): void;
    /**
     * 切换分页
     * @author lxm
     * @date 2023-08-10 05:37:26
     * @protected
     * @param {IDETabViewPanel} [tab=this.activeTabViewPanelModel!]
     */
    protected changeToTab(tab?: IDETabViewPanel, isRoutePushed?: boolean): void;
    /**
     * 当前激活tab模型
     *
     * @author zk
     * @date 2023-06-29 03:06:56
     * @readonly
     * @type {IDETabViewPanel}
     * @memberof TabExpPanelController
     */
    get activeTabViewPanelModel(): IDETabViewPanel;
    /**
     * 处理分页改变
     *
     * @memberof TabExpPanelController
     */
    handleTabChange(): Promise<void>;
    /**
     * 准备参数
     *
     * @param {IDETabViewPanel} tabViewPanel
     * @memberof TabExpPanelController
     */
    prepareParams(tabViewPanel: IDETabViewPanel): {
        context: IContext;
        params: IParams;
    };
    /**
     *
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(tabViewPanel: IDETabViewPanel): INavViewMsg;
    refresh(): void;
}
//# sourceMappingURL=tab-exp-panel.controller.d.ts.map