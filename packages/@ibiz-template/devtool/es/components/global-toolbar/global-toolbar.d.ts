import { PropType, Ref } from 'vue';
import './global-toolbar.scss';
import { LogLevelDesc } from 'loglevel';
import { CenterController } from '../../controller/center.controller';
export declare const GlobalToolbar: import("vue").DefineComponent<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onConfigEditClick: () => void;
    close: () => void;
    logLevels: Ref<LogLevelDesc[]>;
    logLevel: Ref<LogLevelDesc>;
    handleLevelChange: (value: LogLevelDesc) => void;
    dialog1: Ref<boolean>;
    hasClosed: (type: string) => void;
    changeData: Ref<{
        studioBaseUrl?: string | undefined;
        modelPreviewWidth?: number | undefined;
        logLevel?: LogLevelDesc | undefined;
    } | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}>>, {}, {}>;
