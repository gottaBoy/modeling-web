import { PropType, VNode } from 'vue';
import { IModalData, IModalOptions, IOverlayContainer, Modal } from '@ibiz-template/runtime';
import './app-modal-component.scss';
export declare const AppModalComponent: import("vue").DefineComponent<{
    opts: {
        type: PropType<IModalOptions>;
        default: () => {};
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isShow: import("vue").Ref<boolean>;
    options: import("vue").Ref<{
        width?: string | number | undefined;
        height?: string | number | undefined;
        footerHide?: boolean | undefined;
        placement?: "center" | undefined;
        modalClass?: string | undefined;
        isRouteModal?: boolean | undefined;
    }>;
    modalZIndex: number;
    customStyle: IData;
    modal: Modal;
    present: () => void;
    dismiss: (_data?: IModalData) => void;
    onBeforeClose: (done: () => void) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    opts: {
        type: PropType<IModalOptions>;
        default: () => {};
    };
}>>, {
    opts: IModalOptions;
}, {}>;
/**
 * 创建模态框
 *
 * @author chitanda
 * @date 2022-12-29 15:12:50
 * @export
 * @param {() => VNode} render
 * @param {(IModalOptions | undefined)} [opts]
 * @return {*}  {IOverlayContainer}
 */
export declare function createModal(render: () => VNode, opts?: IModalOptions | undefined): IOverlayContainer;
