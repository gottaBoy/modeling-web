/**
 * 引擎工厂
 * @author lxm
 * @date 2023-04-25 07:17:42
 * @export
 * @class EngineFactory
 */
export class EngineFactory {
    constructor() {
        /**
         * 视图引擎classMap
         * @author lxm
         * @date 2023-04-25 07:28:36
         * @protected
         */
        this.viewEngines = new Map();
    }
    /**
     * 注册视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:23
     * @param {string} key
     * @param {IViewEngine} engine
     */
    register(key, engine) {
        this.viewEngines.set(key, engine);
    }
    /**
     * 注销视图引擎
     * @author lxm
     * @date 2023-04-25 07:40:32
     * @param {string} key
     */
    unRegister(key) {
        this.viewEngines.delete(key);
    }
    /**
     * 获取视图引擎
     * @author lxm
     * @date 2023-05-04 02:26:34
     * @param {IAppView} model
     * @param {IViewController} viewController 视图控制器
     * @return {*}  {(ViewEngine | undefined)}
     */
    getEngine(model, ...args) {
        const { engineType, engineCat } = model;
        const key = `${engineCat}_${engineType}`;
        const func = this.viewEngines.get(key);
        // 存在则执行，生成对象
        if (func) {
            return func(...args);
        }
        ibiz.log.error(ibiz.i18n.t('runtime.engine.correspondingEngine', { key }), model);
    }
}
