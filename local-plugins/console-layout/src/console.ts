import { ViewController, registerViewProvider } from '@ibiz-template/runtime';
import { defineComponent, h, nextTick, ref, watch, onBeforeUnmount } from 'vue';
import { bodyView, injectedView, iconButton } from './view';

declare const ibiz: any;
export const supportedPluginCodes = ['CONSOLE_VIEW'];
const maxEntries = 1000;
const maxCharacters = 1024 * 1024;
const streams = new WeakMap<object, Map<string, any>>();

export function consoleTopic(context: any): string {
  const topic = context?.srfconsoleid;
  if (typeof topic !== 'string' || !topic.trim() || topic.length > 512 ||
      /[+#\u0000-\u001f\u007f]/.test(topic)) {
    throw new Error('CONSOLE_VIEW requires a non-wildcard context.srfconsoleid from the model.');
  }
  return topic;
}

export function plainConsoleText(content: string): string {
  // The host sends colored log text, not a shell/PTY protocol. Never render it as HTML.
  return content.replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g, '')
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .slice(0, 16384);
}

function observeConsole(service: any, topic: string, observer: any): () => void {
  const client = service?.client;
  if (typeof service?.evt?.on !== 'function' || typeof service?.evt?.off !== 'function' ||
      typeof client?.subscribe !== 'function' || typeof client?.on !== 'function' ||
      typeof client?.off !== 'function') {
    throw new Error('Authenticated host MQTT service is unavailable.');
  }
  let topics = streams.get(service);
  if (!topics) { topics = new Map(); streams.set(service, topics); }
  let stream = topics.get(topic);
  if (stream && stream.client !== client) throw new Error('Host MQTT client changed while the console is active.');
  if (!stream) {
    stream = { client, observers: new Set(), generation: 0 };
    const notify = (status: string, error = '') => {
      for (const item of stream.observers) item.status(status, error);
    };
    stream.subscribe = () => {
      const generation = ++stream.generation;
      notify('connecting');
      try {
        client.subscribe(topic, (error: any, granted: any[]) => {
          if (generation !== stream.generation || !stream.observers.size) return;
          if (error || !Array.isArray(granted) ||
              !granted.some(item => item.topic === topic && [0, 1, 2].includes(item.qos))) {
            notify('error', error?.message || 'MQTT broker did not grant the exact console topic.');
          } else notify('connected');
        });
      } catch (error: any) { notify('error', error?.message || String(error)); }
    };
    stream.message = (receivedTopic: string, message: any) => {
      if (receivedTopic !== topic || message?.type !== 'CONSOLE' || typeof message.content !== 'string') return;
      for (const item of stream.observers) item.message(message);
    };
    stream.close = () => {
      stream.generation += 1;
      notify('disconnected');
    };
    stream.error = (error: any) => {
      stream.generation += 1;
      notify('error', error?.message || String(error));
    };
    topics.set(topic, stream);
    service.evt.on('message', stream.message);
    client.on('connect', stream.subscribe);
    client.on('close', stream.close);
    client.on('error', stream.error);
  }
  stream.observers.add(observer);
  stream.subscribe();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    stream.observers.delete(observer);
    if (stream.observers.size) return;
    stream.generation += 1;
    service.evt.off('message', stream.message);
    client.off('connect', stream.subscribe);
    client.off('close', stream.close);
    client.off('error', stream.error);
    topics.delete(topic);
    // MQTT subscriptions belong to the shared host client. Other consumers can
    // subscribe without our knowledge, so never unsubscribe/end that client.
  };
}

export class ConsoleController extends ViewController {
  private disposeStream?: () => void;
  private disposed = false;
  private sequence = 0;
  private characters = 0;

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    Object.assign(this.state, {
      consoleTopic: '', consoleStatus: 'waiting', consoleError: '', consoleEntries: [],
      consolePaused: false, consoleDropped: 0, consoleFilter: '', consoleFollow: true,
    });
  }

  protected async onMounted(): Promise<void> {
    await super.onMounted();
    if (this.disposed) return;
    try {
      (this.state as any).consoleTopic = consoleTopic(this.context);
      this.disposeStream = observeConsole(ibiz?.hub?.mqtt, (this.state as any).consoleTopic, {
        status: (status: string, error: string) => {
          if (this.disposed) return;
          Object.assign(this.state, { consoleStatus: status, consoleError: error });
        },
        message: (message: any) => this.append(message),
      });
    } catch (error: any) {
      Object.assign(this.state, { consoleStatus: 'error', consoleError: error?.message || String(error) });
    }
  }

  public append(message: any): void {
    if (this.disposed) return;
    const state = this.state as any;
    if (state.consolePaused) { state.consoleDropped += 1; return; }
    const text = plainConsoleText(message.content);
    const sender = typeof message.subtype === 'string' ? plainConsoleText(message.subtype).slice(0, 160) : '';
    state.consoleEntries.push({ id: ++this.sequence, sender, text });
    this.characters += text.length + sender.length;
    while (state.consoleEntries.length > maxEntries || this.characters > maxCharacters) {
      const entry = state.consoleEntries.shift();
      this.characters -= entry.text.length + entry.sender.length;
      state.consoleDropped += 1;
    }
  }

  public clear(): void {
    (this.state as any).consoleEntries.splice(0);
    (this.state as any).consoleDropped = 0;
    this.characters = 0;
  }

  protected async onDestroyed(): Promise<void> {
    this.disposed = true;
    this.disposeStream?.();
    this.disposeStream = undefined;
    (this.state as any).consoleStatus = 'disposed';
    await super.onDestroyed();
  }
}

export const ConsoleBody = defineComponent({
  name: 'AibizConsoleBody',
  setup() {
    const controller: ConsoleController = injectedView();
    const state = controller.state as any;
    const output = ref<any>();
    let active = true;
    onBeforeUnmount(() => { active = false; });
    watch(() => [state.consoleEntries?.length, state.consoleEntries?.at(-1)?.id], async () => {
      await nextTick();
      if (active && state.consoleFollow && output.value) output.value.scrollTop = output.value.scrollHeight;
    });
    return () => h('section', { class: 'aibiz-console', 'data-console-status': state.consoleStatus }, [
      h('header', { class: 'aibiz-console__toolbar' }, [
        h('strong', state.consoleTopic || 'Console'),
        h('span', { role: 'status' }, state.consoleStatus),
        h('input', {
          type: 'search', 'aria-label': 'Filter logs', placeholder: 'Filter', value: state.consoleFilter,
          onInput: (event: any) => { state.consoleFilter = event.target.value; },
        }),
        iconButton(state.consolePaused ? 'play' : 'pause', state.consolePaused ? 'Resume' : 'Pause',
          () => { state.consolePaused = !state.consolePaused; }, { 'aria-pressed': state.consolePaused }),
        h('label', [
          h('input', { type: 'checkbox', checked: state.consoleFollow,
            onChange: (event: any) => { state.consoleFollow = event.target.checked; } }), 'Follow',
        ]),
        iconButton('trash', 'Clear logs', () => controller.clear()),
      ]),
      state.consoleError ? h('p', { role: 'alert' }, state.consoleError) : null,
      h('div', { class: 'aibiz-console__output', ref: output, role: 'log', 'aria-live': 'off' },
        (state.consoleEntries || []).filter((entry: any) =>
          `${entry.sender} ${entry.text}`.toLowerCase().includes((state.consoleFilter || '').toLowerCase()))
          .map((entry: any) => h('pre', { key: entry.id }, [
            entry.sender ? h('span', { class: 'aibiz-console__sender' }, `[${entry.sender}] `) : null,
            entry.text,
          ]))),
      h('footer', `${state.consoleEntries?.length || 0} entries / ${state.consoleDropped || 0} discarded`),
    ]);
  },
});

export class ConsoleProvider {
  public readonly component = 'AibizConsoleView';
  public createController(model: any, context: any, params?: any, ctx?: any): ConsoleController {
    return new ConsoleController(model, context, params, ctx);
  }
}

export default {
  install(app: any): void {
    if (typeof app?.component !== 'function') throw new Error('Console plugin requires a Vue application.');
    app.component('AibizConsoleView', bodyView('AibizConsoleView', ConsoleBody));
    registerViewProvider('VIEW_CUSTOM_CONSOLE_VIEW', () => new ConsoleProvider());
  },
};
