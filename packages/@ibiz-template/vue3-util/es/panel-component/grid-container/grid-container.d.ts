import { IFlexLayoutPos, IPanelContainer } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { GridContainerController } from './grid-container.controller';
import './grid-container.scss';
export declare const GridContainer: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof GridContainerController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    layoutModel: import("vue").ComputedRef<{
        layout: string;
        appId?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        codeName?: string | undefined;
        userParam?: Record<string, string> | undefined;
        modelId?: string | undefined;
        modelType?: string | undefined;
    }>;
    convertLayoutPos: (layoutPos: IFlexLayoutPos, adaptGrow: number) => IFlexLayoutPos;
    adaptGrow: Ref<number>;
    adaptCols: Ref<number | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof GridContainerController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=grid-container.d.ts.map