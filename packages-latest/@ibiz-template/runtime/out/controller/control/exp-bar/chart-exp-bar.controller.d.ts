import { IChartExpBar, INavigatable } from '@ibiz/model-core';
import { INavViewMsg, IChartExpBarState, IChartExpBarEvent, IChartExpBarController } from '../../../interface';
import { ExpBarControlController } from './exp-bar.controller';
/**
 * 图表导航栏控制器
 *
 * @export
 * @class ChartExpBarController
 * @extends {ExpBarControlController<IChartExpBar, IChartExpBarState, IChartExpBarEvent>}
 * @implements {IChartExpBarController}
 */
export declare class ChartExpBarController extends ExpBarControlController<IChartExpBar, IChartExpBarState, IChartExpBarEvent> implements IChartExpBarController {
    /**
     * @description 获取默认激活数据
     * @returns {*}  {(IData | undefined)}
     * @memberof ChartExpBarController
     */
    getDefaultActiveData(): IData | undefined;
    /**
     * 导航页面首次打开且没有回显时，
     * 默认取第一条数据进行导航
     * 对于不同的导航，第一条可导航的数据可能定义不同，可以重写改方法。
     * @author lxm
     * @date 2023-08-10 03:58:15
     * @public
     */
    navByFirstItem(): void;
    /**
     * @description 根据栈数据导航数据
     * @memberof ChartExpBarController
     */
    navDataByStack(): void;
    /**
     * 解析参数
     *
     * @author zk
     * @date 2023-05-29 04:05:52
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}
     * @memberof ExpBarControlController
     */
    prepareParams(XDataModel: INavigatable & {
        appDataEntityId?: string;
    }, data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 获取导航视图
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(data: IData, context: IContext, params: IParams): INavViewMsg;
}
//# sourceMappingURL=chart-exp-bar.controller.d.ts.map