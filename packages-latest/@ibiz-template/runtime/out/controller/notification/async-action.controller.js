import { QXEvent } from 'qx-util';
import { clone } from 'ramda';
import { isNil, isNumber } from 'lodash-es';
import dayjs from 'dayjs';
import { AsyncActionService } from '../../service';
export class AsyncActionController {
    constructor() {
        this.evt = new QXEvent();
        this.total = 0;
        this.actions = [];
        /**
         * 正在处理中的数量
         * @author lxm
         * @date 2024-01-25 04:51:18
         * @type {number}
         */
        this.doingNum = 0;
        /**
         * 结束的状态值集合
         * @author lxm
         * @date 2024-01-25 05:08:26
         * @protected
         */
        this.finishedStates = [30, 40];
        /**
         * 请求服务
         * @author lxm
         * @date 2024-01-25 04:50:12
         * @protected
         */
        this.service = new AsyncActionService();
    }
    async init() {
        this.listenMessage();
    }
    /**
     * 监听全局的实时消息
     * @author lxm
     * @date 2024-01-25 04:47:36
     */
    listenMessage() {
        ibiz.mc.command.asyncAction.on(async (msg) => {
            if (!msg.data || msg.subtype !== 'ASYNCACTION') {
                return;
            }
            // 异步交谈补全操作拦截,不做异步消息通用处理
            if (msg.data.actiontype &&
                msg.data.actiontype === 'ASYNCCHATCOMPLETION') {
                return;
            }
            const asyncAction = this.formatAsyncAction(msg.data);
            const findIndex = this.actions.findIndex(item => item.asyncacitonid === asyncAction.asyncacitonid);
            if (findIndex === -1) {
                this.add(asyncAction);
            }
            else {
                this.update(asyncAction);
            }
        });
    }
    /**
     * 格式化数据
     * @author lxm
     * @date 2024-01-25 05:03:47
     * @protected
     * @param {IPortalAsyncAction} data
     * @return {*}  {IPortalAsyncAction}
     */
    formatAsyncAction(data) {
        // 处理时间日期为毫秒值时，转换成字符串。
        const dateFields = [
            'begintime',
            'endtime',
            'createdate',
            'updatedate',
        ];
        dateFields.forEach(key => {
            if (isNumber(data[key])) {
                data[key] = dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss');
            }
        });
        if (!isNil(data.actionresult)) {
            try {
                const json = JSON.parse(data.actionresult);
                data.actionresult = json;
            }
            catch (error) {
                // 不是对象类型就是字符串。
            }
        }
        if (!isNil(data.completionrate)) {
            const num = Number(data.completionrate);
            if (Number.isNaN(num)) {
                data.completionrate = undefined;
            }
            else {
                data.completionrate = num;
            }
        }
        return data;
    }
    /**
     * 添加一条新消息
     * @author lxm
     * @date 2024-01-25 04:58:37
     * @protected
     * @param {IPortalAsyncAction} action
     */
    add(action) {
        this.actions.unshift(action);
        // 非结束状态的消息加一
        if (!this.finishedStates.includes(action.actionstate)) {
            this.doingNum += 1;
            if (ibiz.config.common.enableAsyncActionNotice) {
                ibiz.notice.showDoingNotice({ num: this.doingNum });
            }
        }
        else {
            this.noticeResult(action);
        }
        this.evt.emit('add', clone(action));
        this.evt.emit('dataChange');
    }
    /**
     * 添加一条新消息
     * @author lxm
     * @date 2024-01-25 04:58:37
     * @protected
     * @param {IPortalAsyncAction} action
     */
    update(action) {
        const index = this.actions.findIndex(item => item.asyncacitonid === action.asyncacitonid);
        this.actions.splice(index, 1, action);
        // 执行结束的减一
        if (this.finishedStates.includes(action.actionstate)) {
            this.doingNum -= 1;
            if (this.doingNum <= 0) {
                if (ibiz.config.common.enableAsyncActionNotice) {
                    ibiz.notice.closeDoingNotice();
                }
            }
            this.noticeResult(action);
        }
        this.evt.emit('change', clone(action));
        this.evt.emit('dataChange');
    }
    noticeResult(action) {
        if (ibiz.config.common.enableAsyncActionNotice) {
            ibiz.notice.showAsyncAction(action);
        }
    }
}
