import { IBizSys } from './ibizsys';
import { IEnvironment } from './interface';
declare global {
    const ibiz: IBizSys;
    interface Window {
        ibiz: IBizSys;
        Environment: IEnvironment;
    }
    /**
     * 上下文
     *
     * @author chitanda
     * @date 2022-07-14 15:07:52
     * @interface IContext
     */
    interface IContext {
        [key: string | symbol]: any;
        /**
         * 界面域标识，每个独立路由导航的视图生成
         *
         * @author chitanda
         * @date 2022-07-22 15:07:23
         * @type {string}
         */
        srfsessionid: string;
        /**
         * 应用标识
         *
         * @author chitanda
         * @date 2022-07-22 15:07:23
         * @type {string}
         */
        srfappid: string;
        /**
         * 是否简单模式，简单模式下服务层会以界面数据为准，不会进行 DTO 处理
         *
         * @author chitanda
         * @date 2024-02-29 10:02:08
         * @type {boolean}
         */
        srfsimple?: boolean;
        /**
         * 编辑视图上一个，下一步等功能数据来源的多数据部件标识
         *
         * @author tony001
         * @date 2024-07-15 13:07:18
         * @type {string}
         */
        srfnavctrlid?: string;
    }
    interface IIBizContext extends IContext {
        /**
         * 返回自身的上下文，独有的和与父有差异的
         *
         * @author chitanda
         * @date 2023-03-13 17:03:10
         * @return {*}  {IData}
         */
        getOwnContext(): IData;
        /**
         * 销毁当前上下文
         *
         * @author chitanda
         * @date 2023-03-13 17:03:37
         */
        destroy(): void;
        /**
         * 克隆当前上下文
         *
         * @author chitanda
         * @date 2023-03-13 17:03:45
         * @return {*}  {IContext}
         */
        clone(): IContext;
        /**
         * @description 深度克隆
         * @return {*}  {IData}
         * @memberof IIBizContext
         */
        deepClone(): IData;
        /**
         * 在不改变对象引用的情况下，重置上下文
         * 等效于重新实例化，但是引用不变
         * @author lxm
         * @date 2023-05-24 10:30:40
         * @param {IData} [context={}] 默认值
         * @param {IContext} [parent] 父上下文
         */
        reset(context?: IData, parent?: IContext): void;
    }
    /**
     * 参数
     *
     * @author chitanda
     * @date 2022-07-14 15:07:57
     * @interface IParams
     */
    interface IParams {
        [key: string | symbol]: any;
    }
    /**
     * 数据
     *
     * @author chitanda
     * @date 2022-07-14 15:07:31
     * @interface IData
     */
    interface IData {
        [key: string | symbol]: any;
    }
    /**
     * 任意对象结构
     *
     * @author chitanda
     * @date 2022-09-21 15:09:30
     * @interface IObject
     */
    interface IObject {
        [key: string | symbol]: any;
    }
}
//# sourceMappingURL=types.d.ts.map