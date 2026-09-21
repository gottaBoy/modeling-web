/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-class-members */
import {
  IPopoverOptions,
  IOverlayPopoverContainer,
} from '@ibiz-template/runtime';
import { OverlayContainer } from '../overlay-container/overlay-container';

/**
 * 飘窗组件呈现容器
 *
 * @author chitanda
 * @date 2022-11-09 14:11:46
 * @export
 * @class OverlayPopoverContainer
 * @extends {OverlayContainer<IPopoverOptions>}
 * @implements {IOverlayPopoverContainer}
 */
export class OverlayPopoverContainer
  extends OverlayContainer<IPopoverOptions>
  implements IOverlayPopoverContainer
{
  present(): Promise<void>;

  present(target: HTMLElement): Promise<void>;

  present(target?: HTMLElement): Promise<void> {
    return this.modal.present(target);
  }
}
