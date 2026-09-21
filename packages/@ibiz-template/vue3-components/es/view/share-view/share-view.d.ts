import { Ref } from 'vue';
import './share-view.scss';
export declare const ShareView: import("vue").DefineComponent<{}, {
    ns: import("@ibiz-template/core").Namespace;
    loading: Ref<boolean>;
    isMounted: Ref<boolean>;
    shareUser: Ref<IData>;
    handleApply: () => Promise<void>;
    handleCancel: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
