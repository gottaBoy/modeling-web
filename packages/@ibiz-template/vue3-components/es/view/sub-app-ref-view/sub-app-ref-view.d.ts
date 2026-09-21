import { IModal, ViewController } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './sub-app-ref-view.scss';
export declare const SubAppRefView: import("vue").DefineComponent<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<IData>;
    };
}, {
    c: ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    viewClassNames: (string | undefined)[];
    htmlUrl: import("vue").ComputedRef<any>;
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<IData>;
    };
}>>, {
    params: IParams;
}, {}>;
