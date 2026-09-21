import { AsyncSeriesHook } from 'qx-util';
import { ViewMode } from '../../constant';
import { IModal, IModalData } from '../../interface';
type ConstructorOpts = {
    mode?: ViewMode;
    routeDepth?: number;
    viewUsage?: number;
    /**
     * 注入的模态等组件实际的关闭操作，
     * @author lxm
     * @date 2023-05-12 07:04:21
     */
    dismiss?: (data: IModalData) => void;
};
export declare class Modal implements IModal {
    mode: ViewMode;
    routeDepth?: number;
    viewUsage: number;
    ignoreDismissCheck: boolean;
    hooks: {
        shouldDismiss: AsyncSeriesHook<[], {
            allowClose?: boolean | undefined;
        }>;
        beforeDismiss: AsyncSeriesHook<[], IModalData>;
    };
    constructor(opts: ConstructorOpts);
    /**
     * 外部注入的模态等组件实际的关闭操作
     * @author lxm
     * @date 2023-05-12 07:06:56
     */
    _dismiss: (data: IModalData) => void;
    /**
     * 注入模态等组件实际的关闭操作
     * @author lxm
     * @date 2023-07-18 03:05:22
     * @param {(data: IModalData) => void} dismiss
     */
    injectDismiss(dismiss: (data: IModalData) => void): void;
    dismiss(data?: IModalData): Promise<boolean>;
    /**
     * 执行完一次关闭后就会调销毁
     * @author lxm
     * @date 2023-07-18 03:32:26
     * @protected
     */
    protected destroy(): void;
}
export {};
//# sourceMappingURL=modal.d.ts.map