import { RouteLocationNormalized, Router } from 'vue-router';
import 'nprogress/nprogress.css';
export declare class AppRouter {
    private static router?;
    private static authGuard;
    static setAuthGuard(authGuard: (context: IParams, notLogin?: boolean) => Promise<boolean>): void;
    static getAppContext(route: RouteLocationNormalized): IParams;
    static getRouter(): Router;
}
