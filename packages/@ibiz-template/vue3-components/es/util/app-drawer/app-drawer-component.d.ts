import { PropType, VNode } from 'vue';
import { IDrawerOptions, IModalData, IOverlayContainer, Modal } from '@ibiz-template/runtime';
import './app-drawer-component.scss';
export declare const AppDrawerComponent: import("vue").DefineComponent<{
    opts: {
        type: PropType<IDrawerOptions>;
        default: () => {};
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isShow: import("vue").Ref<boolean>;
    size: import("vue").Ref<string | number>;
    direction: string;
    drawerZIndex: number;
    modal: Modal;
    dismiss: (_data?: IModalData) => void;
    present: () => void;
    onClosed: () => void;
    onBeforeClose: (done: () => void) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    opts: {
        type: PropType<IDrawerOptions>;
        default: () => {};
    };
}>>, {
    opts: IDrawerOptions;
}, {}>;
/**
 * 创建抽屉
 *
 * @author chitanda
 * @date 2022-12-29 15:12:57
 * @export
 * @param {() => VNode} render
 * @param {(IDrawerOptions | undefined)} [opts]
 * @return {*}  {IOverlayContainer}
 */
export declare function createDrawer(render: () => VNode, opts?: IDrawerOptions | undefined): IOverlayContainer;
