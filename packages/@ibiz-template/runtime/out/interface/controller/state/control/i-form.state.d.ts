import { IControlState } from './i-control.state';
export interface IFormState extends IControlState {
    /**
     * 是否加载完数据
     *
     * @author lxm
     * @date 2022-10-24 19:10:04
     * @type {boolean}
     */
    isLoaded: boolean;
    /**
     * 表单数据
     *
     * @author lxm
     * @date 2022-08-22 22:08:19
     * @type {IData}
     */
    data: IData;
    /**
     * 是否正在处理中(动态控制，值规则，表单项更新等逻辑中)
     * @author lxm
     * @date 2023-03-06 09:07:20
     * @type {boolean}
     * @memberof FormController
     */
    processing: boolean;
    /**
     * 是否被修改过
     *
     * @author lxm
     * @date 2022-11-02 22:11:33
     * @type {boolean}
     */
    modified: boolean;
    /**
     * 当前激活分页
     *
     * @type {string}
     * @memberof IFormState
     */
    activeTab: string;
    /**
     * 表单是否销毁(UI)
     *
     * @author tony001
     * @date 2024-11-27 15:11:56
     * @type {boolean}
     */
    formIsDestroyed: boolean;
}
//# sourceMappingURL=i-form.state.d.ts.map