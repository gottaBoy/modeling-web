import { AuthGuard } from './auth-guard';
export declare class DynaAuthGuard extends AuthGuard {
    hasModelInit: boolean;
    noPermissionModel: boolean;
    initModel(context: IParams, permission?: boolean): Promise<void>;
}
