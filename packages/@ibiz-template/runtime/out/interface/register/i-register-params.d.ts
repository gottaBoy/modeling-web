import { IAppView, IControl, IControlItem } from '@ibiz/model-core';
/**
 * 自定义适配器注册参数接口
 */
export interface IRegisterParams {
    /**
     * 部件项模型
     *
     * @author ljx
     * @date 2024-04-15 16:10:54
     * @type {IModel}
     */
    controlItemModel?: IControlItem;
    /**
     * 部件模型
     *
     * @author ljx
     * @date 2024-04-15 16:10:54
     * @type {IPanel}
     */
    controlModel?: IControl;
    /**
     * 视图模型
     *
     * @author ljx
     * @date 2024-04-15 16:10:54
     * @type {IControl}
     */
    viewModel?: IAppView;
}
//# sourceMappingURL=i-register-params.d.ts.map