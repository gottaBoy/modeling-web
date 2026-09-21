import { MDControlController } from '@ibiz-template/runtime';
import { Ref, PropType } from 'vue';
import './control-navigation.scss';
/**
 * 部件内容导航组件
 */
export declare const IBizControlNavigation: import("vue").DefineComponent<{
    controller: {
        type: PropType<MDControlController<import("@ibiz/model-core").IMDControl, import("@ibiz-template/runtime").IMDControlState, import("@ibiz-template/runtime").IMDControlEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    navStyle: {
        minWidth: string | number | undefined;
        maxWidth: string | number | undefined;
        minHeight: string | number | undefined;
        maxHeight: string | number | undefined;
    };
    provider: import("./provider/navigation-base.provider").NavgationBaseProvider;
    splitMode: Ref<"vertical" | "horizontal">;
    splitValue: Ref<string | number>;
    outerWrapper: Ref<HTMLDivElement | null>;
    renderNavView: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<MDControlController<import("@ibiz/model-core").IMDControl, import("@ibiz-template/runtime").IMDControlState, import("@ibiz-template/runtime").IMDControlEvent>>;
        required: true;
    };
}>>, {}, {}>;
