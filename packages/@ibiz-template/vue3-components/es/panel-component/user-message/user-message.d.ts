import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
import './user-message.scss';
export declare const UserMessage: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    noticeController: import("@ibiz-template/runtime").INoticeController;
    noticeNum: import("vue").Ref<number>;
    popoverRef: import("vue").Ref<any>;
    showPopover: import("vue").Ref<boolean>;
    sysImage: import("@ibiz/model-core").ISysImage | {
        imagePath: string;
    };
    currentTab: import("vue").Ref<string>;
    hiddenPopover: () => void;
    onBatchReadClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}>>, {}, {}>;
