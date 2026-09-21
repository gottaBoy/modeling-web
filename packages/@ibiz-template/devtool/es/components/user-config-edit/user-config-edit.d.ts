import { PropType } from 'vue';
import './user-config-edit.scss';
import { DevToolConfig } from '../../controller/dev-tool-config';
export declare const UserConfigEdit: import("vue").DefineComponent<{
    userConfig: {
        type: PropType<Partial<DevToolConfig>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    formData: {
        containerId?: string | undefined;
        configStorageKey?: string | undefined;
        studioBaseUrl?: string | undefined;
        triggerButtonCode?: string | undefined;
        modelPreviewWidth?: number | undefined;
        logLevel?: import("loglevel").LogLevelDesc | undefined;
        v9Mode?: boolean | undefined;
    };
    changeValue: (event: Event) => void;
    changeMode: (event: Event) => void;
    isFocus: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_data: Partial<DevToolConfig>) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    userConfig: {
        type: PropType<Partial<DevToolConfig>>;
        required: true;
    };
}>> & {
    onChange?: ((_data: Partial<DevToolConfig>) => any) | undefined;
}, {}, {}>;
export default UserConfigEdit;
