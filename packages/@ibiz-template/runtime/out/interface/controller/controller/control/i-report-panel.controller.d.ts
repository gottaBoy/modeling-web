import { IDEReportPanel } from '@ibiz/model-core';
import { IReportPanelEvent } from '../../event';
import { IReportPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { MDCtrlLoadParams } from './i-md-control.controller';
/**
 * 报表部件控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IReportPanelController
 * @extends {IControlController}
 */
export interface IReportPanelController extends IControlController<IDEReportPanel, IReportPanelState, IReportPanelEvent> {
    /**
     * 报表生成器对象
     *
     * @author tony001
     * @date 2024-06-30 11:06:46
     * @type {IData}
     */
    generator: IData;
    /**
     * 加载数据
     * @return {*}  {Promise<IData>}
     */
    load(args?: MDCtrlLoadParams): Promise<IData>;
    /**
     * 获取表单数据
     * @return {*}  {IData[]}
     */
    getData(): IData[];
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-06-19 18:06:51
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=i-report-panel.controller.d.ts.map