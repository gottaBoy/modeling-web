import { PropType, VNode } from 'vue';
import { ControlController } from '@ibiz-template/runtime';
import './custom-render.scss';
export declare const IBizCustomRender: import("vue").DefineComponent<{
    controller: {
        type: PropType<ControlController<import("@ibiz/model-core").IControl, import("@ibiz-template/runtime").IControlState, import("@ibiz-template/runtime").IControlEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    getControlRender: () => VNode | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<ControlController<import("@ibiz/model-core").IControl, import("@ibiz-template/runtime").IControlState, import("@ibiz-template/runtime").IControlEvent>>;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=custom-render.d.ts.map