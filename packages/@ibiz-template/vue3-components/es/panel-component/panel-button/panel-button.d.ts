import { IPanelButton } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelButtonController } from './panel-button.controller';
import './panel-button.scss';
export declare const PanelButton: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelButton>;
        required: true;
    };
    controller: {
        type: typeof PanelButtonController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isText: boolean;
    captionText: import("vue").ComputedRef<any>;
    buttonType: import("vue").ComputedRef<"success" | "warning" | "info" | "primary" | "danger" | null>;
    showCaption: boolean | undefined;
    sysImage: import("@ibiz/model-core").ISysImage | undefined;
    codeName: string | undefined;
    state: import("./panel-button.state").PanelButtonState;
    tooltip: string | undefined;
    handleButtonClick: (event: MouseEvent) => Promise<void>;
    buttonCssStyle: string | undefined;
    tempStyle: import("vue").Ref<string>;
    itemStyle: string | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelButton>;
        required: true;
    };
    controller: {
        type: typeof PanelButtonController;
        required: true;
    };
}>>, {}, {}>;
export default PanelButton;
