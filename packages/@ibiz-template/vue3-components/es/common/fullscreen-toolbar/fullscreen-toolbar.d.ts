import './fullscreen-toolbar.scss';
export declare const IBizFullscreenToolbar: import("vue").DefineComponent<{}, {
    ns: import("@ibiz-template/core").Namespace;
    laserPointerSvg: () => JSX.Element;
    alarmClockSvg: () => JSX.Element;
    compressArrowsSvg: () => JSX.Element;
    laserPointerClick: () => void;
    alarmClockClick: () => void;
    compressArrowsClick: () => void;
    laserPointerCanvas: import("vue").Ref<any>;
    isLaserEnabled: import("vue").Ref<boolean>;
    editorRef: import("vue").Ref<any>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
