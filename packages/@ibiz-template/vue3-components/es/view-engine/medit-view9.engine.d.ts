import { ViewController, IMEditView9Event, IMEditView9State, MDViewEngine, IMEditViewPanelController } from '@ibiz-template/runtime';
import { IAppDEMEditView } from '@ibiz/model-core';
export declare class MEditView9Engine extends MDViewEngine {
    protected view: ViewController<IAppDEMEditView, IMEditView9State, IMEditView9Event>;
    /**
     * 多数据部件名称
     * @author lxm
     * @date 2023-06-07 09:17:19
     * @readonly
     * @type {string}
     */
    get xdataControlName(): string;
    get meditviewpanel(): IMEditViewPanelController;
    onCreated(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
