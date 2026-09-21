import { IMDControlState } from './i-md-control.state';
/**
 * 地图部件状态
 * @author lxm
 * @date 2023-05-22 02:18:43
 * @export
 * @interface IMapState
 * @extends {IMDControlState}
 */
export interface IMapState extends IMDControlState {
    items: IMapData[];
    /**
     * 点的数据
     * @author lxm
     * @date 2023-10-31 09:48:54
     * @type {IMapData[]}
     */
    pointData: IMapData[];
    /**
     * 区域的数据
     * @author lxm
     * @date 2023-10-31 09:49:02
     * @type {IMapData[]}
     */
    areaData: IMapData[];
    /**
     * 区域编码是否是字符串
     * @author lxm
     * @date 2023-11-01 03:30:09
     * @type {boolean}
     */
    strAreaCode: boolean;
    /**
     * 默认显示的区域代码
     * @author lxm
     * @date 2023-10-31 09:03:23
     * @type {string}
     */
    defaultAreaCode: string | number;
    /**
     * 当前区域代码
     * @author lxm
     * @date 2023-10-31 09:03:23
     * @type {string}
     */
    areaCode: string | number;
    /**
     * 地图json数据基础路径
     * @author lxm
     * @date 2023-11-01 03:37:19
     * @type {string}
     */
    jsonBaseUrl?: string;
    /**
     * @description 地图信息
     * @type {IData}
     * @memberof IMapState
     */
    mapInfo: IData;
}
/**
 * 地图数据格式
 *
 * @export
 * @class ITreeNodeData
 */
export interface IMapData {
    /**
     * 唯一标识
     * @author lxm
     * @date 2023-10-30 06:20:08
     * @type {string}
     */
    _id: string;
    /**
     * 呈现样式
     * @author lxm
     * @date 2023-11-02 04:59:12
     * @type {string}
     */
    _itemStyle: string;
    /**
     * 地图项id
     * @author lxm
     * @date 2023-10-30 06:20:40
     * @type {string}
     */
    _mapItemId: string;
    /**
     * 经度
     * @author lxm
     * @date 2023-10-30 09:25:34
     * @type {string}
     */
    _longitude?: string;
    /**
     * 纬度
     * @author lxm
     * @date 2023-10-30 09:25:34
     * @type {string}
     */
    _latitude?: string;
    /**
     * 区域标识
     * @author lxm
     * @date 2023-10-30 09:26:18
     */
    _areaCode?: string;
    /**
     * 提示信息
     * @author lxm
     * @date 2023-10-30 09:34:47
     * @type {string}
     */
    _tooltip?: string;
    /**
     * 统计数据值
     * @author lxm
     * @date 2023-10-31 10:47:50
     * @type {number}
     */
    _value?: number;
    /**
     * 文本值
     * @author lxm
     * @date 2023-10-31 10:47:50
     * @type {number}
     */
    _text?: string;
    /**
     * 图标
     * @author lxm
     * @date 2023-10-31 10:47:50
     * @type {number}
     */
    _symbol?: string;
}
//# sourceMappingURL=i-map.state.d.ts.map