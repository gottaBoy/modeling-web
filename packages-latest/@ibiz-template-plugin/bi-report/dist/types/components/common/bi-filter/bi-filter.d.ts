import { PropType } from 'vue';
import { ISchemaField } from '../../../interface';
import { IFilterNodeGroup } from '@ibiz-template/runtime';
export interface IFilterState {
    /**
     * 是否已加载schema
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:25
     * @type {boolean}
     */
    isLoadedSchema: boolean;
    /**
     * 条件字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:44
     * @type {ISchemaField[]}
     */
    conditionFields: ISchemaField[];
    /**
     * 字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:55
     * @type {ISchemaField[]}
     */
    fields: ISchemaField[];
    /**
     * 字段图标映射
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:06
     * @type {Map<string, string>}
     */
    fieldIconMap: Map<string, string>;
    /**
     * 条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:17
     * @type {IFilterNodeGroup}
     */
    cond?: IFilterNodeGroup;
    /**
     * 过滤模式
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:47
     * @type {string}
     */
    filterMode?: string;
    /**
     * 自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:58
     * @type {string}
     */
    customCond?: string;
}
declare const _default: import("vue").DefineComponent<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    state: {
        type: PropType<IFilterState>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    borderMode: {
        type: PropType<"BORDER" | "DEFAULT">;
        default: string;
    };
}, {
    ns: Namespace;
    activeTab: import("vue").Ref<string>;
    isLoaded: import("vue").ComputedRef<boolean>;
    cond: import("vue").Ref<any>;
    schemaFields: import("vue").ComputedRef<ISchemaField[]>;
    handleCondChange: (value: IFilterNodeGroup | null) => void;
    customCond: import("vue").Ref<string>;
    pqlEditor: import("vue").Ref<any>;
    fields: import("vue").ComputedRef<ISchemaField[]>;
    fieldIconMap: import("vue").ComputedRef<Map<string, string>>;
    handleCustomCondChange: (value: string) => void;
    handleReset: (e: MouseEvent) => void;
    handleCancel: (e: MouseEvent) => void;
    handleConfirm: (e: MouseEvent) => void;
    renderItem: (item: IData) => JSX.Element[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    state: {
        type: PropType<IFilterState>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    borderMode: {
        type: PropType<"BORDER" | "DEFAULT">;
        default: string;
    };
}>>, {
    borderMode: "BORDER" | "DEFAULT";
}, {}>;
export default _default;
