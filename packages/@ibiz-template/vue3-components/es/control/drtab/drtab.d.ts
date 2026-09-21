import { PropType } from 'vue';
import { IDEDRTab } from '@ibiz/model-core';
import { IControlProvider } from '@ibiz-template/runtime';
import { DRTabController } from './drtab.controller';
import './drtab.scss';
export declare const DRTabControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEDRTab>;
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
}, {
    c: DRTabController;
    ns: import("@ibiz-template/core").Namespace;
    controlRef: import("vue").Ref<any>;
    counterData: IData;
    visibleItems: import("vue").Ref<IData>;
    moreItems: import("vue").Ref<IData>;
    tabPosition: string;
    onTabChange: (key: string) => void;
    handleTabChange: () => void;
    renderDropdownList: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEDRTab>;
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
}>>, {
    params: IParams;
}, {}>;
