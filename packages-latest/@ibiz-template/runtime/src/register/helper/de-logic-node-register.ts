import { RuntimeError } from '@ibiz-template/core';
import { IAppDELogic, IDELogicNode, IAppDataEntity } from '@ibiz/model-core';
import { IDELogicNodeProvider } from '../../interface';
import { CustomRegister } from '../custom-register';

/** 实体逻辑节点适配器前缀 */
export const DELOGICNODE_PROVIDER_PREFIX = 'DE_LOGIC_NODE';

/**
 * 注册实体逻辑节点适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IDELogicNodeProvider} callback 生成实体行为适配器的回调
 */
export function registerDELogicNodeProvider(
  key: string,
  callback: (node: IDELogicNode) => IDELogicNodeProvider,
): void {
  ibiz.register.register(`${DELOGICNODE_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(
  key: string,
  logic: IDELogicNode,
): IDELogicNodeProvider | undefined {
  return ibiz.register.get(
    `${DELOGICNODE_PROVIDER_PREFIX}_${key}`,
    logic,
  ) as IDELogicNodeProvider;
}

/**
 * @description 获取实体逻辑节点适配器
 * @export
 * @param {IDELogicNode} model
 * @param {IAppDELogic} logic
 * @param {IAppDataEntity} entity
 * @returns {*}  {Promise<IDELogicNodeProvider>}
 */
export async function getDELogicNodeProvider(
  model: IDELogicNode,
  logic: IAppDELogic,
  entity: IAppDataEntity,
): Promise<IDELogicNodeProvider> {
  let provider: IDELogicNodeProvider | undefined;
  const { logicNodeType } = model as Required<IDELogicNode>;

  // 自定义注册
  const registerKey = CustomRegister.getRegisterKey(
    DELOGICNODE_PROVIDER_PREFIX,
    {
      mainModel: model,
      logic,
      entity,
    },
  );
  provider = getProvider(registerKey, model);
  if (provider) return provider;
  ibiz.log.debug(
    ibiz.i18n.t('runtime.register.helper.uiLogicNodeCustomRegistration', {
      registerKey,
    }),
  );

  // 找节点类型适配器
  provider = getProvider(logicNodeType, model);
  if (provider) return provider;
  throw new RuntimeError(
    ibiz.i18n.t('runtime.register.helper.frontEndTypeNode', {
      logicNodeType,
    }),
  );
}
