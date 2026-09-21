import { IDrawerOptions, IFloatWindowOptions, IModal, IModalData, IModalOptions, IPopoverOptions, IViewShellHooks } from '@ibiz-template/runtime';
import { VNode } from 'vue';
export declare function createOverlayView(props?: IParams): (modal: IModal, viewShellHooks?: IViewShellHooks) => VNode;
export declare function openViewModal(props?: IParams, opts?: IModalOptions): Promise<IModalData>;
export declare function openViewFloatWindow(props?: IParams, opts?: IFloatWindowOptions): Promise<IModalData>;
export declare function openViewDrawer(props?: IParams, opts?: IDrawerOptions): Promise<IModalData>;
export declare function openViewPopover(event: MouseEvent, props?: IParams, opts?: IPopoverOptions): Promise<IModalData>;
export declare function getDrawerPlacement(openMode: string): IDrawerOptions['placement'];
//# sourceMappingURL=overlay-view-util.d.ts.map