import { CTX, ListController } from '@ibiz-template/runtime';
import { IControl } from '@ibiz/model-core';

export declare class CarouselListController extends ListController {
    /**
     * 滚动模式
     * DEFAULT是连续滚动 STEP是一行一行滚动
     *
     * @type {('DEFAULT' | 'STEP')}
     * @memberof CarouselListController
     */
    rollMode: 'DEFAULT' | 'STEP';
    /**
     * 滚动速度
     *
     * @type {number}
     * @memberof CarouselListController
     */
    moveSpeed: number;
    /**
     * 列表项边框
     *
     * @type {string}
     * @memberof CarouselListController
     */
    borderStyle: string;
    constructor(model: IControl, context: IContext, params: IParams, ctx: CTX);
    /**
     * 初始化控件参数
     *
     * @memberof CarouselListController
     */
    init(): void;
}
