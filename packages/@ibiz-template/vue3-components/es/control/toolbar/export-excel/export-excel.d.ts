import { IDETBUIActionItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import { IToolbarController } from '@ibiz-template/runtime';
import './export-excel.scss';
export declare const IBizExportExcel: import("vue").DefineComponent<{
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
    btnContent: {
        type: FunctionConstructor;
        required: true;
    };
    controller: {
        type: PropType<IToolbarController<import("@ibiz/model-core").IDEToolbar, import("@ibiz-template/runtime").IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    endPage: import("vue").Ref<number>;
    startPage: import("vue").Ref<number>;
    onCommand: (command: string, e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "exportExcel"[], "exportExcel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    btnContent: {
        type: FunctionConstructor;
        required: true;
    };
    controller: {
        type: PropType<IToolbarController<import("@ibiz/model-core").IDEToolbar, import("@ibiz-template/runtime").IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>>;
    };
}>> & {
    onExportExcel?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
