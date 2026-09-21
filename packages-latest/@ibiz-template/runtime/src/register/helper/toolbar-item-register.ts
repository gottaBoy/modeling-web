import { IDEToolbar, IDEToolbarItem } from '@ibiz/model-core';
import { getPluginRegisterKey } from './common-register';
import { IToolbarItemProvider } from '../../interface';
import { CustomRegister } from '../custom-register';

/** 工具栏项适配器前缀 */
export const TOOLBAR_ITEM_PROVIDER_PREFIX = 'TOOLBAR_ITEM';

/**
 * 注册工具栏项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:26
 * @export
 * @param {string} key
 * @param {() => IToolbarItemProvider} callback
 */
export function registerToolbarItemProvider(
  key: string,
  callback: () => IToolbarItemProvider,
): void {
  ibiz.register.register(`${TOOLBAR_ITEM_PROVIDER_PREFIX}_${key}`, callback);
}

/**
 * 获取适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:06
 * @param {string} key
 * @return {*}  {(IToolbarItemProvider | undefined)}
 */
function getProvider(key: string): IToolbarItemProvider | undefined {
  return ibiz.register.get(
    `${TOOLBAR_ITEM_PROVIDER_PREFIX}_${key}`,
  ) as IToolbarItemProvider;
}

/**
 * @description 获取工具栏项适配器
 * @export
 * @param {IDEToolbarItem} model
 * @param {IDEToolbar} toolbarModel
 * @returns {*}  {(Promise<IToolbarItemProvider | undefined>)}
 */
export async function getToolbarItemProvider(
  model: IDEToolbarItem,
  toolbarModel: IDEToolbar,
): Promise<IToolbarItemProvider | undefined> {
  let provider: IToolbarItemProvider | undefined;
  const { sysPFPluginId, appId, itemType } = model as Required<IDEToolbarItem>;

  // 找自定义注册的适配器
  const registerKey = CustomRegister.getRegisterKey(
    TOOLBAR_ITEM_PROVIDER_PREFIX,
    {
      mainModel: model,
      control: toolbarModel,
    },
  );
  provider = getProvider(registerKey);
  if (provider) return provider;
  ibiz.log.debug(
    ibiz.i18n.t('runtime.register.helper.toolbarItemCustomRegistration', {
      registerKey,
    }),
  );

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) provider = getProvider(pluginKey);
    if (provider) return provider;
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.toolbarItem', {
        pluginKey,
      }),
    );
  }

  // 找工具栏项类型
  provider = getProvider(itemType);
  return provider;
}
