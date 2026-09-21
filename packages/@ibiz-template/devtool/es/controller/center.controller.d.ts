import { IOverlayPopoverContainer, IViewController } from '@ibiz-template/runtime';
import { IDevToolConfig } from '@ibiz-template/core';
import { DevToolConfig } from './dev-tool-config';
import { ICenterControllerState } from '../interface/i-center-controller-state';
import { IDevToolController } from '../interface/i-devtool-controller';
/**
 * 控制中心
 * @author lxm
 * @date 2024-01-19 11:08:45
 * @export
 * @class CenterController
 */
export declare class CenterController implements IDevToolController {
    /**
     * 配置对象
     * @author lxm
     * @date 2024-01-19 04:49:30
     */
    config: DevToolConfig;
    /**
     * 用户配置对象
     * @author lxm
     * @date 2024-01-19 05:46:29
     */
    userConfig?: Partial<IDevToolConfig>;
    /**
     * 根组件dom元素
     * @author lxm
     * @date 2024-02-19 09:36:34
     * @type {HTMLElement}
     */
    rootElement?: HTMLElement;
    /**
     * 视图模型气泡
     * @author lxm
     * @date 2024-02-19 10:01:51
     * @type {IData}
     */
    viewModelPopover?: IOverlayPopoverContainer;
    /**
     * UI响应式状态对象
     * @author lxm
     * @date 2024-01-19 05:18:10
     * @type {ICenterControllerState}
     */
    state: ICenterControllerState;
    /**
     * 当前激活的视图控制器集合
     * @author lxm
     * @date 2024-01-22 11:15:58
     * @readonly
     * @type {IViewController[]}
     */
    get activeViews(): IViewController[];
    /**
     * 已打开的配置平台标签页
     * @author lxm
     * @date 2024-01-29 03:49:08
     * @protected
     * @type {Window}
     */
    protected studioWindow: Window | null;
    /**
     * 初始化
     * @author lxm
     * @date 2024-01-19 11:09:19
     */
    init(): void;
    /**
     * 加载用户存储在浏览嘁的配置文件，并跟默认配置合并
     * @author lxm
     * @date 2024-01-19 04:51:57
     */
    protected loadUserConfig(): void;
    /**
     * 挂载到页面
     * @author lxm
     * @date 2024-01-19 11:10:35
     */
    protected mount(): void;
    /**
     * 监听事件
     * @author lxm
     * @date 2024-01-19 04:45:24
     */
    protected listenKeyDown(): void;
    /**
     * 监听视图堆栈变更
     * @author lxm
     * @date 2024-01-22 11:29:18
     */
    protected listenViewStack(): void;
    /**
     * 切换显示与否
     * @author lxm
     * @date 2024-01-29 07:38:35
     * @param {boolean} [visible]
     */
    triggerVisible(visible?: boolean): Promise<void>;
    /**
     * 更新body元素的类名，工具消失时关闭视图模型气泡
     * @author lxm
     * @date 2024-01-22 04:19:52
     * @protected
     */
    protected updateRootClass(): Promise<void>;
    /**
     * 关闭视图模型气泡
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-20 10:50:47
     */
    protected closeViewModelPopover(): Promise<void>;
    /**
     * 更新用户配置文件
     * @author lxm
     * @date 2024-01-19 05:49:55
     * @param {Partial<IDevToolConfig>} config
     */
    updateUserConfig(config: Partial<IDevToolConfig>): void;
    /**
     * 拷贝视图的代码名称到剪贴板
     * @author lxm
     * @date 2024-01-22 01:44:54
     * @param {IViewController} view
     */
    copyCodeName(view: IViewController): void;
    /**
     * 打开指定视图的配置平台地址
     * @author lxm
     * @date 2024-01-22 01:47:00
     * @param {IViewController} view
     */
    openStudioUrl(view: IViewController): void;
    /**
     * 选中视图控制器
     * @author lxm
     * @date 2024-01-22 04:32:49
     * @param {IViewController} [view] 不给参数就是设置为空
     * @return {*}  {void}
     */
    selectView(view?: IViewController): void;
    /**
     * 悬浮视图控制器
     * @author lxm
     * @date 2024-01-22 04:32:49
     * @param {IViewController} [view] 不给参数就是设置为空
     * @return {*}  {void}
     */
    hoverView(view?: IViewController): void;
    /**
     * 浏览视图模型
     * @author lxm
     * @date 2024-01-22 06:33:54
     * @param {IViewController} [view]
     */
    skimViewModel(view: IViewController): Promise<void>;
    /**
     * 浏览界面作用域下的临时数据
     * @author lxm
     * @date 2024-01-22 06:37:15
     * @param {IViewController} view
     */
    skimTempData(view: IViewController): Promise<void>;
}
