import { AppFuncCommand, ViewController } from '@ibiz-template/runtime';
import * as HostRuntime from '@ibiz-template/runtime';
import {
  flattenMenus, panelRole, permittedMenu, prepareIndexModel, sideMenuName, sideMenuNames, viewIdentity,
  classifyTodoCounterError,
  consoleDrawerOptions,
} from './model';

type Cleanup = () => void;

export class DesignIndexController extends ViewController {
  public readonly sourceStatus = 'independent-local-implementation';
  public readonly myTodoCount?: number;
  public readonly myTodoCountStatus?: 'pending' | 'ready' | 'unavailable' | 'error';
  public readonly defaultOpenTasks = new Map<string, Promise<unknown>>();
  private readonly cleanups: Cleanup[] = [];
  private readonly menus = new Map<string, any>();
  private readonly protectedTargets = new Set<string>();
  private readonly protectedKeys = new Set<string>();
  private readonly boundPanels = new WeakSet<object>();
  private readonly panelBindings = new WeakMap<object, Promise<void>>();
  private readonly protectedModals = new WeakSet<object>();
  private readonly pendingMenus = new Map<string, Promise<unknown>>();
  private readonly openedDefaults = new Set<string>();
  private live = true;

  constructor(model: any, context: any, params?: any, ctx?: any) {
    super(prepareIndexModel(model), context, params ? { ...params } : undefined, ctx);
  }

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    if (!this.live) return;
    if (!this.engines.length) throw new Error('Host APPINDEXVIEW engine is not installed.');
    this.state.presetClassList.push('aibiz-design-index');
    Object.assign(this.state, {
      designIndexDefaultOpens: {},
      designIndexErrors: [],
      myTodoCount: undefined,
      myTodoCountStatus: 'pending',
    });
    this.loadMyTodoCount().catch(error => {
      if (!this.live) return;
      if (classifyTodoCounterError(error) === 'unavailable') {
        (this.state as any).myTodoCountStatus = 'unavailable';
        (globalThis as any).ibiz.log.warn(error);
        return;
      }
      (this.state as any).myTodoCountStatus = 'error';
      (this.state as any).designIndexErrors.push({
        phase: 'my-todo-counter', message: String(error),
      });
      (globalThis as any).ibiz.log.error(error);
    });
    const registered = (_name: string, controller: any): void => {
      if (controller !== this && controller?.model?.viewType) this.observeChild(controller);
    };
    this.ctx.evt.on('onRegister', registered);
    this.cleanups.push(() => this.ctx.evt.off('onRegister', registered));
  }

  private async loadMyTodoCount(): Promise<void> {
    const runtime = (globalThis as any).ibiz;
    const response = await runtime.net.post('/work_items/count_my_todo', {});
    if (!this.live) return;
    if (typeof response?.status !== 'number' || !Number.isInteger(response.status) ||
        response.status < 200 || response.status > 299) {
      throw Object.assign(new Error('Todo counter requires an actual successful HTTP response.'), {
        status: response?.status, response,
      });
    }
    const count = (response.data as any)?.my_todo_count;
    if (typeof count !== 'number' &&
        (typeof count !== 'string' || !/^\d+$/.test(count))) {
      throw new Error('my_todo_count must be a nonnegative decimal integer.');
    }
    const value = Number(count);
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error('my_todo_count must be a safe nonnegative integer.');
    }
    (this.state as any).myTodoCount = value;
    (this.state as any).myTodoCountStatus = 'ready';
  }

  private listen(target: any, event: string, callback: (...args: any[]) => void): void {
    target.evt.on(event, callback);
    this.cleanups.push(() => target.evt.off(event, callback));
  }

  private patch(target: any, name: string, make: (original: Function) => Function): void {
    const original = target[name];
    if (typeof original !== 'function') throw new Error(`Missing host index method: ${name}.`);
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    const replacement = make(original);
    target[name] = replacement;
    this.cleanups.push(() => {
      if (target[name] !== replacement) return;
      if (descriptor) Object.defineProperty(target, name, descriptor);
      else delete target[name];
    });
  }

  private own(target: any, name: string, value: any): void {
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    target[name] = value;
    this.cleanups.push(() => {
      if (target[name] !== value) return;
      if (descriptor) Object.defineProperty(target, name, descriptor);
      else delete target[name];
    });
  }

  private async initializeMenu(menu: any, control: any): Promise<void> {
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
    const calcDynamicMenu = (HostRuntime as any).calcDynamicMenu;
    if (typeof calcDynamicMenu === 'function') {
      await calcDynamicMenu(control, menu.context, menu.params);
    } else if (control.dynamicMode === 1) {
      throw new Error('Dynamic index menus require the host calcDynamicMenu API.');
    }
    if (!this.live) throw new Error('Design index is destroyed.');
    if (typeof staged.convertMultipleLanguages === 'function') staged.convertMultipleLanguages();
    staged.state.items = control.appMenuItems ?? [];
    staged.flattenAllItems();
    await staged.initAppMenuItemProviders();
    if (!this.live) throw new Error('Design index is destroyed.');
    staged.state.items.forEach((item: any) => staged.initMenuItemState(item));
    for (const [id, previous] of Object.entries(menu.state.menuItemsState) as [string, any][]) {
      const current = staged.state.menuItemsState[id];
      if (!current) continue;
      // Existing restrictions may narrow, but never grant newly denied permissions.
      if (previous.visible === false) current.visible = false;
      if (previous.permitted === false) current.permitted = false;
    }
    this.own(menu, 'appMenu', control);
    this.own(menu, 'allAppMenuItems', staged.allAppMenuItems);
    this.own(menu, 'itemProviders', staged.itemProviders);
    this.own(menu.state, 'menuItemsState', staged.state.menuItemsState);
    this.own(menu.state, 'items', staged.state.items);
  }

  public setLayoutPanel(panel: any): void {
    super.setLayoutPanel(panel);
    const bind = (): void => {
      if (this.live && !this.boundPanels.has(panel)) this.bindPanel(panel);
    };
    if (panel.state.isCreated) bind();
    else this.listen(panel, 'onCreated', bind);
  }

  private bindPanel(panel: any): void {
    const entries = Object.values(panel.panelItems) as any[];
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
    this.patch(nav, 'onViewCreated', original => (event: any): void => {
      original.call(nav, event);
      this.observeChild(event.view, nav.state.currentKey);
    });
    this.patch(nav, 'closeViewByKeys', original => (keys: string[]): Promise<unknown> => {
      const allowed = keys.filter(key => !this.protectedKeys.has(key));
      return allowed.length ? original.call(nav, allowed) : Promise.resolve(false);
    });
    const bindings: Promise<void>[] = [];
    for (const item of entries) {
      const menuName = sideMenuName(item);
      if (!menuName) continue;
      if (this.menus.has(menuName)) throw new Error(`Duplicate index side-menu controller: ${menuName}.`);
      const control = this.model.viewLayoutPanel.controls?.find((entry: any) =>
        entry.name === menuName || entry.id === menuName || entry.codeName === menuName)
        ?? this.model.controls?.find((entry: any) =>
          entry.name === menuName || entry.id === menuName || entry.codeName === menuName);
      if (!item.appMenu) {
        if (!control) throw new Error(`Missing index menu model: ${menuName}.`);
        bindings.push(this.initializeMenu(item, control));
      } else if (item.appMenu.name !== menuName) {
        throw new Error(`Host side-menu model does not match its placeholder: ${menuName}.`);
      }
      this.menus.set(menuName, item);
      this.patch(item, 'handleClickMenuItem', original =>
        (menuItem: any, event: MouseEvent, useDepth = true): Promise<unknown> =>
          this.clickMenu(item, menuItem, event, useDepth, original));
    }
    const binding = Promise.all(bindings).then(() => {});
    this.panelBindings.set(panel, binding);
    binding.catch(error => {
      if (!this.live) return;
      (this.state as any).designIndexErrors.push({
        phase: 'menu-binding', message: String(error),
      });
      (globalThis as any).ibiz.log.error(error);
    });
    for (const menuName of sideMenuNames) {
      const control = this.model.viewLayoutPanel.controls?.find((item: any) => item.name === menuName)
        ?? this.model.controls?.find((item: any) => item.name === menuName);
      if (control?.appMenuItems?.length && !this.menus.has(menuName)) {
        // Some original layouts omit a side-menu placeholder entirely.
        // Keep its model; do not invent a render destination or hide its entries.
        (this.state as any).designIndexErrors.push({
          phase: 'layout', menu: menuName, message: 'Model menu has no host side-menu placeholder.',
        });
      }
    }
  }

  private rememberProtected(item: any, menu: any): void {
    if (!item.disableClose || !item.appFuncId) return;
    const appId = item.appId || menu.context.srfappid || this.context.srfappid;
    const app = (globalThis as any).ibiz.hub.getApp(appId);
    const func = app.getAppFunc(item.appFuncId);
    if (!func || func.appFuncType !== 'APPVIEW' || !func.appViewId) {
      throw new Error(`disableClose requires an APPVIEW function: ${item.appFuncId}.`);
    }
    this.protectedTargets.add(viewIdentity({ id: func.appViewId, appId }));
  }

  private observeChild(view: any, key?: string): void {
    if (!this.live || !view?.model) return;
    const protect = (): void => {
      if (!this.live || !this.protectedTargets.has(viewIdentity(view.model, this.context.srfappid))) return;
      if (key) this.protectedKeys.add(key);
      if (view.modal && !this.protectedModals.has(view.modal)) {
        this.protectedModals.add(view.modal);
        this.patch(view.modal, 'dismiss', original => (...args: any[]): Promise<boolean> =>
          this.live ? Promise.resolve(false) : original.apply(view.modal, args));
      }
    };
    protect();
    // useViewController assigns the real modal after the constructor registers in CTX.
    if (!view.state?.isCreated) this.listen(view, 'onCreated', protect);
  }

  private requireMenuAccess(menu: any, item: any): void {
    if (!this.live) throw new Error('Design index is destroyed.');
    if (!permittedMenu(menu, item)) {
      throw new Error('Index menu is hidden, disabled or not permitted.');
    }
  }

  private clickMenu(
    menu: any, item: any, event: MouseEvent, useDepth: boolean, original: Function,
  ): Promise<unknown> {
    if (!this.live) return Promise.reject(new Error('Design index is destroyed.'));
    if (!permittedMenu(menu, item)) return Promise.reject(new Error('Index menu is hidden, disabled or not permitted.'));
    const key = `${menu.appMenu.name}:${item.id}`;
    const pending = this.pendingMenus.get(key);
    if (pending) return pending;
    // The entry is queued before execution so reentrant/default clicks share one request.
    const task = Promise.resolve().then(async () => {
      this.requireMenuAccess(menu, item);
      this.rememberProtected(item, menu);
      const runtime = (globalThis as any).ibiz;
      if (!item.appFuncId && (item.id || item.name)?.toLowerCase() === 'debug' &&
          !menu.itemProviders?.[item.id]?.onClick) {
        if (typeof runtime.devTool?.triggerVisible !== 'function') {
          throw new Error('DEBUG requires the real host devTool.triggerVisible API.');
        }
        return runtime.devTool.triggerVisible();
      }
      let drawerOptions: Record<string, unknown> | undefined;
      if (menu.appMenu.name === 'bottomsidemenu' &&
          (item.id || item.name)?.toLowerCase() === 'terminal' &&
          item.appFuncId && !menu.itemProviders?.[item.id]?.onClick) {
        const app = await runtime.hub.getApp(item.appId || menu.context.srfappid);
        this.requireMenuAccess(menu, item);
        const func = app.getAppFunc(item.appFuncId);
        if (func?.appFuncType === 'APPVIEW') {
          const config = await runtime.hub.config.view.get(func.appViewId);
          this.requireMenuAccess(menu, item);
          drawerOptions = consoleDrawerOptions(func, config, item.caption);
        }
      }
      this.requireMenuAccess(menu, item);
      if ((!item.disableClose && !drawerOptions) || menu.itemProviders?.[item.id]?.onClick) {
        return original.call(menu, item, event, useDepth);
      }
      const context = menu.context.clone();
      context.srfappid = item.appId || menu.context.srfappid || runtime.env.appId;
      if (menu.routeDepth && useDepth) context.toRouteDepth = menu.routeDepth + 1;
      return runtime.commands.execute(AppFuncCommand.TAG, item.appFuncId,
        context, { ...menu.params }, {
          view: this, event, ctx: this.ctx,
          ...(drawerOptions ? { modalOption: drawerOptions } : {}),
        });
    });
    this.pendingMenus.set(key, task);
    const clear = (): void => {
      if (this.pendingMenus.get(key) === task) this.pendingMenus.delete(key);
    };
    task.then(clear, clear);
    return task;
  }

  protected async onMounted(): Promise<void> {
    await super.onMounted();
    if (!this.live) return;
    if (!this.layoutPanel || !this.boundPanels.has(this.layoutPanel)) {
      throw new Error('Design index layout was not initialized before mount.');
    }
    await this.panelBindings.get(this.layoutPanel);
    if (!this.live) return;
    const runtime = (globalThis as any).ibiz;
    for (const menuName of sideMenuNames) {
      const menu = this.menus.get(menuName);
      if (!menu) continue;
      for (const { item } of flattenMenus(menu.appMenu.appMenuItems)) {
        if (!item.openDefault || !permittedMenu(menu, item)) continue;
        const key = `${menuName}:${item.id}`;
        if (this.openedDefaults.has(key)) continue;
        this.openedDefaults.add(key);
        const status = (this.state as any).designIndexDefaultOpens;
        status[key] = 'pending';
        const task = this.openDefault(menu, item).then(result => {
          if (this.live) status[key] = result === 'existing-route' ? 'existing-route' : 'settled';
          return result;
        }, error => {
          if (this.live) {
            status[key] = 'failed';
            (this.state as any).designIndexErrors.push({
              phase: 'default-open', menu: menuName, item: item.id,
              message: `Default menu failed: ${item.id}.`,
            });
            runtime.log.error(error);
          }
          throw error;
        });
        // Commands may resolve only when a drawer closes; each default must start independently.
        this.defaultOpenTasks.set(key, task);
        task.catch(() => {});
      }
    }
  }

  private async openDefault(menu: any, item: any): Promise<unknown> {
    const runtime = (globalThis as any).ibiz;
    const appId = item.appId || menu.context.srfappid;
    const app = await runtime.hub.getApp(appId);
    const func = item.appFuncId ? app.getAppFunc(item.appFuncId) : undefined;
    if (func?.appFuncType === 'APPVIEW') {
      const config = await runtime.hub.config.view.get(func.appViewId);
      if (!config) throw new Error(`Default menu target configuration is missing: ${item.appFuncId}.`);
      if (!this.live) throw new Error('Design index is destroyed.');
      const nav = (Object.values(this.layoutPanel!.panelItems) as any[])
        .find(entry => panelRole(entry) === 'NAV_POS_INDEX');
      if ((!config.openMode || config.openMode.startsWith('INDEXVIEWTAB')) && nav?.state.currentKey) {
        return 'existing-route';
      }
    }
    if (!this.live) throw new Error('Design index is destroyed.');
    return menu.handleClickMenuItem(item, undefined, true);
  }

  protected async onDestroyed(): Promise<void> {
    this.live = false;
    for (const cleanup of this.cleanups.splice(0).reverse()) cleanup();
    this.menus.clear();
    this.pendingMenus.clear();
    this.defaultOpenTasks.clear();
    this.protectedTargets.clear();
    this.protectedKeys.clear();
    await super.onDestroyed();
  }
}
