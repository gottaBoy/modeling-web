import { IControlController, IViewController } from '../../controller';
/**
 * 界面逻辑通用参数(界面行为，事件，界面逻辑，实体逻辑等)
 * @author lxm
 * @date 2023-05-08 09:31:01
 * @export
 * @interface IUILogicParams
 */
export interface IUILogicParams {
    /**
     * 上下文
     * @author lxm
     * @date 2023-03-21 05:53:33
     * @type {IContext}
     */
    context: IContext;
    /**
     * 视图参数
     * @author lxm
     * @date 2023-03-21 05:54:23
     * @type {IParams}
     */
    params: IParams;
    /**
     * 涉及的数据集合
     * @author lxm
     * @date 2023-03-21 05:54:33
     * @type {IData[]}
     */
    data: IData[];
    /**
     * 当前上下文对应的视图控制器
     * @author lxm
     * @date 2023-03-21 05:58:31
     * @type {Neuron}
     */
    view: IViewController;
    /**
     * 当前部件控制器
     * @author lxm
     * @date 2023-06-14 07:45:34
     * @type {IController}
     */
    ctrl?: IControlController;
    /**
     * 原生JS事件对象
     * @author lxm
     * @date 2023-03-21 05:57:51
     * @type {MouseEvent}
     */
    event?: MouseEvent;
    /**
     * 不等待路由打开
     * @author lxm
     * @date 2023-07-28 02:23:13
     * @type {boolean}
     */
    noWaitRoute?: boolean;
}
//# sourceMappingURL=i-ui-logic-params.d.ts.map