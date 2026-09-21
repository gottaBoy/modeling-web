import { ISysMapItem } from '@ibiz/model-core';
import { IMapData } from '../../../interface';
export declare class MapData implements IMapData {
    [key: string | symbol]: any;
    _id: string;
    _itemStyle: string;
    _mapItemId: string;
    _deData: IData;
    _longitude?: string;
    _latitude?: string;
    _areaCode?: string;
    _tooltip?: string;
    _value?: number;
    _text?: string;
    _symbol?: string;
    _bgcolor?: string;
    _color?: string;
    _borderColor?: string;
    _borderWidth?: number;
    _className?: string;
    constructor(deData: IData, mapItem: ISysMapItem);
}
//# sourceMappingURL=map-data.d.ts.map