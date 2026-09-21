import { PropType } from 'vue';
import type { CenterController } from '../../controller/center.controller';
import './index-page.scss';
export declare const IndexPage: import("vue").DefineComponent<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    rootRef: import("vue").Ref<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}>>, {}, {}>;
