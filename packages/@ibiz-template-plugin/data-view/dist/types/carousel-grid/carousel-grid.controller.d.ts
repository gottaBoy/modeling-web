import { CTX, GridController } from '@ibiz-template/runtime';
import { IControl } from '@ibiz/model-core';

export declare class CarouselGridController extends GridController {
    /**
     * 移动速度
     * DEFAULT时，表示多少秒内完整轮播一次全部数据,鼠标移上去时暂停
     * STEP: 表示每隔多少秒移动一行，不会根据鼠标是否悬浮而暂停
     *
     * @type {number}
     * @memberof CarouselGridController
     */
    speed: number;
    /**
     * 滚动方式
     *
     * @type {('DEFAULT' | 'STEP')}
     * @memberof CarouselGridController
     */
    rollMode: 'DEFAULT' | 'STEP';
    constructor(model: IControl, context: IContext, params: IParams, ctx: CTX);
    init(): void;
}
