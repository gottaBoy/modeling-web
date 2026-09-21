import { FormMDCtrlState } from './form-mdctrl.state';
export interface MDCtrlFormItem {
    /**
     * 唯一标识
     * @author lxm
     * @date 2023-11-11 07:50:42
     * @type {string}
     */
    id: string;
    /**
     * 上下文
     * @author lxm
     * @date 2023-11-11 07:51:04
     * @type {IContext}
     */
    context: IContext;
    /**
     * 视图参数
     * @author lxm
     * @date 2023-11-11 07:51:11
     * @type {IParams}
     */
    params: IParams;
    /**
     * 表单标题
     *
     * @author zhanghengfeng
     * @date 2024-06-14 20:06:13
     * @type {string}
     */
    title?: string;
}
/**
 * 表单多数据部件状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export declare class FormMDCtrlFormState extends FormMDCtrlState {
    /**
     * 每个表单绘制相关参数
     * @author lxm
     * @date 2023-11-11 07:51:40
     * @type {MDCtrlFormItem[]}
     */
    items?: MDCtrlFormItem[];
}
//# sourceMappingURL=form-mdctrl-form.state.d.ts.map