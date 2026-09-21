import { IFormDetailState, ILayoutState, IFormDetailClass, IFormDetailContainerState } from '../../../../../interface';
/**
 * 表单项状态
 *
 * @author chitanda
 * @date 2023-01-04 09:01:02
 * @export
 * @class FormDetailState
 */
export declare class FormDetailState implements IFormDetailState {
    protected parent?: IFormDetailContainerState | undefined;
    visible: boolean;
    disabled: boolean;
    keepAlive: boolean;
    layout: ILayoutState;
    class: IFormDetailClass;
    /**
     * 是否必填
     *
     * @author chitanda
     * @date 2023-01-04 10:01:27
     * @type {boolean}
     */
    required: boolean;
    /**
     * 显示更多模式 {0：无、 1：受控内容、 2：管理容器}
     * @author lxm
     * @date 2023-03-17 02:16:43
     * @type {(0 | 1 | 2)}
     */
    showMoreMode: 0 | 1 | 2 | number;
    /**
     * 是否只读
     *
     * @author zhanghengfeng
     * @date 2024-03-25 17:03:48
     * @type {boolean}
     */
    readonly: boolean;
    /**
     * 上下文对象
     *
     * @author tony001
     * @date 2024-04-16 16:04:29
     * @type {IContext}
     */
    context?: IContext;
    /**
     * 是否识别srfreadonly
     *
     * @author zhanghengfeng
     * @date 2024-06-13 13:06:50
     * @type {boolean}
     */
    enableReadonly: boolean;
    /**
     * @description 计数器数据
     * @type {IData}
     * @memberof FormDetailState
     */
    counterData: IData;
    constructor(parent?: IFormDetailContainerState | undefined);
}
//# sourceMappingURL=form-detail.state.d.ts.map