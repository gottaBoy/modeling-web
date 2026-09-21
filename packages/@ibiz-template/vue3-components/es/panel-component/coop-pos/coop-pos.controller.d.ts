import { CodeListItem, IAlertParams, PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { CoopPosState } from './coop-pos.state';
export declare class CoopPosController extends PanelItemController<IPanelRawItem> {
    state: CoopPosState;
    /**
     *云系统操作者
     *
     * @memberof CoopPosController
     */
    operator: readonly CodeListItem[];
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof CoopPosController
     */
    rawItemParams: IData;
    /**
     * @description 显示模式
     * @type {('avatar' | 'default')}
     * @memberof CoopPosController
     */
    showMode: 'avatar' | 'default';
    protected createState(): CoopPosState;
    protected onInit(): Promise<void>;
    /**
     * @description 处理自定义补充参数
     * @protected
     * @memberof CoopPosController
     */
    protected handleRawItemParams(): void;
    /**
     * 消息模式映射
     * - 视图打开数据模式映射消息类型
     * @protected
     * @type {Map<string, string>}
     * @memberof CoopPosController
     */
    protected messageModeMap: Map<string, string>;
    /**
     * 初始化消息模式
     *
     * @param {string[]} modes 【标记数据打开模式】：OPENDATA：登记打开数据、 EDITDATA：登记更新数据、 DISPLAYOPPERSON：显示操作人员、 NOTICERELOAD：提示刷新数据
     * @memberof CoopPosController
     */
    initMessageModes(modes: string[]): void;
    /**
     * 更新消息
     * @param {IAlertParams} params Alert提示参数
     * @memberof CoopPosController
     */
    updateMessage(params: IAlertParams): void;
    /**
     * @description 获取云系统操作者代码表
     * @return {*}  {Promise<void>}
     * @memberof CoopPosController
     */
    getOperator(): Promise<void>;
    /**
     * @description 根据名称获取图标
     * @param {string} name
     * @return {*}  {string}
     * @memberof CoopPosController
     */
    getIconUrlByName(name: string): string;
    /**
     * @description 获取头像下载地址
     * @param {string} url
     * @return {*}  {string}
     * @memberof CoopPosController
     */
    getDownloadUrl(url: string): string;
}
