import { PropType } from 'vue';
import { BIReportDesignController } from '../../../controller';
declare const _default: import("vue").DefineComponent<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
}, {
    ns: Namespace;
    fields: import("vue").Ref<{
        type: string;
        originalType: string;
        appDEFieldId: string;
        valueOPs: any[];
        caption: string;
        appCodeListId?: string | undefined;
        appDataEntityId?: string | undefined;
        appDataEntityFullTag?: string | undefined;
    }[]>;
    currentValue: import("vue").Ref<string>;
    openModal: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: string) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((_value: string) => any) | undefined;
}, {
    value: string;
}, {}>;
export default _default;
