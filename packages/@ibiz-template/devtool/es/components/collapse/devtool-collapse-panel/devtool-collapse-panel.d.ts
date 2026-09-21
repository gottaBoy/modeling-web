import './devtool-collapse-panel.scss';
export declare const DevToolCollapsePanel: import("vue").DefineComponent<{
    title: StringConstructor;
    name: StringConstructor;
    hiddenArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    transitionWrap: import("vue").Ref<any>;
    height: import("vue").Ref<number>;
    handleHeaderClick: (event: MouseEvent) => void;
    isOpen: import("vue").Ref<boolean>;
    renderSvg: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    name: StringConstructor;
    hiddenArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    hiddenArrow: boolean;
}, {}>;
export default DevToolCollapsePanel;
