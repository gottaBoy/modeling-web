/// <reference types="node" />
import './fullscreen-toolbar-alarm-clock.scss';
export declare const IBizAlarmClock: import("vue").DefineComponent<{}, {
    ns: import("@ibiz-template/core").Namespace;
    close: () => void;
    closeSvg: () => JSX.Element;
    formattedTime: import("vue").Ref<string>;
    timerInterval: string | number | NodeJS.Timeout | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
