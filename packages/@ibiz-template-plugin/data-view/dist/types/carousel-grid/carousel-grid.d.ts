import { PropType, VNode } from 'vue';
import { IDEGrid, IDEGridColumn } from '@ibiz/model-core';
import { GridController, IControlProvider } from '@ibiz-template/runtime';
import { CarouselGridController } from './carousel-grid.controller';

export declare function renderColumn(c: GridController, model: IDEGridColumn, renderColumns: IDEGridColumn[], index: number): VNode | null;
export declare function renderChildColumn(c: GridController, model: IDEGridColumn, renderColumns: IDEGridColumn[], index: number): VNode | null;
export declare const CarouselGrid: import('vue').DefineComponent<{
    modelData: {
        type: PropType<IDEGrid>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
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
    c: CarouselGridController;
    ns: import('@ibiz-template/core').Namespace;
    ns1: import('@ibiz-template/core').Namespace;
    tableRef: import('vue').Ref<IData | undefined, IData | undefined>;
    tableData: import('vue').Ref<IData, IData>;
    renderColumns: import('vue').Ref<IDEGridColumn[], IDEGridColumn[]>;
    allowRoll: import('vue').Ref<boolean, boolean>;
    rollStyle: import('vue').Ref<{}, {}>;
    renderTableColumn: (model: IDEGridColumn, index: number) => VNode | null;
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
    renderNoData: () => VNode | null;
    summaryMethod: ({ columns, }: {
        columns: import('element-plus/es/components/table/src/table-column/defaults').TableColumnCtx<IData>[];
        data: IData[];
    }) => string[];
    spanMethod: ({ row, column, rowIndex, columnIndex, }: {
        row: IData;
        column: IData;
        rowIndex: number;
        columnIndex: number;
    }) => void | IData;
    headerDragend: (newWidth: number, oldWidth: number, column: IData) => void;
    handleResize: () => void;
    conputedGridData: (items: IData[]) => IData[];
    defaultSort: import('vue').Ref<IData, IData>;
    headerCssVars: IData;
    isLodeMoreDisabled: import('vue').ComputedRef<boolean>;
    infiniteScroll: import('vue').Ref<IData | undefined, IData | undefined>;
    infiniteScrollKey: import('vue').Ref<string, string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: PropType<IDEGrid>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
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
}, {}>;
