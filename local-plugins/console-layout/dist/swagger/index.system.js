System.register(['@ibiz-template/runtime', 'vue', '@ibiz-template/vue3-util'], (function (exports) {
    'use strict';
    var registerViewProvider, ViewController, defineComponent, h, inject, IBizView;
    return {
        setters: [function (module) {
            registerViewProvider = module.registerViewProvider;
            ViewController = module.ViewController;
        }, function (module) {
            defineComponent = module.defineComponent;
            h = module.h;
            inject = module.inject;
        }, function (module) {
            IBizView = module.IBizView;
        }],
        execute: (function () {

            exports({
                inspectOpenApi: inspectOpenApi,
                sameOriginSchemaUrl: sameOriginSchemaUrl
            });

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

            const supportedPluginCodes = exports("supportedPluginCodes", ['SWAGGER_PREVIEW_VIEW']);
            const methods = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']);
            const maxDocumentBytes = 4 * 1024 * 1024;
            function inspectOpenApi(input) {
                const text = typeof input === 'string' ? input : JSON.stringify(input);
                if (!text || new TextEncoder().encode(text).length > maxDocumentBytes) {
                    throw new Error('OpenAPI document must be nonempty and at most 4 MiB.');
                }
                const document = JSON.parse(text);
                if (!document || Array.isArray(document) ||
                    !(document.swagger === '2.0' || /^3\.[01]\.\d+$/.test(document.openapi || '')) ||
                    !document.info || typeof document.info.title !== 'string' ||
                    typeof document.info.version !== 'string' || !document.paths ||
                    typeof document.paths !== 'object' || Array.isArray(document.paths)) {
                    throw new Error('Expected a Swagger 2.0 or OpenAPI 3.0/3.1 document with info and paths.');
                }
                const operations = [];
                for (const [path, item] of Object.entries(document.paths)) {
                    if (!path.startsWith('/') || !item || typeof item !== 'object' || Array.isArray(item)) {
                        throw new Error(`Invalid OpenAPI path item: ${path}`);
                    }
                    for (const [method, operation] of Object.entries(item)) {
                        if (!methods.has(method))
                            continue;
                        if (!operation || typeof operation !== 'object' || Array.isArray(operation) ||
                            !operation.responses || typeof operation.responses !== 'object' || Array.isArray(operation.responses)) {
                            throw new Error(`Invalid OpenAPI operation/responses: ${method} ${path}`);
                        }
                        operations.push({
                            id: `${method.toUpperCase()} ${path}`, method: method.toUpperCase(), path,
                            summary: String(operation.summary || operation.operationId || ''),
                            parameters: [...(Array.isArray(item.parameters) ? item.parameters : []),
                                ...(Array.isArray(operation.parameters) ? operation.parameters : [])],
                            responses: operation.responses, requestBody: operation.requestBody,
                        });
                    }
                }
                return { document, operations };
            }
            function sameOriginSchemaUrl(input, base) {
                if (typeof input !== 'string' || !input.trim())
                    throw new Error('Explicit schema URL is required.');
                const url = new URL(input, base);
                const current = new URL(base);
                if (!['http:', 'https:'].includes(url.protocol) || url.origin !== current.origin ||
                    url.username || url.password || url.hash) {
                    throw new Error('Schema URL must be same-origin HTTP(S), without credentials or fragments.');
                }
                return url.href;
            }
            class SwaggerPreviewController extends ViewController {
                constructor() {
                    super(...arguments);
                    this.disposed = false;
                    this.generation = 0;
                }
                async onCreated() {
                    await super.onCreated();
                    Object.assign(this.state, {
                        schemaStatus: 'waiting', schemaError: '', schemaDocument: null, schemaOperations: [],
                        schemaFilter: '', schemaSelected: '', schemaInput: '',
                    });
                }
                async onMounted() {
                    await super.onMounted();
                    if (this.disposed)
                        return;
                    const params = this.params;
                    if (params?.openapi !== undefined && params?.schemaurl !== undefined) {
                        this.fail('Ambiguous schema input: provide openapi OR schemaurl, not both.');
                    }
                    else if (params?.openapi !== undefined)
                        this.setDocument(params.openapi);
                    else if (params?.schemaurl !== undefined)
                        await this.loadUrl(params.schemaurl);
                    else
                        this.fail('No OpenAPI input is declared. Supply a document or an explicit same-origin schema URL.');
                }
                fail(message) {
                    Object.assign(this.state, {
                        schemaStatus: 'error', schemaError: message, schemaDocument: null,
                        schemaOperations: [], schemaSelected: '',
                    });
                }
                apply(input) {
                    const { document, operations } = inspectOpenApi(input);
                    Object.assign(this.state, {
                        schemaStatus: 'ready', schemaError: '', schemaDocument: document,
                        schemaOperations: operations, schemaSelected: operations[0]?.id || '',
                    });
                }
                setDocument(input) {
                    if (this.disposed)
                        return;
                    this.generation += 1;
                    this.request?.abort();
                    this.request = undefined;
                    try {
                        this.apply(input);
                    }
                    catch (error) {
                        this.fail(error?.message || String(error));
                    }
                }
                async loadUrl(input) {
                    if (this.disposed)
                        return;
                    const generation = ++this.generation;
                    this.request?.abort();
                    const request = new AbortController();
                    this.request = request;
                    Object.assign(this.state, {
                        schemaStatus: 'loading', schemaError: '', schemaDocument: null,
                        schemaOperations: [], schemaSelected: '',
                    });
                    try {
                        const url = sameOriginSchemaUrl(input, document.baseURI);
                        const response = await fetch(url, {
                            credentials: 'same-origin', redirect: 'error', signal: request.signal,
                            headers: { Accept: 'application/json' },
                        });
                        if (!response.ok || response.redirected)
                            throw new Error(`Schema HTTP request failed: ${response.status}`);
                        if (!/(?:application\/json|application\/[^;\s]+\+json)(?:\s*;|$)/i.test(response.headers.get('content-type') || '')) {
                            throw new Error('Schema response must have an application/json content type.');
                        }
                        const declaredLength = Number(response.headers.get('content-length'));
                        if (declaredLength > maxDocumentBytes)
                            throw new Error('Schema response exceeds 4 MiB.');
                        if (!response.body)
                            throw new Error('Schema response has no readable body.');
                        const reader = response.body.getReader();
                        const chunks = [];
                        let length = 0;
                        try {
                            while (true) {
                                const part = await reader.read();
                                if (part.done)
                                    break;
                                length += part.value.length;
                                if (length > maxDocumentBytes)
                                    throw new Error('Schema response exceeds 4 MiB.');
                                chunks.push(part.value);
                            }
                        }
                        finally {
                            await reader.cancel();
                            reader.releaseLock();
                        }
                        if (this.disposed || generation !== this.generation)
                            return;
                        const bytes = new Uint8Array(length);
                        let offset = 0;
                        for (const chunk of chunks) {
                            bytes.set(chunk, offset);
                            offset += chunk.length;
                        }
                        this.apply(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
                    }
                    catch (error) {
                        if (this.disposed || generation !== this.generation)
                            return;
                        this.fail(error?.message || String(error));
                    }
                    finally {
                        if (generation === this.generation)
                            this.request = undefined;
                    }
                }
                async onDestroyed() {
                    this.disposed = true;
                    this.generation += 1;
                    this.request?.abort();
                    this.request = undefined;
                    this.state.schemaStatus = 'disposed';
                    await super.onDestroyed();
                }
            } exports("SwaggerPreviewController", SwaggerPreviewController);
            const SwaggerBody = exports("SwaggerBody", defineComponent({
                name: 'AibizSwaggerBody',
                setup() {
                    const controller = injectedView();
                    const state = controller.state;
                    return () => {
                        const selected = state.schemaOperations?.find((item) => item.id === state.schemaSelected);
                        return h('section', { class: 'aibiz-swagger', 'data-schema-status': state.schemaStatus }, [
                            h('header', [
                                h('strong', state.schemaDocument?.info?.title || 'OpenAPI'),
                                h('span', { role: 'status' }, state.schemaStatus),
                                h('input', {
                                    type: 'search', 'aria-label': 'Filter operations', placeholder: 'Filter',
                                    value: state.schemaFilter, onInput: (event) => { state.schemaFilter = event.target.value; },
                                }),
                            ]),
                            state.schemaError ? h('p', { role: 'alert' }, state.schemaError) : null,
                            h('details', { class: 'aibiz-swagger__input', open: state.schemaStatus !== 'ready' }, [
                                h('summary', 'OpenAPI JSON'),
                                h('textarea', {
                                    'aria-label': 'OpenAPI JSON', spellcheck: false, value: state.schemaInput,
                                    onInput: (event) => { state.schemaInput = event.target.value; },
                                }),
                                iconButton('check', 'Load document', () => controller.setDocument(state.schemaInput)),
                            ]),
                            state.schemaDocument ? h('div', { class: 'aibiz-swagger__content' }, [
                                h('nav', { 'aria-label': 'Operations' }, (state.schemaOperations || []).filter((item) => `${item.id} ${item.summary}`.toLowerCase().includes((state.schemaFilter || '').toLowerCase()))
                                    .map((item) => h('button', {
                                    type: 'button', key: item.id, 'aria-current': state.schemaSelected === item.id ? 'true' : undefined,
                                    onClick: () => { state.schemaSelected = item.id; },
                                }, [h('b', item.method), h('span', item.path), h('small', item.summary)]))),
                                h('main', selected ? [
                                    h('h2', selected.id), selected.summary ? h('p', selected.summary) : null,
                                    h('h3', 'Parameters'), h('pre', JSON.stringify(selected.parameters, null, 2)),
                                    selected.requestBody ? [h('h3', 'Request Body'), h('pre', JSON.stringify(selected.requestBody, null, 2))] : null,
                                    h('h3', 'Responses'), h('pre', JSON.stringify(selected.responses, null, 2)),
                                ] : h('p', 'No operations declared.')),
                            ]) : null,
                            state.schemaDocument ? h('details', [
                                h('summary', 'Document'), h('pre', JSON.stringify(state.schemaDocument, null, 2)),
                            ]) : null,
                        ]);
                    };
                },
            }));
            class SwaggerPreviewProvider {
                constructor() {
                    this.component = 'AibizSwaggerPreviewView';
                }
                createController(model, context, params, ctx) {
                    return new SwaggerPreviewController(model, context, params, ctx);
                }
            } exports("SwaggerPreviewProvider", SwaggerPreviewProvider);
            var swagger = exports("default", {
                install(app) {
                    if (typeof app?.component !== 'function')
                        throw new Error('OpenAPI plugin requires a Vue application.');
                    app.component('AibizSwaggerPreviewView', bodyView('AibizSwaggerPreviewView', SwaggerBody));
                    registerViewProvider('VIEW_CUSTOM_SWAGGER_PREVIEW_VIEW', () => new SwaggerPreviewProvider());
                },
            });

        })
    };
}));
