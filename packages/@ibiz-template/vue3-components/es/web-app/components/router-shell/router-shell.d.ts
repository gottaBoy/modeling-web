import { PropType } from 'vue';
import { IModal, Modal } from '@ibiz-template/runtime';
export declare const RouterShell: import("vue").DefineComponent<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}, {
    routeModal: Modal;
    route: import("vue-router").RouteLocationNormalizedLoaded;
    viewData: import("vue").Ref<{
        viewConfig?: {
            id: string;
            appId: string;
            codeName: string;
            openMode: string;
            viewType: string;
            width?: number | undefined;
            height?: number | undefined;
            appDataEntityId?: string | undefined;
            redirectView?: boolean | undefined;
            modalOption?: IData | undefined;
        } | undefined;
        context?: IParams | undefined;
        params?: IParams | undefined;
        srfnav?: string | undefined;
    }>;
    isLoaded: import("vue").Ref<boolean>;
    isActivated: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}>>, {}, {}>;
