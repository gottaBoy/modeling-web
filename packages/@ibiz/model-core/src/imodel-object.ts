export interface IModelObject {
  /**
   * 应用标识
   *
   * @author chitanda
   * @date 2023-04-19 22:04:16
   * @type {string}
   */
  appId: string;

  id?: string;

  name?: string;

  codeName?: string;

  userParam?: Record<string, string>;

  /**
   * 平台模型标识（只开发态生效）
   *
   * @author chitanda
   * @date 2024-01-29 12:01:38
   * @type {string}
   */
  modelId?: string;

  /**
   * 平台模型类型（只开发态生效）
   *
   * @author chitanda
   * @date 2024-01-29 12:01:55
   * @type {string}
   */
  modelType?: string;
}
