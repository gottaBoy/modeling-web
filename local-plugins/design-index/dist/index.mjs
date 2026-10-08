import * as HostRuntime from '@ibiz-template/runtime';
import { ViewController, AppFuncCommand, registerViewProvider } from '@ibiz-template/runtime';
import { IBizView } from '@ibiz-template/vue3-util';

const supportedPluginCodes = Object.freeze(['DESIGN_INDEX_VIEW']);
const sideMenuNames = Object.freeze([
    'leftsidemenu', 'rightsidemenu', 'topsidemenu', 'bottomsidemenu',
]);
const requiredControlNames = Object.freeze([
    'appmenu', ...sideMenuNames, 'captionbar',
]);
function copyModel(value) {
    if (Array.isArray(value))
        return value.map(item => copyModel(item));
    if (value && typeof value === 'object') {
        const result = {};
        for (const [key, item] of Object.entries(value)) {
            Object.defineProperty(result, key, {
                value: copyModel(item), enumerable: true, configurable: true, writable: true,
            });
        }
        return result;
    }
    return value;
}
function panelItems(items = []) {
    return items.flatMap(item => [
        item,
        ...panelItems(item.panelItems),
        ...panelItems(item.panelTabPages),
    ]);
}
function restoreRightMenuPlaceholder(model, controls) {
    const menu = controls.find(control => (control.name || control.id) === 'rightsidemenu');
    if (!menu?.appMenuItems?.length)
        return;
    const items = panelItems(model.viewLayoutPanel.rootPanelItems);
    if (items.some(item => item.itemType === 'RAWITEM' &&
        item.rawItem?.predefinedType === 'RIGHT_SIDE_MENU'))
        return;
    // Only the host's unambiguous index scroll layout has a known right destination.
    const containers = items.filter(item => item.itemType === 'CONTAINER' && item.predefinedType === 'CONTAINER_SCROLL' &&
        item.layout?.layout === 'BORDER' &&
        item.panelItems?.filter((child) => child.layoutPos?.layoutPos === 'CENTER').length === 1 &&
        item.panelItems.some((child) => child.predefinedType === 'CONTAINER_SCROLL_MAIN' &&
            child.layoutPos?.layoutPos === 'CENTER' &&
            panelItems(child.panelItems).some(entry => entry.itemType === 'RAWITEM' && entry.rawItem?.predefinedType === 'NAV_POS_INDEX')) &&
        item.panelItems.some((child) => child.predefinedType === 'CONTAINER_SCROLL_LEFT' &&
            child.layoutPos?.layoutPos === 'WEST' &&
            panelItems(child.panelItems).some(entry => entry.itemType === 'RAWITEM' && entry.rawItem?.predefinedType === 'LEFT_SIDE_MENU')));
    if (containers.length !== 1)
        return;
    const container = containers[0];
    if (container.panelItems.some((item) => item.layoutPos?.layoutPos === 'EAST'))
        return;
    if (items.some(item => ['container_scroll_right', 'right_side_menu'].includes(item.id))) {
        throw new Error('Index right-menu placeholder IDs conflict with existing layout items.');
    }
    container.panelItems.push({
        id: 'container_scroll_right',
        itemType: 'CONTAINER',
        itemStyle: 'DEFAULT',
        predefinedType: 'CONTAINER_SCROLL_RIGHT',
        actionGroupExtractMode: 'ITEM',
        dataRegionType: 'INHERIT',
        layout: { layout: 'BORDER' },
        layoutPos: { layout: 'BORDER', layoutPos: 'EAST', width: 200, widthMode: 'PX' },
        contentWidth: 200,
        width: 200,
        panelItems: [{
                id: 'right_side_menu',
                itemType: 'RAWITEM',
                itemStyle: 'DEFAULT',
                rawItem: { id: 'right_side_menu', predefinedType: 'RIGHT_SIDE_MENU' },
                layoutPos: {
                    layout: 'BORDER', layoutPos: 'CENTER', heightMode: 'FULL', widthMode: 'FULL',
                },
            }],
    });
}
// Runtime receives the model-helper result, not the getPS* transport model.
function prepareIndexModel(model) {
    if (!model || model.viewType !== 'APPINDEXVIEW' || !model.viewLayoutPanel) {
        throw new Error('DESIGN_INDEX_VIEW requires a host-transformed APPINDEXVIEW with viewLayoutPanel.');
    }
    const result = copyModel(model);
    const controls = [
        ...(result.controls ?? []), ...(result.viewLayoutPanel.controls ?? []),
    ];
    for (const name of requiredControlNames) {
        const found = controls.filter(control => (control.name || control.id) === name);
        if (found.length !== 1)
            throw new Error(`Index model requires exactly one ${name} control.`);
    }
    if (result.sysPFPluginId && /swagger/i.test(result.sysPFPluginId)) {
        throw new Error('The independent index provider does not implement Swagger.');
    }
    restoreRightMenuPlaceholder(result, controls);
    return result;
}
function flattenMenus(items = [], ancestors = []) {
    return items.flatMap(item => [
        { item, ancestors },
        ...flattenMenus(item.appMenuItems ?? [], [...ancestors, item]),
    ]);
}
function permittedMenu(menu, item) {
    const found = flattenMenus(menu.appMenu?.appMenuItems ?? []).find(entry => entry.item === item);
    if (!found)
        return false;
    return [...found.ancestors, item].every(entry => {
        const status = menu.state.menuItemsState?.[entry.id];
        return !entry.hidden && !entry.disabled && status?.visible === true && status.permitted !== false;
    });
}
function panelRole(item) {
    const roles = {
        NAV_POS_INDEX: 'NAV_POS_INDEX', NAV_TABS: 'NAV_TABS', SHORTCUT: 'SHORTCUT',
        LEFT_SIDE_MENU: 'LEFT_SIDE_MENU', RIGHT_SIDE_MENU: 'RIGHT_SIDE_MENU',
        TOP_SIDE_MENU: 'TOP_SIDE_MENU', BOTTOM_SIDE_MENU: 'BOTTOM_SIDE_MENU',
        LEFTSIDEMENU: 'LEFT_SIDE_MENU', RIGHTSIDEMENU: 'RIGHT_SIDE_MENU',
        TOPSIDEMENU: 'TOP_SIDE_MENU', BOTTOMSIDEMENU: 'BOTTOM_SIDE_MENU',
    };
    for (const value of [
        item.model?.rawItem?.predefinedType, item.model?.predefinedType,
        item.model?.id, item.model?.name, item.id, item.name,
    ]) {
        if (typeof value === 'string' && roles[value.toUpperCase()]) {
            return roles[value.toUpperCase()];
        }
    }
    return undefined;
}
function sideMenuName(item) {
    const roles = {
        LEFT_SIDE_MENU: 'leftsidemenu', RIGHT_SIDE_MENU: 'rightsidemenu',
        TOP_SIDE_MENU: 'topsidemenu', BOTTOM_SIDE_MENU: 'bottomsidemenu',
    };
    const role = panelRole(item);
    return (role && roles[role]) ||
        (sideMenuNames.includes(item.appMenu?.name) ? item.appMenu.name : undefined);
}
function viewIdentity(model, appId) {
    return `${String(model.appId ?? appId ?? '').toLowerCase()}:${String(model.id ?? '').toLowerCase()}`;
}

class DesignIndexController extends ViewController {
    constructor(model, context, params, ctx) {
        super(prepareIndexModel(model), context, params ? { ...params } : undefined, ctx);
        this.sourceStatus = 'independent-local-implementation';
        this.defaultOpenTasks = new Map();
        this.cleanups = [];
        this.menus = new Map();
        this.protectedTargets = new Set();
        this.protectedKeys = new Set();
        this.boundPanels = new WeakSet();
        this.panelBindings = new WeakMap();
        this.protectedModals = new WeakSet();
        this.pendingMenus = new Map();
        this.openedDefaults = new Set();
        this.live = true;
    }
    async onCreated() {
        await super.onCreated();
        if (!this.live)
            return;
        if (!this.engines.length)
            throw new Error('Host APPINDEXVIEW engine is not installed.');
        this.state.presetClassList.push('aibiz-design-index');
        Object.assign(this.state, {
            designIndexDefaultOpens: {},
            designIndexErrors: [],
            myTodoCount: undefined,
        });
        this.loadMyTodoCount().catch(error => {
            if (!this.live)
                return;
            this.state.designIndexErrors.push({
                phase: 'my-todo-counter', message: String(error),
            });
            globalThis.ibiz.log.error(error);
        });
        const registered = (_name, controller) => {
            if (controller !== this && controller?.model?.viewType)
                this.observeChild(controller);
        };
        this.ctx.evt.on('onRegister', registered);
        this.cleanups.push(() => this.ctx.evt.off('onRegister', registered));
    }
    async loadMyTodoCount() {
        const runtime = globalThis.ibiz;
        const response = await runtime.net.post('/work_items/count_my_todo', {});
        const count = response.data?.my_todo_count;
        if (typeof count !== 'number' &&
            (typeof count !== 'string' || !/^\d+$/.test(count))) {
            throw new Error('my_todo_count must be a nonnegative decimal integer.');
        }
        const value = Number(count);
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new Error('my_todo_count must be a safe nonnegative integer.');
        }
        this.state.myTodoCount = value;
    }
    listen(target, event, callback) {
        target.evt.on(event, callback);
        this.cleanups.push(() => target.evt.off(event, callback));
    }
    patch(target, name, make) {
        const original = target[name];
        if (typeof original !== 'function')
            throw new Error(`Missing host index method: ${name}.`);
        const descriptor = Object.getOwnPropertyDescriptor(target, name);
        const replacement = make(original);
        target[name] = replacement;
        this.cleanups.push(() => {
            if (target[name] !== replacement)
                return;
            if (descriptor)
                Object.defineProperty(target, name, descriptor);
            else
                delete target[name];
        });
    }
    own(target, name, value) {
        const descriptor = Object.getOwnPropertyDescriptor(target, name);
        target[name] = value;
        this.cleanups.push(() => {
            if (target[name] !== value)
                return;
            if (descriptor)
                Object.defineProperty(target, name, descriptor);
            else
                delete target[name];
        });
    }
    async initializeMenu(menu, control) {
        for (const method of [
            'flattenAllItems', 'initAppMenuItemProviders', 'initMenuItemState',
        ]) {
            if (typeof menu[method] !== 'function') {
                throw new Error(`Missing host side-menu method: ${method}.`);
            }
        }
        // Stage host initialization so late provider loads cannot mutate a disposed controller.
        const staged = Object.create(menu);
        Object.assign(staged, {
            appMenu: control,
            state: { ...menu.state, items: [], menuItemsState: {} },
            itemProviders: { ...menu.itemProviders },
        });
        const calcDynamicMenu = HostRuntime.calcDynamicMenu;
        if (typeof calcDynamicMenu === 'function') {
            await calcDynamicMenu(control, menu.context, menu.params);
        }
        else if (control.dynamicMode === 1) {
            throw new Error('Dynamic index menus require the host calcDynamicMenu API.');
        }
        if (!this.live)
            throw new Error('Design index is destroyed.');
        if (typeof staged.convertMultipleLanguages === 'function')
            staged.convertMultipleLanguages();
        staged.state.items = control.appMenuItems ?? [];
        staged.flattenAllItems();
        await staged.initAppMenuItemProviders();
        if (!this.live)
            throw new Error('Design index is destroyed.');
        staged.state.items.forEach((item) => staged.initMenuItemState(item));
        for (const [id, previous] of Object.entries(menu.state.menuItemsState)) {
            const current = staged.state.menuItemsState[id];
            if (!current)
                continue;
            // Existing restrictions may narrow, but never grant newly denied permissions.
            if (previous.visible === false)
                current.visible = false;
            if (previous.permitted === false)
                current.permitted = false;
        }
        this.own(menu, 'appMenu', control);
        this.own(menu, 'allAppMenuItems', staged.allAppMenuItems);
        this.own(menu, 'itemProviders', staged.itemProviders);
        this.own(menu.state, 'menuItemsState', staged.state.menuItemsState);
        this.own(menu.state, 'items', staged.state.items);
    }
    setLayoutPanel(panel) {
        super.setLayoutPanel(panel);
        const bind = () => {
            if (this.live && !this.boundPanels.has(panel))
                this.bindPanel(panel);
        };
        if (panel.state.isCreated)
            bind();
        else
            this.listen(panel, 'onCreated', bind);
    }
    bindPanel(panel) {
        const entries = Object.values(panel.panelItems);
        const nav = entries.find(item => panelRole(item) === 'NAV_POS_INDEX');
        const tabs = entries.find(item => panelRole(item) === 'NAV_TABS');
        const shortcut = entries.find(item => panelRole(item) === 'SHORTCUT');
        if (!nav || !tabs || !shortcut) {
            throw new Error('Index layout requires host NAV_POS_INDEX, NAV_TABS and SHORTCUT controllers.');
        }
        const shortcutProvider = panel.providers[shortcut.model.id];
        if (shortcutProvider?.component !== 'IBizShortCut') {
            throw new Error('Host RAWITEM_SHORTCUT must resolve to IBizShortCut, not USER raw content.');
        }
        this.boundPanels.add(panel);
        this.patch(nav, 'onViewCreated', original => (event) => {
            original.call(nav, event);
            this.observeChild(event.view, nav.state.currentKey);
        });
        this.patch(nav, 'closeViewByKeys', original => (keys) => {
            const allowed = keys.filter(key => !this.protectedKeys.has(key));
            return allowed.length ? original.call(nav, allowed) : Promise.resolve(false);
        });
        const bindings = [];
        for (const item of entries) {
            const menuName = sideMenuName(item);
            if (!menuName)
                continue;
            if (this.menus.has(menuName))
                throw new Error(`Duplicate index side-menu controller: ${menuName}.`);
            const control = this.model.viewLayoutPanel.controls?.find((entry) => entry.name === menuName || entry.id === menuName || entry.codeName === menuName)
                ?? this.model.controls?.find((entry) => entry.name === menuName || entry.id === menuName || entry.codeName === menuName);
            if (!item.appMenu) {
                if (!control)
                    throw new Error(`Missing index menu model: ${menuName}.`);
                bindings.push(this.initializeMenu(item, control));
            }
            else if (item.appMenu.name !== menuName) {
                throw new Error(`Host side-menu model does not match its placeholder: ${menuName}.`);
            }
            this.menus.set(menuName, item);
            this.patch(item, 'handleClickMenuItem', original => (menuItem, event, useDepth = true) => this.clickMenu(item, menuItem, event, useDepth, original));
        }
        const binding = Promise.all(bindings).then(() => { });
        this.panelBindings.set(panel, binding);
        binding.catch(error => {
            if (!this.live)
                return;
            this.state.designIndexErrors.push({
                phase: 'menu-binding', message: String(error),
            });
            globalThis.ibiz.log.error(error);
        });
        for (const menuName of sideMenuNames) {
            const control = this.model.viewLayoutPanel.controls?.find((item) => item.name === menuName)
                ?? this.model.controls?.find((item) => item.name === menuName);
            if (control?.appMenuItems?.length && !this.menus.has(menuName)) {
                // Some original layouts omit a side-menu placeholder entirely.
                // Keep its model; do not invent a render destination or hide its entries.
                this.state.designIndexErrors.push({
                    phase: 'layout', menu: menuName, message: 'Model menu has no host side-menu placeholder.',
                });
            }
        }
    }
    rememberProtected(item, menu) {
        if (!item.disableClose || !item.appFuncId)
            return;
        const appId = item.appId || menu.context.srfappid || this.context.srfappid;
        const app = globalThis.ibiz.hub.getApp(appId);
        const func = app.getAppFunc(item.appFuncId);
        if (!func || func.appFuncType !== 'APPVIEW' || !func.appViewId) {
            throw new Error(`disableClose requires an APPVIEW function: ${item.appFuncId}.`);
        }
        this.protectedTargets.add(viewIdentity({ id: func.appViewId, appId }));
    }
    observeChild(view, key) {
        if (!this.live || !view?.model)
            return;
        const protect = () => {
            if (!this.live || !this.protectedTargets.has(viewIdentity(view.model, this.context.srfappid)))
                return;
            if (key)
                this.protectedKeys.add(key);
            if (view.modal && !this.protectedModals.has(view.modal)) {
                this.protectedModals.add(view.modal);
                this.patch(view.modal, 'dismiss', original => (...args) => this.live ? Promise.resolve(false) : original.apply(view.modal, args));
            }
        };
        protect();
        // useViewController assigns the real modal after the constructor registers in CTX.
        if (!view.state?.isCreated)
            this.listen(view, 'onCreated', protect);
    }
    clickMenu(menu, item, event, useDepth, original) {
        if (!this.live)
            return Promise.reject(new Error('Design index is destroyed.'));
        if (!permittedMenu(menu, item))
            return Promise.reject(new Error('Index menu is hidden, disabled or not permitted.'));
        const key = `${menu.appMenu.name}:${item.id}`;
        const pending = this.pendingMenus.get(key);
        if (pending)
            return pending;
        // The entry is queued before execution so reentrant/default clicks share one request.
        const task = Promise.resolve().then(async () => {
            if (!this.live)
                throw new Error('Design index is destroyed.');
            this.rememberProtected(item, menu);
            const runtime = globalThis.ibiz;
            if (!item.appFuncId && (item.id || item.name)?.toLowerCase() === 'debug' &&
                !menu.itemProviders?.[item.id]?.onClick) {
                if (typeof runtime.devTool?.triggerVisible !== 'function') {
                    throw new Error('DEBUG requires the real host devTool.triggerVisible API.');
                }
                return runtime.devTool.triggerVisible();
            }
            if (!item.disableClose || menu.itemProviders?.[item.id]?.onClick) {
                return original.call(menu, item, event, useDepth);
            }
            const context = menu.context.clone();
            context.srfappid = item.appId || menu.context.srfappid || runtime.env.appId;
            if (menu.routeDepth && useDepth)
                context.toRouteDepth = menu.routeDepth + 1;
            return runtime.commands.execute(AppFuncCommand.TAG, item.appFuncId, context, { ...menu.params }, { view: this, event, ctx: this.ctx });
        });
        this.pendingMenus.set(key, task);
        const clear = () => {
            if (this.pendingMenus.get(key) === task)
                this.pendingMenus.delete(key);
        };
        task.then(clear, clear);
        return task;
    }
    async onMounted() {
        await super.onMounted();
        if (!this.live)
            return;
        if (!this.layoutPanel || !this.boundPanels.has(this.layoutPanel)) {
            throw new Error('Design index layout was not initialized before mount.');
        }
        await this.panelBindings.get(this.layoutPanel);
        if (!this.live)
            return;
        const runtime = globalThis.ibiz;
        for (const menuName of sideMenuNames) {
            const menu = this.menus.get(menuName);
            if (!menu)
                continue;
            for (const { item } of flattenMenus(menu.appMenu.appMenuItems)) {
                if (!item.openDefault || !permittedMenu(menu, item))
                    continue;
                const key = `${menuName}:${item.id}`;
                if (this.openedDefaults.has(key))
                    continue;
                this.openedDefaults.add(key);
                const status = this.state.designIndexDefaultOpens;
                status[key] = 'pending';
                const task = this.openDefault(menu, item).then(result => {
                    if (this.live)
                        status[key] = result === 'existing-route' ? 'existing-route' : 'settled';
                    return result;
                }, error => {
                    if (this.live) {
                        status[key] = 'failed';
                        this.state.designIndexErrors.push({
                            phase: 'default-open', menu: menuName, item: item.id,
                            message: `Default menu failed: ${item.id}.`,
                        });
                        runtime.log.error(error);
                    }
                    throw error;
                });
                // Commands may resolve only when a drawer closes; each default must start independently.
                this.defaultOpenTasks.set(key, task);
                task.catch(() => { });
            }
        }
    }
    async openDefault(menu, item) {
        const runtime = globalThis.ibiz;
        const appId = item.appId || menu.context.srfappid;
        const app = await runtime.hub.getApp(appId);
        const func = item.appFuncId ? app.getAppFunc(item.appFuncId) : undefined;
        if (func?.appFuncType === 'APPVIEW') {
            const config = await runtime.hub.config.view.get(func.appViewId);
            if (!config)
                throw new Error(`Default menu target configuration is missing: ${item.appFuncId}.`);
            if (!this.live)
                throw new Error('Design index is destroyed.');
            const nav = Object.values(this.layoutPanel.panelItems)
                .find(entry => panelRole(entry) === 'NAV_POS_INDEX');
            if ((!config.openMode || config.openMode.startsWith('INDEXVIEWTAB')) && nav?.state.currentKey) {
                return 'existing-route';
            }
        }
        if (!this.live)
            throw new Error('Design index is destroyed.');
        return menu.handleClickMenuItem(item, undefined, true);
    }
    async onDestroyed() {
        this.live = false;
        for (const cleanup of this.cleanups.splice(0).reverse())
            cleanup();
        this.menus.clear();
        this.pendingMenus.clear();
        this.defaultOpenTasks.clear();
        this.protectedTargets.clear();
        this.protectedKeys.clear();
        await super.onDestroyed();
    }
}

class DesignIndexProvider {
    constructor() {
        this.component = 'AibizDesignIndexView';
    }
    createController(model, context, params, ctx) {
        return new DesignIndexController(model, context, params, ctx);
    }
}
var index = {
    install(app) {
        if (!IBizView || typeof app?.component !== 'function') {
            throw new Error('Design index requires the installed host IBizView and a Vue application.');
        }
        // An alias preserves the host component and does not reinstall its DEFAULT provider.
        app.component('AibizDesignIndexView', IBizView);
        registerViewProvider('VIEW_CUSTOM_DESIGN_INDEX_VIEW', () => new DesignIndexProvider());
    },
};

export { DesignIndexController, DesignIndexProvider, index as default, requiredControlNames, supportedPluginCodes };
