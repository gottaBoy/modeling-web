import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { collectPluginReferences } from '../../../scripts/harness-plugin-audit.mjs';
import { inspectNativeThemeReferences } from '../../../scripts/native-theme-references.mjs';

export { inspectNativeThemeReferences };

export const centralNavigationSelectors = Object.freeze({
  tree: '.ibiz-control-treeexpbar .ibiz-control-treeview',
  list: '.el-tree.is-list[role="tree"]',
  selected: '.el-tree-node.is-current > .el-tree-node__content .ibiz-control-treeview-node__label',
  grid: '.ibiz-control-grid',
  rows: '.el-table__body-wrapper tbody > tr.el-table__row',
  empty: '.ibiz-no-data',
  loading: '.el-loading-mask',
  nodeText: '\u5168\u90e8\u65b9\u6848',
});

export function inspectNativeLoginResponse(event, { entry, applicationId }) {
  const url = new URL(entry);
  if (!/^ibizmodeling__(central|modeldesign)$/.test(applicationId) ||
      event?.origin !== url.origin || event?.path !== `/api/${applicationId}/v7/login` ||
      event?.method !== 'POST') {
    throw new Error('Native login requires its exact same-origin application POST');
  }
  if (event.status !== 200) throw new Error(`Native login requires HTTP 200, got ${event.status}`);
  if (!/^application\/json(?:\s*;|$)/i.test(event.contentType ?? '')) {
    throw new Error('Native login requires JSON, not an HTML fallback');
  }
  let payload;
  try { payload = JSON.parse(event.body); }
  catch { throw new Error('Native login returned invalid JSON'); }
  if (!payload || Array.isArray(payload) || typeof payload.token !== 'string' ||
      !payload.token.trim() || payload.token.trim() !== payload.token ||
      /[\x00-\x20\x7f]/.test(payload.token)) {
    throw new Error('Native login requires a nonempty valid token');
  }
  return { origin: event.origin, path: event.path, method: event.method, status: event.status,
    contentType: event.contentType, tokenIssued: true };
}

export async function verifyNativeLogin(page, response, options) {
  const url = new URL(response.url());
  const body = await response.text();
  const evidence = inspectNativeLoginResponse({
    origin: url.origin, path: url.pathname, method: response.request().method(),
    status: response.status(), contentType: response.headers()['content-type'], body,
  }, options);
  const { token } = JSON.parse(body);
  const timeout = options.timeout ?? 10_000;
  if (!Number.isFinite(timeout) || timeout <= 0) throw new Error('Native login requires a positive timeout');
  const expired = new Error('Native login token persistence timed out');
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => reject(expired), timeout);
  });
  try {
    // waitForFunction treats an unresolved predicate Promise as truthy in this runner.
    // Await the actual boolean in the host, including after document replacement.
    for (;;) {
      let persisted;
      try {
        persisted = await Promise.race([page.evaluate(async expected => {
          if (!window.ibiz || typeof window.System?.import !== 'function') return false;
          const core = await window.System.import('@ibiz-template/core');
          return core.getToken() === expected;
        }, token), deadline]);
      } catch (error) {
        if (error === expired) throw error;
        if (!/Execution context was destroyed|Cannot find context with specified id/.test(error.message)) {
          // Browser errors may contain evaluated values; keep authentication errors private.
          throw new Error('Native login token verification failed');
        }
      }
      if (persisted === true) return { ...evidence, tokenPersisted: true };
      await Promise.race([delay(50), deadline]);
    }
  } finally {
    clearTimeout(timer);
  }
}

export async function captureNativeLogin(page, options, submit) {
  if (typeof submit !== 'function') throw new Error('Native login requires a submit action');
  const origin = new URL(options.entry).origin;
  const path = `/api/${options.applicationId}/v7/login`;
  const matches = url => url.origin === origin && url.pathname === path;
  let resolveResponse;
  let rejectResponse;
  const captured = new Promise((resolve, reject) => {
    resolveResponse = resolve;
    rejectResponse = reject;
  });
  captured.catch(() => {});
  let timer;
  // Read the real upstream bytes before forwarding them: login reloads the document.
  const handler = async route => {
    const request = route.request();
    if (request.method() !== 'POST') return route.continue();
    try {
      const response = await route.fetch({ maxRedirects: 0, timeout: options.timeout ?? 20_000 });
      const body = await response.body();
      const snapshot = {
        url: () => request.url(), request: () => request,
        status: () => response.status(), headers: () => response.headers(),
        text: async () => body.toString('utf8'),
      };
      await route.fulfill({ response, body });
      resolveResponse(snapshot);
    } catch (error) {
      rejectResponse(error);
      await route.abort().catch(() => {});
    }
  };
  await page.route(matches, handler);
  try {
    timer = setTimeout(() => rejectResponse(new Error('Native login response timed out')),
      options.timeout ?? 20_000);
    await submit();
    return await verifyNativeLogin(page, await captured, options);
  } finally {
    clearTimeout(timer);
    await page.unroute(matches, handler);
  }
}

export function inspectCentralNavigationRequest(entity, entry, view) {
  if (entity?.codeName !== 'PSDevSln' || entity?.dEAPICodeName2 !== 'psdevslns' ||
      entity?.dynaModelFilePath !== 'PSSYSAPPS/Central/PSAPPDATAENTITIES/PSDevSln.json') {
    throw new Error('Central navigation requires the native PSDevSln entity model');
  }
  if (view?.codeName !== 'PSDevSlnGridView' ||
      view?.dynaModelFilePath !== 'PSSYSAPPS/Central/PSAPPDEVIEWS/PSDevSlnGridView.json' ||
      view?.getPSAppDataEntity?.path !== entity.dynaModelFilePath ||
      !Array.isArray(view?.getPSControls)) {
    throw new Error('Central navigation requires the served native PSDevSlnGridView model');
  }
  const grids = view.getPSControls.filter(control =>
    control?.controlType === 'GRID' && control.name === 'grid');
  if (grids.length !== 1) {
    throw new Error('Central navigation requires one unambiguous grid fetch control');
  }
  const action = grids[0].getFetchPSControlAction;
  const methodId = action?.getPSAppDEMethod?.id;
  if (action?.actionType !== 'DEDATASET' || action?.name !== 'fetch' ||
      action?.getPSAppDEMethod?.modelref !== true ||
      action?.getPSAppDataEntity?.path !== entity.dynaModelFilePath ||
      typeof methodId !== 'string' || !methodId.trim()) {
    throw new Error('Central navigation requires an explicit PSDevSln grid dataset reference');
  }
  const handler = grids[0].getPSControlHandler;
  const handlerFetches = Array.isArray(handler?.getPSHandlerActions) ?
    handler.getPSHandlerActions.filter(action => action?.name === 'fetch') : [];
  const handlerFetch = handlerFetches[0];
  if (handler?.userDRAction !== 'READ' || handlerFetches.length !== 1 ||
      handlerFetch?.actionType !== 'DEDATASET' ||
      handlerFetch?.getPSAppDataEntity?.path !== entity.dynaModelFilePath ||
      handlerFetch?.getPSAppDEMethod?.modelref !== true ||
      handlerFetch?.getPSAppDEMethod?.id !== methodId) {
    throw new Error('Central navigation requires matching grid and READ handler dataset references');
  }
  const methods = Array.isArray(entity.getAllPSAppDEMethods) ?
    entity.getAllPSAppDEMethods.filter(method => method?.codeName === methodId) : [];
  if (methods.length !== 1 || methods[0].methodType !== 'FETCH' ||
      methods[0].builtinMethod === true) {
    throw new Error('Central navigation selected method must be a unique declared non-builtin FETCH');
  }
  const method = methods[0];
  // The model writer defaults missing source types to REMOTE, but preserves DATAQUERY.
  if (method.dataSetType !== undefined && method.dataSetType !== 'REMOTE') {
    throw new Error(`Central navigation selected ${methodId} is not a remote FETCH: ${method.dataSetType}`);
  }
  if (method.actionType !== undefined && method.actionType !== 'REMOTE') {
    throw new Error(`Central navigation selected ${methodId} has a non-remote action: ${method.actionType}`);
  }
  const { requestPath, requestMethod } = method;
  if (typeof requestPath !== 'string' || !/^\/[a-zA-Z0-9_]+$/.test(requestPath) ||
      !['GET', 'POST'].includes(requestMethod)) {
    throw new Error('Central navigation requires explicit requestMethod/requestPath for a local read FETCH');
  }
  return {
    origin: new URL(entry).origin,
    path: `/api/ibizmodeling__central/${entity.dEAPICodeName2}${requestPath}`,
    method: requestMethod,
    dataset: method.codeName,
    dataSetType: method.dataSetType,
  };
}

export function inspectCentralNavigationService(service, entity, expected) {
  if (service?.serviceCodeName !== 'ModelAPI' || entity?.sysAPITag !== service.serviceCodeName ||
      service?.dynaModelFilePath !== 'PSSYSSERVICEAPIS/ModelAPI.json' ||
      !Array.isArray(service?.getPSDEServiceAPIs)) {
    throw new Error('Central navigation requires the native ModelAPI service declaration');
  }
  const apis = service.getPSDEServiceAPIs.filter(api => api?.codeName === entity.codeName);
  const api = apis[0];
  if (apis.length !== 1 || api?.codeName2?.toLowerCase() !== entity.dEAPICodeName2 ||
      !entity.getPSDataEntity?.path || api?.getPSDataEntity?.path !== entity.getPSDataEntity.path) {
    throw new Error('Central navigation service must publish the same PSDevSln entity');
  }
  const methods = Array.isArray(api.getPSDEServiceAPIMethods) ?
    api.getPSDEServiceAPIMethods.filter(method => method?.codeName === expected.dataset) : [];
  const appMethod = entity.getAllPSAppDEMethods?.find(method => method.codeName === expected.dataset);
  const method = methods[0];
  if (methods.length !== 1 || method?.methodType !== 'FETCH' ||
      method?.dataAccessAction !== 'READ' || method?.requestMethod !== expected.method ||
      !appMethod?.dataSetTag || method?.getPSDEDataSet?.id !== appMethod.dataSetTag) {
    throw new Error('Central navigation selected FETCH must be published with a matching READ declaration');
  }
  return {
    modelPath: service.dynaModelFilePath,
    entityPath: api.getPSDataEntity.path,
    method: method.codeName,
    requestMethod: method.requestMethod,
    dataAccessAction: method.dataAccessAction,
    dataset: method.getPSDEDataSet.id,
  };
}

export function matchesCentralNavigationRequest(event, expected) {
  return event?.origin === expected.origin && event?.path === expected.path &&
    event?.method === expected.method;
}

export function inspectCentralNavigationResponse(event, expected) {
  if (!matchesCentralNavigationRequest(event, expected)) {
    throw new Error('Central navigation has no matching browser dataset response');
  }
  if (event.status !== 200) {
    throw new Error(`Central navigation dataset returned HTTP ${event.status}, expected 200`);
  }
  if (!/^application\/(?:json|[a-z0-9.+-]+\+json)(?:\s*;|$)/i.test(event.contentType ?? '')) {
    throw new Error('Central navigation dataset must return JSON, not an HTML fallback');
  }
  let records;
  try {
    records = JSON.parse(event.body);
  } catch {
    throw new Error('Central navigation dataset returned invalid JSON');
  }
  if (!Array.isArray(records) || !records.every(row => row !== null &&
      typeof row === 'object' && !Array.isArray(row) &&
      typeof row.psdevslnid === 'string' && row.psdevslnid.trim() &&
      typeof row.psdevslnname === 'string' && row.psdevslnname.trim())) {
    throw new Error('Central navigation dataset must be a PSDevSln record array');
  }
  return {
    origin: event.origin, path: event.path, method: event.method,
    status: event.status, contentType: event.contentType,
    sha256: createHash('sha256').update(event.body).digest('hex'),
    rowCount: records.length,
    names: records.map(row => row.psdevslnname.trim()),
  };
}

export function inspectCentralNavigationRendering(snapshot, response) {
  if (!response || response.status !== 200 || !Number.isSafeInteger(response.rowCount) ||
      response.rowCount < 0 || !Array.isArray(response.names) ||
      response.names.length !== response.rowCount) {
    throw new Error('Central navigation rendering requires successful dataset evidence');
  }
  if (!snapshot?.treeVisible || !snapshot.listVisible ||
      snapshot.selectedNode !== centralNavigationSelectors.nodeText || !snapshot.gridVisible) {
    throw new Error('Central navigation must render the list-tree selection and its grid');
  }
  if (snapshot.loading) {
    throw new Error('Central navigation grid is still loading');
  }
  if (!Array.isArray(snapshot.rows) || snapshot.rows.length !== response.rowCount) {
    throw new Error('Central navigation rendered row count differs from the dataset response');
  }
  if (response.rowCount === 0) {
    if (!snapshot.emptyVisible) {
      throw new Error('Central navigation empty dataset must render the loaded empty state');
    }
  } else {
    if (snapshot.emptyVisible || !snapshot.rows.every((row, index) =>
      Array.isArray(row.cells) && row.cells.includes(response.names[index]))) {
      throw new Error('Central navigation grid rows do not match the fetched record names');
    }
  }
  return { state: response.rowCount === 0 ? 'loaded-empty' : 'loaded-rows', rowCount: response.rowCount };
}

export function readCentralNavigationDOM(selectors) {
  const visible = element => Boolean(element && element.getClientRects().length &&
    getComputedStyle(element).visibility !== 'hidden');
  const tree = [...document.querySelectorAll(selectors.tree)].find(visible);
  const grid = [...document.querySelectorAll(selectors.grid)].find(visible);
  return {
    treeVisible: visible(tree),
    listVisible: visible(tree?.querySelector(selectors.list)),
    selectedNode: tree?.querySelector(selectors.selected)?.textContent.trim() ?? '',
    gridVisible: visible(grid),
    loading: Boolean(grid && [...grid.querySelectorAll(selectors.loading)].some(visible)),
    rows: grid ? [...grid.querySelectorAll(selectors.rows)].filter(visible).map(row => ({
      cells: [...row.querySelectorAll('.cell')].map(cell => cell.textContent.trim()),
    })) : [],
    emptyVisible: Boolean(grid && [...grid.querySelectorAll(selectors.empty)].some(visible)),
  };
}

export async function verifyCentralNavigation(page, expected, { timeout = 20_000 } = {}) {
  const evidence = { expectedRequest: expected, response: null, rendering: null };
  // Register before devops: the selected child grid can fetch during automatic navigation.
  const received = page.waitForResponse(response => {
    const url = new URL(response.url());
    return matchesCentralNavigationRequest({
      origin: url.origin, path: url.pathname, method: response.request().method(),
    }, expected);
  }, { timeout }).then(response => ({ response }), error => ({ error }));
  try {
    await page.getByText('devops', { exact: true }).first().click();
    await page.waitForURL(/psdevcentercentraltreeexpview/, { timeout });
    const tree = page.locator(centralNavigationSelectors.tree).first();
    await tree.waitFor({ timeout });
    await tree.locator(centralNavigationSelectors.list).waitFor({ timeout });
    const selected = await tree.locator(centralNavigationSelectors.selected).allTextContents();
    if (!selected.includes(centralNavigationSelectors.nodeText)) {
      await tree.getByText(centralNavigationSelectors.nodeText, { exact: true }).click();
    }
    evidence.rendering = await page.evaluate(readCentralNavigationDOM, centralNavigationSelectors);
    const result = await received;
    if (result.error) {
      throw new Error(`Central navigation did not receive ${expected.method} ${expected.path}: ${result.error}`);
    }
    const response = result.response;
    const url = new URL(response.url());
    evidence.response = {
      origin: url.origin, path: url.pathname, method: response.request().method(),
      status: response.status(), contentType: response.headers()['content-type'] ?? '',
    };
    evidence.response = inspectCentralNavigationResponse({
      ...evidence.response, body: await response.body(),
    }, expected);
    await page.waitForURL(/psdevslngridview/, { timeout });
    const deadline = Date.now() + timeout;
    while (true) {
      evidence.rendering = await page.evaluate(readCentralNavigationDOM, centralNavigationSelectors);
      try {
        evidence.loaded = inspectCentralNavigationRendering(evidence.rendering, evidence.response);
        return evidence;
      } catch (error) {
        if (Date.now() >= deadline) throw error;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  } catch (error) {
    error.evidence = evidence;
    throw error;
  }
}

export function inspectNativeAppModel(model, application) {
  if (!['Central', 'ModelDesign'].includes(application)) {
    throw new Error('Unsupported native application');
  }
  const prefix = `PSSYSAPPS/${application}/`;
  const index = model?.getDefaultPSAppIndexView;
  const views = model?.cache?.getPSAppViews;
  if (
    model?.codeName !== application ||
    model?.dynaModelFilePath !== `${prefix}PSSYSAPP.json` ||
    !index?.path?.startsWith(`${prefix}PSAPPINDEXVIEWS/`) ||
    !Array.isArray(views) ||
    !views.some(view => view.dynaModelFilePath === index.path)
  ) {
    throw new Error(`Expected the native ${application} model and its cached index view`);
  }
  const references = collectPluginReferences(model);
  if (references.invalidReferences.length || !references.packages.length) {
    throw new Error(`Invalid or missing native ${application} plugin references`);
  }
  return {
    application,
    modelPath: model.dynaModelFilePath,
    indexPath: index.path,
    plugins: references.packages,
    themes: inspectNativeThemeReferences(model),
  };
}

export function expectedAuthenticationEvent(event, applicationId) {
  if (event.authenticated) return false;
  const appDataPath = `/api/${applicationId}/appdata`;
  if (event.kind === 'response') {
    return event.status === 401 && event.path === appDataPath;
  }
  if (event.kind !== 'console') return false;
  if (
    event.text.includes('responded with a status of 401') &&
    event.path === appDataPath
  ) {
    return true;
  }
  return /Navigation aborted from "\/" to "\/-\/index\/-" via a navigation guard/
    .test(event.text);
}

export function summarizeNativeBrowserReport(applications) {
  const checks = Object.values(applications).flatMap(app => Object.values(app.stages));
  const required = [
    'model', 'plugin-assets', 'login', 'home', 'theme-rendering',
    'navigation', 'reload', 'browser-errors',
  ];
  const passed = ['Central', 'ModelDesign'].every(name =>
    required.every(stage => applications[name]?.stages[stage]?.status === 'PASS')) &&
    checks.every(check => check.status === 'PASS');
  const startupVerified = name => applications[name]?.stages.home?.status === 'PASS' &&
    applications[name]?.stages.model?.status === 'PASS';
  return {
    prerequisiteChecksPassed: passed,
    centralStartupVerified: Boolean(startupVerified('Central')),
    modelDesignStartupVerified: Boolean(startupVerified('ModelDesign')),
    pluginAssetsVerified: ['Central', 'ModelDesign'].every(name =>
      applications[name]?.stages['plugin-assets']?.status === 'PASS'),
    failures: checks.filter(check => check.status !== 'PASS').length,
    coverage: 'native model, plugin assets, authentication, home, theme rendering, navigation and reload',
    remainingAcceptance: ['native editor operations', 'model save', 'fresh-session model readback'],
  };
}
