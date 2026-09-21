import { AppMenuController } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './custom-menu-design.scss';
/**
 * 处理菜单自定义配置
 *
 * @param {AppMenuController} c
 * @param {IData[]} items
 * @return {*}
 */
export declare const MenuDesign: import("vue").DefineComponent<{
    controller: {
        type: PropType<AppMenuController>;
        required: true;
    };
    menus: {
        type: PropType<IData[]>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: AppMenuController;
    configs: import("vue").Ref<IData[]>;
    visible: import("vue").Ref<boolean>;
    loading: import("vue").Ref<boolean>;
    onReset: () => Promise<void>;
    renderContent: () => JSX.Element;
    renderHeader: () => JSX.Element;
    onSave: () => Promise<void>;
    openDesign: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("reset" | "saved")[], "reset" | "saved", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<AppMenuController>;
        required: true;
    };
    menus: {
        type: PropType<IData[]>;
        required: true;
    };
}>> & {
    onReset?: ((...args: any[]) => any) | undefined;
    onSaved?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
