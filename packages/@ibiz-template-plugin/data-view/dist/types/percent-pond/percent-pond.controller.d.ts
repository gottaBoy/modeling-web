import { EditorController } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';

export declare class PercentPondController extends EditorController<ISlider> {
    /**
     * 总数属性
     *
     * @type {string}
     * @memberof PercentPondController
     */
    totalField: string;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PercentPondController
     */
    protected onInit(): Promise<void>;
}
