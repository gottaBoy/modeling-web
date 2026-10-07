export const supportedPluginCodes = Object.freeze(['DESIGN_INDEX_VIEW']);
export const sideMenuNames = Object.freeze([
  'leftsidemenu', 'rightsidemenu', 'topsidemenu', 'bottomsidemenu',
]);
export const requiredControlNames = Object.freeze([
  'appmenu', ...sideMenuNames, 'captionbar',
]);

export function copyModel<T>(value: T): T {
  if (Array.isArray(value)) return value.map(item => copyModel(item)) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      Object.defineProperty(result, key, {
        value: copyModel(item), enumerable: true, configurable: true, writable: true,
      });
    }
    return result as T;
  }
  return value;
}

function panelItems(items: any[] = []): any[] {
  return items.flatMap(item => [
    item,
    ...panelItems(item.panelItems),
    ...panelItems(item.panelTabPages),
  ]);
}

function restoreRightMenuPlaceholder(model: any, controls: any[]): void {
  const menu = controls.find(control => (control.name || control.id) === 'rightsidemenu');
  if (!menu?.appMenuItems?.length) return;
  const items = panelItems(model.viewLayoutPanel.rootPanelItems);
  if (items.some(item => item.itemType === 'RAWITEM' &&
    item.rawItem?.predefinedType === 'RIGHT_SIDE_MENU')) return;

  // Only the host's unambiguous index scroll layout has a known right destination.
  const containers = items.filter(item =>
    item.itemType === 'CONTAINER' && item.predefinedType === 'CONTAINER_SCROLL' &&
    item.layout?.layout === 'BORDER' &&
    item.panelItems?.filter((child: any) => child.layoutPos?.layoutPos === 'CENTER').length === 1 &&
    item.panelItems.some((child: any) => child.predefinedType === 'CONTAINER_SCROLL_MAIN' &&
      child.layoutPos?.layoutPos === 'CENTER' &&
      panelItems(child.panelItems).some(entry =>
        entry.itemType === 'RAWITEM' && entry.rawItem?.predefinedType === 'NAV_POS_INDEX')) &&
    item.panelItems.some((child: any) => child.predefinedType === 'CONTAINER_SCROLL_LEFT' &&
      child.layoutPos?.layoutPos === 'WEST' &&
      panelItems(child.panelItems).some(entry =>
        entry.itemType === 'RAWITEM' && entry.rawItem?.predefinedType === 'LEFT_SIDE_MENU')));
  if (containers.length !== 1) return;
  const container = containers[0];
  if (container.panelItems.some((item: any) => item.layoutPos?.layoutPos === 'EAST')) return;
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
export function prepareIndexModel(model: any): any {
  if (!model || model.viewType !== 'APPINDEXVIEW' || !model.viewLayoutPanel) {
    throw new Error('DESIGN_INDEX_VIEW requires a host-transformed APPINDEXVIEW with viewLayoutPanel.');
  }
  const result = copyModel(model);
  const controls = [
    ...(result.controls ?? []), ...(result.viewLayoutPanel.controls ?? []),
  ];
  for (const name of requiredControlNames) {
    const found = controls.filter(control => (control.name || control.id) === name);
    if (found.length !== 1) throw new Error(`Index model requires exactly one ${name} control.`);
  }
  if (result.sysPFPluginId && /swagger/i.test(result.sysPFPluginId)) {
    throw new Error('The independent index provider does not implement Swagger.');
  }
  restoreRightMenuPlaceholder(result, controls);
  return result;
}

export function flattenMenus(items: any[] = [], ancestors: any[] = []): any[] {
  return items.flatMap(item => [
    { item, ancestors },
    ...flattenMenus(item.appMenuItems ?? [], [...ancestors, item]),
  ]);
}

export function permittedMenu(menu: any, item: any): boolean {
  const found = flattenMenus(menu.appMenu?.appMenuItems ?? []).find(entry => entry.item === item);
  if (!found) return false;
  return [...found.ancestors, item].every(entry => {
    const status = menu.state.menuItemsState?.[entry.id];
    return !entry.hidden && !entry.disabled && status?.visible === true && status.permitted !== false;
  });
}

export function panelRole(item: any): string | undefined {
  const roles: Record<string, string> = {
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

export function sideMenuName(item: any): string | undefined {
  const roles: Record<string, string> = {
    LEFT_SIDE_MENU: 'leftsidemenu', RIGHT_SIDE_MENU: 'rightsidemenu',
    TOP_SIDE_MENU: 'topsidemenu', BOTTOM_SIDE_MENU: 'bottomsidemenu',
  };
  const role = panelRole(item);
  return (role && roles[role]) ||
    (sideMenuNames.includes(item.appMenu?.name) ? item.appMenu.name : undefined);
}

export function viewIdentity(model: any, appId?: string): string {
  return `${String(model.appId ?? appId ?? '').toLowerCase()}:${String(model.id ?? '').toLowerCase()}`;
}
