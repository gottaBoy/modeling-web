import { IMDControlController } from '../../controller';

/**
 * 记录导航工具类
 *
 * @author tony001
 * @date 2024-07-15 11:07:50
 * @export
 * @interface IRecordNavUtil
 */
export interface IRecordNavUtil {
  /**
   * 添加部件数据
   *
   * @author tony001
   * @date 2024-07-15 11:07:44
   * @param {string} id 部件标识，部件的ctrlId
   * @param {IMDControlController} ctrl
   */
  add(id: string, ctrl: IMDControlController): void;

  /**
   * 删除部件数据
   *
   * @author tony001
   * @date 2024-07-15 11:07:06
   * @param {string} id 部件标识，部件的ctrlId
   */
  remove(id: string): void;

  /**
   * 获取部件数据
   *
   * @author tony001
   * @date 2024-07-15 14:07:12
   * @param {string} id
   * @return {*}  {(IMDControlController | undefined)}
   */
  getCtrl(id: string): IMDControlController | undefined;

  /**
   * 获取第一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:25
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  getFirstRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;

  /**
   * 获取前一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:59
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  getPreviousRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;

  /**
   * 获取下一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:09
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  getNextRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;

  /**
   * 获取最后一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:18
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  getLastRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;
}
