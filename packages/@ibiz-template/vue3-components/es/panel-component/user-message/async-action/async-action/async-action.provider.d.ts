import { IPortalAsyncAction } from '@ibiz-template/core';
import { IAsyncActionProvider } from '@ibiz-template/runtime';
import { VNode } from 'vue';
export declare class AsyncActionProvider implements IAsyncActionProvider {
    component: import("vue").DefineComponent<{
        action: {
            type: import("vue").PropType<IPortalAsyncAction>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<IAsyncActionProvider>;
            required: true;
        };
    }, {
        ns: import("@ibiz-template/core").Namespace;
        showErrorInfo: import("vue").ComputedRef<boolean | "">;
        clickable: import("vue").ComputedRef<boolean>;
        actionstate: import("vue").ComputedRef<10 | 20 | 30 | 40>;
        progressText: import("vue").ComputedRef<string>;
        onClick: (event: MouseEvent) => Promise<void>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => true;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        action: {
            type: import("vue").PropType<IPortalAsyncAction>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<IAsyncActionProvider>;
            required: true;
        };
    }>> & {
        onClose?: (() => any) | undefined;
    }, {}, {}>;
    render(props: IData & {
        action: IPortalAsyncAction;
    }): VNode;
    onClick(asyncAction: IPortalAsyncAction, _event: MouseEvent): Promise<boolean>;
}
