/**
 * Local revision of the reconstructed runtime-model business class.
 * The unchanged observed-behavior baseline remains in runtime-model/.1.
 */
import { clone } from 'ramda';
import { loading } from './loading-controller';
import { ModelRuntimeService } from './model-runtime-service';
import { ModelRuntimeStore } from './model-runtime-store';
import { QXStore } from './store-base';
import { runtimeSearchExpression } from './search';
import type {
  LoadingPanelElement,
  RuntimeApiConfiguration,
  RuntimeItem,
  RuntimeParameters,
  RuntimeResponseError,
  RuntimeSelection,
} from './types';

export class ModelRuntimeController {
  readonly store = new QXStore(new ModelRuntimeStore());
  readonly data = this.store.data;
  searchReg = new RegExp('(.*)');
  readonly historyCache = new Map<string, RuntimeItem[]>();
  url!: RequestInfo;
  headers?: HeadersInit;
  configBaseUrl!: string;

  set searchValue(val: string) {
    this.searchReg = runtimeSearchExpression(val);
    this.store.data.searchValue = val;
  }

  get searchValue(): string {
    return this.store.data.searchValue;
  }

  async loadChildren(
    index: number,
    param: RuntimeSelection = {},
  ): Promise<void> {
    const cache = this.getCache(param.id);
    this.data.list.splice(index + 1, this.data.list.length);
    this.data.activeList.splice(index + 1, this.data.activeList.length);
    if (cache) {
      this.data.list.push(cache);
      this.store.forceUpdate('list');
    } else {
      await this.load(param);
    }
  }

  async loadRootData(params: RuntimeParameters = {}): Promise<void> {
    this.data.loaded = false;
    this.data.rootData = {};
    this.data.list = [];
    this.data.activeList = [];
    this.data.errorMessage = null;
    this.clearCache();
    this.data.context = params;
    const param = Object.assign({ srfkey: '#' }, this.data.context);
    const ref = document.getElementById(
      'rootLoadingPanel',
    ) as LoadingPanelElement;
    await ref.show('首次加载...');
    try {
      const data = await ModelRuntimeService.getRuntimeNodes(
        this.url,
        this.headers,
        param,
      );
      const items = await this.formatItems(data);
      if (items && items.length > 0) {
        this.data.rootData = items[0];
        await this.load(this.data.rootData);
        this.setActiveItem(this.data.rootData);
      }
    } catch (err) {
      this.httpError(err);
    } finally {
      this.data.loaded = true;
      await ref.hide();
    }
  }

  async load(param?: RuntimeSelection): Promise<void> {
    return this.loadModelData(param);
  }

  async loadModelData(data: RuntimeSelection = {}): Promise<void> {
    const requestId = data.id;
    const param = Object.assign({ srfkey: requestId || '#' }, this.data.context);
    loading.show();
    try {
      const response = await ModelRuntimeService.getRuntimeNodes(
        this.url,
        this.headers,
        param,
      );
      const items = await this.formatItems(response);
      this.data.list.push(items);
      this.store.forceUpdate('list');
      this.setCache(requestId, items);
    } catch (err) {
      this.httpError(err);
    }
    loading.hide();
  }

  httpError(error: unknown): void {
    const res = error as RuntimeResponseError | null | undefined;
    if (!res || res.status === 401 || !res.data) {
      return;
    }
    let message = res.data.message || res.message;
    if (res.status === 504) {
      message = '模型加载超时，请稍后再试!';
    }
    this.data.errorMessage = message;
  }

  async formatItems(items: any[] = []): Promise<RuntimeItem[]> {
    let type = '';
    if (items.length > 0) {
      try {
        items = items.map(item => {
          return {
            iconcls: item.iconpath,
            id: item.psmodelrtid,
            leaf: item.leafflag === 0 ? false : true,
            srfkey: item.psmodelrtid,
            srfmajortext: item.psmodelrtname,
            text: item.psmodelrtname,
          };
        });
        items.forEach(item => {
          const strArr = item.id.split('@');
          if (strArr[0].indexOf('METHOD') !== -1) {
            type = strArr[2];
          }
        });
      } catch (_error) {
        console.error('动态模型数据格式化：类型计算处理异常');
      }
    }
    let json: RuntimeApiConfiguration | undefined;
    if (!Object.is(type, '')) {
      try {
        const data = await ModelRuntimeService.getConfig(
          this.configBaseUrl,
          type,
        );
        if (typeof data === 'string') {
          try {
            json = JSON.parse(data);
          } catch (_error) {
            console.error('API模型转换异常');
          }
        } else {
          json = data;
        }
      } catch (_err) {
        console.error('配置方法解析异常');
      }
    }
    items.forEach(item => {
      if (item.text && item.text.indexOf(' ==> ') !== -1) {
        const strArr = item.text.split(' ==> ');
        const str = strArr[0];
        const val = strArr[1];
        if (str.indexOf('#') !== -1) {
          const strArr2 = str.split('#');
          item.data = {
            methodName: strArr2[0],
            logicName: strArr2[1],
            val,
          };
        } else {
          item.data = {
            logicName: str,
            val,
          };
        }
      } else {
        item.data = {
          logicName: item.text,
        };
      }
      item.isPopoverShow = false;
    });
    if (json) {
      const keys = Object.keys(json);
      keys.forEach(key => {
        const self = items.find(item => {
          if (key.indexOf(item.data.methodName + '(') !== -1) {
            return true;
          }
          return false;
        });
        if (self) {
          const data = json![key];
          self.data.apiMethod = key;
          self.data.apiDescription = data.description;
          const r = data.return;
          if (r) {
            self.data.apiReturn = this.getMethodReturn(r);
          }
          delete json![key];
        }
      });
      for (const key in json) {
        if (json.hasOwnProperty(key)) {
          const data = json[key];
          const r = data.return;
          items.push({
            asyncmode: true,
            checked: false,
            disable: false,
            disableselect: false,
            enablecheck: false,
            expanded: false,
            isApi: true,
            id: key,
            leaf: true,
            data: {
              apiMethod: key,
              apiDescription: data.description,
              apiReturn: this.getMethodReturn(r),
            },
          });
        }
      }
    }
    return items;
  }

  getMethodReturn(str = ''): string {
    let r = '';
    let type = str;
    if (str.indexOf('<') !== -1) {
      type = str.substring(0, str.indexOf('<'));
      if (str.indexOf('<?>') !== -1) {
        r = '<?>';
      } else {
        let subType = str.substring(str.indexOf('<'));
        subType = subType.substring(
          subType.lastIndexOf('.') + 1,
          subType.length - 1,
        );
        r = `<${subType}>`;
      }
    }
    return type.substring(type.lastIndexOf('.') + 1) + r;
  }

  setCache(id: string | undefined, data: RuntimeItem[]): void {
    if (!id) {
      return;
    }
    this.historyCache.set(id, clone(data));
  }

  getCache(id: string | undefined): RuntimeItem[] | null {
    if (id && this.historyCache.has(id)) {
      return clone(this.historyCache.get(id)!);
    }
    return null;
  }

  clearCache(): void {
    this.historyCache.clear();
  }

  isSearchContent(str: string): boolean {
    return this.searchReg.test(str);
  }

  setActiveItem(data: RuntimeSelection): void {
    this.data.activeList.push(data);
    this.store.forceUpdate('activeList');
  }
}
