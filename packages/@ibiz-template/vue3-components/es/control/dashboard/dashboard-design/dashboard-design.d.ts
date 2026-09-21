import { CustomDashboardController, DashboardController, IPortletController, IPortletProvider } from '@ibiz-template/runtime';
import { IDBPortletPart, ISysImage } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import './dashboard-design.scss';
interface IPortletList {
    type: string;
    portletId?: string;
    portletCodeName: string;
    portletName: string;
    portletImage?: ISysImage;
    groupCodeName: string;
    groupName: string;
    appCodeName: string;
    appName: string;
    dynamodelFlag?: number;
}
interface IList {
    type: string;
    name: string;
    children: IData[];
}
export declare const DashboardDesign: import("vue").DefineComponent<{
    dashboard: {
        type: PropType<DashboardController>;
        required: true;
    };
    customDashboard: {
        type: PropType<CustomDashboardController>;
        required: true;
    };
    isShowDesign: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    customC: CustomDashboardController;
    portlets: Ref<IPortletList[]>;
    list: Ref<IList[]>;
    groups: Ref<IData[]>;
    filterVal: Ref<string>;
    defaultOpens: import("vue").ComputedRef<string[]>;
    layoutModel: Ref<IData[]>;
    isLoading: Ref<boolean>;
    onReset: () => Promise<void>;
    onSave: () => Promise<void>;
    removeItem: (child: IData) => Promise<void>;
    addLayoutItem: (child: IPortletList) => Promise<void>;
    handleColNumberChange: (colNumber: number) => void;
    handleRolHChange: (rowH: number) => void;
    isDisabled: (child: IPortletList) => boolean;
    providers: Ref<{
        [key: string]: IPortletProvider;
    }>;
    portletControllers: Ref<{
        [key: string]: IPortletController;
    }>;
    maskSize: import("vue").ComputedRef<string>;
    designPanel: Ref<Element | null>;
    getPortletModelByCodeName: (tag: string) => IDBPortletPart | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("reset" | "saved")[], "reset" | "saved", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    dashboard: {
        type: PropType<DashboardController>;
        required: true;
    };
    customDashboard: {
        type: PropType<CustomDashboardController>;
        required: true;
    };
    isShowDesign: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onReset?: ((...args: any[]) => any) | undefined;
    onSaved?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export {};
