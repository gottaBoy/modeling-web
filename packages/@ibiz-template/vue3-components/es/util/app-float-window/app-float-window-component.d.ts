import { PropType, VNode } from 'vue';
import { IModalData, IFloatWindowOptions, IOverlayContainer, Modal } from '@ibiz-template/runtime';
import './app-float-window-component.scss';
export declare const AppFloatWindowComponent: import("vue").DefineComponent<{
    opts: {
        type: PropType<IFloatWindowOptions>;
        default: () => {};
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isShow: import("vue").Ref<boolean>;
    options: import("vue").Ref<{
        width?: number | undefined;
        height?: number | undefined;
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        x?: number | undefined;
        y?: number | undefined;
        windowClass?: string | undefined;
        fullscreen?: boolean | undefined;
    }>;
    modalZIndex: number;
    modal: Modal;
    calcStyle: () => {
        left: string;
        top: string;
        height: string;
        width: string;
        zIndex: number;
    };
    present: () => void;
    dismiss: (_data?: IModalData) => void;
    onClosed: () => void;
    containerRef: import("vue").Ref<HTMLDivElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    opts: {
        type: PropType<IFloatWindowOptions>;
        default: () => {};
    };
}>>, {
    opts: IFloatWindowOptions;
}, {}>;
/**
 * 创建全局悬浮窗口
 *
 * @author chitanda
 * @date 2023-10-11 21:10:55
 * @export
 * @param {() => VNode} render
 * @param {IFloatWindowOptions} [opts]
 * @return {*}  {IOverlayContainer}
 */
export declare function createFloatWindow(render: () => VNode, opts?: IFloatWindowOptions): IOverlayContainer;
