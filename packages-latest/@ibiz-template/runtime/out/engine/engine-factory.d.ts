import { IAppViewEngine } from '@ibiz/model-core';
import { ICtrlEngine, IViewEngine } from '../interface/engine';
type NewEngine = (...args: any[]) => IViewEngine;
type NEWCtrlEngine = (...args: any[]) => ICtrlEngine;
/**
 * 引擎工厂
 * @author lxm
 * @date 2023-04-25 07:17:42
 * @export
 * @class EngineFactory
 */
export declare class EngineFactory {
    /**
     * 视图引擎classMap
     * @author lxm
     * @date 2023-04-25 07:28:36
     * @protected
     */
    protected viewEngines: Map<string, NewEngine>;
    /**
     * @description 部件引擎classMap
     * @protected
     * @memberof EngineFactory
     */
    protected ctrlEngines: Map<string, NEWCtrlEngine>;
    /**
     * 注册视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:23
     * @param {string} key
     * @param {IViewEngine} engine
     */
    register(key: string, engine: NewEngine): void;
    /**
     * @description 注册部件引擎
     * @param {string} key
     * @param {NEWCtrlEngine} engine
     * @memberof EngineFactory
     */
    registerCtrl(key: string, engine: NEWCtrlEngine): void;
    /**
     * 注销视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:32
     * @param {string} key
     */
    unRegister(key: string): void;
    /**
     * @description 注销部件引擎
     * @param {string} key
     * @memberof EngineFactory
     */
    unRegisterCtrl(key: string): void;
    /**
     * 获取视图引擎
     * @author lxm
     * @date 2023-05-04 02:26:34
     * @param {IAppView} model
     * @param {IViewController} viewController 视图控制器
     * @return {*}  {(ViewEngine | undefined)}
     */
    getEngine(model: IAppViewEngine, ...args: Parameters<NewEngine>): IViewEngine | undefined;
    /**
     * @description 获取部件引擎
     * @param {IAppViewEngine} model
     * @param {...Parameters<NEWCtrlEngine>} args
     * @returns {*}  {(ICtrlEngine | undefined)}
     * @memberof EngineFactory
     */
    getCtrlEngine(model: IAppViewEngine, ...args: Parameters<NEWCtrlEngine>): ICtrlEngine | undefined;
}
export {};
//# sourceMappingURL=engine-factory.d.ts.map