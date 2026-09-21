import { IPanelItem } from '@ibiz/model-core';
import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
export declare class AuthSsoProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
