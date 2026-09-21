import { debounce } from 'lodash-es';
/**
 * 添加变更消息控制器
 *
 * @export
 * @class AddInChangedController
 * @implements {IAddInChangedController}
 */
export class AddInChangedController {
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof AddInChangedController
     */
    async init() {
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
    async showAddInChanged(msg) {
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
    listenMqtt() {
        if (ibiz.env.isMob)
            return;
        const debounceShowAddInChanged = debounce((msg) => {
            this.showAddInChanged(msg);
        }, 2000, {
            trailing: true,
        });
        ibiz.mc.command.addInChanged.on(async (msg) => {
            ibiz.log.debug('mqtt addinchanged: ', msg);
            debounceShowAddInChanged(msg);
        });
    }
}
