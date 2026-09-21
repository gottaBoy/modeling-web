import { PropType, VNode } from 'vue';
import { IDEToolbar, IDEToolbarItem } from '@ibiz/model-core';
import { IControlProvider, IExtraButton, IToolbarState, ToolbarController } from '@ibiz-template/runtime';
import './toolbar.scss';
export declare const ToolbarControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEToolbar>;
        required: true;
    };
    runMode: {
        type: PropType<"DESIGN" | "RUNTIME">;
        default: string;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    manualCalcButtonState: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: ToolbarController<import("@ibiz/model-core").IControl, IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>;
    btnSize: import("vue").Ref<string>;
    ns: import("@ibiz-template/core").Namespace;
    toolbarStyle: string | undefined;
    handleClick: (item: IDEToolbarItem, event: MouseEvent, params?: IData) => Promise<void>;
    renderExtraButtons: (extraButtons: IExtraButton[]) => VNode[];
    renderToolbarItem: (item: IDEToolbarItem) => VNode | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEToolbar>;
        required: true;
    };
    runMode: {
        type: PropType<"DESIGN" | "RUNTIME">;
        default: string;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    manualCalcButtonState: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    params: IParams;
    runMode: "DESIGN" | "RUNTIME";
    manualCalcButtonState: boolean;
}, {}>;
