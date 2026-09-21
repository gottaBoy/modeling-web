import { PropType } from 'vue';
import { IFilterNodeField } from '@ibiz-template/runtime';
import './filter-portlet-item.scss';
export declare const FilterPortletItem: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    field: {
        type: PropType<IData>;
        required: true;
    };
    filterNode: {
        type: PropType<IFilterNodeField>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    field: {
        type: PropType<IData>;
        required: true;
    };
    filterNode: {
        type: PropType<IFilterNodeField>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
