/* eslint-disable no-template-curly-in-string */
import { RuntimeModelError } from '@ibiz-template/core';
import {
  IAppDEField,
  IAppDataEntity,
  ISearchBarFilter,
} from '@ibiz/model-core';
import {
  IEditorProvider,
  IFilterNodeField,
  IEditorController,
  IEditorContainerController,
  IApiSearchBarFilterController,
} from '../../../interface';
import { findFieldById } from '../../../model';
import { getEditorProvider } from '../../../register';
import { ValueOP } from '../../../constant';
import { isHiddenFilter } from './util';

/** 不需要编辑器的OP */
export const ExcludeOPs: string[] = [
  ValueOP.IS_NULL,
  ValueOP.IS_NOT_NULL,
  ValueOP.EXISTS,
  ValueOP.NOT_EXISTS,
] as const;

const ScriptValueRegex = /\$\{[^}]*\}/; // 匹配${xxx}格式字符串

export interface ISearchFilterContainer {
  context: IContext;
  params: IParams;
  appDataEntity: IAppDataEntity;
}

/**
 * 搜索栏过滤项控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export class SearchBarFilterController
  implements IApiSearchBarFilterController, IEditorContainerController
{
  unitName: string | undefined;

  valueFormat: string | undefined;

  dataType: number | undefined;

  hidden: boolean | undefined;

  /**
   * 编辑器控制器
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @type {IEditorController}
   */
  editor?: IEditorController;

  /**
   * 编辑器适配器
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   */
  editorProvider?: IEditorProvider;

  /**
   * 唯一标识，作为第一个下拉的时候的唯一判断，默认是fieldName
   * @author lxm
   * @date 2024-04-10 02:10:00
   * @type {string}
   */
  key: string;

  /**
   * 过滤的属性名称(有实体属性的是属性codeName小写，没有就是项名称)
   * @author lxm
   * @date 2023-10-13 02:51:39
   * @type {string}
   */
  fieldName: string;

  /**
   * 属性显示的标题
   * @author lxm
   * @date 2023-10-13 03:02:42
   * @type {string}
   */
  label: string;

  /**
   * 配置的属性搜索模式对应的值操作
   * @author lxm
   * @date 2023-10-13 03:22:10
   * @type {string}
   */
  valueOP?: string;

  /**
   * 不需要编辑器
   * @author lxm
   * @date 2024-01-02 11:08:45
   * @type {boolean}
   */
  noEditor: boolean = false;

  /**
   * 控制器类型
   * @author lxm
   * @date 2024-04-10 01:41:40
   * @type {('ITEMS' | 'SIMPLE_ITEMS' | 'FIELD')}
   */
  type: 'ITEMS' | 'SIMPLE_ITEMS' | 'FIELD' = 'FIELD';

  /**
   * 值项
   * @author lxm
   * @date 2024-02-04 06:25:42
   * @readonly
   * @type {(string | undefined)}
   */
  get valueItem(): string | undefined {
    return this.editor ? (this.editor as IData).valueItem : undefined;
  }

  constructor(
    public model: ISearchBarFilter,
    public appDataEntity: IAppDataEntity,
    public context: IContext,
    public params: IParams,
  ) {
    // 设置是否是隐藏
    this.hidden = isHiddenFilter(model);

    // 实体属性
    let field: IAppDEField | undefined;
    if (model.appDEFieldId) {
      field = findFieldById(this.appDataEntity, model.appDEFieldId)!;
    }
    this.fieldName = field ? field.codeName!.toLowerCase() : model.id!;
    this.key = this.fieldName;

    // 属性标题
    this.label = model.caption || field?.logicName || model.id!;

    this.valueOP = model.defsearchMode?.valueOP;

    // 有操作符的，如果是isnull，isnotnull这种，就是无编辑器
    // 没有操作符的如果没有配置编辑器，就是无编辑器
    this.noEditor = this.valueOP
      ? ExcludeOPs.includes(this.valueOP)
      : !this.model.editor;
  }

  /**
   * 初始化
   * @author lxm
   * @date 2023-10-12 05:47:19
   * @return {*}  {Promise<void>}
   */
  async init(): Promise<void> {
    if (!this.noEditor) {
      if (!this.model.editor) {
        throw new RuntimeModelError(
          this.model,
          ibiz.i18n.t('runtime.controller.control.searchBar.missingModel'),
        );
      }

      this.editorProvider = await getEditorProvider(this.model.editor);
      if (this.editorProvider) {
        this.editor = await this.editorProvider.createController(
          this.model.editor,
          this,
        );
      }
    }
  }

  /**
   * 计算要递给编辑器的参数
   * @author lxm
   * @date 2024-02-04 06:35:28
   * @param {IFilterNodeField} node
   * @return {*}  {{ value: unknown; data: IData }}
   */
  calcEditorProps(node: IFilterNodeField): { value: unknown; data: IData } {
    const tempData: IData = {};
    let editorValue = node.value as string;
    if (node.disabled && ScriptValueRegex.test(editorValue)) {
      editorValue = editorValue.replace('${context.srfpersonid}', '当前用户');
      editorValue = editorValue.replace('${context.srforgid}', '当前组织');
    }

    if (this.valueItem) {
      tempData[this.valueItem] = node.valueItem;
    }

    return { value: editorValue, data: tempData };
  }

  /**
   * 编辑器值变更处理
   * @author lxm
   * @date 2024-02-04 06:42:04
   * @param {IFilterNodeField} node
   * @param {unknown} value
   * @param {string} [name]
   */
  onEditorChange(node: IFilterNodeField, value: unknown, name?: string): void {
    if (this.valueItem && name === this.valueItem) {
      node.valueItem = value;
    } else {
      node.value = value;
    }
  }
}
