import { IAppView } from '@ibiz/model-core';
import { QXEvent } from 'qx-util';
import { IViewController, IViewEvent, IViewStack, IViewStackEvent, IViewState } from '../../interface';
/**
 * 视图堆栈
 *
 * @author chitanda
 * @date 2024-01-18 10:01:47
 * @export
 * @class ViewStack
 */
export declare class ViewStack implements IViewStack {
    private stackMap;
    private stack;
    private activeStack;
    evt: QXEvent<IViewStackEvent>;
    add(id: string, view: IViewController<IAppView, IViewState, IViewEvent>): void;
    remove(id: string): void;
    getActives(): IViewController[];
    active(id: string): void;
    deactivate(id: string): void;
    /**
     * 获取视图堆栈里的视图控制器
     * @author lxm
     * @date 2024-04-01 01:15:52
     * @param {string} id
     * @return {*}  {(IViewController | undefined)}
     */
    getView(id: string): IViewController | undefined;
    /**
     * @description 根据视图codeName获取视图信息
     * @param {string} codeName
     * @return {*}  {(IViewController | undefined)}
     * @memberof ViewStack
     */
    getViewByCodeName(codeName: string): IViewController | undefined;
    /**
     * 重新计算激活视图堆栈
     *
     * @author chitanda
     * @date 2024-01-18 14:01:23
     * @protected
     */
    protected recalculateActiveStack(): void;
}
//# sourceMappingURL=view-stack.d.ts.map