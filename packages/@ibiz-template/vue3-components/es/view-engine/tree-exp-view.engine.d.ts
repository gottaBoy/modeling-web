import { ViewController, ITreeExpViewEvent, ITreeExpViewState, ITreeController } from '@ibiz-template/runtime';
import { IAppDETreeExplorerView } from '@ibiz/model-core';
import { ExpViewEngine } from './exp-view.engine';
export declare class TreeExpViewEngine extends ExpViewEngine {
    /**
     * 树导航视图控制器
     */
    protected view: ViewController<IAppDETreeExplorerView, ITreeExpViewState, ITreeExpViewEvent>;
    /**
     * 树导航栏部件名称
     *
     * @author lxm
     * @date 2023-08-31 03:43:02
     * @readonly
     * @type {string}
     */
    get expBarName(): string;
    /**
     * 树部件控制器
     *
     * @readonly
     * @memberof TreeExpViewEngine
     */
    get tree(): ITreeController;
    call(key: string, args: any): Promise<IData | null | undefined>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof TreeExpViewEngine
     */
    onMounted(): Promise<void>;
    /**
     * 加载实体主数据
     *
     * @return {*}  {Promise<void>}
     * @memberof TreeExpViewEngine
     */
    loadEntityData(): Promise<void>;
}
