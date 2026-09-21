import { QXEvent } from 'qx-util';
/**
 * 视图堆栈
 *
 * @author chitanda
 * @date 2024-01-18 10:01:47
 * @export
 * @class ViewStack
 */
export class ViewStack {
    constructor() {
        this.stackMap = new Map();
        this.stack = [];
        this.activeStack = [];
        this.evt = new QXEvent();
    }
    add(id, view) {
        this.stack.push(view);
        this.stackMap.set(id, view);
        this.recalculateActiveStack();
        this.evt.emit('add', view);
        this.evt.emit('change', { type: 'add', view });
    }
    remove(id) {
        const view = this.stackMap.get(id);
        if (view) {
            this.stack.splice(this.stack.indexOf(view), 1);
            this.stackMap.delete(id);
            this.recalculateActiveStack();
            this.evt.emit('remove', view);
            this.evt.emit('change', { type: 'remove', view });
        }
    }
    getActives() {
        return this.activeStack;
    }
    active(id) {
        const view = this.stackMap.get(id);
        if (view) {
            this.recalculateActiveStack();
            this.evt.emit('active', view);
            this.evt.emit('change', { type: 'active', view });
        }
    }
    deactivate(id) {
        const view = this.stackMap.get(id);
        if (view) {
            this.recalculateActiveStack();
            this.evt.emit('deactivate', view);
            this.evt.emit('change', { type: 'deactivate', view });
        }
    }
    /**
     * 获取视图堆栈里的视图控制器
     * @author lxm
     * @date 2024-04-01 01:15:52
     * @param {string} id
     * @return {*}  {(IViewController | undefined)}
     */
    getView(id) {
        return this.stackMap.get(id);
    }
    /**
     * @description 根据视图codeName获取视图信息
     * @param {string} codeName
     * @return {*}  {(IViewController | undefined)}
     * @memberof ViewStack
     */
    getViewByCodeName(codeName) {
        return this.stack.find(x => { var _a; return ((_a = x.model.codeName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === codeName.toLowerCase(); });
    }
    /**
     * 重新计算激活视图堆栈
     *
     * @author chitanda
     * @date 2024-01-18 14:01:23
     * @protected
     */
    recalculateActiveStack() {
        this.activeStack = this.stack.filter(item => item.isActive === true);
    }
}
