import { IDETreeGridEx } from '@ibiz/model-core';
import { ITreeGridExEvent } from '../../event';
import { ITreeGridExState } from '../../state';
import { ITreeController } from './i-tree.controller';
import { IViewController } from '../view';
import { IApiTreeGridEXController } from '../../../api';
/**
 * 树表格(增强)部件控制器
 *
 * @author lxm
 * @date 2023-12-21 11:04:25
 * @export
 * @interface ITreeGridExController
 * @extends {ITreeController<T, S, E>}
 */
export interface ITreeGridExController<T extends IDETreeGridEx = IDETreeGridEx, S extends ITreeGridExState = ITreeGridExState, E extends ITreeGridExEvent = ITreeGridExEvent> extends ITreeController<T, S, E>, IApiTreeGridEXController<T, S> {
    /**
     * @description 视图控制器
     * @type {IViewController}
     * @memberof ITreeGridExController
     */
    view: IViewController;
}
//# sourceMappingURL=i-tree-grid-ex.controller.d.ts.map