/** Reconstructed business service from the observed runtime-model 0.2.2 entry. */
import type { RuntimeParameters } from './types';

export class ModelRuntimeService {
  static async getRuntimeNodes(
    url: RequestInfo,
    requestHeaders?: HeadersInit,
    params: RuntimeParameters | null = {},
  ): Promise<any> {
    const headers = new Headers(requestHeaders);
    let body: string | undefined = '';
    if (params) {
      try {
        body = JSON.stringify(params);
      } catch (_err) {
        console.log('请求参数转换失败，请检查是否为 json 格式');
      }
    }
    const res = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers,
      body,
    });
    const data = await res.json();
    if (res.status >= 200 && res.status <= 299) {
      return data;
    }
    (res as Response & { data: any }).data = data;
    throw res;
  }

  static async getConfig(baseUrl: string, type: string): Promise<any> {
    const response = await fetch(`${baseUrl}/${this.itemType(type)}.json`);
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    }
    try {
      (response as Response & { data: any }).data = await response.json();
    } catch (_error) {
      // A non-JSON error page must not hide the original HTTP status.
    }
    throw response;
  }

  static itemType(type: string): string {
    switch (type) {
      case 'PSSYSAPP':
        return 'IPSAPPLICATION';
    }
    return 'I' + type.toUpperCase();
  }
}
