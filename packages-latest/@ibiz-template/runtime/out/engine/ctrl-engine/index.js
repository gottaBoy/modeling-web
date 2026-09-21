import { CtrlLoadAndSearchEngine } from './ctrl-load-and-search.engine';
import { CtrlLoadTriggerEngine } from './ctrl-load-trigger.engine';
// 安装部件引擎
export const installCtrlEngine = () => {
    ibiz.engine.registerCtrl('CTRL_CtrlLoadAndSearch', (model, c) => new CtrlLoadAndSearchEngine(model, c));
    ibiz.engine.registerCtrl('CTRL_CtrlLoadTrigger', (model, c) => new CtrlLoadTriggerEngine(model, c));
};
