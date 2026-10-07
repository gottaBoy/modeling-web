import { defineComponent, h, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import type { PropType } from 'vue';
import loader from '@monaco-editor/loader';
import type { Data } from './contracts';
import { getHost } from './contracts';
import { MonacoSurface, monacoBaseUrl } from './monaco';
import { ModelEditSession } from './session';

interface Hook<T> {
  tapPromise(callback: (context: T) => Promise<void>): void;
  removeTapPromise(callback: (context: T) => Promise<void>): void;
}
interface ModalResult { ok: boolean; params?: { isSave?: boolean }; }
interface Modal {
  dismiss(result: { ok: boolean; params: { isSave: boolean } }): Promise<boolean>;
  hooks: {
    shouldDismiss: Hook<{ allowClose?: boolean }>;
    beforeDismiss: Hook<ModalResult>;
  };
}

export const ModelEditView = defineComponent({
  name: 'AibizModelEditView',
  props: {
    context: { type: Object as PropType<Data>, required: true },
    params: { type: Object as PropType<Data>, required: true },
    modal: { type: Object as PropType<Modal>, required: true },
    codeName: { type: String, required: true },
    caption: { type: String, default: 'Model' },
    readonly: { type: Boolean, default: false },
  },
  setup(props) {
    const host = getHost();
    const session = new ModelEditSession(host, props.codeName, props.context, props.params, props.readonly);
    session.state = reactive(session.state);
    const state = session.state;
    const container = ref<HTMLElement>();
    const ready = ref(false);
    const editorError = ref('');
    const closing = ref(false);
    let checkingDismiss = false;
    let ownClose = false;
    const surface = new MonacoSurface(loader, value => session.setValue(value));
    watch(() => props.readonly, value => { session.readonly = value; });
    watch(
      () => [state.value, props.readonly, state.loading, state.saving, state.loaded] as const,
      () => surface.update(state.value, props.readonly || session.busy || !state.loaded),
      { immediate: true, flush: 'sync' },
    );

    const confirmDiscard = async (): Promise<boolean> => {
      if (!state.dirty) return true;
      return host.confirm.warning({ title: 'Discard changes?', desc: 'Unsaved model changes will be discarded.' });
    };
    const shouldDismiss = async (context: { allowClose?: boolean }): Promise<void> => {
      if (context.allowClose === false) return;
      if (!session.active || session.busy || checkingDismiss || (closing.value && !ownClose)) {
        context.allowClose = false;
        return;
      }
      checkingDismiss = true;
      try {
        if (!(await confirmDiscard()) || !session.active || session.busy) context.allowClose = false;
      } catch {
        context.allowClose = false;
      } finally {
        checkingDismiss = false;
      }
    };
    const beforeDismiss = async (result: ModalResult): Promise<void> => {
      // Even an external close must refresh imports already committed successfully.
      result.params = { ...result.params, isSave: state.hasSaved };
      if (state.hasSaved) result.ok = true;
    };
    props.modal.hooks.shouldDismiss.tapPromise(shouldDismiss);
    props.modal.hooks.beforeDismiss.tapPromise(beforeDismiss);
    const close = async (): Promise<void> => {
      if (!session.active || session.busy || closing.value) return;
      closing.value = true;
      ownClose = true;
      try {
        if (session.active) await props.modal.dismiss({ ok: true, params: { isSave: state.hasSaved } });
      } catch {
        if (session.active) state.error = 'The editor could not be closed.';
      } finally {
        ownClose = false;
        if (session.active) closing.value = false;
      }
    };
    const save = async (andClose = false): Promise<void> => {
      if (!ready.value || closing.value) return;
      if (await session.save()) {
        if (andClose) await close();
      }
    };
    const reload = async (): Promise<void> => {
      if (!session.active || session.busy || closing.value) return;
      closing.value = true;
      try {
        if (await confirmDiscard()) {
          if (session.active) await session.load();
        }
      } catch {
        if (session.active) state.error = 'The model could not be reloaded.';
      } finally {
        if (session.active) closing.value = false;
      }
    };
    onMounted(() => {
      void session.load();
      void (async () => {
        try {
          const vs = monacoBaseUrl(host.env.pluginBaseUrl, document.baseURI);
          const mounted = await surface.mount(container.value!, vs);
          if (session.active) ready.value = mounted;
        } catch {
          if (session.active) editorError.value = 'The JSON editor could not be loaded.';
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
          h('span', { class: 'aibiz-model-edit__status', role: 'status' },
            props.readonly ? 'Read-only' : state.dirty ? 'Unsaved' : state.hasSaved ? 'Saved' : ''),
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
