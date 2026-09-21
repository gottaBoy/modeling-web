import { registerDELogicProvider, registerDELogicNodeProvider, } from '../register';
import { DELogic } from './de-logic';
import { EndNode, StartNode, DataSetNode, DEActionNode, SortParamNode, BindParamNode, CopyParamNode, RenewParamNode, ResetParamNode, DebugParamNode, AppendParamNode, PrepareParamNode, ThrowExceptionNode, } from './de-logic-node';
/**
 * @description 注册实体逻辑适配器
 * @export
 */
export function presetDELogicProvider() {
    // 注册默认界面逻辑
    registerDELogicProvider('DEFAULT', (logic, entity) => new DELogic(logic, entity));
    // 注册界面逻辑节点
    registerDELogicNodeProvider('BEGIN', (node) => new StartNode(node));
    registerDELogicNodeProvider('END', (node) => new EndNode(node));
    registerDELogicNodeProvider('DEACTION', (node) => new DEActionNode(node));
    registerDELogicNodeProvider('PREPAREPARAM', (node) => new PrepareParamNode(node));
    registerDELogicNodeProvider('RESETPARAM', (node) => new ResetParamNode(node));
    registerDELogicNodeProvider('COPYPARAM', (node) => new CopyParamNode(node));
    registerDELogicNodeProvider('BINDPARAM', (node) => new BindParamNode(node));
    registerDELogicNodeProvider('DEBUGPARAM', (node) => new DebugParamNode(node));
    registerDELogicNodeProvider('APPENDPARAM', (node) => new AppendParamNode(node));
    registerDELogicNodeProvider('SORTPARAM', (node) => new SortParamNode(node));
    registerDELogicNodeProvider('RENEWPARAM', (node) => new RenewParamNode(node));
    registerDELogicNodeProvider('DEDATASET', (node) => new DataSetNode(node));
    registerDELogicNodeProvider('THROWEXCEPTION', (node) => new ThrowExceptionNode(node));
}
