import { IAppDataEntity, IDEUILogic, IDEUILogicNode } from '@ibiz/model-core';
import {
  registerUILogicProvider,
  registerUILogicNodeProvider,
} from '../register';
import { UILogic } from './ui-logic';
import {
  EndNode,
  StartNode,
  MsgBoxNode,
  DataSetNode,
  DEActionNode,
  PFPluginNode,
  RawJSCodeNode,
  SortParamNode,
  BindParamNode,
  CopyParamNode,
  RenewParamNode,
  ResetParamNode,
  DebugParamNode,
  DEUIActionNode,
  AppendParamNode,
  PrepareJSParamNode,
  ExecuteDELogicNode,
  ThrowExceptionNode,
  ViewCtrlInvokeNode,
  ViewCtrlFireEventNode,
} from './ui-logic-node';

/**
 * @description 注册界面逻辑适配器
 * @export
 */
export function presetUILogicProvider(): void {
  // 注册默认界面逻辑
  registerUILogicProvider(
    'DEFAULT',
    (uiLogic: IDEUILogic, entity: IAppDataEntity) =>
      new UILogic(uiLogic, entity),
  );
  // 注册界面逻辑节点
  registerUILogicNodeProvider(
    'BEGIN',
    (node: IDEUILogicNode) => new StartNode(node),
  );
  registerUILogicNodeProvider(
    'END',
    (node: IDEUILogicNode) => new EndNode(node),
  );
  registerUILogicNodeProvider(
    'DEACTION',
    (node: IDEUILogicNode) => new DEActionNode(node),
  );
  registerUILogicNodeProvider(
    'DEUIACTION',
    (node: IDEUILogicNode) => new DEUIActionNode(node),
  );
  registerUILogicNodeProvider(
    'PREPAREJSPARAM',
    (node: IDEUILogicNode) => new PrepareJSParamNode(node),
  );
  registerUILogicNodeProvider(
    'RESETPARAM',
    (node: IDEUILogicNode) => new ResetParamNode(node),
  );
  registerUILogicNodeProvider(
    'COPYPARAM',
    (node: IDEUILogicNode) => new CopyParamNode(node),
  );
  registerUILogicNodeProvider(
    'BINDPARAM',
    (node: IDEUILogicNode) => new BindParamNode(node),
  );
  registerUILogicNodeProvider(
    'VIEWCTRLINVOKE',
    (node: IDEUILogicNode) => new ViewCtrlInvokeNode(node),
  );
  registerUILogicNodeProvider(
    'MSGBOX',
    (node: IDEUILogicNode) => new MsgBoxNode(node),
  );
  registerUILogicNodeProvider(
    'DEBUGPARAM',
    (node: IDEUILogicNode) => new DebugParamNode(node),
  );
  registerUILogicNodeProvider(
    'APPENDPARAM',
    (node: IDEUILogicNode) => new AppendParamNode(node),
  );
  registerUILogicNodeProvider(
    'SORTPARAM',
    (node: IDEUILogicNode) => new SortParamNode(node),
  );
  registerUILogicNodeProvider(
    'RENEWPARAM',
    (node: IDEUILogicNode) => new RenewParamNode(node),
  );
  registerUILogicNodeProvider(
    'DEDATASET',
    (node: IDEUILogicNode) => new DataSetNode(node),
  );
  registerUILogicNodeProvider(
    'THROWEXCEPTION',
    (node: IDEUILogicNode) => new ThrowExceptionNode(node),
  );
  registerUILogicNodeProvider(
    'VIEWCTRLFIREEVENT',
    (node: IDEUILogicNode) => new ViewCtrlFireEventNode(node),
  );
  registerUILogicNodeProvider(
    'DELOGIC',
    (node: IDEUILogicNode) => new ExecuteDELogicNode(node),
  );
  registerUILogicNodeProvider(
    'PFPLUGIN',
    (node: IDEUILogicNode) => new PFPluginNode(node),
  );
  registerUILogicNodeProvider(
    'RAWJSCODE',
    (node: IDEUILogicNode) => new RawJSCodeNode(node),
  );
}
