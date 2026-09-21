import { notNilEmpty } from 'qx-util';
/**
 * 从实体id计算实体codeName(小写)
 * @author lxm
 * @date 2023-05-16 11:40:16
 * @export
 * @param {string} id 实体id
 * @return {*}
 */
export function calcDeCodeNameById(id) {
    const arr = id.split('.');
    return arr.pop();
}
/**
 * 判断对象里是否有实体codeName小写表示的主键
 *
 * @author lxm
 * @date 2023-05-16 11:45:30
 * @export
 * @param {IParams} params
 * @param {string} entityId
 * @return {*}  {boolean}
 */
export function hasDeCodeName(params, entityId) {
    const codeName = calcDeCodeNameById(entityId);
    return notNilEmpty(params[codeName]);
}
/**
 * 通过appDEACModeId从实体中找出对应自填模式模型
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-05-31 10:26:24
 */
export async function getDeACMode(appDEACModeId, entityId, srfappid) {
    var _a;
    const appDataEntity = await ibiz.hub.getAppDataEntity(entityId, srfappid);
    const deACMode = (_a = appDataEntity.appDEACModes) === null || _a === void 0 ? void 0 : _a.find((mode) => {
        return mode.id === appDEACModeId;
    });
    return deACMode;
}
/**
 * @description 获取指定属性的父关系连接文本属性
 * @export
 * @param {string} appDEFieldId
 * @param {IAppDataEntity} [appDataEntity]
 * @returns {*}  {(string | undefined)}
 */
export function getParentTextAppDEFieldId(appDEFieldId, appDataEntity) {
    var _a;
    const deRss = (_a = appDataEntity === null || appDataEntity === void 0 ? void 0 : appDataEntity.minorAppDERSs) === null || _a === void 0 ? void 0 : _a.find(rss => rss.parentAppDEFieldId === appDEFieldId);
    return deRss === null || deRss === void 0 ? void 0 : deRss.parentTextAppDEFieldId;
}
/**
 * 从实体里找到实体逻辑
 * @author lxm
 * @date 2023-06-13 08:05:09
 * @export
 * @param {string} appDELogicId 实体逻辑id
 * @param {IAppDataEntity} entity 实体模型
 * @return {*}
 */
export function findDELogic(appDELogicId, entity) {
    var _a;
    return (_a = entity.appDELogics) === null || _a === void 0 ? void 0 : _a.find(item => item.id === appDELogicId);
}
/**
 * 过滤出指定类型的属性实体逻辑
 * @author lxm
 * @date 2023-06-14 12:25:00
 * @export
 * @param {IAppDataEntity} entity
 * @param {('compute' | 'change' | 'default')} type
 * @return {*}
 */
export function filterFieldLogics(entity, type) {
    var _a, _b;
    const resultIds = [];
    (_a = entity.appDEFields) === null || _a === void 0 ? void 0 : _a.forEach(field => {
        if (type === 'compute' && field.computeAppDEFLogicId) {
            resultIds.push(field.computeAppDEFLogicId);
        }
        else if (type === 'change' && field.onChangeAppDEFLogicId) {
            resultIds.push(field.onChangeAppDEFLogicId);
        }
        else if (type === 'default' && field.defaultValueAppDEFLogicId) {
            resultIds.push(field.defaultValueAppDEFLogicId);
        }
    });
    return ((_b = entity.appDELogics) === null || _b === void 0 ? void 0 : _b.filter(item => resultIds.includes(item.id))) || [];
}
/**
 * 通过id找到实体的属性
 * @author lxm
 * @date 2023-06-14 11:07:52
 * @export
 * @param {IAppDataEntity} entity
 * @param {string} fieldId
 * @return {*}
 */
export function findFieldById(entity, fieldId) {
    var _a;
    return (_a = entity.appDEFields) === null || _a === void 0 ? void 0 : _a.find(item => item.id === fieldId);
}
/**
 * 获取默认导入模型
 * @author lxm
 * @date 2024-04-18 02:44:09
 * @export
 * @param {IAppDataEntity} entity
 * @return {*}  {(IAppDEDataImport | undefined)}
 */
export function getDefaultDataImport(entity) {
    var _a;
    if (entity.defaultAppDEDataImportId) {
        return (_a = entity.appDEDataImports) === null || _a === void 0 ? void 0 : _a.find(item => item.id === entity.defaultAppDEDataImportId);
    }
}
