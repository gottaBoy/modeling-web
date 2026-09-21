/* eslint-disable no-template-curly-in-string */

import { IAppDataEntity, ISearchBarFilter } from '@ibiz/model-core';
import { RuntimeError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { SearchBarFilterController } from './search-bar-filter.controller';

const SubFieldRegex = /^N_(.\w+)_(.\w+)$/; // N_USER_ID_EQ格式字符串中的USER_ID和EQ

type FieldInfo = {
  name: string;
  label: string;
  valueOPs: string[];
  fieldName: string;
};

/**
 * 搜索栏过滤项ITEMS控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export class SearchBarFilterItemsController extends SearchBarFilterController {
  /**
   * 关联实体的模型
   * @author lxm
   * @date 2024-03-14 03:30:45
   * @type {IAppDataEntity}
   */
  protected minorAppDE!: IAppDataEntity;

  /**
   * 所有可以配置的子属性集合
   * @author lxm
   * @date 2024-03-14 04:20:10
   * @type {Array<FieldInfo>}
   */
  allFields: Array<FieldInfo> = [];

  /**
   * 子编辑项控制器
   * @author lxm
   * @date 2024-03-14 04:53:26
   * @protected
   * @type {Map<string, SearchBarFilterController>}
   */
  protected subFilterCMap: Map<string, SearchBarFilterController> = new Map();

  constructor(
    protected filterModels: ISearchBarFilter[],
    appDataEntity: IAppDataEntity,
    context: IContext,
    params: IParams,
  ) {
    super(filterModels[0], appDataEntity, context, params);
    this.type = 'ITEMS';
  }

  /**
   * 计算标识
   * @author lxm
   * @date 2024-03-14 05:06:14
   * @protected
   * @param {string} field
   * @param {string} op
   * @return {*}  {string}
   */
  protected calcKey(field: string, op: string): string {
    return `${field.toUpperCase()}_${op.toUpperCase()}`;
  }

  /**
   * 初始化子实体
   * @author lxm
   * @date 2024-03-14 04:43:04
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async initMinorAppDE(): Promise<void> {
    const targetField = this.filterModels[0].appDEFieldId;
    let minorDEId = '';
    this.appDataEntity.appDEMethodDTOs?.find(item => {
      const field = item.appDEMethodDTOFields?.find(x => {
        return x.appDEFieldId === targetField;
      });

      if (field) {
        minorDEId = field.refAppDataEntityId!;
        return true;
      }
      return false;
    });

    if (!minorDEId) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.control.searchBar.noFoundEntity', {
          targetField,
        }),
      );
    }

    this.minorAppDE = await ibiz.hub.getAppDataEntity(
      minorDEId,
      this.context.srfappid,
    );
  }

  /**
   * 初始化子实体目标属性相关信息
   * @author lxm
   * @date 2024-03-14 04:42:32
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async initAllFields(): Promise<void> {
    const fieldMap = new Map<string, FieldInfo>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.filterModels.forEach(item => {
      const subStr = item.defsearchMode!.codeName?.split('__')[1];
      const matches = subStr!.match(SubFieldRegex)!;
      const subField = matches[1];
      const subOP = matches[2];

      // 修改子项的模型,创建控制器
      const cloneItem = clone(item);
      cloneItem.defsearchMode!.valueOP = subOP;
      cloneItem.id = subField;
      const filterC = new SearchBarFilterController(
        cloneItem,
        this.appDataEntity,
        this.context,
        this.params,
      );
      this.subFilterCMap.set(this.calcKey(subField, subOP), filterC);

      // 隐藏的直接不设置
      if (filterC.hidden) {
        return;
      }

      if (!fieldMap.has(subField)) {
        fieldMap.set(subField, {
          name: subField,
          label: '',
          valueOPs: [],
          fieldName: subField,
        });
      }

      fieldMap.get(subField)!.valueOPs.push(subOP);
    });

    this.minorAppDE.appDEFields?.forEach(item => {
      const codeName = item.codeName!.toUpperCase();
      if (fieldMap.has(codeName)) {
        fieldMap.get(codeName)!.label = item.logicName!;
      }
    });
    this.allFields = Array.from(fieldMap.values());

    // 初始化子过滤项控制器
    await Promise.all(
      Array.from(this.subFilterCMap.values()).map(item => item.init()),
    );
  }

  async init(): Promise<void> {
    await this.initMinorAppDE();
    await this.initAllFields();
    this.hidden = Array.from(this.subFilterCMap.values()).every(
      item => item.hidden,
    );
  }

  /**
   * 获取子搜索栏控制器
   * @author lxm
   * @date 2024-03-15 02:51:02
   * @param {string} field
   * @param {string} op
   * @return {*}  {SearchBarFilterController}
   */
  getSubFilterController(field: string, op: string): SearchBarFilterController {
    return this.subFilterCMap.get(this.calcKey(field, op))!;
  }
}
