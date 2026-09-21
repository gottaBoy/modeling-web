import { PropType } from 'vue';
import './addin-changed.scss';
export declare const AddinChanged: import("vue").DefineComponent<{
    msg: {
        type: PropType<IData>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    msg: {
        type: PropType<IData>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
