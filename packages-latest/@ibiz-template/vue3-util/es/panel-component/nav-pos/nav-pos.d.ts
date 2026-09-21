import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { EventBase } from '@ibiz-template/runtime';
import { NavPosController } from './nav-pos.controller';
import './nav-pos.scss';
/**
 * 导航占位
 * @primary
 * @description 面板中的导航视图占位组件，用于绘制导航视图，并存储导航视图信息与缓存。
 * @panelitemparams {name:expcache,parameterType:'CACHE' | 'NO_CACHE',defaultvalue:-,description:当值为NO_CACHE时禁用缓存，即每次导航切换时都是重新绘制新的视图，否则使用keepAlive包裹绘制的导航视图}
 * @panelitemparams {name:ignoreembedkey,parameterType:boolean,defaultvalue:-,description:忽略嵌入视图key参数}
 * @panelitemparams {name:expmode,parameterType:'ROUTE' | 'NO_ROUTE',defaultvalue:-,description:导航模式，ROUTE为路由模式，NO_ROUTE为非路由模式，在路由模式下会通过路由打开视图，在非路由的模式下，则会通过视图模型去绘制视图}
 * @panelitemparams {"name":"routeattributekeys","parameterType":"string","defaultvalue":"-","description":"路由透传参数，参数值为上下文对象的key，多个值用竖线`|`分隔，透传的参数将会在路由组件进行解析，并显示声明在路由上进行传递"}
 * @panelitemparams {"name":"REFCTRL","parameterType":"string","defaultvalue":"-","description":"关联部件标识，可指定关联部件，多个关联部件标识以`;`分隔"}
 */
export declare const NavPos: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 导航占位模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 导航占位控制器
     */
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    c: NavPosController;
    isPresetView: import("vue").Ref<boolean, boolean>;
    onViewCreated: (event: EventBase) => void;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 导航占位模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 导航占位控制器
     */
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=nav-pos.d.ts.map