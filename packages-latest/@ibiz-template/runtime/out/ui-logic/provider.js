import { registerUILogicProvider, registerUILogicNodeProvider, } from '../register';
import { UILogic } from './ui-logic';
import { EndNode, StartNode, MsgBoxNode, DataSetNode, DEActionNode, PFPluginNode, RawJSCodeNode, SortParamNode, BindParamNode, CopyParamNode, RenewParamNode, ResetParamNode, DebugParamNode, DEUIActionNode, AppendParamNode, PrepareJSParamNode, ExecuteDELogicNode, ThrowExceptionNode, ViewCtrlInvokeNode, ViewCtrlFireEventNode, } from './ui-logic-node';
/**
 * @description 注册界面逻辑适配器
 * @export
 */
export function presetUILogicProvider() {
    // 注册默认界面逻辑
    registerUILogicProvider('DEFAULT', (uiLogic, entity) => new UILogic(uiLogic, entity));
    // 注册界面逻辑节点
    registerUILogicNodeProvider('BEGIN', (node) => new StartNode(node));
    registerUILogicNodeProvider('END', (node) => new EndNode(node));
    registerUILogicNodeProvider('DEACTION', (node) => new DEActionNode(node));
    registerUILogicNodeProvider('DEUIACTION', (node) => new DEUIActionNode(node));
    registerUILogicNodeProvider('PREPAREJSPARAM', (node) => new PrepareJSParamNode(node));
    registerUILogicNodeProvider('RESETPARAM', (node) => new ResetParamNode(node));
    registerUILogicNodeProvider('COPYPARAM', (node) => new CopyParamNode(node));
    registerUILogicNodeProvider('BINDPARAM', (node) => new BindParamNode(node));
    registerUILogicNodeProvider('VIEWCTRLINVOKE', (node) => new ViewCtrlInvokeNode(node));
    registerUILogicNodeProvider('MSGBOX', (node) => new MsgBoxNode(node));
    registerUILogicNodeProvider('DEBUGPARAM', (node) => new DebugParamNode(node));
    registerUILogicNodeProvider('APPENDPARAM', (node) => new AppendParamNode(node));
    registerUILogicNodeProvider('SORTPARAM', (node) => new SortParamNode(node));
    registerUILogicNodeProvider('RENEWPARAM', (node) => new RenewParamNode(node));
    registerUILogicNodeProvider('DEDATASET', (node) => new DataSetNode(node));
    registerUILogicNodeProvider('THROWEXCEPTION', (node) => new ThrowExceptionNode(node));
    registerUILogicNodeProvider('VIEWCTRLFIREEVENT', (node) => new ViewCtrlFireEventNode(node));
    registerUILogicNodeProvider('DELOGIC', (node) => new ExecuteDELogicNode(node));
    registerUILogicNodeProvider('PFPLUGIN', (node) => new PFPluginNode(node));
    registerUILogicNodeProvider('RAWJSCODE', (node) => new RawJSCodeNode(node));
}
