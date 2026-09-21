import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { EventBase } from '@ibiz-template/runtime';
import { NavPosController } from './nav-pos.controller';
import './nav-pos.scss';
export declare const NavPos: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: NavPosController;
    isPresetView: import("vue").Ref<boolean>;
    onViewCreated: (event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=nav-pos.d.ts.map