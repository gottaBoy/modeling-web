import { IDEForm, IDEFormDetail } from '@ibiz/model-core';
import { IFormDetailProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';

/** 表单成员适配器前缀 */
export const FORMDETAIL_PROVIDER_PREFIX = 'FORMDETAIL';

/**
 * 注册表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IFormDetailProvider} callback 生成表单成员适配器的回调
 */
export function registerFormDetailProvider(
  key: string,
  callback: () => IFormDetailProvider,
): void {
  ibiz.register.register(`${FORMDETAIL_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IFormDetailProvider | undefined {
  return ibiz.register.get(
    `${FORMDETAIL_PROVIDER_PREFIX}_${key}`,
  ) as IFormDetailProvider;
}

/**
 * 获取表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IFormDetailProvider>}
 */
export async function getFormDetailProvider(
  model: IDEFormDetail,
  formModel: IDEForm,
): Promise<IFormDetailProvider | undefined> {
  let provider: IFormDetailProvider | undefined;
  const { detailType, sysPFPluginId, appId } = model as Required<IDEFormDetail>;

  // 找自定义注册的适配器
  const registerKey = CustomRegister.getRegisterKey(
    FORMDETAIL_PROVIDER_PREFIX,
    {
      mainModel: model,
      control: formModel,
    },
  );
  provider = getProvider(registerKey);
  if (!provider) {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.register.helper.formDetailCustomRegistration', {
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
        ibiz.i18n.t('runtime.register.helper.formMemberPlugin', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  // 找表单成员类型
  provider = getProvider(detailType);
  if (!provider) {
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.formMemberType', {
        detailType,
      }),
    );
  } else {
    return provider;
  }
}
