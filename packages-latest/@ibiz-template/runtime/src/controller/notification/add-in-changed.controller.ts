import { IPortalMessage } from '@ibiz-template/core';
import { debounce } from 'lodash-es';
import { IAddInChangedController } from '../../interface';

/**
 * 添加变更消息控制器
 *
 * @export
 * @class AddInChangedController
 * @implements {IAddInChangedController}
 */
export class AddInChangedController implements IAddInChangedController {
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof AddInChangedController
   */
  async init(): Promise<void> {
    this.listenMqtt();
  }

  /**
   * 显示添加变更消息
   *
   * @author tony001
   * @date 2025-01-10 10:01:12
   * @param {IPortalMessage} msg
   * @return {*}  {Promise<void>}
   */
  async showAddInChanged(msg: IPortalMessage): Promise<void> {
    if (msg.subtype !== 'ADDINCHANGED') {
      return;
    }
    ibiz.notice.showAddInChangedNotice({});
  }

  /**
   * 监听Mqtt消息
   *
   * @protected
   * @memberof AddInChangedController
   */
  protected listenMqtt(): void {
    if (ibiz.env.isMob) return;
    const debounceShowAddInChanged = debounce(
      (msg: IPortalMessage) => {
        this.showAddInChanged(msg);
      },
      2000,
      {
        trailing: true,
      },
    );
    ibiz.mc.command.addInChanged.on(async (msg: IPortalMessage) => {
      ibiz.log.debug('mqtt addinchanged: ', msg);
      debounceShowAddInChanged(msg);
    });
  }
}
