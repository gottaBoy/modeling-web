export type Data = Record<string, unknown>;

export interface Entity {
  id: string;
  codeName: string;
  keyAppDEFieldId: string;
}

export interface Response {
  status: number;
  data?: Data;
}

export interface Service {
  exec(method: string, context: Data, data: Data, params: Data): Promise<Response>;
}

export interface ModelEditHost {
  env: { pluginBaseUrl?: string };
  hub: {
    getAppDataEntity(name: string, appId: string): Promise<Entity>;
    getApp(appId: string): {
      deService: { getService(context: Data, entityId: string): Promise<Service> };
    };
  };
  message: { error(message: string): unknown };
  confirm: { warning(options: { title: string; desc: string }): Promise<boolean> };
  uiDomainManager: {
    get(id: string): {
      dataModification: boolean;
      dataChange(): void;
      dataChangeCompleted(): void;
    } | undefined;
  };
}

export function getHost(): ModelEditHost {
  const host = (globalThis as unknown as { ibiz?: ModelEditHost }).ibiz;
  if (!host) throw new Error('Model editing requires the iBiz host.');
  return host;
}
