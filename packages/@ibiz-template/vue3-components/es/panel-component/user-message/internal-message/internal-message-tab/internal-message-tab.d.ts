import { PropType } from 'vue';
import { IInternalMessageController } from '@ibiz-template/runtime';
import './internal-message-tab.scss';
export declare const InternalMessageTab: import("vue").DefineComponent<{
    controller: {
        type: PropType<IInternalMessageController>;
        required: true;
    };
    showPopover: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    allItems: import("vue").Ref<{
        update_man: string;
        update_time: string;
        create_man: string;
        create_time: string;
        id: string;
        status: import("@ibiz-template/core").InternalMessageStatus;
        content_type: import("@ibiz-template/core").InternalMessageContentType;
        content: string;
        system_tag: string;
        owner_id: string;
        owner_type: "PERSONAL" | "SYSTEM";
        message_type: string;
        title: string;
        receiver: string;
        short_content?: string | undefined;
        url?: string | undefined;
        mobile_url?: string | undefined;
    }[]>;
    state: {
        total: number;
        pageSize: number;
        unreadOnly: boolean;
    };
    hiddenPopover: () => void;
    showMore: () => void;
    switchChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hiddenPopover: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<IInternalMessageController>;
        required: true;
    };
    showPopover: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onHiddenPopover?: (() => any) | undefined;
}, {}, {}>;
