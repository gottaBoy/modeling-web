/**
 * @description 核心全局静态变量
 * @export
 * @class CoreConst
 */
export class CoreConst {
  /**
   * @description 默认模型服务标识
   * @static
   * @memberof CoreConst
   */
  static readonly DEFAULT_MODEL_SERVICE_TAG = 'default';

  /**
   * @description 访问令牌标识
   * @static
   * @memberof CoreConst
   */
  static readonly TOKEN = 'ibzuaa-token';

  /**
   * @description 刷新令牌标识
   * @static
   * @memberof CoreConst
   */
  static readonly REFRESH_TOKEN = 'ibzuaa-refresh-token';

  /**
   * @description 访问令牌标识过期时间
   * @static
   * @memberof CoreConst
   */
  static readonly TOKEN_EXPIRES = 'ibzuaa-token-expires';

  /**
   * @description 认证信息是走记住我模式的 cookie 标识
   * @static
   * @memberof CoreConst
   */
  static readonly TOKEN_REMEMBER = 'ibizuaa-token-remember';

  /**
   * @description 是否是匿名用户登录的 cookie 标识
   * @static
   * @memberof CoreConst
   */
  static readonly IS_ANONYMOUS = 'ibizuaa-is-anonymous';

  /**
   * @description 存储访问相关数据键的集合名称
   * @static
   */
  static readonly ACCESS_STORE_AREA_KEYS = 'ibizuaa-access-store-area-keys';
}
