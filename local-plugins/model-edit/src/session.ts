import type { Data, Entity, ModelEditHost, Service } from './contracts';

export class ModelEditSession {
  state = {
    value: '', loaded: false, loading: false, saving: false,
    dirty: false, hasSaved: false, error: '',
  };
  private disposed = false;
  private baseline = '';
  private service?: Service;
  private entity?: Entity;

  constructor(
    private host: ModelEditHost,
    private codeName: string,
    private context: Data,
    private params: Data,
    public readonly: boolean,
  ) {}

  get active(): boolean { return !this.disposed; }
  get busy(): boolean { return this.state.loading || this.state.saving; }

  private dirty(value: boolean): void {
    this.state.dirty = value;
    const id = this.context.srfsessionid;
    const domain = typeof id === 'string' ? this.host.uiDomainManager.get(id) : undefined;
    if (domain && domain.dataModification !== value) {
      if (value) domain.dataChange();
      else domain.dataChangeCompleted();
    }
  }

  private fail(message: string): false {
    if (this.active) {
      this.state.error = message;
      this.host.message.error(message);
    }
    return false;
  }

  setValue(value: string): void {
    if (!this.active || this.readonly || !this.state.loaded || this.busy) return;
    this.state.value = value;
    this.dirty(value !== this.baseline);
  }

  async load(): Promise<boolean> {
    if (!this.active || this.busy) return false;
    this.state.loading = true;
    this.state.error = '';
    this.state.loaded = false;
    try {
      const appId = this.context.srfappid;
      if (typeof appId !== 'string' || !appId) throw new Error('Missing application.');
      const entity = await this.host.hub.getAppDataEntity(this.codeName, appId);
      if (!this.active) return false;
      if (!entity?.id || !entity.codeName || !entity.keyAppDEFieldId) {
        throw new Error('Incomplete entity metadata.');
      }
      const key = this.context[entity.codeName.toLowerCase()];
      if ((typeof key !== 'string' && typeof key !== 'number') || key === '') {
        throw new Error('Missing model key.');
      }
      const service = await this.host.hub.getApp(appId).deService.getService(this.context, entity.id);
      if (!this.active) return false;
      const response = await service.exec('ExportModelV2', this.context, {}, this.params);
      if (!this.active) return false;
      const model = response.data?.model;
      if (response.status !== 200 || !model || typeof model !== 'object' || Array.isArray(model)) {
        throw new Error('Model export failed.');
      }
      const value = JSON.stringify(model, null, 4);
      this.entity = entity;
      this.service = service;
      this.baseline = value;
      this.state.value = value;
      this.state.loaded = true;
      this.dirty(false);
      return true;
    } catch {
      return this.fail('The model could not be loaded.');
    } finally {
      if (this.active) this.state.loading = false;
    }
  }

  async save(): Promise<boolean> {
    if (!this.active || this.readonly || this.busy || !this.state.loaded) return false;
    let model: Data;
    try {
      model = JSON.parse(this.state.value);
      if (!model || typeof model !== 'object' || Array.isArray(model)) throw new Error('Not an object.');
    } catch {
      return this.fail('The model must be a valid JSON object.');
    }
    if (!this.entity || !this.service) return false;
    this.state.saving = true;
    this.state.error = '';
    try {
      const entity = this.entity;
      const input: Data = {
        [entity.keyAppDEFieldId]: this.context[entity.codeName.toLowerCase()],
        srfmodelv2scope: this.context.srfmodelv2scope,
        model,
      };
      const response = await this.service.exec('ImportModelV2', this.context, input, this.params);
      if (!this.active) return false;
      if (response.status !== 200) throw new Error('Model import failed.');
      this.baseline = this.state.value;
      this.state.hasSaved = true;
      this.dirty(false);
      return true;
    } catch {
      return this.fail('The model could not be saved.');
    } finally {
      if (this.active) this.state.saving = false;
    }
  }

  dispose(): void {
    this.disposed = true;
    this.service = undefined;
    this.entity = undefined;
  }
}
