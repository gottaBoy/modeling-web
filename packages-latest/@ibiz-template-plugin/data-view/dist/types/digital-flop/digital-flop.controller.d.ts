import { ISpan } from '@ibiz/model-core';
import { EditorController } from '@ibiz-template/runtime';

/**
 * @description 数字翻牌器
 * @export
 * @class DigitalFlopController
 * @extends {EditorController<ISpan>}
 */
export declare class DigitalFlopController extends EditorController<ISpan> {
    /**
     * @description 卡片大小
     * @type {number}
     * @memberof DigitalFlopController
     */
    size: number;
    /**
     * @description 字体大小
     * @type {number}
     * @memberof DigitalFlopController
     */
    fontSize: number;
    protected onInit(): Promise<void>;
}
