/**
 * 模型条件引擎辅助对象
 *
 * @export
 * @abstract
 * @class PSModelCondEngineBase
 */
export class PSModelCondEngineBase {
    constructor() {
        /**
         * 根分组条件
         *
         * @private
         * @type {(PSModelGroupCondBase | null)}
         * @memberof PSModelCondEngineBase
         */
        this.psModelGroupCondBase = null;
    }
    /**
     * 解析条件
     *
     * @param {IData[]} obj
     * @memberof PSModelCondEngineBase
     */
    parse(obj) {
        if (obj instanceof Array) {
            const psModelGroupCondBase = this.createPSModelGroupCond();
            psModelGroupCondBase.parse(obj);
            this.psModelGroupCondBase = psModelGroupCondBase;
        }
    }
    /**
     * 测试项
     *
     * @protected
     * @param {string} strCondOp
     * @param {*} objValue
     * @param {*} objCondValue
     * @return {*}  {boolean}
     * @memberof PSModelCondEngineBase
     */
    testSingleCond(strCondOp, objValue, objCondValue) {
        try {
            if ("ISNULL" /* CondType.CONDOP_ISNULL */ === strCondOp) {
                return objValue == null;
            }
            if ("ISNOTNULL" /* CondType.CONDOP_ISNOTNULL */ === strCondOp) {
                return objValue != null;
            }
            if ("EQ" /* CondType.CONDOP_EQ */ === strCondOp ||
                "ABSEQ" /* CondType.CONDOP_ABSEQ */ === strCondOp ||
                "GT" /* CondType.CONDOP_GT */ === strCondOp ||
                "GTANDEQ" /* CondType.CONDOP_GTANDEQ */ === strCondOp ||
                "LT" /* CondType.CONDOP_LT */ === strCondOp ||
                "LTANDEQ" /* CondType.CONDOP_LTANDEQ */ === strCondOp ||
                "NOTEQ" /* CondType.CONDOP_NOTEQ */ === strCondOp) {
                // 特殊处理，如果值为空，直接返回false
                if (objValue == null || objCondValue == null) {
                    return false;
                }
                // 大小比较
                let nRet = -1;
                // eslint-disable-next-line eqeqeq
                if (objValue == objCondValue) {
                    nRet = 0;
                }
                else if (objValue > objCondValue) {
                    nRet = 1;
                }
                if ("EQ" /* CondType.CONDOP_EQ */ === strCondOp ||
                    "ABSEQ" /* CondType.CONDOP_ABSEQ */ === strCondOp) {
                    return nRet === 0;
                }
                if ("GT" /* CondType.CONDOP_GT */ === strCondOp) {
                    return nRet > 0;
                }
                if ("GTANDEQ" /* CondType.CONDOP_GTANDEQ */ === strCondOp) {
                    return nRet >= 0;
                }
                if ("LT" /* CondType.CONDOP_LT */ === strCondOp) {
                    return nRet < 0;
                }
                if ("LTANDEQ" /* CondType.CONDOP_LTANDEQ */ === strCondOp) {
                    return nRet <= 0;
                }
                if ("NOTEQ" /* CondType.CONDOP_NOTEQ */ === strCondOp) {
                    return nRet !== 0;
                }
            }
            if ("LIKE" /* CondType.CONDOP_LIKE */ === strCondOp) {
                if (objValue != null && objCondValue != null) {
                    return (objValue
                        .toString()
                        .toUpperCase()
                        .indexOf(objCondValue.toString().toUpperCase()) !== -1);
                }
                return false;
            }
            if ("LEFTLIKE" /* CondType.CONDOP_LEFTLIKE */ === strCondOp) {
                if (objValue != null && objCondValue != null) {
                    return (objValue
                        .toString()
                        .toUpperCase()
                        .indexOf(objCondValue.toString().toUpperCase()) === 0);
                }
                return false;
            }
        }
        catch (err) {
            ibiz.log.error(err);
        }
        return false;
    }
    /**
     * 获取根分组条件
     *
     * @return {*}  {PSModelGroupCondBase}
     * @memberof PSModelCondEngineBase
     */
    getPSModelGroupCondBase() {
        return this.psModelGroupCondBase;
    }
}
