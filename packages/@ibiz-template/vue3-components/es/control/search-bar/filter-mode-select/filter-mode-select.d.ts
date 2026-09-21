import { ValueOP } from '@ibiz-template/runtime';
export declare const FilterModeSelect: import("vue").DefineComponent<{
    value: StringConstructor;
    modes: {
        (arrayLength: number): string[];
        (...items: string[]): string[];
        new (arrayLength: number): string[];
        new (...items: string[]): string[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    disabled: BooleanConstructor;
}, {
    availableModes: import("vue").ComputedRef<readonly [{
        readonly valueOP: ValueOP.EQ;
        readonly label: "等于(=)";
    }, {
        readonly valueOP: ValueOP.NOT_EQ;
        readonly label: "不等于(<>)";
    }, {
        readonly valueOP: ValueOP.GT;
        readonly label: "大于(>)";
    }, {
        readonly valueOP: ValueOP.GT_AND_EQ;
        readonly label: "大于等于(>=)";
    }, {
        readonly valueOP: ValueOP.LT;
        readonly label: "小于(<)";
    }, {
        readonly valueOP: ValueOP.LT_AND_EQ;
        readonly label: "小于等于(<=)";
    }, {
        readonly valueOP: ValueOP.IS_NULL;
        readonly label: "值为空(Nil)";
    }, {
        readonly valueOP: ValueOP.IS_NOT_NULL;
        readonly label: "值不为空(NotNil)";
    }, {
        readonly valueOP: ValueOP.IN;
        readonly label: "值在范围中(In)";
    }, {
        readonly valueOP: ValueOP.NOT_IN;
        readonly label: "值不在范围中(NotIn)";
    }, {
        readonly valueOP: ValueOP.LIKE;
        readonly label: "文本包含(%)";
    }, {
        readonly valueOP: ValueOP.LIFT_LIKE;
        readonly label: "文本左包含(%#)";
    }, {
        readonly valueOP: ValueOP.RIGHT_LIKE;
        readonly label: "文本右包含(#%)";
    }, {
        readonly valueOP: ValueOP.EXISTS;
        readonly label: "存在(EXISTS)";
    }, {
        readonly valueOP: ValueOP.NOT_EXISTS;
        readonly label: "不存在(NOTEXISTS)";
    }] | ({
        readonly valueOP: ValueOP.EQ;
        readonly label: "等于(=)";
    } | {
        readonly valueOP: ValueOP.NOT_EQ;
        readonly label: "不等于(<>)";
    } | {
        readonly valueOP: ValueOP.GT;
        readonly label: "大于(>)";
    } | {
        readonly valueOP: ValueOP.GT_AND_EQ;
        readonly label: "大于等于(>=)";
    } | {
        readonly valueOP: ValueOP.LT;
        readonly label: "小于(<)";
    } | {
        readonly valueOP: ValueOP.LT_AND_EQ;
        readonly label: "小于等于(<=)";
    } | {
        readonly valueOP: ValueOP.IS_NULL;
        readonly label: "值为空(Nil)";
    } | {
        readonly valueOP: ValueOP.IS_NOT_NULL;
        readonly label: "值不为空(NotNil)";
    } | {
        readonly valueOP: ValueOP.IN;
        readonly label: "值在范围中(In)";
    } | {
        readonly valueOP: ValueOP.NOT_IN;
        readonly label: "值不在范围中(NotIn)";
    } | {
        readonly valueOP: ValueOP.LIKE;
        readonly label: "文本包含(%)";
    } | {
        readonly valueOP: ValueOP.LIFT_LIKE;
        readonly label: "文本左包含(%#)";
    } | {
        readonly valueOP: ValueOP.RIGHT_LIKE;
        readonly label: "文本右包含(#%)";
    } | {
        readonly valueOP: ValueOP.EXISTS;
        readonly label: "存在(EXISTS)";
    } | {
        readonly valueOP: ValueOP.NOT_EXISTS;
        readonly label: "不存在(NOTEXISTS)";
    })[]>;
    onChange: (value: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_mode: string) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    modes: {
        (arrayLength: number): string[];
        (...items: string[]): string[];
        new (arrayLength: number): string[];
        new (...items: string[]): string[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    disabled: BooleanConstructor;
}>> & {
    onChange?: ((_mode: string) => any) | undefined;
}, {
    disabled: boolean;
}, {}>;
