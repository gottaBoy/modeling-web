import { PropType } from 'vue';
import './mdctrl-container.scss';
export declare const MDCtrlContainer: import("vue").DefineComponent<{
    enableCreate: {
        type: BooleanConstructor;
        required: true;
    };
    enableDelete: {
        type: BooleanConstructor;
        required: true;
    };
    items: {
        type: PropType<IData[]>;
        required: true;
    };
    userStyle: {
        type: StringConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    showActions: import("vue").ComputedRef<boolean>;
    renderAddBtn: () => JSX.Element;
    renderRemoveBtn: (item: IData, index: number) => JSX.Element | null;
    renderStyle2AddBtn: () => JSX.Element;
    renderStyle2RemoveBtn: (item: IData, index: number) => JSX.Element | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    addClick: () => true;
    removeClick: (_data: IData, _index: number) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    enableCreate: {
        type: BooleanConstructor;
        required: true;
    };
    enableDelete: {
        type: BooleanConstructor;
        required: true;
    };
    items: {
        type: PropType<IData[]>;
        required: true;
    };
    userStyle: {
        type: StringConstructor;
    };
}>> & {
    onAddClick?: (() => any) | undefined;
    onRemoveClick?: ((_data: IData, _index: number) => any) | undefined;
}, {}, {}>;
