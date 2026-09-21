import { GridContainerState } from './grid-container.state';
import { GridContainerController } from './grid-container.controller';
export { GridContainerState, GridContainerController };
export declare const IBizGridContainer: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
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
    convertLayoutPos: (layoutPos: import("@ibiz/model-core").IFlexLayoutPos, adaptGrow: number) => import("@ibiz/model-core").IFlexLayoutPos;
    adaptGrow: import("vue").Ref<number>;
    adaptCols: import("vue").Ref<number | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof GridContainerController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizGridContainer;
//# sourceMappingURL=index.d.ts.map