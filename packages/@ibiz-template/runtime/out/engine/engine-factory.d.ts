import { IAppViewEngine } from '@ibiz/model-core';
import { IViewEngine } from '../interface/engine';
type NewEngine = (...args: any[]) => IViewEngine;
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
     * 注册视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:23
     * @param {string} key
     * @param {IViewEngine} engine
     */
    register(key: string, engine: NewEngine): void;
    /**
     * 注销视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:32
     * @param {string} key
     */
    unRegister(key: string): void;
    /**
     * 获取视图引擎
     * @author lxm
     * @date 2023-05-04 02:26:34
     * @param {IAppView} model
     * @param {IViewController} viewController 视图控制器
     * @return {*}  {(ViewEngine | undefined)}
     */
    getEngine(model: IAppViewEngine, ...args: Parameters<NewEngine>): IViewEngine | undefined;
}
export {};
//# sourceMappingURL=engine-factory.d.ts.map