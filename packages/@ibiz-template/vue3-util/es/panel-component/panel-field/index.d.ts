export * from './panel-field.controller';
export declare const IBizPanelField: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelField>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-field.controller").PanelFieldController;
        required: true;
    };
    attrs: {
        type: import("vue").PropType<IData>;
        require: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    onValueChange: (val: unknown, name?: string | undefined) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelField>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-field.controller").PanelFieldController;
        required: true;
    };
    attrs: {
        type: import("vue").PropType<IData>;
        require: boolean;
    };
}>>, {}, {}>>;
export default IBizPanelField;
//# sourceMappingURL=index.d.ts.map