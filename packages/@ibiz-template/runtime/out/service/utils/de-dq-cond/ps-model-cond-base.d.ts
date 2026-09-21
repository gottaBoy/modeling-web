/**
 * 查询条件基类
 *
 * @export
 * @abstract
 * @class PSModelCondBase
 */
export declare abstract class PSModelCondBase {
    private strCondOp;
    getCondOp(): string;
    setCondOp(strCondOp: string): void;
    abstract parse(array: unknown[]): void;
}
//# sourceMappingURL=ps-model-cond-base.d.ts.map