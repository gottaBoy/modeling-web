import { findModelChild } from '../../../../model';
/**
 * 应用实体方法输入转换
 *
 * @author chitanda
 * @date 2022-10-10 11:10:36
 * @export
 * @class MethodInput
 */
export class MethodInput {
    /**
     * Creates an instance of MethodInput.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:57
     * @param {IAppDEService} service
     * @param {IAppDataEntity} entity
     * @param {IAppDEMethod} method
     * @param {boolean} [isLocalMode=false]
     */
    constructor(service, entity, method, isLocalMode = false) {
        this.service = service;
        this.entity = entity;
        this.method = method;
        this.isLocalMode = isLocalMode;
        const input = method.appDEMethodInput;
        if (input) {
            const methodDto = findModelChild(entity.appDEMethodDTOs || [], input.appDEMethodDTOId);
            if (methodDto) {
                this.dto = service.createMethodDto(methodDto, {
                    isLocalMode: this.isLocalMode,
                });
            }
        }
    }
    /**
     * 处理请求发送参数
     *
     * @author chitanda
     * @date 2022-10-11 14:10:22
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    async handle(context, data) {
        if (this.dto) {
            return this.dto.get(context, data);
        }
        return data;
    }
    /**
     * 格式化
     *
     * @author tony001
     * @date 2024-05-21 23:05:38
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    async format(context, data) {
        if (this.dto) {
            return this.dto.format(context, data);
        }
        return data;
    }
}
