import { PropType, VNode } from 'vue';
/**
 * 只会第一次绘制的时候绘制路由相关的内容，后面路由导致的router-view的回调都屏蔽了。
 * 通过变更manualKey,来强制刷新router-view的slot回调。并且吧manualKey传给Component的key，搭配AppKeepAlive可以缓存组件
 */
export declare const IBizRouterView: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: PropType<string>;
        default: string;
    };
    route: PropType<import("vue-router").RouteLocationNormalizedLoadedGeneric>;
    manualKey: {
        type: StringConstructor;
    };
}>, {
    renderComp: (Component: VNode, _route: any) => VNode | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: PropType<string>;
        default: string;
    };
    route: PropType<import("vue-router").RouteLocationNormalizedLoadedGeneric>;
    manualKey: {
        type: StringConstructor;
    };
}>> & Readonly<{}>, {
    name: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=router-view.d.ts.map