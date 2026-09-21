import './object-viewer.scss';
export declare const ObjectViewer: import("vue").DefineComponent<{
    obj: {
        type: ObjectConstructor;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    copy: (value: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    obj: {
        type: ObjectConstructor;
        required: true;
    };
}>>, {}, {}>;
