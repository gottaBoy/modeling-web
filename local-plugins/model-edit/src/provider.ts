import { h } from 'vue';
import {
  UIActionProviderBase, SysUIActionTag, calcDeCodeNameById, convertNavData, formatMultiData,
} from '@ibiz-template/runtime';
import type { IUILogicParams, IUIActionResult } from '@ibiz-template/runtime';
import type { IAppDEUIAction } from '@ibiz/model-core';
import { ModelEditView } from './view';

const cancelled = (): IUIActionResult => ({ cancel: true, refresh: false, closeView: false });

export class ModelEditProvider extends UIActionProviderBase {
  async execAction(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult> {
    const { context, params, view, data } = args;
    const readonly = action.uiactionParamJO?.readonly === 'true' || action.uiactionParamJO?.readonly === true;
    if (['MULTIKEY', 'MULTIDATA'].includes(action.actionTarget!) && data.length > 1) {
      ibiz.message.error('Select one model to edit.');
      return cancelled();
    }
    const sourceSession = view.context.srfsessionid;
    const sourceDomain = sourceSession ? ibiz.uiDomainManager.get(sourceSession) : undefined;
    if (!readonly && sourceDomain?.dataModification) {
      try {
        const result = await view.call(SysUIActionTag.SAVE);
        if ((!result && result !== null) || sourceDomain.dataModification) return cancelled();
      } catch {
        ibiz.message.error('Save the current view before editing its model.');
        return cancelled();
      }
    }
    const resultContext = context.clone();
    let domainId: string | undefined;
    let overlay: ReturnType<typeof ibiz.overlay.createDrawer> | undefined;
    try {
      const entityId = view.model.appDataEntityId;
      if (!entityId) throw new Error('Missing entity.');
      const contexts = [...(action.navigateContexts || [])];
      const deName = calcDeCodeNameById(entityId);
      if (deName && action.actionTarget !== 'NONE') {
        contexts.unshift({ key: deName, value: 'srfkey', rawValue: false });
      }
      Object.assign(resultContext, convertNavData(contexts, data[0] || {}, params, context));
      const configuredParams = convertNavData(
        action.navigateParams,
        ['MULTIKEY', 'MULTIDATA'].includes(action.actionTarget!) && data.length > 0
          ? formatMultiData(action.navigateParams, data)
          : data[0] || {},
        params, resultContext,
      );
      const resultParams = { ...params, ...configuredParams };
      const entity = await ibiz.hub.getAppDataEntity(entityId, view.model.appId);
      if (!entity?.codeName || !entity.id) throw new Error('Missing entity metadata.');
      const domain = ibiz.uiDomainManager.create(undefined, entity.id);
      domainId = domain.id;
      resultContext.srfsessionid = domain.id;
      overlay = ibiz.overlay.createDrawer(
        modal => h(ModelEditView, {
        modal, context: resultContext, params: resultParams, codeName: entity.codeName,
          caption: view.model.caption || action.caption || 'Model', readonly,
        }),
        undefined,
        { placement: 'top', showClose: false },
      );
      // Register before present: presentation or a quick dismissal can emit synchronously.
      const dismissed = overlay.onWillDismiss<{ ok?: boolean; params?: { isSave?: boolean } }>();
      await overlay.present();
      const result = await dismissed;
      return result?.ok === true && result.params?.isSave === true
        ? { refresh: true, refreshMode: 1, closeView: false }
        : { refresh: false, closeView: false };
    } catch {
      if (overlay) {
        try { await overlay.dismiss({ ok: false }); } catch { /* Cleanup still continues. */ }
      }
      ibiz.message.error('The model editor could not be opened.');
      return cancelled();
    } finally {
      if (domainId) ibiz.uiDomainManager.destroy(domainId);
      resultContext.destroy();
    }
  }
}
