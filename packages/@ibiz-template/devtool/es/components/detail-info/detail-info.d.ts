import { PropType } from 'vue';
import { CenterController } from '../../controller/center.controller';
import './detail-info.scss';
export declare const DetailInfo: import("vue").DefineComponent<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    expandItems: import("vue").Ref<string[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}>>, {}, {}>;
