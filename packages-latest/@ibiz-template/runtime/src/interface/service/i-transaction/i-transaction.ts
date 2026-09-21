/**
 * 事务状态
 *
 * @author chitanda
 * @date 2024-01-17 15:01:18
 * @export
 * @interface ITransactionState
 */
export interface ITransactionState {
  /**
   * 是否在事务中
   *
   * @author chitanda
   * @date 2024-01-17 15:01:24
   * @type {boolean}
   */
  isOpen: boolean;
  /**
   * 当前事务是否有变更，如果有变更，提交事务时会触发数据更新并且不可以直接关闭事务
   *
   * @author chitanda
   * @date 2024-01-17 15:01:20
   * @type {boolean}
   */
  isChange: boolean;
}

/**
 * 本地包数据事务，用于界面域下简单数据事务
 *
 * @author chitanda
 * @date 2024-01-17 15:01:46
 * @export
 * @interface ITransaction
 */
export interface ITransaction {
  /**
   * 事务状态
   *
   * @author chitanda
   * @date 2024-01-17 15:01:46
   * @type {ITransactionState}
   */
  readonly state: ITransactionState;

  /**
   * 开启事务
   *
   * @description 事务开启后，所有的数据操作都会被缓存，直到事务提交或者回滚
   * @author chitanda
   * @date 2024-01-17 15:01:46
   */
  open(): void;

  /**
   * 新增变更事务回调，事务提交时会按照添加顺序倒序执行
   *
   * @author chitanda
   * @date 2024-01-17 16:01:25
   * @param {string} id
   * @param {() => void} commit
   */
  change(id: string, commit: () => void): void;

  /**
   * 提交事务
   *
   * @author chitanda
   * @date 2024-01-17 15:01:05
   */
  commit(): void;

  /**
   * 回滚事务
   *
   * @description 回滚事务会清空所有变更，不会触发数据更新
   * @date 2024-01-17 15:01:05
   */
  rollback(): void;

  /**
   * 关闭事务
   *
   * @author chitanda
   * @date 2024-01-17 15:01:02
   */
  close(): void;
}
