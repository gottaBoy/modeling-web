import { InternalMessageDefaultProvider } from '../common';
export declare class InternalMessageTextProvider extends InternalMessageDefaultProvider {
    component: import("vue").DefineComponent<{
        message: {
            type: import("vue").PropType<import("@ibiz-template/core").IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageTextProvider>;
            required: true;
        };
    }, {
        ns: import("@ibiz-template/core").Namespace;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => true;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        message: {
            type: import("vue").PropType<import("@ibiz-template/core").IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageTextProvider>;
            required: true;
        };
    }>> & {
        onClose?: (() => any) | undefined;
    }, {}, {}>;
}
