import type { App, Plugin } from 'vue';
export type TypeWithInstall<T> = T & Plugin;
export declare const withInstall: <T>(main: T, install: (_v: App) => void) => TypeWithInstall<T>;
//# sourceMappingURL=install.d.ts.map