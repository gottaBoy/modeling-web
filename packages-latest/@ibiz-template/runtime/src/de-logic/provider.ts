import { IAppDELogic, IDELogicNode, IAppDataEntity } from '@ibiz/model-core';
import {
  registerDELogicProvider,
  registerDELogicNodeProvider,
} from '../register';
import { DELogic } from './de-logic';
import {
  EndNode,
  StartNode,
  DataSetNode,
  DEActionNode,
  SortParamNode,
  BindParamNode,
  CopyParamNode,
  RenewParamNode,
  ResetParamNode,
  DebugParamNode,
  AppendParamNode,
  PrepareParamNode,
  ThrowExceptionNode,
} from './de-logic-node';

/**
 * @description 注册实体逻辑适配器
 * @export
 */
export function presetDELogicProvider(): void {
  // 注册默认界面逻辑
  registerDELogicProvider(
    'DEFAULT',
    (logic: IAppDELogic, entity: IAppDataEntity) => new DELogic(logic, entity),
  );
  // 注册界面逻辑节点
  registerDELogicNodeProvider(
    'BEGIN',
    (node: IDELogicNode) => new StartNode(node),
  );
  registerDELogicNodeProvider('END', (node: IDELogicNode) => new EndNode(node));
  registerDELogicNodeProvider(
    'DEACTION',
    (node: IDELogicNode) => new DEActionNode(node),
  );
  registerDELogicNodeProvider(
    'PREPAREPARAM',
    (node: IDELogicNode) => new PrepareParamNode(node),
  );
  registerDELogicNodeProvider(
    'RESETPARAM',
    (node: IDELogicNode) => new ResetParamNode(node),
  );
  registerDELogicNodeProvider(
    'COPYPARAM',
    (node: IDELogicNode) => new CopyParamNode(node),
  );
  registerDELogicNodeProvider(
    'BINDPARAM',
    (node: IDELogicNode) => new BindParamNode(node),
  );
  registerDELogicNodeProvider(
    'DEBUGPARAM',
    (node: IDELogicNode) => new DebugParamNode(node),
  );
  registerDELogicNodeProvider(
    'APPENDPARAM',
    (node: IDELogicNode) => new AppendParamNode(node),
  );
  registerDELogicNodeProvider(
    'SORTPARAM',
    (node: IDELogicNode) => new SortParamNode(node),
  );
  registerDELogicNodeProvider(
    'RENEWPARAM',
    (node: IDELogicNode) => new RenewParamNode(node),
  );
  registerDELogicNodeProvider(
    'DEDATASET',
    (node: IDELogicNode) => new DataSetNode(node),
  );
  registerDELogicNodeProvider(
    'THROWEXCEPTION',
    (node: IDELogicNode) => new ThrowExceptionNode(node),
  );
}
