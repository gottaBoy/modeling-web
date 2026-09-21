import { IAppDERS } from '../dataentity/iapp-ders';
import { IAppView } from './iapp-view';
/**
 *
 * 应用实体视图模型对象接口，应用实体视图实际的标准模型是{@link PSAppDEViewDTO}，定义了实体视图{@link PSDEViewBaseDTO}与应用的关系。视图大部分功能定义的模型来自{@link PSDEViewBaseDTO}。
 * 子接口类型识别属性[viewType]
 * 继承父接口类型值[APPDEVIEW]
 * @export
 * @interface IAppDEView
 */
export interface IAppDEView extends IAppView {
    /**
     * 获取应用实体视图的关系集合
     */
    appDERSPaths: IAppDERS[][];
    /**
     * 功能视图模式
     * @description 值模式 [实体视图预置功能模式] {PICKUPVIEW：默认单选视图、 EDITVIEW：默认编辑视图、 MAINVIEW：默认主视图、 INDEXDEPICKUPVIEW：默认索引实体选择视图、 FORMPICKUPVIEW：默认多表单选择视图、 MPICKUPVIEW：默认多选视图、 MDATAVIEW：默认多项视图、 WFEDITVIEW：默认流程编辑视图、 WFMDATAVIEW：默认流程多项视图、 WFSTARTVIEW：默认流程启动视图、 WFACTIONVIEW：默认流程操作视图、 WFUTILACTIONVIEW：默认流程功能操作视图、 REDIRECTVIEW：默认数据重定向视图、 MOBPICKUPVIEW：移动端默认单选视图、 MOBEDITVIEW：移动端默认编辑视图、 MOBMAINVIEW：移动端默认主视图、 MOBINDEXDEPICKUPVIEW：移动端默认索引实体选择视图、 MOBFORMPICKUPVIEW：移动端默认多表单选择视图、 MOBMPICKUPVIEW：移动端默认多选视图、 MOBMDATAVIEW：移动端默认多项视图、 MOBWFEDITVIEW：移动端默认流程编辑视图、 MOBWFMDATAVIEW：移动端默认流程多项视图、 MOBWFSTARTVIEW：移动端默认流程启动视图、 MOBWFACTIONVIEW：移动端默认流程操作视图、 MOBWFUTILACTIONVIEW：移动端默认流程功能操作视图、 MOBREDIRECTVIEW：移动端默认数据重定向视图、 USER：自定义功能视图、 USER2：自定义功能视图2、 USER3：自定义功能视图3、 USER4：自定义功能视图4 }
     * @type {( string | 'PICKUPVIEW' | 'EDITVIEW' | 'MAINVIEW' | 'INDEXDEPICKUPVIEW' | 'FORMPICKUPVIEW' | 'MPICKUPVIEW' | 'MDATAVIEW' | 'WFEDITVIEW' | 'WFMDATAVIEW' | 'WFSTARTVIEW' | 'WFACTIONVIEW' | 'WFUTILACTIONVIEW' | 'REDIRECTVIEW' | 'MOBPICKUPVIEW' | 'MOBEDITVIEW' | 'MOBMAINVIEW' | 'MOBINDEXDEPICKUPVIEW' | 'MOBFORMPICKUPVIEW' | 'MOBMPICKUPVIEW' | 'MOBMDATAVIEW' | 'MOBWFEDITVIEW' | 'MOBWFMDATAVIEW' | 'MOBWFSTARTVIEW' | 'MOBWFACTIONVIEW' | 'MOBWFUTILACTIONVIEW' | 'MOBREDIRECTVIEW' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
     * 来源  getFuncViewMode
     */
    funcViewMode?: string | 'PICKUPVIEW' | 'EDITVIEW' | 'MAINVIEW' | 'INDEXDEPICKUPVIEW' | 'FORMPICKUPVIEW' | 'MPICKUPVIEW' | 'MDATAVIEW' | 'WFEDITVIEW' | 'WFMDATAVIEW' | 'WFSTARTVIEW' | 'WFACTIONVIEW' | 'WFUTILACTIONVIEW' | 'REDIRECTVIEW' | 'MOBPICKUPVIEW' | 'MOBEDITVIEW' | 'MOBMAINVIEW' | 'MOBINDEXDEPICKUPVIEW' | 'MOBFORMPICKUPVIEW' | 'MOBMPICKUPVIEW' | 'MOBMDATAVIEW' | 'MOBWFEDITVIEW' | 'MOBWFMDATAVIEW' | 'MOBWFSTARTVIEW' | 'MOBWFACTIONVIEW' | 'MOBWFUTILACTIONVIEW' | 'MOBREDIRECTVIEW' | 'USER' | 'USER2' | 'USER3' | 'USER4';
    /**
     * 功能视图参数
     * @type {string}
     * 来源  getFuncViewParam
     */
    funcViewParam?: string;
    /**
     * 应用计数器引用
     *
     * @type {string}
     * 来源  getPSAppCounterRef
     */
    appCounterRefId?: string;
    /**
     * 实体视图代码名称
     * @type {string}
     * 来源  getPSDEViewCodeName
     */
    deviewCodeName?: string;
    /**
     * 实体视图标识
     * @type {string}
     * 来源  getPSDEViewId
     */
    deviewId?: string;
    /**
     * 临时数据模式
     * @description 值模式 [平台部件处理器临时数据模式] {0：无临时数据模式、 1：主数据模式、 2：从数据模式 }
     * @type {( number | 0 | 1 | 2)}
     * @default 0
     * 来源  getTempMode
     */
    tempMode?: number | 0 | 1 | 2;
    /**
     * 支持工作流
     * @type {boolean}
     * @default false
     * 来源  isEnableWF
     */
    enableWF?: boolean;
}
