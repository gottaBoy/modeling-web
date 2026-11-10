import { UIActionProviderBase, SysUIActionTag, calcDeCodeNameById, convertNavData, formatMultiData, registerUIActionProvider } from '@ibiz-template/runtime';
import { defineComponent, reactive, ref, watch, onMounted, onUnmounted, h } from 'vue';
import loader from '@monaco-editor/loader';

function getHost() {
    const host = globalThis.ibiz;
    if (!host)
        throw new Error('Model editing requires the iBiz host.');
    return host;
}

function monacoBaseUrl(pluginBaseUrl, baseURI) {
    const base = new URL(baseURI);
    const url = new URL(`${(pluginBaseUrl ?? './plugins').replace(/\/+$/, '')}/monaco-editor@0.52.2/min/vs`, base);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== base.origin ||
        url.username || url.password || url.search || url.hash) {
        throw new Error('Monaco requires a same-origin local asset directory.');
    }
    return url.href;
}
class MonacoSurface {
    constructor(loader, change) {
        this.loader = loader;
        this.change = change;
        this.disposed = false;
        this.started = false;
        this.value = '';
        this.readonly = true;
    }
    async mount(element, vs) {
        if (this.disposed || this.started)
            return false;
        this.started = true;
        this.loader.config({ paths: { vs } });
        const monaco = await this.loader.init();
        if (this.disposed)
            return false;
        try {
            this.model = monaco.editor.createModel(this.value, 'json');
            this.editor = monaco.editor.create(element, {
                model: this.model, readOnly: this.readonly, automaticLayout: true,
                minimap: { enabled: false }, scrollBeyondLastLine: false,
            });
            this.listener = this.editor.onDidChangeModelContent(() => {
                if (!this.disposed && !this.readonly && this.model)
                    this.change(this.model.getValue());
            });
            return true;
        }
        catch (error) {
            this.dispose();
            throw error;
        }
    }
    update(value, readonly) {
        if (this.disposed)
            return;
        this.value = value;
        this.readonly = readonly;
        this.editor?.updateOptions({ readOnly: readonly });
        if (this.model && this.model.getValue() !== value)
            this.model.setValue(value);
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        this.listener?.dispose();
        this.editor?.dispose();
        this.model?.dispose();
        this.listener = undefined;
        this.editor = undefined;
        this.model = undefined;
    }
}

class ModelEditSession {
    constructor(host, codeName, context, params, readonly) {
        this.host = host;
        this.codeName = codeName;
        this.context = context;
        this.params = params;
        this.readonly = readonly;
        this.state = {
            value: '', loaded: false, loading: false, saving: false,
            dirty: false, hasSaved: false, error: '',
        };
        this.disposed = false;
        this.baseline = '';
    }
    get active() { return !this.disposed; }
    get busy() { return this.state.loading || this.state.saving; }
    dirty(value) {
        this.state.dirty = value;
        const id = this.context.srfsessionid;
        const domain = typeof id === 'string' ? this.host.uiDomainManager.get(id) : undefined;
        if (domain && domain.dataModification !== value) {
            if (value)
                domain.dataChange();
            else
                domain.dataChangeCompleted();
        }
    }
    fail(message) {
        if (this.active) {
            this.state.error = message;
            this.host.message.error(message);
        }
        return false;
    }
    setValue(value) {
        if (!this.active || this.readonly || !this.state.loaded || this.busy)
            return;
        this.state.value = value;
        this.dirty(value !== this.baseline);
    }
    async load() {
        if (!this.active || this.busy)
            return false;
        this.state.loading = true;
        this.state.error = '';
        this.state.loaded = false;
        try {
            const appId = this.context.srfappid;
            if (typeof appId !== 'string' || !appId)
                throw new Error('Missing application.');
            const entity = await this.host.hub.getAppDataEntity(this.codeName, appId);
            if (!this.active)
                return false;
            if (!entity?.id || !entity.codeName || !entity.keyAppDEFieldId) {
                throw new Error('Incomplete entity metadata.');
            }
            const key = this.context[entity.codeName.toLowerCase()];
            if ((typeof key !== 'string' && typeof key !== 'number') || key === '') {
                throw new Error('Missing model key.');
            }
            const service = await this.host.hub.getApp(appId).deService.getService(this.context, entity.id);
            if (!this.active)
                return false;
            const response = await service.exec('ExportModelV2', this.context, {}, this.params);
            if (!this.active)
                return false;
            const model = response.data?.model;
            if (response.status !== 200 || !model || typeof model !== 'object' || Array.isArray(model)) {
                throw new Error('Model export failed.');
            }
            const value = JSON.stringify(model, null, 4);
            this.entity = entity;
            this.service = service;
            this.baseline = value;
            this.state.value = value;
            this.state.loaded = true;
            this.dirty(false);
            return true;
        }
        catch {
            return this.fail('The model could not be loaded.');
        }
        finally {
            if (this.active)
                this.state.loading = false;
        }
    }
    async save() {
        if (!this.active || this.readonly || this.busy || !this.state.loaded)
            return false;
        let model;
        try {
            model = JSON.parse(this.state.value);
            if (!model || typeof model !== 'object' || Array.isArray(model))
                throw new Error('Not an object.');
        }
        catch {
            return this.fail('The model must be a valid JSON object.');
        }
        if (!this.entity || !this.service)
            return false;
        this.state.saving = true;
        this.state.error = '';
        try {
            const entity = this.entity;
            const input = {
                [entity.keyAppDEFieldId]: this.context[entity.codeName.toLowerCase()],
                srfmodelv2scope: this.context.srfmodelv2scope,
                model,
            };
            const response = await this.service.exec('ImportModelV2', this.context, input, this.params);
            if (!this.active)
                return false;
            if (response.status !== 200)
                throw new Error('Model import failed.');
            this.baseline = this.state.value;
            this.state.hasSaved = true;
            this.dirty(false);
            return true;
        }
        catch {
            return this.fail('The model could not be saved.');
        }
        finally {
            if (this.active)
                this.state.saving = false;
        }
    }
    dispose() {
        this.disposed = true;
        this.service = undefined;
        this.entity = undefined;
    }
}

const ModelEditView = defineComponent({
    name: 'AibizModelEditView',
    props: {
        context: { type: Object, required: true },
        params: { type: Object, required: true },
        modal: { type: Object, required: true },
        codeName: { type: String, required: true },
        caption: { type: String, default: 'Model' },
        readonly: { type: Boolean, default: false },
    },
    setup(props) {
        const host = getHost();
        const session = new ModelEditSession(host, props.codeName, props.context, props.params, props.readonly);
        session.state = reactive(session.state);
        const state = session.state;
        const container = ref();
        const ready = ref(false);
        const editorError = ref('');
        const closing = ref(false);
        let checkingDismiss = false;
        let ownClose = false;
        const surface = new MonacoSurface(loader, value => session.setValue(value));
        watch(() => props.readonly, value => { session.readonly = value; });
        watch(() => [state.value, props.readonly, state.loading, state.saving, state.loaded], () => surface.update(state.value, props.readonly || session.busy || !state.loaded), { immediate: true, flush: 'sync' });
        const confirmDiscard = async () => {
            if (!state.dirty)
                return true;
            return host.confirm.warning({ title: 'Discard changes?', desc: 'Unsaved model changes will be discarded.' });
        };
        const shouldDismiss = async (context) => {
            if (context.allowClose === false)
                return;
            if (!session.active || session.busy || checkingDismiss || (closing.value && !ownClose)) {
                context.allowClose = false;
                return;
            }
            checkingDismiss = true;
            try {
                if (!(await confirmDiscard()) || !session.active || session.busy)
                    context.allowClose = false;
            }
            catch {
                context.allowClose = false;
            }
            finally {
                checkingDismiss = false;
            }
        };
        const beforeDismiss = async (result) => {
            // Even an external close must refresh imports already committed successfully.
            result.params = { ...result.params, isSave: state.hasSaved };
            if (state.hasSaved)
                result.ok = true;
        };
        props.modal.hooks.shouldDismiss.tapPromise(shouldDismiss);
        props.modal.hooks.beforeDismiss.tapPromise(beforeDismiss);
        const close = async () => {
            if (!session.active || session.busy || closing.value)
                return;
            closing.value = true;
            ownClose = true;
            try {
                if (session.active)
                    await props.modal.dismiss({ ok: true, params: { isSave: state.hasSaved } });
            }
            catch {
                if (session.active)
                    state.error = 'The editor could not be closed.';
            }
            finally {
                ownClose = false;
                if (session.active)
                    closing.value = false;
            }
        };
        const save = async (andClose = false) => {
            if (!ready.value || closing.value)
                return;
            if (await session.save()) {
                if (andClose)
                    await close();
            }
        };
        const reload = async () => {
            if (!session.active || session.busy || closing.value)
                return;
            closing.value = true;
            try {
                if (await confirmDiscard()) {
                    if (session.active)
                        await session.load();
                }
            }
            catch {
                if (session.active)
                    state.error = 'The model could not be reloaded.';
            }
            finally {
                if (session.active)
                    closing.value = false;
            }
        };
        onMounted(() => {
            void session.load();
            void (async () => {
                try {
                    const vs = monacoBaseUrl(host.env.pluginBaseUrl, document.baseURI);
                    const mounted = await surface.mount(container.value, vs);
                    if (session.active)
                        ready.value = mounted;
                }
                catch {
                    if (session.active)
                        editorError.value = 'The JSON editor could not be loaded.';
                }
            })();
        });
        onUnmounted(() => {
            session.dispose();
            surface.dispose();
            props.modal.hooks.shouldDismiss.removeTapPromise(shouldDismiss);
            props.modal.hooks.beforeDismiss.removeTapPromise(beforeDismiss);
        });
        return () => {
            const busy = session.busy || closing.value;
            const canSave = ready.value && state.loaded && !busy && !props.readonly && state.dirty;
            return h('section', { class: 'aibiz-model-edit', 'aria-busy': busy }, [
                h('header', { class: 'aibiz-model-edit__header' }, [
                    h('h2', { title: props.caption }, props.caption),
                    h('span', { class: 'aibiz-model-edit__status', role: 'status' }, props.readonly ? 'Read-only' : state.dirty ? 'Unsaved' : state.hasSaved ? 'Saved' : ''),
                    h('nav', { 'aria-label': 'Model actions' }, [
                        h('button', { type: 'button', disabled: busy, onClick: reload }, 'Reload'),
                        ...(!props.readonly ? [
                            h('button', { type: 'button', disabled: !canSave, onClick: () => save(false) }, 'Save'),
                            h('button', { type: 'button', disabled: !canSave, onClick: () => save(true) }, 'Save and close'),
                        ] : []),
                        h('button', { type: 'button', disabled: busy, onClick: () => close() }, 'Close'),
                    ]),
                ]),
                ...(state.error || editorError.value ? [
                    h('div', { class: 'aibiz-model-edit__error', role: 'alert' }, state.error || editorError.value),
                ] : []),
                h('div', { class: 'aibiz-model-edit__body' }, [
                    h('div', { class: 'aibiz-model-edit__editor', ref: container }),
                    ...(!ready.value && !editorError.value || state.loading ? [
                        h('div', { class: 'aibiz-model-edit__loading', role: 'status' }, 'Loading...'),
                    ] : []),
                ]),
            ]);
        };
    },
});

const cancelled = () => ({ cancel: true, refresh: false, closeView: false });
class ModelEditProvider extends UIActionProviderBase {
    async execAction(action, args) {
        const { context, params, view, data } = args;
        const readonly = action.uiactionParamJO?.readonly === 'true' || action.uiactionParamJO?.readonly === true;
        if (['MULTIKEY', 'MULTIDATA'].includes(action.actionTarget) && data.length > 1) {
            ibiz.message.error('Select one model to edit.');
            return cancelled();
        }
        const sourceSession = view.context.srfsessionid;
        const sourceDomain = sourceSession ? ibiz.uiDomainManager.get(sourceSession) : undefined;
        if (!readonly && sourceDomain?.dataModification) {
            try {
                const result = await view.call(SysUIActionTag.SAVE);
                if ((!result && result !== null) || sourceDomain.dataModification)
                    return cancelled();
            }
            catch {
                ibiz.message.error('Save the current view before editing its model.');
                return cancelled();
            }
        }
        const resultContext = context.clone();
        let domainId;
        let overlay;
        try {
            const entityId = view.model.appDataEntityId;
            if (!entityId)
                throw new Error('Missing entity.');
            const contexts = [...(action.navigateContexts || [])];
            const deName = calcDeCodeNameById(entityId);
            if (deName && action.actionTarget !== 'NONE') {
                contexts.unshift({ key: deName, value: 'srfkey', rawValue: false });
            }
            Object.assign(resultContext, convertNavData(contexts, data[0] || {}, params, context));
            const configuredParams = convertNavData(action.navigateParams, ['MULTIKEY', 'MULTIDATA'].includes(action.actionTarget) && data.length > 0
                ? formatMultiData(action.navigateParams, data)
                : data[0] || {}, params, resultContext);
            const resultParams = { ...params, ...configuredParams };
            const entity = await ibiz.hub.getAppDataEntity(entityId, view.model.appId);
            if (!entity?.codeName || !entity.id)
                throw new Error('Missing entity metadata.');
            const domain = ibiz.uiDomainManager.create(undefined, entity.id);
            domainId = domain.id;
            resultContext.srfsessionid = domain.id;
            overlay = ibiz.overlay.createDrawer(modal => h(ModelEditView, {
                modal, context: resultContext, params: resultParams, codeName: entity.codeName,
                caption: view.model.caption || action.caption || 'Model', readonly,
            }), undefined, { placement: 'top', showClose: false });
            // Register before present: presentation or a quick dismissal can emit synchronously.
            const dismissed = overlay.onWillDismiss();
            await overlay.present();
            const result = await dismissed;
            return result?.ok === true && result.params?.isSave === true
                ? { refresh: true, refreshMode: 1, closeView: false }
                : { refresh: false, closeView: false };
        }
        catch {
            if (overlay) {
                try {
                    await overlay.dismiss({ ok: false });
                }
                catch { /* Cleanup still continues. */ }
            }
            ibiz.message.error('The model editor could not be opened.');
            return cancelled();
        }
        finally {
            if (domainId)
                ibiz.uiDomainManager.destroy(domainId);
            resultContext.destroy();
        }
    }
}

var index = {
    install() {
        registerUIActionProvider('DEUIACTION_MODEL_EDIT', () => new ModelEditProvider());
    },
};

export { ModelEditProvider, ModelEditSession, ModelEditView, MonacoSurface, index as default, monacoBaseUrl };
