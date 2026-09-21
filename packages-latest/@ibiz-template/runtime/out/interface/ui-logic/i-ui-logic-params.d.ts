import { IApiUILogicParams } from '../api';
import { IControlController, IViewController } from '../controller';
/**
 * @description 界面逻辑通用参数接口
 * @export
 * @interface IUILogicParams
 * @extends {IApiUILogicParams}
 */
export interface IUILogicParams extends IApiUILogicParams {
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
}
//# sourceMappingURL=i-ui-logic-params.d.ts.map