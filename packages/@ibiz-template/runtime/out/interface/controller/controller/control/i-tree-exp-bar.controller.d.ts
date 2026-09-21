import { ITreeExpBar } from '@ibiz/model-core';
import { ITreeExpBarEvent } from '../../event';
import { ITreeExpBarState } from '../../state';
import { IExpBarControlController } from './i-exp-bar-control.controller';
/**
 * 树导航栏控制器
 *
 * @export
 * @interface ITreeExpBarController
 * @extends {IExpBarControlController<ITreeExpBar, ITreeExpBarState, ITreeExpBarEvent>}
 */
export interface ITreeExpBarController extends IExpBarControlController<ITreeExpBar, ITreeExpBarState, ITreeExpBarEvent> {
}
//# sourceMappingURL=i-tree-exp-bar.controller.d.ts.map