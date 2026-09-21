/**
 * 值操作
 * @author lxm
 * @date 2023-10-13 11:37:48
 * @export
 * @enum {number}
 */
export declare enum ValueOP {
    /**
     * 等于
     */
    'EQ' = "EQ",
    /**
     * 不等于
     */
    'NOT_EQ' = "NOTEQ",
    /**
     * 大于
     */
    'GT' = "GT",
    /**
     * 大于等于
     */
    'GT_AND_EQ' = "GTANDEQ",
    /**
     * 小于
     */
    'LT' = "LT",
    /**
     * 小于等于
     */
    'LT_AND_EQ' = "LTANDEQ",
    /**
     * 值为空
     */
    'IS_NULL' = "ISNULL",
    /**
     * 值不为空
     */
    'IS_NOT_NULL' = "ISNOTNULL",
    /**
     * 值在范围中
     */
    'IN' = "IN",
    /**
     * 值不在范围中
     */
    'NOT_IN' = "NOTIN",
    /**
     * 文本包含
     */
    'LIKE' = "LIKE",
    /**
     * 文本左包含
     */
    'LIFT_LIKE' = "LIFTLIKE",
    /**
     * 文本右包含
     */
    'RIGHT_LIKE' = "RIGHT_LIKE",
    /**
     * 子数据（递归）
     */
    'CHILD_OF' = "CHILDOF",
    /**
     * 自定义文本包含
     */
    'USER_LIKE' = "USERLIKE",
    /**
     * 位与操作（BitAnd）(仅限整数形）
     */
    'BIT_AND' = "BITAND",
    /**
     * 存在引用数据
     */
    'EXISTS' = "EXISTS",
    /**
     * 不存在引用数据
     */
    'NOT_EXISTS' = "NOTEXISTS"
}
//# sourceMappingURL=value-op.d.ts.map