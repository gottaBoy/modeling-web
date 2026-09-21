import {
  EditorController,
  SearchBarFilterController,
  calcFilterModelBySchema,
  getEntitySchema,
} from '@ibiz-template/runtime';
import { IAppDataEntity, IPicker, ISearchBarFilter } from '@ibiz/model-core';

/**
 * 搜索过滤项编辑器控制器
 *
 * @author lxm
 * @date 2022-08-24 20:08:25
 * @export
 * @class SearchCondEditEditorController
 * @extends {EditorController}
 */
export class SearchCondEditEditorController extends EditorController<IPicker> {
  protected async onInit(): Promise<void> {
    await super.onInit();
    await this.initByEntitySchema();
    await this.initSearchBarFilters();
  }

  /**
   * 过滤项集合
   *
   */
  searchBarFilters: ISearchBarFilter[] = [];

  /**
   * 过滤项控制器集合
   *
   */
  filterControllers: SearchBarFilterController[] = [];

  /**
   * 实体模型
   * @author lxm
   * @date 2023-10-13 02:49:59
   * @type {IAppDataEntity}
   */
  appDataEntity: IAppDataEntity | null = null;

  /**
   * 根据实体jsonschema初始化
   * @author lxm
   * @date 2023-12-29 04:21:31
   * @return {*}  {Promise<void>}
   */
  async initByEntitySchema(): Promise<void> {
    if (!this.model.appDataEntityId) {
      return;
    }

    const appDataEntity = await ibiz.hub.getAppDataEntity(
      this.model.appDataEntityId,
      this.context.srfappid,
    )!;
    if (appDataEntity) {
      this.appDataEntity = appDataEntity;
    }

    const json = await getEntitySchema(
      this.model.appDataEntityId!,
      this.context,
    );
    if (!json) {
      return;
    }
    const addSearchBarFilters = await calcFilterModelBySchema(
      json,
      this.model.appDataEntityId!,
      this.model.appId,
    );

    this.searchBarFilters = addSearchBarFilters;
  }

  /**
   * 初始化过滤项控制器
   * @author lxm
   * @date 2023-10-13 03:33:17
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async initSearchBarFilters(): Promise<void> {
    if (this.searchBarFilters?.length && this.appDataEntity) {
      this.searchBarFilters.forEach(item => {
        const filterController = new SearchBarFilterController(
          item,
          this.appDataEntity!,
          this.context,
          this.params,
        );
        this.filterControllers.push(filterController);
      });
      await Promise.all(
        this.filterControllers.map(controller => controller.init()),
      );
    }
  }
}
