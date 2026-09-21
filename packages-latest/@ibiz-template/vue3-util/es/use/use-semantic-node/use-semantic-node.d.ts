import { EditorController, ControlController, PanelItemController } from '@ibiz-template/runtime';
/** 语义化节点class */
export type UseSemanticClassReturn = (key: string, ...args: IData[]) => string | undefined;
/** 语义化节点style */
export type UseSemanticStyleReturn = (key: string, ...args: IData[]) => IData | undefined;
/**
 * 语义化节点
 * @param controller 控制器
 * @returns
 */
export declare function useSemanticNode(controller: ControlController | PanelItemController | EditorController): {
    semanticClass: UseSemanticClassReturn;
    semanticStyle: UseSemanticStyleReturn;
};
//# sourceMappingURL=use-semantic-node.d.ts.map