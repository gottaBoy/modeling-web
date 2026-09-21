import { IDEToolbar } from '@ibiz/model-core';
import { IToolbarEvent } from '../../event';
import { IExtraButton, IToolbarState } from '../../state';
import { IControlController } from './i-control.controller';
import { IToolbarItemProvider } from '../../../provider';
import { AppCounter } from '../../../../service';
/**
 * 工具栏控制器
 * @author lxm
 * @date 2023-05-04 02:59:16
 * @export
 * @interface IToolbarController
 * @extends {IControlController}
 */
export interface IToolbarController<T extends IDEToolbar = IDEToolbar, S extends IToolbarState = IToolbarState, E extends IToolbarEvent = IToolbarEvent> extends IControlController<T, S, E> {
    /**
     * 根据数据计算工具栏权限和状态
     * @author lxm
     * @date 2023-03-28 07:27:34
     * @param {IData} [data] 实体数据
     * @param {string} [appDeId] 实体标识
     */
    calcButtonState(data?: IData, appDeId?: string): Promise<void>;
    /**
     * 设置额外的按钮（可多次调用会累加）
     * @author lxm
     * @date 2023-06-09 06:47:17
     * @param {('before' | 'after' | number)} position
     * @param {IExtraButtons[]} buttons
     */
    setExtraButtons(position: 'before' | 'after' | number, buttons: IExtraButton[]): void;
    /**
     * 清除所有设置的额外按钮
     * @author lxm
     * @date 2023-06-19 07:03:33
     * @param {('before' | 'after' | number)} [position] 清除指定位置的额外按钮，为空的时候清空所有
     */
    clearExtraButtons(position?: 'before' | 'after' | number): void;
    /**
     * 工具栏项适配器集合
     *
     * @author zhanghengfeng
     * @date 2024-05-15 18:05:40
     * @type {{ [key: string]: IToolbarItemProvider }}
     */
    itemProviders: {
        [key: string]: IToolbarItemProvider;
    };
    /**
     * 计数器对象
     * @author ljx
     * @date 2024-12-11 17:12:35
     * @type {AppCounter}
     */
    counter?: AppCounter;
}
//# sourceMappingURL=i-toolbar.controller.d.ts.map