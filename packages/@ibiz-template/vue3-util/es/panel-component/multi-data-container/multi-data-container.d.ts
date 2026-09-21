import { IPanelItemProvider, IPanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import { MultiDataContainerController } from './multi-data-container.controller';
import './multi-data-container.scss';
export declare const MultiDataContainer: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    renderPanelItem: (panelItem: IPanelItem, options?: {
        providers: {
            [key: string]: IPanelItemProvider;
        };
        panelItems: {
            [key: string]: IPanelItemController;
        };
    }) => VNode | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=multi-data-container.d.ts.map