import { IAppView } from '@ibiz/model-core';
import {
  IViewController,
  IViewEvent,
  IWFStepTraceViewState,
} from '../../../interface';
import { ViewController } from './view.controller';

export class WFStepTraceViewController<
    T extends IAppView = IAppView,
    S extends IWFStepTraceViewState = IWFStepTraceViewState,
    E extends IViewEvent = IViewEvent,
  >
  extends ViewController<T, S, E>
  implements IViewController<T, S, E>
{
  protected initState(): void {
    super.initState();
    this.state.historyData = null;
  }

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    const app = ibiz.hub.getApp(this.context.srfappid);
    const view = this.ctx.parent?.view;
    if (view && view.model.appDataEntityId) {
      const entityService = await app.deService.getService(
        view.context,
        view.model.appDataEntityId,
      );
      const params = Object.assign(this.context.clone(), this.params);
      const res = await entityService.wf.getWFHistory(params);
      if (res.data) {
        this.state.historyData = res.data;
      }
    }
  }
}
