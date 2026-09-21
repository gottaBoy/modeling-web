/**
 * 查询条件基类
 *
 * @export
 * @abstract
 * @class PSModelCondBase
 */
export abstract class PSModelCondBase {
  private strCondOp: string | null = null;

  getCondOp(): string {
    return this.strCondOp!;
  }

  setCondOp(strCondOp: string): void {
    this.strCondOp = strCondOp;
  }

  abstract parse(array: unknown[]): void;
}
