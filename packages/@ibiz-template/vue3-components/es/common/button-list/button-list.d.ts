import { PropType } from 'vue';
import { IAppDEUIActionGroupDetail, IDEFormButtonList, IPanelButtonList } from '@ibiz/model-core';
import { IButtonContainerState } from '@ibiz-template/runtime';
import './button-list.scss';
/**
 * 面板按钮组和表单按钮组的基础组件
 */
export declare const IBizButtonList: import("vue").DefineComponent<{
    model: {
        type: PropType<IPanelButtonList | IDEFormButtonList>;
        required: true;
    };
    buttonsState: {
        type: PropType<IButtonContainerState>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    buttonStyle: import("vue").ComputedRef<any>;
    uiactionGroup: import("@ibiz/model-core").IUIActionGroup | undefined;
    renderDropdown: (items: IAppDEUIActionGroupDetail[], iconName?: string) => JSX.Element;
    renderActions: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (_e: MouseEvent, _actionId: string) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    model: {
        type: PropType<IPanelButtonList | IDEFormButtonList>;
        required: true;
    };
    buttonsState: {
        type: PropType<IButtonContainerState>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((_e: MouseEvent, _actionId: string) => any) | undefined;
}, {
    disabled: boolean;
}, {}>;
