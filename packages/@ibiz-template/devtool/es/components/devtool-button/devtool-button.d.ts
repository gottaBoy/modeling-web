import { PropType } from 'vue';
import './devtool-button.scss';
declare const DevtoolButton: import("vue").DefineComponent<{
    title: {
        type: PropType<string>;
        default: string;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    click: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: PropType<string>;
        default: string;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
}, {}>;
export default DevtoolButton;
