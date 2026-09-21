import { IAppView, IViewLayoutPanel, IAppIndexView } from '@ibiz/model-core';
/**
 * 布局面板工具类
 *
 * @author chitanda
 * @date 2023-07-31 19:07:49
 * @export
 * @class LayoutPanelUtil
 */
export declare class LayoutPanelUtil {
    /**
     * 默认布局缓存
     *
     * @author chitanda
     * @date 2023-04-27 20:04:50
     * @protected
     * @type {Map<string, IViewLayoutPanel>}
     */
    protected cache: Map<string, IViewLayoutPanel>;
    /**
     * 注册
     *
     * @author chitanda
     * @date 2023-04-27 20:04:04
     * @param {string} tag
     * @param {IViewLayoutPanel} model
     */
    register(tag: string, model: IViewLayoutPanel): void;
    /**
     * 获取
     * @author lxm
     * @date 2023-07-31 02:48:37
     * @param {string} tag
     * @return {*}  {(IViewLayoutPanel | undefined)}
     */
    get(tag: string): IViewLayoutPanel | undefined;
    /**
     * 填充默认布局模型
     *
     * @author chitanda
     * @date 2023-04-27 20:04:16
     * @param {IAppView} viewModel
     * @return {*}  {IAppView}
     */
    fill(viewModel: IAppView): IAppView;
    /**
     * 计算布局面板标识
     *
     * @author chitanda
     * @date 2023-07-10 17:07:38
     * @protected
     * @param {IAppView} viewModel
     * @return {*}  {string}
     */
    protected calcLayoutTag(viewModel: IAppView): string;
    /**
     * @description 特殊计算分页导航视图布局面板标识，匹配流式布局
     * @protected
     * @param {IAppView} viewModel
     * @returns {*}  {string}
     * @memberof LayoutPanelUtil
     */
    protected calcTabExpViewLayoutTag(viewModel: IAppView): string;
    /**
     * 特殊计算首页布局面板标识，匹配多种配置模式下的布局面板呈现
     *
     * @author chitanda
     * @date 2023-07-10 17:07:06
     * @protected
     * @param {IAppIndexView} viewModel
     * @return {*}  {string}
     */
    protected calcIndexViewLayoutTag(viewModel: IAppIndexView): string;
    /**
     * @description 特殊计算多编辑视图布局面板标识，上分页特殊处理
     * @protected
     * @param {IAppView} viewModel
     * @returns {*}  {string}
     * @memberof LayoutPanelUtil
     */
    protected calcDEMedViewLayoutTag(viewModel: IAppView): string;
}
//# sourceMappingURL=layout-panel-util.d.ts.map