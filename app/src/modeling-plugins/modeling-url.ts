const DEFAULT_MODELING_WEB_URL = 'http://127.0.0.1:32003/modeldesign/';

type ModelingEnvironment = {
  modelingWebUrl?: string;
};

export function getModelingWebUrl(path = ''): string {
  const environment = (
    globalThis as typeof globalThis & { Environment?: ModelingEnvironment }
  ).Environment;
  const baseUrl = environment?.modelingWebUrl || DEFAULT_MODELING_WEB_URL;
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
