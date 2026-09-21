import { IInternalMessage } from '@ibiz-template/core';
import { InternalMessageDefaultProvider } from '../common';
export declare class InternalMessageHTMLtProvider extends InternalMessageDefaultProvider {
    component: import("vue").DefineComponent<{
        message: {
            type: import("vue").PropType<IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageHTMLtProvider>;
            required: true;
        };
    }, {
        ns: import("@ibiz-template/core").Namespace;
        msgContent: import("vue").ComputedRef<string>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => true;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        message: {
            type: import("vue").PropType<IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageHTMLtProvider>;
            required: true;
        };
    }>> & {
        onClose?: (() => any) | undefined;
    }, {}, {}>;
    onClick(message: IInternalMessage, event: MouseEvent): Promise<boolean>;
}
