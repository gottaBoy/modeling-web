import { PropType } from 'vue';
import { IDEEditForm } from '@ibiz/model-core';
import { EventBase, IModalData } from '@ibiz-template/runtime';
import './quick-edit.scss';
export declare const IBizQuickEdit: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    modelData: {
        type: PropType<IDEEditForm>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCreated: (event: EventBase) => void;
    onConfirm: () => void;
    onCancel: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (_modalData: IModalData) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    modelData: {
        type: PropType<IDEEditForm>;
    };
}>> & {
    onClose?: ((_modalData: IModalData) => any) | undefined;
}, {}, {}>;
