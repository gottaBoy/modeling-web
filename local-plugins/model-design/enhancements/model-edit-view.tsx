import { computed, defineComponent, onUnmounted, PropType, reactive, ref } from 'vue';
import { IModal } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ModelEditDocument, parseModel, sameModel } from './model-edit-document';
import { modelEditText, ModelEditMessage } from './model-edit-messages';
import './model-edit-view.scss';

export default defineComponent({
  name: 'IBizModelEditView',
  props: {
    context: { type: Object as PropType<IContext>, default: () => ({}) },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modal: { type: Object as PropType<IModal> },
    caption: { type: String, default: '' },
    codeName: { type: String, required: true },
    readonly: { type: Boolean },
  },
  setup(props) {
    const ns = useNamespace('model-edit-view');
    const draft = reactive(new ModelEditDocument());
    const isSave = ref(false);
    const verifiedSave = ref(false);
    const loaded = ref(false);
    const loading = ref(false);
    const loadingText = ref('');
    const showChanges = ref(false);
    const error = ref('');
    let destroyed = false;
    let closing = false;
    const text = (key: ModelEditMessage): string => modelEditText(ibiz.i18n.getLang(), key);
    const value = computed({
      get: () => draft.value,
      set: (next: string) => {
        if (!destroyed && loaded.value && !loading.value && !props.readonly) draft.setText(next);
      },
    });
    const valid = computed(() => {
      try { parseModel(draft.value); return true; } catch { return false; }
    });
    const comparison = computed(() => {
      try { return draft.changes(); } catch { return { entries: [], truncated: false }; }
    });
    const fail = (key: ModelEditMessage): void => {
      if (destroyed) return;
      error.value = text(key);
      ibiz.message.error(error.value);
    };
    const serviceForModel = async () => {
      const entity = await ibiz.hub.getAppDataEntity(props.codeName, props.context.srfappid);
      if (destroyed) return;
      const key = entity.codeName?.toLowerCase();
      if (!entity.id || !key || !entity.keyAppDEFieldId ||
          !['string', 'number'].includes(typeof props.context[key]) || props.context[key] === '') {
        throw new Error('Incomplete model identity');
      }
      const service = await ibiz.hub.getApp(props.context.srfappid).deService.getService(props.context, entity.id);
      if (!destroyed) return { service, entity, key };
    };
    const exportModel = async (service: Awaited<ReturnType<typeof serviceForModel>>) => {
      if (!service || destroyed) return;
      const response = await service.service.exec('ExportModelV2', props.context, {}, props.params);
      if (destroyed) return;
      if (response.status !== 200) throw new Error('Model export failed');
      return parseModel(JSON.stringify(response.data?.model));
    };
    const confirmDiscard = async (): Promise<boolean> => {
      if (!draft.dirty) return true;
      return ibiz.confirm.warning({ title: text('discardTitle'), desc: text('discard') });
    };
    const shouldDismiss = async (context: { allowClose?: boolean }): Promise<void> => {
      if (context.allowClose === false) return;
      if (destroyed || loading.value || closing) { context.allowClose = false; return; }
      closing = true;
      try {
        if (!(await confirmDiscard()) || destroyed || loading.value) context.allowClose = false;
      } catch { context.allowClose = false; }
      finally { closing = false; }
    };
    const beforeDismiss = async (result: { ok?: boolean; params?: IParams }): Promise<void> => {
      result.params = { ...result.params, isSave: isSave.value };
      if (isSave.value) result.ok = true;
    };
    props.modal?.hooks?.shouldDismiss.tapPromise(shouldDismiss);
    props.modal?.hooks?.beforeDismiss.tapPromise(beforeDismiss);
    const closeView = async (): Promise<void> => {
      if (destroyed || loading.value || closing) return;
      try {
        if (props.modal?.hooks?.shouldDismiss) {
          await props.modal.dismiss({ ok: true, params: { isSave: isSave.value } });
        } else {
          closing = true;
          if (await confirmDiscard() && !destroyed) {
            await props.modal?.dismiss({ ok: true, params: { isSave: isSave.value } });
          }
        }
      } catch { fail('closeFailed'); }
      finally { closing = false; }
    };
    const load = async (confirm = true): Promise<void> => {
      if (destroyed || loading.value || closing) return;
      try { if (confirm && !(await confirmDiscard())) return; }
      catch { fail('loadFailed'); return; }
      if (destroyed || loading.value) return;
      loading.value = true;
      loadingText.value = text('loading');
      error.value = '';
      try {
        const model = await exportModel(await serviceForModel());
        if (!destroyed && model) {
          draft.reset(model);
          loaded.value = true;
          verifiedSave.value = false;
        }
      } catch { fail('loadFailed'); }
      finally { if (!destroyed) loading.value = false; }
    };
    const save = async (isClose = false): Promise<void> => {
      if (destroyed || props.readonly || loading.value || !loaded.value || !draft.dirty) return;
      let model;
      try { model = parseModel(draft.value); } catch { fail('invalidObject'); return; }
      loading.value = true;
      loadingText.value = text('verifying');
      error.value = '';
      verifiedSave.value = false;
      let committed = false;
      try {
        const target = await serviceForModel();
        if (!target || destroyed || props.readonly) return;
        const current = await exportModel(target);
        if (destroyed || props.readonly || !current) return;
        // Export/compare is a conflict preflight, not an atomic server-side CAS.
        if (!draft.matchesBaseline(current)) { fail('conflict'); return; }
        loadingText.value = text('saving');
        const response = await target.service.exec('ImportModelV2', props.context, {
          [target.entity.keyAppDEFieldId!]: props.context[target.key],
          srfmodelv2scope: props.context.srfmodelv2scope, model,
        }, props.params);
        if (destroyed) return;
        if (response.status !== 200) { fail('saveFailed'); return; }
        committed = true;
        isSave.value = true;
        loadingText.value = text('verifying');
        const persisted = await exportModel(target);
        if (destroyed) return;
        if (!persisted || !sameModel(persisted, model)) { fail('unverified'); return; }
        draft.reset(persisted);
        verifiedSave.value = true;
        if (isClose && !props.readonly) {
          loading.value = false;
          await closeView();
        }
      } catch { fail(committed ? 'unverified' : 'saveFailed'); }
      finally { if (!destroyed) loading.value = false; }
    };
    const edit = (action: 'undo' | 'redo' | 'format'): void => {
      if (destroyed || props.readonly || loading.value || !loaded.value) return;
      try { draft[action](); error.value = ''; } catch { fail('invalidObject'); }
    };
    const download = (): void => {
      if (!loaded.value || loading.value || !valid.value || destroyed) return;
      const url = URL.createObjectURL(new Blob([`${JSON.stringify(parseModel(draft.value), null, 4)}\n`],
        { type: 'application/json' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'model.json';
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    onUnmounted(() => {
      destroyed = true;
      props.modal?.hooks?.shouldDismiss.removeTapPromise(shouldDismiss);
      props.modal?.hooks?.beforeDismiss.removeTapPromise(beforeDismiss);
    });
    void load(false);
    return { ns, text, draft, value, loaded, loading, loadingText, showChanges, error, valid, comparison,
      isSave, verifiedSave, closeView, save, load, edit, download };
  },
  render() {
    const editable = this.loaded && !this.loading && !this.readonly;
    const tool = (key: ModelEditMessage, icon: string, run: () => void, disabled = false) =>
      <button type='button' title={this.text(key)} aria-label={this.text(key)}
        disabled={disabled} onClick={run} class={this.ns.b('tool')}>
        <ion-icon name={icon}></ion-icon>
      </button>;
    return <div class={this.ns.b()} v-loading={this.loading} element-loading-text={this.loadingText}>
      <div class={this.ns.b('header')}>
        {tool('back', 'chevron-back-outline', () => { void this.closeView(); }, this.loading)}
        <div class={this.ns.b('header-caption')} title={this.caption}>{this.caption}</div>
        <span class={this.ns.b('status')} role='status'>
          {this.readonly ? this.text('readonly') : this.draft.dirty ? this.text('modified')
            : this.verifiedSave ? this.text('saved') : this.text('clean')}
        </span>
        <div class={this.ns.b('header-toolbar')}>
          {tool('reload', 'refresh-outline', () => { void this.load(); }, this.loading)}
          {tool('undo', 'arrow-undo-outline', () => this.edit('undo'), !editable || !this.draft.canUndo)}
          {tool('redo', 'arrow-redo-outline', () => this.edit('redo'), !editable || !this.draft.canRedo)}
          {tool('format', 'code-slash-outline', () => this.edit('format'), !editable || !this.valid)}
          <button type='button' class={this.ns.b('tool')} title={this.text('changes')}
            aria-label={this.text('changes')} aria-pressed={this.showChanges}
            onClick={() => { this.showChanges = !this.showChanges; }}>
            <ion-icon name='git-compare-outline'></ion-icon>
          </button>
          {tool('export', 'download-outline', this.download, !this.loaded || !this.valid || this.loading)}
          {!this.readonly && [
            <el-button size='small' disabled={!editable || !this.valid || !this.draft.dirty}
              onClick={() => this.save(true)}>{this.text('saveClose')}</el-button>,
            <el-button size='small' disabled={!editable || !this.valid || !this.draft.dirty}
              onClick={() => this.save()}>{this.text('save')}</el-button>,
          ]}
          {tool('close', 'close-outline', () => { void this.closeView(); }, this.loading)}
        </div>
      </div>
      {this.error && <div class={this.ns.b('error')} role='alert'>{this.error}</div>}
      <div class={this.ns.b('workspace')}>
        <div class={this.ns.b('content')}>
          <iBizDesignCodeEditor language='json' readonly={this.readonly || this.loading || !this.loaded}
            isChangeLanguage={false} v-model={this.value} isEnableLoad={!this.loading}></iBizDesignCodeEditor>
        </div>
        {this.showChanges && <aside class={this.ns.b('changes')} aria-label={this.text('changes')}>
          <h3>{this.text('changes')}</h3>
          {!this.valid ? <p role='alert'>{this.text('invalidObject')}</p>
            : !this.comparison.entries.length ? <p>{this.text('noChanges')}</p>
              : <table><thead><tr><th>{this.text('path')}</th><th>{this.text('before')}</th>
                <th>{this.text('after')}</th></tr></thead><tbody>
                {this.comparison.entries.map(change => <tr key={change.path} title={this.text(change.kind)}>
                  <th scope='row'>{change.path}</th><td>{change.before}</td><td>{change.after}</td>
                </tr>)}
              </tbody></table>}
          {this.comparison.truncated && <p role='status'>{this.text('truncated')}</p>}
        </aside>}
      </div>
      {this.loaded && <div class={this.ns.b('validation')} role='status'>
        {this.valid ? this.text('valid') : this.text('invalid')}
      </div>}
    </div>;
  },
});
