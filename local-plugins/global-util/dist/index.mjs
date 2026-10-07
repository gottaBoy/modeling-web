const instances = new WeakMap();
const backgroundProperties = new Set([
    'background', 'background-color', 'background-image', 'background-position',
    'background-position-x', 'background-position-y', 'background-size',
    'background-repeat', 'background-repeat-x', 'background-repeat-y',
    'background-attachment', 'background-origin', 'background-clip',
]);
class ModelingFullscreenUtil {
    constructor(document, onError) {
        this.document = document;
        this.onError = onError;
        this.FullscreenClass = '';
        this.lastError = null;
        this.disposed = false;
        this.onChange = () => {
            if (this.state && this.document.fullscreenElement !== this.state.element)
                this.restore();
        };
        document.addEventListener('fullscreenchange', this.onChange);
    }
    get isFullScreen() {
        return Boolean(this.document.fullscreenElement);
    }
    fail(message) {
        this.lastError = new Error(message);
        // Native UI scripts do not await these methods, so report without rejecting.
        try {
            this.onError(this.lastError);
        }
        catch { }
        return false;
    }
    restore() {
        if (!this.state)
            return;
        const { element, addedClasses, background } = this.state;
        this.state = undefined;
        for (const name of addedClasses)
            element.classList.remove(name);
        element.style.removeProperty('background');
        for (const declaration of background) {
            element.style.setProperty(declaration.name, declaration.value, declaration.priority);
        }
    }
    reconcileBrowserState() {
        this.onChange();
    }
    openElementFullscreen(element, data) {
        if (this.disposed)
            return Promise.resolve(this.fail('Fullscreen utility has been disposed'));
        if (!element || element.ownerDocument !== this.document || !element.isConnected ||
            typeof element.requestFullscreen !== 'function') {
            return Promise.resolve(this.fail('Fullscreen requires a connected element with browser support'));
        }
        if (this.pending) {
            return element === this.pendingElement ? this.pending :
                Promise.resolve(this.fail('Another fullscreen request is pending'));
        }
        if (this.document.fullscreenElement === element)
            return Promise.resolve(true);
        if (this.isFullScreen)
            return Promise.resolve(this.fail('Another element is already fullscreen'));
        this.restore();
        const className = data?.class ?? this.FullscreenClass;
        if (typeof className !== 'string')
            return Promise.resolve(this.fail('Fullscreen class must be a string'));
        const classes = [...new Set(className.split(/\s+/).filter(Boolean))];
        this.lastError = null;
        this.pendingElement = element;
        // Invoke requestFullscreen immediately, preserving the initiating user activation.
        const operation = this.enter(element, classes);
        this.pending = operation;
        void operation.finally(() => {
            this.pending = undefined;
            this.pendingElement = undefined;
        });
        return operation;
    }
    async enter(element, classes) {
        try {
            await element.requestFullscreen();
            if (this.disposed)
                return false;
            if (this.document.fullscreenElement !== element) {
                return this.fail('Browser did not enter fullscreen for the requested element');
            }
            const shorthand = element.style.getPropertyValue('background');
            // Shorthand variables expose empty longhands; mixed priorities require individual declarations.
            const background = shorthand ?
                [{ name: 'background', value: shorthand, priority: element.style.getPropertyPriority('background') }] :
                Array.from({ length: element.style.length }, (_, index) => element.style.item(index))
                    .filter(name => backgroundProperties.has(name))
                    .map(name => ({
                    name, value: element.style.getPropertyValue(name),
                    priority: element.style.getPropertyPriority(name),
                }));
            this.state = {
                element, addedClasses: classes.filter(name => !element.classList.contains(name)),
                background,
            };
            for (const name of this.state.addedClasses)
                element.classList.add(name);
            element.style.setProperty('background', 'var(--ibiz-color-bg-1)');
            return true;
        }
        catch {
            this.restore();
            return this.fail('Browser rejected the fullscreen request');
        }
    }
    async closeElementFullscreen() {
        if (this.pending)
            await this.pending;
        if (!this.isFullScreen) {
            this.restore();
            return true;
        }
        if (this.disposed)
            return this.fail('Fullscreen utility has been disposed');
        try {
            await this.document.exitFullscreen();
            if (this.isFullScreen)
                return this.fail('Browser did not exit fullscreen');
            this.restore();
            this.lastError = null;
            return true;
        }
        catch {
            return this.fail('Browser rejected the fullscreen exit');
        }
    }
    dispose() {
        if (this.disposal)
            return this.disposal;
        this.disposed = true;
        this.document.removeEventListener('fullscreenchange', this.onChange);
        const owned = this.state?.element ?? this.pendingElement;
        this.restore();
        this.disposal = (async () => {
            if (this.pending)
                await this.pending;
            if (owned && this.document.fullscreenElement === owned) {
                try {
                    await this.document.exitFullscreen();
                    if (this.document.fullscreenElement === owned) {
                        return this.fail('Browser did not exit disposed fullscreen');
                    }
                }
                catch {
                    return this.fail('Browser rejected disposed fullscreen exit');
                }
            }
            return true;
        })();
        return this.disposal;
    }
}
class GlobalAppUtil {
    constructor(runtime, document) {
        this.runtime = runtime;
        this.document = document;
        this.sourceStatus = 'independent-local-implementation';
        this.onPageHide = (event) => {
            if (!event.persisted)
                void this.dispose();
        };
        this.onPageShow = (event) => {
            if (event.persisted)
                this.fullscreen.reconcileBrowserState();
        };
        if (typeof runtime.openView?.push !== 'function' || typeof runtime.hub?.getApp !== 'function') {
            throw new Error('Global utilities require the framework openView and application hub');
        }
        this.previousFullscreen = Object.getOwnPropertyDescriptor(runtime, 'fullscreenUtil');
        this.previousGlobal = Object.getOwnPropertyDescriptor(runtime, 'globalAppUtil');
        if (this.previousFullscreen?.configurable === false || this.previousGlobal?.configurable === false) {
            throw new Error('Global utility slots must be configurable');
        }
        if (!Object.isExtensible(runtime) && (!this.previousFullscreen || !this.previousGlobal)) {
            throw new Error('Global utility slots must exist on a non-extensible runtime');
        }
        this.fullscreen = new ModelingFullscreenUtil(document, error => runtime.log?.error?.(error));
        Object.defineProperty(runtime, 'fullscreenUtil', {
            value: this.fullscreen, configurable: true, writable: true, enumerable: true,
        });
        Object.defineProperty(runtime, 'globalAppUtil', {
            value: this, configurable: true, writable: true, enumerable: true,
        });
        document.defaultView?.addEventListener('pagehide', this.onPageHide);
        document.defaultView?.addEventListener('pageshow', this.onPageShow);
    }
    dispose() {
        if (this.disposal)
            return this.disposal;
        this.document.defaultView?.removeEventListener('pagehide', this.onPageHide);
        this.document.defaultView?.removeEventListener('pageshow', this.onPageShow);
        for (const [key, owned, previous] of [
            ['fullscreenUtil', this.fullscreen, this.previousFullscreen],
            ['globalAppUtil', this, this.previousGlobal],
        ]) {
            if (this.runtime[key] !== owned)
                continue;
            if (previous)
                Object.defineProperty(this.runtime, key, previous);
            else
                delete this.runtime[key];
        }
        if (instances.get(this.runtime) === this)
            instances.delete(this.runtime);
        this.disposal = this.fullscreen.dispose();
        return this.disposal;
    }
}
function installGlobalAppUtil(runtime, document) {
    if (!runtime || !document)
        throw new Error('Global utilities require the runtime and document');
    let instance = instances.get(runtime);
    if (!instance) {
        instance = new GlobalAppUtil(runtime, document);
        instances.set(runtime, instance);
    }
    return instance;
}
var index = {
    install(app) {
        const runtime = globalThis.ibiz;
        if (!runtime)
            throw new Error('The iBiz runtime must initialize before global utilities');
        app.provide('aibiz.globalAppUtil', installGlobalAppUtil(runtime, globalThis.document));
    },
};

export { GlobalAppUtil, ModelingFullscreenUtil, index as default, installGlobalAppUtil };
