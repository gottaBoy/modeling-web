import { IAppDECustomView } from '@ibiz/model-core';
import {
  IMDCustomViewState,
  IViewController,
  IViewEvent,
} from '../../../interface';
import { ViewController } from './view.controller';
/**
 * @description 实体多数据自定义视图
 * @export
 * @class MDCustomViewController
 * @extends {ViewController<T, S, E>}
 * @implements {IViewController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export class MDCustomViewController<
    T extends IAppDECustomView = IAppDECustomView,
    S extends IMDCustomViewState = IMDCustomViewState,
    E extends IViewEvent = IViewEvent,
  >
  extends ViewController<T, S, E>
  implements IViewController<T, S, E>
{
  protected initState(): void {
    super.initState();
    this.state.xdatacontrolname = '';
  }
}
