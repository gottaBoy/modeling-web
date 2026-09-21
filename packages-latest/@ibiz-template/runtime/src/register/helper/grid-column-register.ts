import { IDEGrid, IDEGridColumn } from '@ibiz/model-core';
import { IGridColumnProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';

/** 表格列适配器前缀 */
export const GRIDCOLUMN_PROVIDER_PREFIX = 'GRIDCOLUMN';

/**
 * 注册表格列适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IGridColumnProvider} callback 生成表格列适配器的回调
 */
export function registerGridColumnProvider(
  key: string,
  callback: () => IGridColumnProvider,
): void {
  ibiz.register.register(`${GRIDCOLUMN_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IGridColumnProvider | undefined {
  return ibiz.register.get(
    `${GRIDCOLUMN_PROVIDER_PREFIX}_${key}`,
  ) as IGridColumnProvider;
}

/**
 * 获取表格列适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IGridColumnProvider>}
 */
export async function getGridColumnProvider(
  model: IDEGridColumn,
  grid: IDEGrid,
): Promise<IGridColumnProvider | undefined> {
  let provider: IGridColumnProvider | undefined;
  const { columnType, enableRowEdit, sysPFPluginId, appId } =
    model as Required<IDEGridColumn>;

  // 找自定义注册的适配器
  const registerKey = CustomRegister.getRegisterKey(
    GRIDCOLUMN_PROVIDER_PREFIX,
    {
      mainModel: model,
      control: grid,
    },
  );
  provider = getProvider(registerKey);
  if (!provider) {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.register.helper.gridColumnCustomRegistration', {
        registerKey,
      }),
    );
  } else {
    return provider;
  }

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.tableColumnPlugin', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  const key = enableRowEdit ? `${columnType!}_EDIT` : columnType!;
  // 找表格列类型
  provider = getProvider(key);
  if (!provider) {
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.tableColumnType', {
        key,
      }),
    );
  } else {
    return provider;
  }
}

/**
 * 获取自动表格列适配器
 *
 * @export
 * @param {IDEGridColumn} model
 * @param {IDEGrid} grid
 * @return {*}  {(Promise<IGridColumnProvider | undefined>)}
 */
export async function getAutoGridColumnProvider(
  model: IDEGridColumn,
  grid: IDEGrid,
): Promise<IGridColumnProvider | undefined> {
  let provider: IGridColumnProvider | undefined;
  const { columnType, enableRowEdit, sysPFPluginId, appId } =
    model as Required<IDEGridColumn>;

  // 找自定义注册的适配器
  const registerKey = CustomRegister.getRegisterKey(
    GRIDCOLUMN_PROVIDER_PREFIX,
    {
      mainModel: model,
      control: grid,
    },
  );
  provider = getProvider(registerKey);
  if (!provider) {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.register.helper.gridColumnCustomRegistration', {
        registerKey,
      }),
    );
  } else {
    return provider;
  }

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.tableColumnPlugin', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  const key = enableRowEdit ? `AUTO_${columnType!}_EDIT` : columnType!;
  // 找表格列类型
  provider = getProvider(key);
  if (!provider) {
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.tableColumnType', {
        key,
      }),
    );
  } else {
    return provider;
  }
}
