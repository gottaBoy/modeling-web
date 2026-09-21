export declare const IBizCarouselGrid: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDEGrid>;
        required: true;
    };
    context: {
        type: import('vue').PropType<IContext>;
        required: true;
    };
    params: {
        type: import('vue').PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import('vue').PropType<import('@ibiz-template/runtime').IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
    rowEditOpen: {
        type: BooleanConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: {
            (arrayLength: number): IData[];
            (...items: IData[]): IData[];
            new (arrayLength: number): IData[];
            new (...items: IData[]): IData[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import('./carousel-grid.controller').CarouselGridController;
    ns: Namespace;
    ns1: Namespace;
    tableRef: import('vue').Ref<any, any>;
    tableData: import('vue').Ref<IData, IData>;
    renderColumns: import('vue').Ref<import('@ibiz/model-core').IDEGridColumn[], import('@ibiz/model-core').IDEGridColumn[]>;
    allowRoll: import('vue').Ref<boolean, boolean>;
    rollStyle: import('vue').Ref<{}, {}>;
    renderTableColumn: (model: import('@ibiz/model-core').IDEGridColumn, index: number) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }> | null;
    onDbRowClick: (data: import('@ibiz-template/runtime').ControlVO) => void;
    onRowClick: (data: import('@ibiz-template/runtime').ControlVO, _column: IData, event: MouseEvent) => Promise<void>;
    onSelectionChange: (selection: import('@ibiz-template/runtime').ControlVO[]) => void;
    onSortChange: (opts: {
        _column: IData;
        prop: string;
        order: "ascending" | "descending";
    }) => void;
    handleRowClassName: ({ row }: {
        row: IData;
    }) => string;
    handleHeaderCellClassName: ({ _row, column, _rowIndex, _columnIndex, }: {
        _row: IData;
        column: IData;
        _rowIndex: number;
        _columnIndex: number;
    }) => string;
    renderNoData: () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }> | null;
    summaryMethod: ({ columns, }: {
        columns: import('element-plus/es/components/table/src/table-column/defaults').TableColumnCtx<IData>[];
        data: IData[];
    }) => string[];
    spanMethod: ({ row, column, rowIndex, columnIndex, }: {
        row: IData;
        column: IData;
        rowIndex: number;
        columnIndex: number;
    }) => any;
    headerDragend: (newWidth: number, oldWidth: number, column: IData) => void;
    handleResize: () => void;
    conputedGridData: (items: IData[]) => IData[];
    defaultSort: import('vue').Ref<IData, IData>;
    headerCssVars: IData;
    isLodeMoreDisabled: import('vue').ComputedRef<boolean>;
    infiniteScroll: import('vue').Ref<any, any>;
    infiniteScrollKey: import('vue').Ref<string, string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDEGrid>;
        required: true;
    };
    context: {
        type: import('vue').PropType<IContext>;
        required: true;
    };
    params: {
        type: import('vue').PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import('vue').PropType<import('@ibiz-template/runtime').IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
    rowEditOpen: {
        type: BooleanConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: {
            (arrayLength: number): IData[];
            (...items: IData[]): IData[];
            new (arrayLength: number): IData[];
            new (...items: IData[]): IData[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    mdctrlActiveMode: number;
    singleSelect: boolean;
    isSimple: boolean;
    loadDefault: boolean;
    rowEditOpen: boolean;
}, {}>>;
