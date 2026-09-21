/* eslint-disable no-await-in-loop */
import {
  IAppDataEntity,
  IAppDEMethodDTO,
  IAppDEMethodDTOField,
} from '@ibiz/model-core';
import { ModelError, RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { findModelChild } from '../../model';
import { IAppDEService, IAppService, IDataEntity } from '../../interface';
import {
  convertArrayToListMap,
  convertListMapToArray,
} from '../utils/util/util';

/**
 * 应用实体服务方法转换 DTO
 *
 * @author chitanda
 * @date 2022-10-10 22:10:52
 * @export
 * @class MethodDto
 */
export class MethodDto {
  protected app?: IAppService;

  protected fields!: IAppDEMethodDTOField[];

  protected dtoMap: Map<string, MethodDto> = new Map();

  /**
   * Creates an instance of MethodDto.
   * @author lxm
   * @date 2024-01-04 05:39:07
   * @param {IAppDEService} service
   * @param {IAppDataEntity} entity
   * @param {boolean} [isLocalMode]
   * @param {IAppDEMethodDTO} [dto]
   */
  constructor(
    protected service: IAppDEService,
    protected entity: IAppDataEntity,
    protected isLocalMode?: boolean,
    protected dto?: IAppDEMethodDTO,
  ) {
    if (dto) {
      this.app = ibiz.hub.getApp(entity.appId);
      this.fields = dto.appDEMethodDTOFields || [];
    } else {
      this.fields = [];
    }
  }

  /**
   * 请求参数组合 DTO
   *
   * @author chitanda
   * @date 2022-10-10 23:10:33
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {Promise<IData>}
   */
  async get(
    context: IContext,
    data: IData,
    ignore: boolean = false,
  ): Promise<IData> {
    // 简单模式下直接返回数据，不处理
    if (context.srfsimple === true && this.isLocalMode === false) {
      data = this.format(context, data);
      return data;
    }
    const params: IData = {};
    const uiDomain = ibiz.uiDomainManager.get(context.srfsessionid);
    // 拷贝数据
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const key = field.codeName!.toLowerCase();
      switch (field.type) {
        case 'SIMPLE':
        case 'SIMPLES':
        case 'DTO': {
          break;
        }
        case 'DTOS': {
          if (field.listMap) {
            if (data[key]) {
              params[key] =
                data[key].length === 0
                  ? null
                  : convertArrayToListMap(data[key]);
            }
          } else {
            if (data[key] !== undefined && ignore === false) {
              break;
            }
            // 没有实体id的不处理
            if (!field.refAppDataEntityId) {
              break;
            }

            // 获取当前需要打包子数据的关系配置
            const configs =
              uiDomain?.getDERConfig(field.refAppDataEntityId!) || [];

            // 获取指定子关系的 dto
            const dto = await this.getFieldDto(context, field);

            // 获取 dto 实体对应的服务
            const service = await ibiz.hub.getAppDEService(
              dto.entity.appId,
              field.refAppDataEntityId!,
              context,
            );
            // 查找当前 dto 实体在关系配置中和本实体的关系配置
            const deRs = configs.find(rs => {
              return rs.majorAppDataEntityId === this.entity.id;
            });
            // 根据关系配置中的嵌套数据集获取数据，如果没有嵌套数据集则使用默认数据集,带默认条件
            let res;
            if (deRs) {
              const _context = clone(context);
              const _params: IParams = {};
              if (data.srfkey) {
                _context[this.entity.codeName!.toLowerCase()] = data.srfkey;
                if (deRs.parentAppDEFieldId) {
                  _params[deRs.parentAppDEFieldId] = data.srfkey;
                  _params.srfdefaultcond = {
                    [deRs.parentAppDEFieldId]: data.srfkey,
                  };
                }
              }
              if (field.refAppDEDataSetId) {
                res = await service.exec(
                  field.refAppDEDataSetId,
                  _context,
                  _params,
                );
              } else if (deRs.nestedAppDEDataSetId) {
                res = await service.exec(
                  deRs.nestedAppDEDataSetId,
                  _context,
                  _params,
                );
              } else {
                res = await service.exec('FetchDefault', _context, _params);
              }
            } else if (dto.entity.id !== this.entity.id) {
              res = await service.exec(
                field.refAppDEDataSetId || 'FetchDefault',
                context,
              );
            } else {
              throw new RuntimeModelError(
                field,
                ibiz.i18n.t('runtime.service.subRelationships'),
              );
            }
            if (res.ok) {
              const items = res.data as IData[];
              const arr = [];
              for (let j = 0; j < items.length; j++) {
                arr.push(await dto.get(context, items[j], true));
              }
              params[key] = arr;
            }
          }
          break;
        }
        default:
          throw new ModelError(
            field,
            ibiz.i18n.t('runtime.service.unsupportedMethod', {
              type: field.type,
            }),
          );
      }
    }
    // 合并剩余参数
    return { ...data, ...params };
  }

  /**
   * 设置本地 DTO 存储
   *
   * @author chitanda
   * @date 2022-10-10 23:10:50
   * @param {IContext} context
   * @param {IData[]} data
   * @return {*}  {Promise<IDataEntity[]>}
   */
  async sets(context: IContext, data: IData[]): Promise<IDataEntity[]> {
    // 简单模式下直接返回数据，不处理
    if (context.srfsimple === true && this.isLocalMode === false) {
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i] = this.format(context, data[i]);
        }
        return data.map(item => {
          return this.service.createEntity(item) as IDataEntity;
        });
      }
      return [];
    }
    const uiDomain = ibiz.uiDomainManager.get(context.srfsessionid);
    return Promise.all(
      data.map(async datum => {
        let entityData: IDataEntity = this.service.createEntity(
          datum,
        ) as IDataEntity;
        if (this.isLocalMode) {
          const saveEntityData = await this.service.local.add(
            context,
            entityData,
          );
          if (saveEntityData) {
            entityData = saveEntityData;
          }
        }
        const all = this.fields
          .filter(field => field.type === 'DTOS')
          .map(async field => {
            const key = field.codeName!.toLowerCase();
            if (field.listMap && typeof entityData[key] === 'object') {
              entityData[key] = convertListMapToArray(entityData[key]);
            } else {
              // 没有实体id的不处理
              if (!field.refAppDataEntityId) {
                return;
              }

              // 获取当前需要打包子数据的关系配置
              const configs =
                uiDomain?.getDERConfig(field.refAppDataEntityId!) || [];

              // 查找当前 dto 实体在关系配置中和本实体的关系配置
              const deRs = configs.find(rs => {
                return rs.majorAppDataEntityId === this.entity.id;
              });

              const dto = await this.getFieldDto(context, field);

              if (!deRs) {
                // 如果没有关系配置，则清空本地缓存再设置。如果已经配置关系的 MethodReturn.handle 时会清理掉缓存
                dto.service.local.clear();
              }

              const items: IData[] = entityData[key];
              if (items && items.length > 0) {
                const pKey = entityData[this.entity.keyAppDEFieldId!];
                if (field.refPickupAppDEFieldId) {
                  // 特殊处理，在子包内设置父对象标识
                  items.forEach(item => {
                    item[field.refPickupAppDEFieldId!] = pKey;
                  });
                }
                await dto.sets(context, items);
                // 删除下边一行代码，DTO 的属性也不能直接删除。界面上表单类似重复器的地方会用到，保存时也需要由界面提供
                // delete datum[key];
              } else {
                await dto.sets(context, []);
              }
            }
          });
        for (let i = 0; i < all.length; i++) {
          await all[i];
        }
        return entityData;
      }),
    );
  }

  /**
   * 递归计算当前 DTO 相关实体的父关系配置
   *
   * @author chitanda
   * @date 2023-12-26 16:12:13
   * @param {IContext} context
   * @param {number} [depth=0] 递归层级，避免进入死循环。最大递归层级为 10
   * @return {*}  {Promise<void>}
   */
  async calcRs(context: IContext, depth: number = 0): Promise<void> {
    if (depth > 10) {
      return;
    }
    depth += 1;

    const uiDomain = ibiz.uiDomainManager.get(context.srfsessionid);
    const dtoFields = this.fields.filter(field => field.type === 'DTOS');

    for (let i = 0; i < dtoFields.length; i++) {
      const field = dtoFields[i];
      if (!field.refAppDataEntityId) {
        continue;
      }
      const configs = uiDomain?.getDERConfig(field.refAppDataEntityId!) || [];
      if (uiDomain && configs.length === 0) {
        const dto = await this.getFieldDto(context, field);
        if (dto.entity.minorAppDERSs) {
          uiDomain.setDERConfig(
            field.refAppDataEntityId!,
            dto.entity.minorAppDERSs.filter(rs => rs.rsmode === 1),
          );
        }
        await dto.calcRs(context, depth);
      }
    }
  }

  /**
   * 格式化数据
   *
   * @author tony001
   * @date 2024-05-21 23:05:18
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {IData[]}
   */
  format(context: IContext, data: IData): IData {
    const params: IData = {};
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const key = field.codeName!.toLowerCase();
      if (field.type === 'DTOS' && field.listMap) {
        if (Object.prototype.toString.call(data[key]) === '[object Object]') {
          params[key] = convertListMapToArray(data[key]);
        }
        if (Object.prototype.toString.call(data[key]) === '[object Array]') {
          params[key] = convertArrayToListMap(data[key]);
        }
      }
      // 兼容性处理、驼峰命名属性接口名称未下划线分割、属性名称下划线分割
      const { appDEFieldId } = field;
      if (appDEFieldId && key !== appDEFieldId) {
        params[appDEFieldId] = data[key];
      }
    }
    // 合并剩余参数
    return { ...data, ...params };
  }

  /**
   * 获取子属性 DTO
   *
   * @author chitanda
   * @date 2023-12-22 13:12:06
   * @protected
   * @param {IContext} context
   * @param {IAppDEMethodDTOField} field
   * @return {*}  {Promise<MethodDto>}
   */
  protected async getFieldDto(
    context: IContext,
    field: IAppDEMethodDTOField,
  ): Promise<MethodDto> {
    if (this.dtoMap.has(field.codeName!)) {
      return this.dtoMap.get(field.codeName!)!;
    }
    const entity = await ibiz.hub.getAppDataEntity(
      field.refAppDataEntityId!,
      this.entity.appId,
    );
    const methodDto = findModelChild(
      entity.appDEMethodDTOs || [],
      field.refAppDEMethodDTOId!,
    )!;
    const service = await this.app!.deService.getService(context, entity.id!);
    service.isLocalMode = true;
    const dto = service.createMethodDto(methodDto, {
      isLocalMode: true,
    });
    this.dtoMap.set(field.codeName!, dto);
    return dto;
  }
}
