import { FormDetailController } from '../form-detail';
import { FormTabPanelState } from './form-tab-panel.state';
/**
 * 表单分页部件控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormTabPanelController
 * @extends {FormDetailController}
 */
export class FormTabPanelController extends FormDetailController {
    createState() {
        var _a;
        return new FormTabPanelState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    async onInit() {
        var _a;
        await super.onInit();
        // 初始化默认的激活分页
        this.state.activeTab = ((_a = this.model.deformTabPages) === null || _a === void 0 ? void 0 : _a[0].id) || '';
    }
    /**
     * 分页点击切换处理
     * @author lxm
     * @date 2024-01-17 02:59:38
     * @param {string} tabId
     */
    onTabChange(tabId) {
        this.state.activeTab = tabId;
    }
    /**
     * 根据id去表单控制器里取得计数器对象
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 15:14:21
     */
    getCounter(id) {
        const { counters } = this.form;
        if (counters && counters[id]) {
            return counters[id];
        }
        return null;
    }
    /**
     * 更新激活的分页
     *
     * @author zhanghengfeng
     * @date 2025-02-05 20:02:55
     * @return {*}  {void}
     */
    updateActiveTab() {
        var _a;
        if (!this.state.visible) {
            return;
        }
        const activeTab = this.form.details[this.state.activeTab];
        if (activeTab && !activeTab.state.visible) {
            const children = [];
            (_a = this.model.deformTabPages) === null || _a === void 0 ? void 0 : _a.forEach(item => {
                if (item.id && this.form.details[item.id]) {
                    children.push(this.form.details[item.id]);
                }
            });
            const child = children.find(item => item.state.visible);
            if (child && child.model.id) {
                this.state.activeTab = child.model.id;
            }
        }
    }
}
