import './pagination.scss';
export declare const IBizPagination: import("vue").DefineComponent<{
    total: {
        type: NumberConstructor;
        required: true;
    };
    curPage: {
        type: NumberConstructor;
        required: true;
    };
    size: {
        type: NumberConstructor;
        required: true;
    };
    totalPages: {
        type: NumberConstructor;
        required: false;
    };
    popperClass: {
        type: StringConstructor;
        required: false;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    start: import("vue").ComputedRef<number>;
    end: import("vue").ComputedRef<number>;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    pageRefresh: () => void;
    inputChange: (event: MouseEvent) => void;
    calcTotalPages: import("vue").ComputedRef<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "pageSizeChange" | "pageRefresh")[], "change" | "pageSizeChange" | "pageRefresh", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    total: {
        type: NumberConstructor;
        required: true;
    };
    curPage: {
        type: NumberConstructor;
        required: true;
    };
    size: {
        type: NumberConstructor;
        required: true;
    };
    totalPages: {
        type: NumberConstructor;
        required: false;
    };
    popperClass: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onPageSizeChange?: ((...args: any[]) => any) | undefined;
    onPageRefresh?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
