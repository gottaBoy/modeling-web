import { PropType, Ref } from 'vue';
import './extend-action-timeline.scss';
export declare const IBizExtendActionTimeLine: import("vue").DefineComponent<{
    data: {
        type: PropType<IData>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    formatDate: (date: string, format: string) => string;
    UIData: Ref<IData[]>;
    renderTimeline: (data: IData[]) => JSX.Element[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<IData>;
    };
}>>, {}, {}>;
