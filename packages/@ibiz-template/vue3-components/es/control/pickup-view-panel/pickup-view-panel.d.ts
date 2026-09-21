import { PropType } from 'vue';
import { EventBase, IControlProvider, PickupViewPanelController } from '@ibiz-template/runtime';
import './pickup-view-panel.scss';
export declare const PickupViewPanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDEViewPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: PickupViewPanelController;
    ns: import("@ibiz-template/core").Namespace;
    onCreated: (event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDEViewPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    singleSelect: boolean;
    noLoadDefault: boolean;
}, {}>;
