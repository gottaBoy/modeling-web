import { EditFormController, IControlProvider } from '@ibiz-template/runtime';
import { IDEEditForm } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
export declare const EditFormControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEEditForm>;
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
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: PropType<IData>;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: EditFormController;
    ns: import("@ibiz-template/core").Namespace;
    anchorList: Ref<IData[]>;
    anchorTargetRef: Ref<IData | undefined>;
    calcNavBarConfig: () => {
        navBarPos: string | undefined;
        navBarSysCss: import("@ibiz/model-core").ISysCss | undefined;
        navBarWidth: number | undefined;
        navBarStyle: string | undefined;
        navbarHeight: number | undefined;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEEditForm>;
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
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: PropType<IData>;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>;
