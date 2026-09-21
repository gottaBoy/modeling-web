import { IDBPortletPart } from '@ibiz/model-core';
import { IPortletProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';

/** 门户部件成员适配器前缀 */
export const PORTLET_PROVIDER_PREFIX = 'PORTLET';

/**
 * 注册门户部件成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IPortletProvider} callback 生成门户部件成员适配器的回调
 */
export function registerPortletProvider(
  key: string,
  callback: () => IPortletProvider,
): void {
  ibiz.register.register(`${PORTLET_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IPortletProvider | undefined {
  return ibiz.register.get(
    `${PORTLET_PROVIDER_PREFIX}_${key}`,
  ) as IPortletProvider;
}

/**
 * @description 获取门户部件成员适配器
 * @export
 * @param {IDBPortletPart} model
 * @returns {*}  {(Promise<IPortletProvider | undefined>)}
 */
export async function getPortletProvider(
  model: IDBPortletPart,
): Promise<IPortletProvider | undefined> {
  let provider: IPortletProvider | undefined;
  const { portletType, sysPFPluginId, appId } =
    model as Required<IDBPortletPart>;
  const registerKey = CustomRegister.getRegisterKey(PORTLET_PROVIDER_PREFIX, {
    mainModel: model,
  });
  provider = getProvider(registerKey);
  if (provider) return provider;
  ibiz.log.debug(
    ibiz.i18n.t('runtime.register.helper.portalCustomRegistration', {
      registerKey,
    }),
  );
  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) provider = getProvider(pluginKey);
    if (provider) return provider;
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.portalWidgetPlugin', {
        pluginKey,
      }),
    );
  }

  // 找门户部件成员类型
  provider = getProvider(portletType);
  if (!provider)
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.portalWidgetMemberType', {
        portletType,
      }),
    );
  return provider;
}
