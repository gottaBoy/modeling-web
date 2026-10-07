import { registerViewProvider, ViewController } from '@ibiz-template/runtime';
import { defineComponent, h, inject, ref, onBeforeUnmount, watch, nextTick } from 'vue';
import { IBizView } from '@ibiz-template/vue3-util';

function bodyView(name, body) {
    return defineComponent({
        name,
        inheritAttrs: false,
        props: {
            context: Object, params: Object, modelData: { type: Object, required: true },
            modal: Object, state: Object, provider: Object,
        },
        setup(props, { attrs }) {
            return () => h(IBizView, { ...attrs, ...props }, { default: () => h(body) });
        },
    });
}
function injectedView() {
    const ctx = inject('ctx');
    if (!ctx?.view)
        throw new Error('Independent custom view requires the real host CTX.view.');
    return ctx.view;
}
function iconButton(icon, label, action, extra = {}) {
    return h('button', { type: 'button', title: label, 'aria-label': label, onClick: action, ...extra }, [h('i', { class: `fa fa-${icon}`, 'aria-hidden': 'true' })]);
}

const supportedPluginCodes = ['CONSOLE_VIEW'];
const maxEntries = 1000;
const maxCharacters = 1024 * 1024;
const streams = new WeakMap();
function consoleTopic(context) {
    const topic = context?.srfconsoleid;
    if (typeof topic !== 'string' || !topic.trim() || topic.length > 512 ||
        /[+#\u0000-\u001f\u007f]/.test(topic)) {
        throw new Error('CONSOLE_VIEW requires a non-wildcard context.srfconsoleid from the model.');
    }
    return topic;
}
function plainConsoleText(content) {
    // The host sends colored log text, not a shell/PTY protocol. Never render it as HTML.
    return content.replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g, '')
        .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '')
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
        .slice(0, 16384);
}
function observeConsole(service, topic, observer) {
    const client = service?.client;
    if (typeof service?.evt?.on !== 'function' || typeof service?.evt?.off !== 'function' ||
        typeof client?.subscribe !== 'function' || typeof client?.on !== 'function' ||
        typeof client?.off !== 'function') {
        throw new Error('Authenticated host MQTT service is unavailable.');
    }
    let topics = streams.get(service);
    if (!topics) {
        topics = new Map();
        streams.set(service, topics);
    }
    let stream = topics.get(topic);
    if (stream && stream.client !== client)
        throw new Error('Host MQTT client changed while the console is active.');
    if (!stream) {
        stream = { client, observers: new Set(), generation: 0 };
        const notify = (status, error = '') => {
            for (const item of stream.observers)
                item.status(status, error);
        };
        stream.subscribe = () => {
            const generation = ++stream.generation;
            notify('connecting');
            try {
                client.subscribe(topic, (error, granted) => {
                    if (generation !== stream.generation || !stream.observers.size)
                        return;
                    if (error || !Array.isArray(granted) ||
                        !granted.some(item => item.topic === topic && [0, 1, 2].includes(item.qos))) {
                        notify('error', error?.message || 'MQTT broker did not grant the exact console topic.');
                    }
                    else
                        notify('connected');
                });
            }
            catch (error) {
                notify('error', error?.message || String(error));
            }
        };
        stream.message = (receivedTopic, message) => {
            if (receivedTopic !== topic || message?.type !== 'CONSOLE' || typeof message.content !== 'string')
                return;
            for (const item of stream.observers)
                item.message(message);
        };
        stream.close = () => {
            stream.generation += 1;
            notify('disconnected');
        };
        stream.error = (error) => {
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
        if (released)
            return;
        released = true;
        stream.observers.delete(observer);
        if (stream.observers.size)
            return;
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
class ConsoleController extends ViewController {
    constructor() {
        super(...arguments);
        this.disposed = false;
        this.sequence = 0;
        this.characters = 0;
    }
    async onCreated() {
        await super.onCreated();
        Object.assign(this.state, {
            consoleTopic: '', consoleStatus: 'waiting', consoleError: '', consoleEntries: [],
            consolePaused: false, consoleDropped: 0, consoleFilter: '', consoleFollow: true,
        });
    }
    async onMounted() {
        await super.onMounted();
        if (this.disposed)
            return;
        try {
            this.state.consoleTopic = consoleTopic(this.context);
            this.disposeStream = observeConsole(ibiz?.hub?.mqtt, this.state.consoleTopic, {
                status: (status, error) => {
                    if (this.disposed)
                        return;
                    Object.assign(this.state, { consoleStatus: status, consoleError: error });
                },
                message: (message) => this.append(message),
            });
        }
        catch (error) {
            Object.assign(this.state, { consoleStatus: 'error', consoleError: error?.message || String(error) });
        }
    }
    append(message) {
        if (this.disposed)
            return;
        const state = this.state;
        if (state.consolePaused) {
            state.consoleDropped += 1;
            return;
        }
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
    clear() {
        this.state.consoleEntries.splice(0);
        this.state.consoleDropped = 0;
        this.characters = 0;
    }
    async onDestroyed() {
        this.disposed = true;
        this.disposeStream?.();
        this.disposeStream = undefined;
        this.state.consoleStatus = 'disposed';
        await super.onDestroyed();
    }
}
const ConsoleBody = defineComponent({
    name: 'AibizConsoleBody',
    setup() {
        const controller = injectedView();
        const state = controller.state;
        const output = ref();
        let active = true;
        onBeforeUnmount(() => { active = false; });
        watch(() => [state.consoleEntries?.length, state.consoleEntries?.at(-1)?.id], async () => {
            await nextTick();
            if (active && state.consoleFollow && output.value)
                output.value.scrollTop = output.value.scrollHeight;
        });
        return () => h('section', { class: 'aibiz-console', 'data-console-status': state.consoleStatus }, [
            h('header', { class: 'aibiz-console__toolbar' }, [
                h('strong', state.consoleTopic || 'Console'),
                h('span', { role: 'status' }, state.consoleStatus),
                h('input', {
                    type: 'search', 'aria-label': 'Filter logs', placeholder: 'Filter', value: state.consoleFilter,
                    onInput: (event) => { state.consoleFilter = event.target.value; },
                }),
                iconButton(state.consolePaused ? 'play' : 'pause', state.consolePaused ? 'Resume' : 'Pause', () => { state.consolePaused = !state.consolePaused; }, { 'aria-pressed': state.consolePaused }),
                h('label', [
                    h('input', { type: 'checkbox', checked: state.consoleFollow,
                        onChange: (event) => { state.consoleFollow = event.target.checked; } }), 'Follow',
                ]),
                iconButton('trash', 'Clear logs', () => controller.clear()),
            ]),
            state.consoleError ? h('p', { role: 'alert' }, state.consoleError) : null,
            h('div', { class: 'aibiz-console__output', ref: output, role: 'log', 'aria-live': 'off' }, (state.consoleEntries || []).filter((entry) => `${entry.sender} ${entry.text}`.toLowerCase().includes((state.consoleFilter || '').toLowerCase()))
                .map((entry) => h('pre', { key: entry.id }, [
                entry.sender ? h('span', { class: 'aibiz-console__sender' }, `[${entry.sender}] `) : null,
                entry.text,
            ]))),
            h('footer', `${state.consoleEntries?.length || 0} entries / ${state.consoleDropped || 0} discarded`),
        ]);
    },
});
class ConsoleProvider {
    constructor() {
        this.component = 'AibizConsoleView';
    }
    createController(model, context, params, ctx) {
        return new ConsoleController(model, context, params, ctx);
    }
}
var console = {
    install(app) {
        if (typeof app?.component !== 'function')
            throw new Error('Console plugin requires a Vue application.');
        app.component('AibizConsoleView', bodyView('AibizConsoleView', ConsoleBody));
        registerViewProvider('VIEW_CUSTOM_CONSOLE_VIEW', () => new ConsoleProvider());
    },
};

export { ConsoleBody, ConsoleController, ConsoleProvider, consoleTopic, console as default, plainConsoleText, supportedPluginCodes };
