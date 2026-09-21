/* eslint-disable no-shadow */
/**
 * 值操作
 * @author lxm
 * @date 2023-10-13 11:37:48
 * @export
 * @enum {number}
 */
export var ValueOP;
(function (ValueOP) {
    /**
     * 等于
     */
    ValueOP["EQ"] = "EQ";
    /**
     * 不等于
     */
    ValueOP["NOT_EQ"] = "NOTEQ";
    /**
     * 大于
     */
    ValueOP["GT"] = "GT";
    /**
     * 大于等于
     */
    ValueOP["GT_AND_EQ"] = "GTANDEQ";
    /**
     * 小于
     */
    ValueOP["LT"] = "LT";
    /**
     * 小于等于
     */
    ValueOP["LT_AND_EQ"] = "LTANDEQ";
    /**
     * 值为空
     */
    ValueOP["IS_NULL"] = "ISNULL";
    /**
     * 值不为空
     */
    ValueOP["IS_NOT_NULL"] = "ISNOTNULL";
    /**
     * 值在范围中
     */
    ValueOP["IN"] = "IN";
    /**
     * 值不在范围中
     */
    ValueOP["NOT_IN"] = "NOTIN";
    /**
     * 文本包含
     */
    ValueOP["LIKE"] = "LIKE";
    /**
     * 文本左包含
     */
    ValueOP["LIFT_LIKE"] = "LIFTLIKE";
    /**
     * 文本右包含
     */
    ValueOP["RIGHT_LIKE"] = "RIGHT_LIKE";
    /**
     * 子数据（递归）
     */
    ValueOP["CHILD_OF"] = "CHILDOF";
    /**
     * 自定义文本包含
     */
    ValueOP["USER_LIKE"] = "USERLIKE";
    /**
     * 位与操作（BitAnd）(仅限整数形）
     */
    ValueOP["BIT_AND"] = "BITAND";
    /**
     * 存在引用数据
     */
    ValueOP["EXISTS"] = "EXISTS";
    /**
     * 不存在引用数据
     */
    ValueOP["NOT_EXISTS"] = "NOTEXISTS";
})(ValueOP || (ValueOP = {}));
