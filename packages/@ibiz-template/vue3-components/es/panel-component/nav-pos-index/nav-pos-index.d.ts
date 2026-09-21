import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { EventBase } from '@ibiz-template/runtime';
import { NavPosIndexController } from './nav-pos-index.controller';
import './nav-pos-index.scss';
export declare const NavPosIndex: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosIndexController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onViewCreated: (event: EventBase) => void;
    c: NavPosIndexController;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosIndexController;
        required: true;
    };
}>>, {}, {}>;
