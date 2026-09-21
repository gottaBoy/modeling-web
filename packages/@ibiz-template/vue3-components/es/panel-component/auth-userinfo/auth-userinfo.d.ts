import { PropType } from 'vue';
import './auth-userinfo.scss';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
export declare const AuthUserinfo: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    onClick: () => void;
    srfusername: any;
    loginname: any;
    router: import("vue-router").Router;
    menuAlign: import("vue").ComputedRef<string>;
    isCollapse: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
