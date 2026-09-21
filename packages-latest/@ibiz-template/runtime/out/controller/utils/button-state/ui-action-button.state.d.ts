import { IUIActionGroupDetail } from '@ibiz/model-core';
import { IButtonState } from '../../../interface/controller';
/**
 * 界面行为按钮状态
 * @author lxm
 * @date 2023-05-10 02:04:12
 * @export
 * @class UIActionButtonState
 * @implements {IButtonState}
 */
export declare class UIActionButtonState implements IButtonState {
    name: string;
    disabled: boolean;
    visible: boolean;
    loading: boolean;
    /**
     * 是否有权限
     */
    protected permitted: boolean;
    /**
     * 没权限时是否隐藏
     */
    protected noPermissionHidden: boolean;
    /**
     * 有权限时且没数据时，是否禁用
     *
     * @author chitanda
     * @date 2023-11-30 11:11:14
     * @protected
     * @type {boolean}
     */
    protected noDataDisabled: boolean;
    /**
     * 有权限时且没主键时，是否禁用
     *
     * @author chitanda
     * @date 2023-11-30 11:11:03
     * @protected
     * @type {boolean}
     */
    protected noKeyDisabled: boolean;
    /**
     * 操作标识
     */
    protected dataAccessAction?: string;
    /**
     * 数据目标
     *
     * @author tony001
     * @date 2024-05-29 16:05:44
     * @protected
     * @type {string}
     */
    protected actionTarget?: string;
    /**
     * 应用标识
     */
    protected appId: string;
    /**
     * 界面行为模型
     */
    protected model?: IUIActionGroupDetail;
    /**
     * 界面行为标识
     */
    protected uiActionId?: string;
    /**
     * 实体界面行为的实体的codeName小写
     */
    protected appDeName?: string;
    /**
     *  是否初始化
     */
    protected isInit: boolean;
    constructor(name: string, appId: string, uiActionId?: string, model?: IUIActionGroupDetail);
    /**
     * 初始化，没有界面行为id就是普通的buttonState
     * @author lxm
     * @date 2023-05-10 02:16:22
     * @protected
     * @return {*}
     */
    init(): Promise<void>;
    /**
     * 计算按钮权限
     * @author lxm
     * @date 2023-05-11 07:46:09
     * @protected
     * @param {IData} [data] 数据
     * @param {string} [appDeId] 数据对应的实体id
     * @return {*}
     */
    protected calcPermission(context: IContext, data?: IData, appDeId?: string): Promise<void>;
    calcEnableScript(context: IContext, data?: IData): Promise<void>;
    calcVisibleScript(context: IContext, data?: IData): Promise<void>;
    update(context: IContext, data?: IData, appDeId?: string, selections?: IData[]): Promise<void>;
}
//# sourceMappingURL=ui-action-button.state.d.ts.map