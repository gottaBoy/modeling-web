import { Ref } from 'vue';
export interface IUIState {
    /**
     * ui层级
     *
     * @author lxm
     * @date 2022-08-18 21:08:48
     * @type {number}
     */
    zIndex: Ref<number>;
    theme: string;
}
export declare const useUIStore: import("pinia").StoreDefinition<"uiStore", import("pinia")._UnwrapAll<Pick<{
    UIStore: {
        zIndex: number;
        theme: string;
    };
    zIndex: import("./z-index").IzIndexStore;
}, "zIndex" | "UIStore">>, Pick<{
    UIStore: {
        zIndex: number;
        theme: string;
    };
    zIndex: import("./z-index").IzIndexStore;
}, never>, Pick<{
    UIStore: {
        zIndex: number;
        theme: string;
    };
    zIndex: import("./z-index").IzIndexStore;
}, never>>;
//# sourceMappingURL=ui-store.d.ts.map