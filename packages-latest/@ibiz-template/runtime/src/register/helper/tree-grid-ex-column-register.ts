import { IDETreeColumn } from '@ibiz/model-core';
import { ITreeGridExColumnProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';

/** 表格列适配器前缀 */
export const TREEGRIDEX_COLUMN_PROVIDER_PREFIX = 'TREEGRIDEX_COLUMN';

/**
 * 注册表格列适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => ITreeGridExColumnProvider} callback 生成表格列适配器的回调
 */
export function registerTreeGridExColumnProvider(
  key: string,
  callback: () => ITreeGridExColumnProvider,
): void {
  ibiz.register.register(
    `${TREEGRIDEX_COLUMN_PROVIDER_PREFIX}_${key}`,
    callback,
  );
}

function getProvider(key: string): ITreeGridExColumnProvider | undefined {
  return ibiz.register.get(
    `${TREEGRIDEX_COLUMN_PROVIDER_PREFIX}_${key}`,
  ) as ITreeGridExColumnProvider;
}

/**
 * 获取表格列适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<ITreeGridExColumnProvider>}
 */
export async function getTreeGridExColumnProvider(
  model: IDETreeColumn,
): Promise<ITreeGridExColumnProvider | undefined> {
  let provider: ITreeGridExColumnProvider | undefined;
  const { columnType, appId, renderSysPFPluginId } =
    model as Required<IDETreeColumn>;

  // 树表格列插件
  if (renderSysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(renderSysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.treeTableColumnPlugin', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  // 找表格列类型
  provider = getProvider(columnType);
  if (!provider) {
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.tableColumnType', {
        key: columnType,
      }),
    );
  } else {
    return provider;
  }
}
