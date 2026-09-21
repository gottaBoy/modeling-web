import { mergeDeepLeft } from 'ramda';
/**
 * 将预置的模型合并到当前模型中
 *
 * @author chitanda
 * @date 2023-09-22 10:09:10
 * @export
 * @param {IModel[]} models
 * @param {IModel} m
 * @param {string} tag
 */
export function mergeModel(models, m, tag) {
    models.forEach(model => {
        const item = m[model[tag]];
        if (item) {
            Object.assign(model, mergeDeepLeft(model, item));
        }
    });
}
