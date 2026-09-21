import { IControlLogic, IPanel, IPanelItem } from '@ibiz/model-core';
import { AsyncSeriesHook } from 'qx-util';
import { IPanelState, IPanelEvent, IPanelController, IPanelItemController, IPanelItemProvider, IControlProvider, IPanelItemContainerController, IController } from '../../../../interface';
import { PanelData } from '../../../../service/vo';
import { ControlController } from '../../../common';
import { PanelNotifyState } from '../../../constant';
import { ControllerEvent } from '../../../utils';
import { CTX } from '../../../ctx';
/**
 * 面板部件控制器
 *
 * @author lxm
 * @date 2022-09-08 20:09:55
 * @export
 * @class PanelController
 * @extends {ControlController<PanelModel>}
 */
export declare class PanelController<T extends IPanel = IPanel, S extends IPanelState = IPanelState, E extends IPanelEvent = IPanelEvent> extends ControlController<T, S, E> implements IPanelController<T, S, E> {
    /**
     * 面板钩子
     *
     * @memberof PanelController
     */
    hooks: {
        validate: AsyncSeriesHook<[], {
            result: boolean[];
            parentId?: string | undefined;
        }>;
    };
    protected get _evt(): ControllerEvent<IPanelEvent>;
    /**
     * 所有面板成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemController }}
     */
    panelItems: {
        [key: string]: IPanelItemController;
    };
    /**
     * 所有面板成员的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemProvider  | IControlProvider}}
     */
    providers: {
        [key: string]: IPanelItemProvider | IControlProvider;
    };
    /**
     * 外部输入数据
     *
     * @author lxm
     * @date 2023-02-09 03:16:52
     * @type {IData}
     * @memberof PanelController
     */
    inputData: IData | undefined;
    container?: IController;
    /**
     * 面板数据
     *
     * @author lxm
     * @date 2023-02-10 07:21:09
     * @readonly
     * @memberof PanelController
     */
    get data(): IData;
    constructor(model: T, context: IContext, params: IParams, ctx: CTX, container?: IController);
    protected initState(): void;
    setInputData(data: IData | undefined): void;
    getData(): IData[];
    protected onCreated(): Promise<void>;
    protected onMounted(): Promise<void>;
    /**
     * 生命周期-销毁完成
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PanelController
     */
    protected onDestroyed(): Promise<void>;
    /**
     * 值校验
     *
     * @param {string} [parentId] 数据父容器标识
     * @return {*}  {Promise<boolean>}
     * @memberof PanelController
     */
    validate(parentId?: string): Promise<boolean>;
    /**
     * 初始化面板成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initPanelItemControllers(panelItems?: IPanelItem[] | undefined, panel?: PanelController, parent?: IPanelItemContainerController | undefined): Promise<void>;
    /**
     * 部件加载，获取数据，并执行一系列后续初始化逻辑
     *
     * @author lxm
     * @date 2023-02-10 01:46:24
     * @memberof PanelController
     */
    load(): Promise<void>;
    /**
     * 根据获取模式准备原始数据
     *
     * @author lxm
     * @date 2023-02-10 02:04:39
     * @returns {*}  {(Promise<IData | undefined>)}
     * @memberof PanelController
     */
    prepareData(): Promise<IData | undefined>;
    /**
     * 转换原始数据，映射面板属性
     *
     * @author lxm
     * @date 2023-02-10 02:10:41
     * @param {IData} data
     * @returns {*}  {IData}
     * @memberof PanelController
     */
    convertData(data: IData): PanelData;
    /**
     * 通知所有面板成员面板操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): void;
    /**
     * 面板状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    panelStateNotify(state: PanelNotifyState): void;
    /**
     * 设置面板数据的值
     *
     * @param {string} name 要设置的数据的属性名称
     * @param {unknown} value 要设置的值
     */
    setDataValue(name: string, value: unknown): Promise<void>;
    protected initControlScheduler(logics?: IControlLogic[]): void;
}
//# sourceMappingURL=panel.controller.d.ts.map