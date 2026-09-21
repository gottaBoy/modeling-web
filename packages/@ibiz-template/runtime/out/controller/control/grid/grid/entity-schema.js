const TypeToDataType = {
    string: 25,
    number: 6,
    integer: 9,
    date: 5,
};
/**
 * 根据json模型计算出表格列模型
 * @author lxm
 * @date 2024-01-02 10:27:40
 * @export
 * @param {IData} json
 * @param {SearchBarController} c
 * @return {*}  {ISearchBarFilter[]}
 */
export async function calcColumnModelBySchema(json, c) {
    var _a;
    if (!json.properties) {
        return;
    }
    const { properties } = json;
    if (!(Object.keys(properties).length > 0)) {
        return;
    }
    // 属性codeName对应的属性id
    const codeNameToId = {};
    const dataEntity = await ibiz.hub.getAppDataEntity(c.model.appDataEntityId, c.model.appId);
    (_a = dataEntity.appDEFields) === null || _a === void 0 ? void 0 : _a.forEach(field => {
        codeNameToId[field.codeName.toLowerCase()] = field.id;
    });
    const addFields = [];
    const items = ibiz.util.jsonSchema
        .sortProperties(Object.entries(properties))
        .map(item => item[0]);
    items.forEach((key) => {
        if (!codeNameToId[key]) {
            let type;
            switch (properties[key].type) {
                case 'string':
                    type = 'string';
                    if (properties[key].format === 'date-time') {
                        type = 'date';
                    }
                    break;
                case 'integer':
                    type = 'integer';
                    break;
                case 'number':
                    type = 'number';
                    break;
                default:
                    ibiz.log.error(ibiz.i18n.t('runtime.controller.control.grid.unsupported', {
                        type: properties[key].type,
                    }));
                    return;
            }
            addFields.push({
                key,
                description: properties[key].description,
                type,
            });
        }
    });
    const addColumns = [];
    const addDataItems = [];
    addFields.forEach(item => {
        addColumns.push({
            appId: c.model.appId,
            appDEFieldId: item.key,
            id: item.key,
            codeName: item.key,
            columnType: 'DEFGRIDCOLUMN',
            width: 150,
            widthUnit: 'PX',
            valueType: 'SIMPLE',
            caption: item.description,
            hideDefault: true,
            dataItemName: item.key,
        });
        addDataItems.push({
            appId: c.model.appId,
            appDEFieldId: item.key,
            id: item.key,
            valueType: 'SIMPLE',
            dataType: TypeToDataType[item.type],
        });
    });
    return { degridColumns: addColumns, degridDataItems: addDataItems };
}
