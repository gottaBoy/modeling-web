import { IDEToolbar, IControlLogic, IDEToolbarItem } from '@ibiz/model-core';
import { EventBase, IExtraButton, IToolbarState, IToolbarEvent, IToolbarController, IToolbarItemProvider } from '../../../interface';
import { AppCounter } from '../../../service';
import { ControlController } from '../../common';
import { ControllerEvent } from '../../utils';
/**
 * 工具栏控制器
 * @author lxm
 * @date 2023-03-28 06:44:26
 * @export
 * @class ToolbarController
 * @extends {ControlController<ToolbarModel>}
 */
export declare class ToolbarController<T extends IDEToolbar = IDEToolbar, S extends IToolbarState = IToolbarState, E extends IToolbarEvent = IToolbarEvent> extends ControlController<T, S, E> implements IToolbarController<T, S, E> {
    protected get _evt(): ControllerEvent<IToolbarEvent>;
    /**
     * 所有工具栏项
     *
     * @author zhanghengfeng
     * @date 2024-05-15 18:05:07
     * @type {IDEToolbarItem[]}
     */
    allToolbarItems: IDEToolbarItem[];
    /**
     * 工具栏项适配器集合
     *
     * @author zhanghengfeng
     * @date 2024-05-15 18:05:25
     * @type {{ [key: string]: IToolbarItemProvider }}
     */
    itemProviders: {
        [key: string]: IToolbarItemProvider;
    };
    /**
     * 计数器对象
     * @author ljx
     * @date 2024-12-11 17:12:35
     * @type {AppCounter}
     */
    counter?: AppCounter;
    /**
     * @description 控制移动端工具栏在屏幕中的位置，仅工具栏样式设为自定义时生效
     * @readonly
     * @type {('LEFTSTART'
     *     | 'LEFT'
     *     | 'LEFTEND'
     *     | 'RIGHT'
     *     | 'RIGHTSTART'
     *     | 'RIGHTEND')}
     * @memberof ToolbarController
     */
    get placement(): 'LEFTSTART' | 'LEFT' | 'LEFTEND' | 'RIGHT' | 'RIGHTSTART' | 'RIGHTEND';
    /**
     * @description 控制移动端工具栏项的排列方向，仅工具栏样式设为自定义时生效
     * @readonly
     * @type {('VERTICAL' | 'HORIZONTAL')}
     * @memberof ToolbarController
     */
    get direction(): 'VERTICAL' | 'HORIZONTAL';
    /**
     * @description 控制移动端工具栏项的显示模式
     * @readonly
     * @type {('VERTICAL' | 'HORIZONTAL')}
     * @memberof ToolbarController
     */
    get showMode(): 'IMMEDIATE' | 'COLLAPSIBLE';
    /**
     * @description 移动端工具栏分组与行为组的展示模式
     * @readonly
     * @type {('DEFAULT' | 'ACTIONSHEET')}
     */
    get groupShowMode(): 'DEFAULT' | 'ACTIONSHEET';
    /**
     * @description 数据部件控制器
     * @readonly
     * @type {(ControlController | undefined)}
     * @memberof ToolbarController
     */
    get xdataControl(): ControlController | undefined;
    protected initState(): void;
    /**
     * 执行按钮的界面行为（如果按钮存在界面行为的话）
     *
     * @author zk
     * @date 2023-07-20 10:07:22
     * @protected
     * @param {IDEToolbarItem} item 工具栏项
     * @param {MouseEvent} event 鼠标事件
     * @param {IData} [param] 界面行为参数（界面行为点击自定义按钮可能需要传参数到行为去，标准行为忽略此参数）
     * @return {*}  {Promise<void>}
     * @memberof ToolbarController
     */
    protected doUIAction(item: IDEToolbarItem, event: MouseEvent, param?: IData): Promise<void>;
    /**
     * 获取工具栏事件参数
     *
     * @return {*}  {Omit<EventBase, 'eventName'>}
     * @memberof ToolbarController
     */
    getToolbarEventArgs(): Promise<Omit<EventBase, 'eventName'>>;
    /**
     * 初始化工具栏项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-15 18:05:08
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initToolbarItemProviders(): Promise<void>;
    /**
     * 计数器对象数据改变
     * @author ljx
     * @date 2024-12-11 15:57:00
     * @return {*}
     */
    onCounterChange(data: IData): void;
    /**
     * 初始化计数器对象
     * @author ljx
     * @date 2024-12-11 15:57:00
     * @return {*}
     */
    initCounter(): void;
    protected onCreated(): Promise<void>;
    /**
     * 初始化工具栏按钮状态对象
     */
    protected initButtonState(): Promise<void>;
    /**
     * 生命周期-加载完成，实际执行逻辑，子类重写用这个
     * 放置等自身后需要等待的子组件都加载完成后才会执行的逻辑。
     * @author ljx
     * @date 2024-12-11 15:57:00
     */
    protected onMounted(): Promise<void>;
    /**
     * @description 监听数据部件事件
     * @protected
     * @memberof ToolbarController
     */
    protected listenerXdataControlEvent(): void;
    /**
     * 生命周期-销毁完成，实际执行逻辑，子类重写用这个
     * @author ljx
     * @date 2024-12-11 15:57:00
     */
    protected onDestroyed(): Promise<void>;
    /**
     * 工具栏按钮点击事件
     *
     * @author zk
     * @date 2023-07-20 03:07:29
     * @param {(IDEToolbarItem | IExtraButton)} item
     * @param {MouseEvent} event
     * @param {IData} [params] 界面行为参数（界面行为点击自定义按钮可能需要传参数到行为去，标准行为忽略此参数）
     * @return {*}  {Promise<void>}
     * @memberof ToolbarController
     */
    onItemClick(item: IDEToolbarItem | IExtraButton, event: MouseEvent, params?: IData): Promise<void>;
    calcButtonState(data?: IData, appDeId?: string, _params?: IParams): Promise<void>;
    setExtraButtons(position: 'before' | 'after' | number, buttons: IExtraButton[]): void;
    clearExtraButtons(position?: 'before' | 'after' | number): void;
    protected initControlScheduler(logics?: IControlLogic[]): void;
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof ToolbarController
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=toolbar.controller.d.ts.map