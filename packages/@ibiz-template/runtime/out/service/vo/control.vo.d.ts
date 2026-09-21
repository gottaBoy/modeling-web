import { Srfuf } from '../constant';
import { UIMapField } from './ui-map-field';
/**
 * 部件UI显示层数据转换
 *
 * @author lxm
 * @date 2022-09-05 15:09:31
 * @export
 * @class ControlVO
 */
export declare class ControlVO {
    [key: string | symbol]: any;
    /**
     * 原始后台数据
     *
     * @author lxm
     * @date 2022-10-18 15:10:19
     * @private
     * @type {IData}
     */
    $origin: IData;
    /**
     * 属性映射集合
     *
     * @author lxm
     * @date 2022-10-18 15:10:33
     * @private
     * @type {Map<string, UIMapField>}
     */
    $dataUIMap: Map<string, UIMapField>;
    /**
     * 是否是新建数据，0为新建
     *
     * @author lxm
     * @date 2022-09-06 22:09:24
     * @type {Srfuf}
     */
    srfuf: Srfuf;
    /**
     * 主键
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfkey?: string;
    /**
     * 临时主键
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    tempsrfkey: string;
    /**
     * 主信息
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfmajortext?: string;
    /**
     * 实体模型标识
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfdeid: string;
    /**
     * 实体模型代码名称
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfdecodename: string;
    /**
     * 实体主键属性
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfkeyfield: string;
    /**
     * 实体主信息属性
     *
     * @author lxm
     * @date 2022-09-07 19:09:42
     * @type {string}
     */
    srfmajorfield: string;
    /**
     * Creates an instance of ControlVO.
     * @author lxm
     * @date 2022-09-05 15:09:10
     * @param {IData} origin 后台原始数据
     * @param {Map<string, string>} dataUIMap 转换映射map，key为转换后的属性，value为映射字段描述信息
     */
    constructor($origin?: IData, $dataUIMap?: Map<string, UIMapField>);
    /**
     * 关联实体属性
     *
     * @author lxm
     * @date 2022-10-18 15:10:48
     * @private
     * @param {string} uiKey 界面字段
     * @param {string} dataKey 数据字段
     * @param {boolean} [isOriginField=true] 是否是后台存储字段，是的话存取都在$origin里
     * @param {boolean} [forceNumber=false] 是否强制转换成数值，是的话set的时候转成数值
     * @returns {*}
     */
    private linkProperty;
    /**
     * 获取原始数据
     *
     * @author lxm
     * @date 2022-09-05 15:09:52
     * @returns {*}
     */
    getOrigin(): IData;
    /**
     * 设置原始数据
     *
     * @author lxm
     * @date 2022-10-17 20:10:39
     * @param {IData} data
     */
    setOrigin(data: IData | ControlVO): void;
    /**
     * 克隆新的vo数据
     *
     * @author lxm
     * @date 2023-08-16 11:08:29
     * @return {*}  {ControlVO}
     */
    clone(): ControlVO;
}
//# sourceMappingURL=control.vo.d.ts.map