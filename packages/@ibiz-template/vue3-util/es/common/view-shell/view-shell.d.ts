import { IViewProvider, RedrawViewEvent } from '@ibiz-template/runtime';
import { PropType, Ref } from 'vue';
import { IAppView } from '@ibiz/model-core';
import './view-shell.scss';
export declare const IBizViewShell: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
    };
    modelData: {
        type: PropType<IAppView>;
    };
    viewId: {
        type: StringConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    errMsg: Ref<string>;
    provider: Ref<IViewProvider | undefined>;
    isComplete: Ref<boolean>;
    hasAuthority: Ref<boolean>;
    viewModelData: Ref<IAppView | undefined>;
    redrawView: (event: RedrawViewEvent) => Promise<void>;
    curContext: Ref<IContext>;
    curParams: Ref<IParams>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
    };
    modelData: {
        type: PropType<IAppView>;
    };
    viewId: {
        type: StringConstructor;
    };
}>>, {}, {}>;
//# sourceMappingURL=view-shell.d.ts.map