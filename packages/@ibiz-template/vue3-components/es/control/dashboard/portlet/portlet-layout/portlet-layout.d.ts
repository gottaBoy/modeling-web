import { PropType } from 'vue';
import { IUIActionGroupDetail } from '@ibiz/model-core';
import './portlet-layout.scss';
import { PortletPartController } from '@ibiz-template/runtime';
/**
 * 门户控件布局
 */
export declare const PortletLayout: import("vue").DefineComponent<{
    controller: {
        type: typeof PortletPartController;
        required: true;
    };
    linkAction: {
        type: PropType<IUIActionGroupDetail>;
    };
}, {
    c: PortletPartController<import("@ibiz/model-core").IDBPortletPart>;
    ns: import("@ibiz-template/core").Namespace;
    popperClass: import("vue").ComputedRef<string[]>;
    portletType: string;
    isShowHeader: import("vue").ComputedRef<string | import("@ibiz/model-core").ISysImage | import("@ibiz/model-core").IUIActionGroup | undefined>;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
    openLink: (event: MouseEvent) => void;
    clickPorlet: (event: MouseEvent, position: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof PortletPartController;
        required: true;
    };
    linkAction: {
        type: PropType<IUIActionGroupDetail>;
    };
}>>, {}, {}>;
