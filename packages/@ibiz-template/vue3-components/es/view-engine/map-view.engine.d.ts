import { ViewController, IMapViewEvent, IMapViewState, MDViewEngine, IMapController } from '@ibiz-template/runtime';
import { IAppDEMapView } from '@ibiz/model-core';
export declare class MapViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEMapView, IMapViewState, IMapViewEvent>;
    get map(): IMapController;
    onCreated(): Promise<void>;
}
