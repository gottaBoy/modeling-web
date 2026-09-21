import { IDEFormTabPanel } from '@ibiz/model-core';
import { IFormDetailContainerController } from '../../../../../interface';
import { FormDetailController } from '../form-detail';
import { FormTabPanelState } from './form-tab-panel.state';
import { AppCounter } from '../../../../../service';
/**
 * 表单分页部件控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormTabPanelController
 * @extends {FormDetailController}
 */
export declare class FormTabPanelController extends FormDetailController<IDEFormTabPanel> implements IFormDetailContainerController {
    state: FormTabPanelState;
    protected createState(): FormTabPanelState;
    protected onInit(): Promise<void>;
    /**
     * 分页点击切换处理
     * @author lxm
     * @date 2024-01-17 02:59:38
     * @param {string} tabId
     */
    onTabChange(tabId: string): void;
    /**
     * 根据id去表单控制器里取得计数器对象
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 15:14:21
     */
    getCounter(id: string): AppCounter | null;
    /**
     * 更新激活的分页
     *
     * @author zhanghengfeng
     * @date 2025-02-05 20:02:55
     * @return {*}  {void}
     */
    updateActiveTab(): void;
}
//# sourceMappingURL=form-tab-panel.controller.d.ts.map