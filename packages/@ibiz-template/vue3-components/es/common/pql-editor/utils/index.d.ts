import { ValueOP } from '@ibiz-template/runtime';
import { SlateNode } from '@wangeditor/editor';
import { IPqlItem, IPqlNode, IPqlNodeItem, ISchemaField } from '../../../interface';
export declare const FilterModes: {
    valueOP: ValueOP;
    label: string;
    sqlOP: string;
}[];
export declare const InputOPs: string[];
export declare const ExcludeOPs: string[];
export declare const InOPs: string[];
export declare const generateItems: (children: IData[]) => IPqlItem[];
export declare const generateNodeItems: (currentNode?: IData, getPreviousNode?: ((node?: SlateNode) => SlateNode | undefined) | undefined) => IPqlNodeItem[];
export declare const generateCustomCond: (items: IPqlNodeItem[], fields: ISchemaField[]) => string;
export declare const parseCustomCond: (cond: string) => IData[] | undefined;
export declare const pqlItemsToPqlNodes: (items: IPqlItem[]) => Promise<IPqlNode[]>;
export declare const pqlNodeToHtml: (node: IPqlNode) => string;
export declare const pqlNodesToHtml: (nodes: IPqlNode[]) => string;
export declare function isMove(el?: HTMLElement | null): boolean;
