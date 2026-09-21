/**
 * 查询条件基类
 *
 * @export
 * @abstract
 * @class PSModelCondBase
 */
export class PSModelCondBase {
    constructor() {
        this.strCondOp = null;
    }
    getCondOp() {
        return this.strCondOp;
    }
    setCondOp(strCondOp) {
        this.strCondOp = strCondOp;
    }
}
