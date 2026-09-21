import { IAppViewEngine } from '@ibiz/model-core';
import { IController, ICtrlEngine, IMDControlController } from '../../interface';
import { ViewController } from '../../controller';
/**
 * @description 挂载界面引擎基类
 * @export
 * @class CtrlEngineBase
 * @implements {ICtrlEngine}
 */
export declare class CtrlEngineBase implements ICtrlEngine {
    protected engine: IAppViewEngine;
    protected view: ViewController;
    /**
     * @description 触发源部件名称
     * @protected
     * @type {(string | undefined)}
     * @memberof CtrlEngineBase
     */
    protected sourceCtrlName: string | undefined;
    /**
     * @description 目标源部件名称
     * @protected
     * @type {(string | undefined)}
     * @memberof CtrlEngineBase
     */
    protected targetCtrlName: string | undefined;
    /**
     * @description 源部件
     * @readonly
     * @type {(IController | undefined)}
     * @memberof CtrlEngineBase
     */
    get resourceCtrl(): IController | undefined;
    /**
     * @description 目标源部件
     * @readonly
     * @type {(IMDControlController | undefined)}
     * @memberof CtrlEngineBase
     */
    get targetCtrl(): IMDControlController | undefined;
    /**
     * Creates an instance of CtrlEngineBase.
     * @param {IAppViewEngine} engine
     * @param {ViewController} view
     * @memberof CtrlEngineBase
     */
    constructor(engine: IAppViewEngine, view: ViewController);
    /**
     * @description 视图created生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    onCreated(): Promise<void>;
    /**
     * @description 视图mounted生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    onMounted(): Promise<void>;
    /**
     * @description 视图destroyed生命周期执行逻辑
     * @returns {*}  {Promise<void>}
     * @memberof CtrlEngineBase
     */
    onDestroyed(): Promise<void>;
}
//# sourceMappingURL=ctrl-base.engine.d.ts.map