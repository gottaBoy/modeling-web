import { ITransaction, ITransactionState } from '../../interface';

/**
 * 界面域下简单数据事务
 *
 * @author chitanda
 * @date 2024-01-17 15:01:39
 * @export
 * @class Transaction
 */
export class Transaction implements ITransaction {
  /**
   * 待提交队列
   *
   * @author chitanda
   * @date 2024-01-17 15:01:38
   * @protected
   */
  protected commitQueue: Map<string, () => void> = new Map();

  /**
   * 事务状态
   *
   * @author chitanda
   * @date 2024-01-17 15:01:45
   * @type {ITransactionState}
   */
  readonly state: ITransactionState = {
    isOpen: false,
    isChange: false,
  };

  /**
   * 开启事务
   *
   * @description 事务开启后，所有的数据操作都会被缓存，直到事务提交或者回滚
   * @author chitanda
   * @date 2024-01-17 15:01:46
   */
  open(): void {
    if (this.state.isOpen) {
      ibiz.log.warn(ibiz.i18n.t('runtime.utils.uiDomain.transactionOpen'));
      return;
    }
    this.state.isOpen = true;
  }

  /**
   * 新增变更事务回调，事务提交时会按照添加顺序倒序执行
   *
   * @author chitanda
   * @date 2024-01-17 16:01:50
   * @param {string} id 回调标识，用于去重。一个数据只能有一个回调
   * @param {() => void} commit
   */
  change(id: string, commit: () => void): void {
    this.state.isChange = true;
    this.commitQueue.set(id, commit);
  }

  /**
   * 提交事务
   *
   * @author chitanda
   * @date 2024-01-17 15:01:05
   */
  commit(): void {
    // 倒序提交
    const commitQueue = Array.from(this.commitQueue.values()).reverse();
    for (const commit of commitQueue) {
      commit();
    }
    this.commitQueue.clear();
    this.state.isChange = false;
  }

  /**
   * 回滚事务
   *
   * @author chitanda
   * @date 2024-01-17 19:01:43
   */
  rollback(): void {
    this.commitQueue.clear();
    this.state.isChange = false;
  }

  /**
   * 关闭事务
   *
   * @author chitanda
   * @date 2024-01-17 15:01:02
   */
  close(): void {
    if (this.state.isChange) {
      throw new Error(ibiz.i18n.t('runtime.utils.uiDomain.currentTransaction'));
    }
    this.state.isOpen = false;
  }
}
