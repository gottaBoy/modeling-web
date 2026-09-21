import { CoopPosState } from './coop-pos.state';
import { CoopPosController } from './coop-pos.controller';
export { CoopPosState, CoopPosController };
export declare const IBizCoopPos: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof CoopPosController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: CoopPosController;
    messages: import("vue").ComputedRef<IData[]>;
    renderItem: (message: IData) => string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof CoopPosController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizCoopPos;
