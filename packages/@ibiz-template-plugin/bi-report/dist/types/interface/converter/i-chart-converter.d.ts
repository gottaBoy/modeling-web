/**
 * 图表转化器接口
 *
 * @author tony001
 * @date 2024-06-06 00:06:37
 * @export
 * @interface IChartConverter
 */
export interface IChartConverter {
    /**
     * 转化数据到模型
     *
     * @author tony001
     * @date 2024-06-06 15:06:47
     * @param {(IData | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts]
     * @return {*}  {Promise<IModel | undefined>}
     */
    translateDataToModel(data: IData | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
}
