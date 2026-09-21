import { IDEFormTabPanel } from '@ibiz/model-core';
import { FormTabPanelState } from './form-tab-panel.state';
import { AppCounter } from '../../../../../service';
import { IApiFormTabPanelController } from '../../../../../interface';
import { FormContainerController } from '../form-container';
import { FormNotifyState } from '../../../../constant';
/**
 * @description 表单分页部件控制器
 * @export
 * @class FormTabPanelController
 * @extends {FormContainerController<IDEFormTabPanel>}
 * @implements {IApiFormTabPanelController}
 */
export declare class FormTabPanelController extends FormContainerController<IDEFormTabPanel> implements IApiFormTabPanelController {
    state: FormTabPanelState;
    /**
     * @description 缓存标识
     * @readonly
     * @type {string}
     * @memberof FormTabPanelController
     */
    get srfcachekeytempl(): string;
    protected createState(): FormTabPanelState;
    protected onInit(): Promise<void>;
    /**
     * @description 表单状态变更通知
     * @param {FormNotifyState} state
     * @returns {*}  {Promise<void>}
     * @memberof FormTabPanelController
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 初始化计数器
     * @protected
     * @returns {*}  {void}
     * @memberof FormTabPanelController
     */
    protected initCounter(): void;
    /**
     * 分页点击切换处理
     * @author lxm
     * @date 2024-01-17 02:59:38
     * @param {string} tabId
     * @deprecated
     */
    onTabChange(tabId: string): void;
    /**
     * @description 切换激活分页
     * @param {string} tabId 分页id
     * @memberof FormTabPanelController
     */
    selectTab(tabId: string): void;
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