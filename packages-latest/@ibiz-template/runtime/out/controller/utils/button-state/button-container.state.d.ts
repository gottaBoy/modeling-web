import { IButtonContainerState, IButtonState } from '../../../interface';
/**
 * 按钮容器状态
 * @author lxm
 * @date 2023-05-10 02:19:07
 * @export
 * @class ButtonContainerState
 * @implements {IButtonContainerState}
 */
export declare class ButtonContainerState implements IButtonContainerState {
    visible: boolean;
    disabled: boolean;
    children: Array<IButtonContainerState | IButtonState>;
    constructor();
    computeVisable(): boolean;
    computeDisabled(): boolean;
    addState(name: string, state: IButtonContainerState | IButtonState): void;
    setLoading(name: string): void;
    update(context: IContext, data?: IData, appDeId?: string, selections?: IData[]): Promise<void>;
    init(): Promise<void>;
    [p: string]: any;
}
//# sourceMappingURL=button-container.state.d.ts.map