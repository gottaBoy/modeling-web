import { IRegisterParams } from '../interface';
/**
 * 自定义注册
 */
export declare class CustomRegister {
    /**
     * 获取适配器注册key
     *
     * @author ljx
     * @date 2024-04-16 23:08:08
     * @param {string} registerType
     * @param {IRegisterParams} opts
     * @return {string}
     */
    static getRegisterKey(registerType: string, opts: IRegisterParams): string;
    /**
     * 通过视图计算key
     * 目前适用于计算面板项的key
     * @author ljx
     * @date 2024-04-16 23:08:08
     * @param {IRegisterParams} opts
     * @return {string}
     */
    static calcKeyByView(opts: IRegisterParams): string;
    /**
     * 通过部件计算key
     * 没有实体的部件默认为APP
     * @date 2024-04-16 23:08:08
     * @param {IRegisterParams} opts
     * @return {string}
     */
    static calcKeyByCtrl(opts: IRegisterParams): string;
}
//# sourceMappingURL=custom-register.d.ts.map