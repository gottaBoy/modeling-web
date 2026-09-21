import { IDETBUIActionItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import { IToolbarController } from '@ibiz-template/runtime';
import './short-cut-button.scss';
export declare const IBizShortCutButton: import("vue").DefineComponent<{
    mode: {
        type: StringConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    item: {
        type: PropType<IDETBUIActionItem>;
        required: true;
    };
    controller: {
        type: PropType<IToolbarController<import("@ibiz/model-core").IDEToolbar, import("@ibiz-template/runtime").IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    ns2: import("@ibiz-template/core").Namespace;
    buttonState: import("vue").ComputedRef<any>;
    buttonType: string | undefined;
    isShortCut: import("vue").ComputedRef<boolean>;
    onClick: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: StringConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    item: {
        type: PropType<IDETBUIActionItem>;
        required: true;
    };
    controller: {
        type: PropType<IToolbarController<import("@ibiz/model-core").IDEToolbar, import("@ibiz-template/runtime").IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>>;
        required: true;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
