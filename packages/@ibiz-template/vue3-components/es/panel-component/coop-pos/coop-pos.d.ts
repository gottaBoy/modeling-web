import { PropType, VNode } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { CoopPosController } from './coop-pos.controller';
import './coop-pos.scss';
/**
 * 协同消息占位
 * - 该组件有两种呈现模式，默认是Alert呈现，当视图配置【标记数据打开模式】勾选【显示操作人员】时以用户头像呈现
 * - 该组件会根据【标记数据打开模式】的配置计算需要呈现的用户消息，默认显示当前用户
 *  1. 只勾选了【显示操作人员】时，所有的操作类型的用户都会呈现
 *  2. 勾选其他的【标记数据打开模式】时，会根据勾选项过滤操作用户
 *    勾选【登记打开数据】 -> 显示浏览用户
 *    勾选【登记更新数据】 -> 显示编辑用户
 *    勾选【提示刷新数据】 -> 显示更新用户
 */
export declare const CoopPos: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
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
    renderItem: (message: IData) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof CoopPosController;
        required: true;
    };
}>>, {}, {}>;
