import { AppMenuController } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import { CustomThemeController } from './custom-theme.controller';
import './custom-theme.scss';
export declare const CustomTheme: import("vue").DefineComponent<{
    controller: {
        type: PropType<AppMenuController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: CustomThemeController;
    showSaveAndShare: import("vue").ComputedRef<boolean>;
    handlePreview: () => Promise<void>;
    handleReset: () => Promise<void>;
    handleSave: () => Promise<void>;
    handleSaveAndShare: () => Promise<void>;
    handleResetAndShare: () => Promise<void>;
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<AppMenuController>;
        required: true;
    };
}>> & {}, {}, {}>;
