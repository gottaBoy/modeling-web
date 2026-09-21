import { IInternalMessage } from '@ibiz-template/core';
import { InternalMessageDefaultProvider } from '../common';
export declare class InternalMessageJSONtProvider extends InternalMessageDefaultProvider {
    component: import("vue").DefineComponent<{
        message: {
            type: import("vue").PropType<IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageJSONtProvider>;
            required: true;
        };
    }, {
        ns: import("@ibiz-template/core").Namespace;
        jsonContent: import("vue").ComputedRef<IData | null>;
        toolbarItems: import("vue").ComputedRef<{
            icon: string;
            key: string;
            tooltip: string;
        }[] | undefined>;
        redirectUrl: import("vue").ComputedRef<any>;
        onToolbarClick: (key: string) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => true;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        message: {
            type: import("vue").PropType<IInternalMessage>;
            required: true;
        };
        provider: {
            type: import("vue").PropType<InternalMessageJSONtProvider>;
            required: true;
        };
    }>> & {
        onClose?: (() => any) | undefined;
    }, {}, {}>;
    onClick(message: IInternalMessage, event: MouseEvent): Promise<boolean>;
}
